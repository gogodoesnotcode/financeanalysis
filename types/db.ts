export interface Blog {
  id: string
  title: string
  content: string
  imageUrl?: string
  createdAt: Date
}

export interface Analysis {
  id: string
  title: string
  fileUrl: string
  fileType: 'pdf' | 'audio'
  createdAt: Date
}

