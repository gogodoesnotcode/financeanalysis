"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"
import { put, del } from "@vercel/blob"

export async function createBlog(formData: FormData) {
  try {
    // Extract and validate all fields
    const title = formData.get("title")
    const author = formData.get("author")
    const content = formData.get("content")
    const pin = formData.get("pin")
    const image = formData.get("image")

    // Validate required fields
    if (!title || typeof title !== "string") {
      return { success: false, error: "Title is required" }
    }

    if (!author || typeof author !== "string") {
      return { success: false, error: "Author is required" }
    }

    if (!content || typeof content !== "string") {
      return { success: false, error: "Content is required" }
    }

    if (!pin || pin !== "7974") {
      return { success: false, error: "Invalid PIN" }
    }

    let imageUrl: string | undefined
    if (image instanceof File && image.size > 0) {
      const blob = await put(`blog-${Date.now()}-${image.name}`, image, {
        access: "public",
      })
      imageUrl = blob.url
    }

    const blog = await prisma.blog.create({
      data: {
        title: title.trim(),
        author: author.trim(),
        content: content.trim(),
        imageUrl,
      },
    })

    revalidatePath("/blog")
    return { success: true, data: blog }
  } catch (e) {
    return {
      success: false,
      error: "Failed to create insight",
    }
  }
}

export async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return { success: true, data: blogs }
  } catch (e) {
    return { success: false, error: "Failed to fetch blog posts" }
  }
}

export async function deleteBlog(formData: FormData) {
  try {
    const id = formData.get("id")
    const pin = formData.get("pin")
    const imageUrl = formData.get("imageUrl")

    if (!id || typeof id !== "string") {
      return { success: false, error: "Invalid blog ID" }
    }

    if (!pin || pin !== "7974") {
      return { success: false, error: "Invalid PIN" }
    }

    // Delete the blog post
    await prisma.blog.delete({
      where: { id },
    })

    // Delete the associated image if it exists
    if (imageUrl && typeof imageUrl === "string") {
      try {
        await del(imageUrl)
      } catch (error) {
        console.error("Failed to delete image:", error)
      }
    }

    revalidatePath("/blog")
    return { success: true }
  } catch (e) {
    return {
      success: false,
      error: "Failed to delete insight",
    }
  }
}

