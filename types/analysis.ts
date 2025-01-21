export type FileType = "pdf" | "audio"

export interface AnalysisEntry {
  id: string
  title: string
  fileUrl: string
  fileType: FileType
  createdAt: Date
}

