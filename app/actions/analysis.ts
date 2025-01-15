'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { put } from '@vercel/blob'

export async function createAnalysis(formData: FormData) {
  try {
    const title = formData.get('title')
    const fileType = formData.get('fileType')
    const file = formData.get('file')

    // Validate inputs
    if (!title || typeof title !== 'string') {
      throw new Error('Title is required')
    }

    if (!fileType || typeof fileType !== 'string' || !['pdf', 'audio'].includes(fileType)) {
      throw new Error('Valid file type (pdf or audio) is required')
    }

    if (!file || !(file instanceof File) || file.size === 0) {
      throw new Error('Valid file is required')
    }

    // Upload file to blob storage
    const blob = await put(file.name, file, {
      access: 'public',
    })

    if (!blob || !blob.url) {
      throw new Error('File upload failed')
    }

    // Create database entry
    const analysis = await prisma.analysis.create({
      data: {
        title,
        fileUrl: blob.url,
        fileType,
      },
    })

    revalidatePath('/portfolio')
    return { success: true, data: analysis }
  } catch (error) {
    // Proper error handling
    const errorMessage = error instanceof Error ? error.message : 'Failed to create analysis entry'
    console.error('Error creating analysis:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

export async function getAnalyses() {
  try {
    const analyses = await prisma.analysis.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { success: true, data: analyses }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch analyses'
    console.error('Error fetching analyses:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

