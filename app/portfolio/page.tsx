import { CreateAnalysisForm } from '@/components/create-analysis-form'
import { MediaViewer } from '@/components/media-viewer'

export default function AnalysisAndReports() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Analysis and Reports</h1>
        <div className="grid gap-8">
          <div className="text-center py-12">
            <p className="text-zinc-400 mb-4">No analysis or reports yet.</p>
            <p className="text-zinc-500">Click the + button to upload your first file!</p>
          </div>
        </div>
      </div>
      <CreateAnalysisForm />
    </div>
  )
}

