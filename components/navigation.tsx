import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="border-b border-zinc-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-emerald-400">Home</span>
          <span className="text-white">Page</span>
        </Link>
        <div className="space-x-8">
          <Link href="/" className="hover:text-emerald-400 transition-colors">HOME</Link>
          <Link href="/portfolio" className="hover:text-emerald-400 transition-colors">ANALYSIS AND REPORT</Link>
          <Link href="/blog" className="hover:text-emerald-400 transition-colors">BLOG</Link>
          <Link href="/contact" className="hover:text-emerald-400 transition-colors">CONTACT</Link>
        </div>
      </div>
    </nav>
  )
}

