'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { put } from '@vercel/blob'

export async function createBlog(formData: FormData) {
  try {
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const image = formData.get('image') as File | null

    let imageUrl: string | undefined

    if (image && image.size > 0) {
      const blob = await put(image.name, image, {
        access: 'public',
      })
      imageUrl = blob.url
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        imageUrl,
      },
    })

    revalidatePath('/blog')
    return { success: true, data: blog }
  } catch (error) {
    console.error('Error creating blog:', error)
    return { success: false, error: 'Failed to create blog post' }
  }
}

export async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { success: true, data: blogs }
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return { success: false, error: 'Failed to fetch blog posts' }
  }
}

