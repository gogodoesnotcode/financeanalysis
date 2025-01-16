import { getAnalyses } from '@/app/actions/analysis'
import { CreateAnalysisForm } from '@/components/create-analysis-form'
import { MediaViewer } from '@/components/media-viewer'
import { Suspense } from 'react'

async function Analyses() {
  const { data: entries = [], success } = await getAnalyses()

  if (!success || !entries.length) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400 mb-4">No analysis or reports yet.</p>
        <p className="text-zinc-500">Click the + button to upload your first file!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-8">
      {entries.map((entry) => (
        <MediaViewer
          key={entry.id}
          fileUrl={entry.fileUrl}
          fileType={entry.fileType}
          title={entry.title}
        />
      ))}
    </div>
  )
}

export default function AnalysisAndReports() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Analysis and Reports</h1>
        <p className="text-zinc-400 mb-8">(Once in 15 days update)</p>
        <Suspense fallback={<div>Loading analyses...</div>}>
          <Analyses />
        </Suspense>
      </div>
      <CreateAnalysisForm />
    </div>
  )
}

