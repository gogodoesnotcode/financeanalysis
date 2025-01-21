"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"
import { put, del } from "@vercel/blob"
import type { FileType } from "@/types/analysis"

export async function createAnalysis(formData: FormData) {
  try {
    const title = formData.get("title")
    const fileType = formData.get("fileType")
    const file = formData.get("file")
    const pin = formData.get("pin")

    // Validate inputs
    if (!title || typeof title !== "string") {
      throw new Error("Title is required")
    }

    if (!pin || pin !== "7974") {
      throw new Error("Invalid PIN")
    }

    if (!fileType || (fileType !== "pdf" && fileType !== "audio")) {
      throw new Error("Valid file type (pdf or audio) is required")
    }

    if (!file || !(file instanceof File) || file.size === 0) {
      throw new Error("Valid file is required")
    }

    // Upload file to blob storage
    const blob = await put(file.name, file, {
      access: "public",
    })

    if (!blob || !blob.url) {
      throw new Error("File upload failed")
    }

    // Create database entry
    const analysis = await prisma.analysis.create({
      data: {
        title,
        fileUrl: blob.url,
        fileType: fileType as FileType,
      },
    })

    revalidatePath("/portfolio")
    return { success: true, data: analysis }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to create analysis entry"
    console.error("Error creating analysis:", errorMessage)
    return { success: false, error: errorMessage }
  }
}

export async function getAnalyses() {
  try {
    const analyses = await prisma.analysis.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return {
      success: true,
      data: analyses.map((analysis) => ({
        ...analysis,
        fileType: analysis.fileType.toLowerCase() as FileType,
      })),
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch analyses"
    console.error("Error fetching analyses:", errorMessage)
    return { success: false, error: errorMessage }
  }
}

export async function deleteAnalysis(formData: FormData) {
  try {
    const id = formData.get("id")
    const pin = formData.get("pin")
    const fileUrl = formData.get("fileUrl")

    if (!id || typeof id !== "string") {
      return { success: false, error: "Invalid analysis ID" }
    }

    if (!pin || pin !== "7974") {
      return { success: false, error: "Invalid PIN" }
    }

    // Delete the analysis entry
    await prisma.analysis.delete({
      where: { id },
    })

    // Delete the associated file if it exists
    if (fileUrl && typeof fileUrl === "string") {
      try {
        await del(fileUrl)
      } catch (error) {
        console.error("Failed to delete file:", error)
      }
    }

    revalidatePath("/portfolio")
    return { success: true }
  } catch (e) {
    return {
      success: false,
      error: "Failed to delete analysis",
    }
  }
}

