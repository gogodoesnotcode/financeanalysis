import { getBlogs } from '@/app/actions/blog'
import { CreatePostForm } from '@/components/create-post-form'
import { BlogPostCard } from '@/components/blog-post'

export default async function Blog() {
  const { data: posts = [] } = await getBlogs()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Insights</h1>
        <div className="grid gap-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-400 mb-4">No blog posts yet.</p>
              <p className="text-zinc-500">Click the + button to create your first post!</p>
            </div>
          ) : (
            posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
      <CreatePostForm />
    </div>
  )
}

