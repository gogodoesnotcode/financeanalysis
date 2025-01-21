"use client"

import Image from "next/image"
import { useState } from "react"
import { Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { deleteBlog } from "@/app/actions/blog"
import type { BlogPost } from "@/types/blog"

interface BlogPostProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [pin, setPin] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  async function handleDelete() {
    if (isDeleting) return

    setIsDeleting(true)
    try {
      const formData = new FormData()
      formData.append("id", post.id)
      formData.append("pin", pin)
      if (post.imageUrl) {
        formData.append("imageUrl", post.imageUrl)
      }

      const result = await deleteBlog(formData)

      if (result.success) {
        setIsDeleteDialogOpen(false)
        toast({
          title: "Success",
          description: "Insight deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete insight",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setPin("")
    }
  }

  return (
    <>
      <Card className="bg-teal-800 text-white">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>{post.title}</CardTitle>
            <div className="flex justify-between text-sm text-zinc-300">
              <span>By {post.author}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent>
          {post.imageUrl && (
            <div className="relative w-full h-[200px] mb-4">
              <Image
                src={post.imageUrl || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          )}
          <p className="whitespace-pre-wrap">{post.content}</p>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Insight"
        description={
          <div className="space-y-4 pt-4">
            <p>Are you sure you want to delete this insight? This action cannot be undone.</p>
            <Input
              type="password"
              placeholder="Enter PIN to confirm"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
        }
      />
    </>
  )
}

