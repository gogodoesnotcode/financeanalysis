'use client'

interface MediaViewerProps {
  fileUrl: string
  fileType: 'pdf' | 'audio'
  title: string
}

export function MediaViewer({ fileUrl, fileType, title }: MediaViewerProps) {
  return (
    <div className="bg-teal-800 rounded-lg p-4 space-y-4">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      {fileType === 'pdf' ? (
        <iframe
          src={fileUrl}
          className="w-full h-[500px] rounded border border-teal-700"
          title={title}
        />
      ) : (
        <audio controls className="w-full">
          <source src={fileUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      <div className="flex justify-end">
        <a
          href={fileUrl}
          download
          className="text-sm text-teal-300 hover:text-teal-200 transition-colors"
        >
          Download {fileType.toUpperCase()}
        </a>
      </div>
    </div>
  )
}

