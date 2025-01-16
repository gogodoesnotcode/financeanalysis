'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PlusCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { createBlog } from '@/app/actions/blog'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export function CreatePostForm() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      const result = await createBlog(formData)
      
      if (result.success) {
        setOpen(false)
        toast({
          title: 'Success',
          description: 'Blog post created successfully',
        })
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create blog post',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg">
          <PlusCircle className="h-6 w-6" />
          <span className="sr-only">Create new post</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] bg-zinc-900 border-zinc-800">
        <SheetHeader>
          <SheetTitle className="text-white">Create New Insight</SheetTitle>
        </SheetHeader>
        <form action={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Input
              name="title"
              placeholder="Post Title"
              required
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
          <div>
            <Input
              name="author"
              placeholder="Author Name"
              required
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
          <div>
            <Textarea
              name="content"
              placeholder="Write your post content..."
              required
              className="min-h-[300px] bg-zinc-800 border-zinc-700"
            />
          </div>
          <div>
            <Input
              name="image"
              type="file"
              accept="image/*"
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
          <div>
            <Input
              name="pin"
              type="password"
              placeholder="Enter PIN"
              required
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-teal-600 hover:bg-teal-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Insight'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

