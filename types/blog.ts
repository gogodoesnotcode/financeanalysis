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
