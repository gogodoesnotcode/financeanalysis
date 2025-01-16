export interface BlogPost {
  id: string
  title: string
  author: string
  content: string
  imageUrl?: string | null
  createdAt: Date
}

// Rename the interface but keep BlogPost for backwards compatibility
export type Insight = BlogPost

// Add this type for Prisma results
export type PrismaBlogPost = Omit<BlogPost, 'imageUrl'> & {
  imageUrl: string | null
}

// Add a utility function to convert types
export function convertPrismaBlogPost(post: PrismaBlogPost): BlogPost {
  return {
    ...post,
    imageUrl: post.imageUrl || undefined
  }
}