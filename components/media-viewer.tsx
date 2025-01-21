"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { deleteAnalysis } from "@/app/actions/analysis"

interface MediaViewerProps {
  id: string
  fileUrl: string
  fileType: "pdf" | "audio"
  title: string
}

export function MediaViewer({ id, fileUrl, fileType, title }: MediaViewerProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [pin, setPin] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  async function handleDelete() {
    if (isDeleting) return

    setIsDeleting(true)
    try {
      const formData = new FormData()
      formData.append("id", id)
      formData.append("pin", pin)
      formData.append("fileUrl", fileUrl)

      const result = await deleteAnalysis(formData)

      if (result.success) {
        setIsDeleteDialogOpen(false)
        toast({
          title: "Success",
          description: "Analysis deleted successfully",
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
        description: "Failed to delete analysis",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setPin("")
    }
  }

  return (
    <>
      <div className="bg-teal-800 rounded-lg p-4 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
        {fileType === "pdf" ? (
          <iframe src={fileUrl} className="w-full h-[500px] rounded border border-teal-700" title={title} />
        ) : (
          <audio controls className="w-full">
            <source src={fileUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
        <div className="flex justify-end">
          <a href={fileUrl} download className="text-sm text-teal-300 hover:text-teal-200 transition-colors">
            Download {fileType.toUpperCase()}
          </a>
        </div>
      </div>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Analysis"
        description={
          <div className="space-y-4 pt-4">
            <p>Are you sure you want to delete this analysis? This action cannot be undone.</p>
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

