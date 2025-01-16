'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FileText, Home, LineChart, Mail, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Load collapsed state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('sidebarCollapsed')
    if (stored) {
      setIsCollapsed(JSON.parse(stored))
    }
  }, [])

  // Save collapsed state to localStorage
  const toggleCollapse = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState))
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full bg-zinc-800 transform transition-all duration-200 ease-in-out",
        "md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        isCollapsed ? "md:w-20" : "w-64"
      )}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2">
              <LineChart className="h-6 w-6 text-emerald-400 flex-shrink-0" />
              <span className={cn(
                "text-xl font-bold transition-opacity duration-200",
                isCollapsed ? "md:hidden" : "block"
              )}>Finance Analysis</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="space-y-2">
            <Link 
              href="/" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-zinc-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-5 w-5 flex-shrink-0" />
              <span className={cn(
                "transition-opacity duration-200",
                isCollapsed ? "md:hidden" : "block"
              )}>Home</span>
            </Link>
            <Link 
              href="/portfolio" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-zinc-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <LineChart className="h-5 w-5 flex-shrink-0" />
              <span className={cn(
                "transition-opacity duration-200",
                isCollapsed ? "md:hidden" : "block"
              )}>Analysis and Report</span>
            </Link>
            <Link 
              href="/blog" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-zinc-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <FileText className="h-5 w-5 flex-shrink-0" />
              <span className={cn(
                "transition-opacity duration-200",
                isCollapsed ? "md:hidden" : "block"
              )}>Blog</span>
            </Link>
            <Link 
              href="/contact" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-zinc-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Mail className="h-5 w-5 flex-shrink-0" />
              <span className={cn(
                "transition-opacity duration-200",
                isCollapsed ? "md:hidden" : "block"
              )}>Contact</span>
            </Link>
          </nav>
        </div>

        {/* Collapse toggle button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-[-20px] top-6 hidden md:flex"
          onClick={toggleCollapse}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </aside>

      {/* Mobile toggle button */}
      <Button 
        variant="ghost" 
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>
    </>
  )
}

