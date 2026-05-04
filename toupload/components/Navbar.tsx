'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Home',     href: '/'         },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about'    },
  { label: 'Careers',  href: '/careers'  },
  { label: 'Contact',  href: '/contact'  },
]

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-[0_1px_0_#E5E7EB]'
            : 'bg-white/70 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 lg:px-10 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 flex items-center justify-center text-white font-black text-sm transition-transform duration-300 group-hover:scale-110"
              style={{ background: '#F59E0B', clipPath: 'polygon(20% 0%,80% 0%,100% 50%,80% 100%,20% 100%,0% 50%)' }}
            >A</div>
            <span
              className="font-black tracking-[3px] text-gray-900"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24 }}
            >AJAX<span className="text-amber-400">.</span></span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-0.5 list-none">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                >{l.label}</Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+18554794089"
              className="text-sm font-semibold text-gray-500 hover:text-amber-600 transition-colors duration-200 flex items-center gap-1.5"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              +1 (346) 428-0370
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(245,158,11,0.35)]"
            >
              Get Dispatched <ArrowRight />
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-gray-800 rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-gray-800 rounded transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-gray-800 rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div className={`absolute top-[68px] inset-x-0 bg-white border-b border-gray-200 shadow-xl p-6 transition-all duration-300 ${open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'}`}>
          <ul className="flex flex-col gap-1 mb-5 list-none">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >{l.label}</Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 bg-amber-400 text-gray-900 font-bold px-6 py-3.5 rounded-xl text-sm w-full"
          >
            Get Dispatched Now <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </>
  )
}