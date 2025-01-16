'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { createAnalysis } from '@/app/actions/analysis'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const VALID_PIN = "7974"

export function CreateAnalysisForm() {
  const [open, setOpen] = useState(false)
  const [fileType, setFileType] = useState<'pdf' | 'audio'>('pdf')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    try {
      setIsSubmitting(true)

      // Validate PIN
      const pin = formData.get('pin')
      if (pin !== VALID_PIN) {
        throw new Error('Invalid PIN')
      }

      // Validate other form data
      const title = formData.get('title')
      const file = formData.get('file')

      if (!title || typeof title !== 'string') {
        throw new Error('Title is required')
      }

      if (!file || !(file instanceof File) || file.size === 0) {
        throw new Error('Please select a file')
      }

      // Create a new FormData instance
      const data = new FormData()
      data.append('title', title)
      data.append('file', file)
      data.append('fileType', fileType)

      const result = await createAnalysis(data)
      
      if (result.success) {
        setOpen(false)
        toast({
          title: 'Success',
          description: 'Analysis entry created successfully',
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
        description: error instanceof Error ? error.message : 'Failed to create analysis entry',
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
          <span className="sr-only">Create new analysis</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] bg-zinc-900 border-zinc-800">
        <SheetHeader>
          <SheetTitle className="text-white">Upload Analysis or Report</SheetTitle>
        </SheetHeader>
        <form action={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Input
              name="title"
              placeholder="Title"
              required
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
          <div>
            <Select 
              value={fileType} 
              onValueChange={(value: 'pdf' | 'audio') => setFileType(value)}
              defaultValue="pdf"
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Select file type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="audio">Audio File</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input
              name="file"
              type="file"
              accept={fileType === 'pdf' ? '.pdf' : 'audio/*'}
              required
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
            {isSubmitting ? 'Uploading...' : 'Upload'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

