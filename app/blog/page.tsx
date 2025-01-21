import { getBlogs } from "@/app/actions/blog"
import { CreatePostForm } from "@/components/create-post-form"
import { BlogPostCard } from "@/components/blog-post"
import { Suspense } from "react"

async function Posts() {
  const { data: posts = [], success } = await getBlogs()

  if (!success || !posts.length) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400 mb-4">No insights yet.</p>
        <p className="text-zinc-500">Click the + button to create your first insight!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-8">
      {posts.map((post) => (
        <BlogPostCard
          key={post.id}
          post={{
            ...post,
            createdAt: new Date(post.createdAt),
          }}
        />
      ))}
    </div>
  )
}

export default function InsightsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Insights</h1>
        <Suspense fallback={<div>Loading insights...</div>}>
          <Posts />
        </Suspense>
      </div>
      <CreatePostForm />
    </div>
  )
}

