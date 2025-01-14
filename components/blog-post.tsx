import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface BlogPost {
  id: string
  title: string
  content: string
  imageUrl?: string
  createdAt: Date
}

interface BlogPostProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostProps) {
  return (
    <Card className="bg-teal-800 text-white">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <p className="text-sm text-zinc-300">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent>
        {post.imageUrl && (
          <div className="relative w-full h-[200px] mb-4">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        <p className="whitespace-pre-wrap">{post.content}</p>
      </CardContent>
    </Card>
  )
}

