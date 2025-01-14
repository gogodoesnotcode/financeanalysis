'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
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
import { createAnalysis } from '@/app/actions/analysis'

export function CreateAnalysisForm() {
  const [open, setOpen] = useState(false)
  const [fileType, setFileType] = useState<'pdf' | 'audio'>('pdf')
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    try {
      // Add your form submission logic here
      const result = await createAnalysis(formData)
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
        description: 'Failed to create analysis entry',
        variant: 'destructive',
      })
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
            <Select value={fileType} onValueChange={(value: 'pdf' | 'audio') => setFileType(value)}>
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
          <Button 
            type="submit" 
            className="w-full bg-teal-600 hover:bg-teal-700"
          >
            Upload
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

