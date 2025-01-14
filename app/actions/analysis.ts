'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { put } from '@vercel/blob'

export async function createAnalysis(formData: FormData) {
  try {
    const title = formData.get('title') as string
    const fileType = formData.get('fileType') as 'pdf' | 'audio'
    const file = formData.get('file') as File

    if (!file || file.size === 0) {
      throw new Error('No file provided')
    }

    const blob = await put(file.name, file, {
      access: 'public',
    })

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
    console.error('Error creating analysis:', error)
    return { success: false, error: 'Failed to create analysis entry' }
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
    console.error('Error fetching analyses:', error)
    return { success: false, error: 'Failed to fetch analyses' }
  }
}

