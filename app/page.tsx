import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, Mail, Phone } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-orange-400/20 rounded-lg" />
          <Image
            src="/assets/geetika.jpg"
            alt="Profile"
            width={600}
            height={600}
            className="rounded-lg relative z-10"
          />
          <div className="flex justify-center space-x-6 mt-6 relative z-10">
            <Link 
              href="https://www.linkedin.com/in/geetika-naidu-gn7/" 
              className="hover:text-emerald-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={24} />
            </Link>
            <Link 
              href="mailto:geetikanaidu7@gmail.com"
              className="hover:text-emerald-400 transition-colors"
            >
              <Mail size={24} />
            </Link>
            <Link 
              href="tel:+917974559154"
              className="hover:text-emerald-400 transition-colors"
            >
              <Phone size={24} />
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-5xl font-bold">Who am I?</h1>
          <p className="text-lg text-zinc-300">
            Hi! I am a believer of value investing for wealth creation. Finance is a dynamic landscape, 
            and I am deeply committed to navigating it through continuous learning and thoughtful analysis.
          </p>
          <p className="text-lg text-zinc-300">
            Value investing and diversification are not just strategies to me—they are principles that 
            shape my approach to making informed financial decisions and identifying growth opportunities.
          </p>
          <p className="text-lg text-zinc-300">
            My passion lies in valuation, investment banking, equity research, investment strategies, 
            and portfolio management, where I bring a strong foundation of Business Valuation, 
            Security Analysis & Portfolio Management.
          </p>
        </div>
      </div>
    </div>
  )
}

