'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
interface StatItem    { value: string; label: string }
interface ServiceItem { icon: React.ReactNode; title: string; desc: string; tag: string; featured?: boolean }
interface EquipItem   { name: string; emoji: string; desc: string }
interface StepItem    { n: string; title: string; desc: string; docs?: string[] }
interface ReasonItem  { icon: React.ReactNode; title: string; desc: string }
interface ReviewItem  { name: string; role: string; initials: string; color: string; rating: number; quote: string }

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const STATS: StatItem[] = [
  { value: '500+',    label: 'Carriers Served'   },
  { value: '98%',     label: 'On-Time Dispatch'  },
  { value: '$2.8/mi', label: 'Avg Rate Secured'  },
  { value: '48',      label: 'States Covered'    },
]

const TRUST_BADGES = [
  { label: 'MC Authority Verified',   icon: '🛡️' },
  { label: 'FMCSA Compliant',         icon: '✅' },
  { label: 'DAT Load Board Access',   icon: '🌐' },
  { label: 'Truckstop.com Partner',   icon: '🚛' },
  { label: 'A+ Broker Relationships', icon: '⭐' },
  { label: 'Paperwork 100% Handled',  icon: '📋' },
]

const SERVICES: ServiceItem[] = [
  {
    icon: <IconSearch />,
    title: 'Load Searching',
    desc: 'We find high-paying freight from trusted brokers on DAT, Truckstop, and all major load boards — so your truck never sits idle.',
    tag: 'Best rates, every time',
  },
  {
    icon: <IconDollar />,
    title: 'Rate Negotiation',
    desc: 'Our dispatchers negotiate aggressively with brokers to secure the highest freight rates available for your equipment type and lane.',
    tag: 'Avg. $2.80 / mile',
  },
  {
    icon: <IconChat />,
    title: 'Broker Communication',
    desc: 'From first contact to load confirmation, we manage all broker communication on your behalf. Zero back-and-forth for you.',
    tag: 'Zero hassle for drivers',
  },
  {
    icon: <IconFile />,
    title: 'Paperwork & Documentation',
    desc: 'Setup packets, rate confirmations, invoices, and billing docs — handled professionally and submitted on time, every time.',
    tag: 'Full back-office support',
  },
  {
    icon: <IconRoute />,
    title: 'Route Planning',
    desc: 'Smart backhaul planning and load sequencing to reduce empty miles and keep your truck generating revenue throughout the week.',
    tag: 'More miles, less deadhead',
  },
  {
    icon: <IconPerson />,
    title: 'Dedicated Dispatcher',
    desc: 'One dispatcher. One point of contact. They know your truck, your lanes, and your goals — and work every day to move you forward.',
    tag: 'Your personal partner',
    featured: true,
  },
]

const EQUIPMENT: EquipItem[] = [
  { name: 'Dry Van',    emoji: '🚛', desc: 'General freight, enclosed trailer'  },
  { name: 'Reefer',     emoji: '❄️', desc: 'Temperature-controlled loads'       },
  { name: 'Flatbed',    emoji: '🏗️', desc: 'Oversized & heavy cargo'            },
  { name: 'Step Deck',  emoji: '📐', desc: 'Taller freight, lower deck'         },
  { name: 'Power Only', emoji: '⚡', desc: 'Drop-and-hook, live loads'          },
  { name: 'Box Truck',  emoji: '📦', desc: 'Local & urban deliveries'           },
]

const STEPS: StepItem[] = [
  { n: '01', title: 'Submit Your Info',    desc: 'Share your company details, truck type, and preferred lanes. Takes under 5 minutes.' },
  { n: '02', title: 'Upload Documents',    desc: 'Securely upload your required carrier documents to get your account set up.', docs: ['MC Authority', 'USDOT #', 'Insurance Cert.', 'W9 Form'] },
  { n: '03', title: 'Sign Agreement',      desc: 'Review and sign a simple, transparent dispatch agreement — no long-term lock-in.' },
  { n: '04', title: 'Meet Your Dispatcher', desc: 'We assign a dedicated dispatcher who learns your schedule, goals, and preferences.' },
  { n: '05', title: 'Start Rolling',       desc: 'Your dispatcher finds loads, negotiates rates, and keeps your truck profitable.' },
]

const REASONS: ReasonItem[] = [
  { icon: <IconPerson />,  title: 'One Dedicated Dispatcher',   desc: "You're never passed around. One person manages your account daily and knows your operation inside out." },
  { icon: <IconDollar />,  title: 'Maximum Revenue Focus',      desc: 'Our dispatchers are motivated to get you the highest rates possible — your success is our success.' },
  { icon: <IconRoute />,   title: 'Zero Empty Miles Strategy',  desc: 'Smart backhaul planning and lane pairing keeps deadhead to an absolute minimum.' },
  { icon: <IconFile />,    title: 'Complete Paperwork Coverage', desc: 'Rate confirmations, broker packets, invoicing — handled on time so your cash flow never stalls.' },
  { icon: <IconMap />,     title: '48-State Load Network',      desc: 'Strong broker relationships and load board access across all major US freight lanes every day.' },
  { icon: <IconClock />,   title: 'Mon–Sat Availability',       desc: 'Our team is available 9AM–6PM EST, Monday through Saturday — right when freight moves.' },
]

const REVIEWS: ReviewItem[] = [
  {
    name: 'Marcus T.', role: 'Owner-Operator · Dry Van · Texas',
    initials: 'MT', color: 'bg-amber-100 text-amber-700', rating: 5,
    quote: 'AJAX doubled my weekly revenue in the first month. My dispatcher knows exactly what I need — high rates, no drama, and loads that respect my home time. Best decision I made for my business.',
  },
  {
    name: 'Sandra R.', role: 'Fleet Owner · 3 Trucks · Ohio',
    initials: 'SR', color: 'bg-blue-100 text-blue-700', rating: 5,
    quote: 'Managing three trucks and chasing brokers was exhausting. AJAX handles everything now. I check in with my dispatcher once a day and the loads are always lined up. Huge stress relief.',
  },
  {
    name: 'James K.', role: 'Independent Driver · Flatbed · Georgia',
    initials: 'JK', color: 'bg-emerald-100 text-emerald-700', rating: 5,
    quote: "I was skeptical at first — but these guys negotiated rates I couldn't get on my own. I haven't had an empty day in three months. The paperwork coverage alone was worth switching.",
  },
]

/* ─────────────────────────────────────────
   SHARED MICRO-COMPONENTS
───────────────────────────────────────── */
function SectionPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
      {children}
    </div>
  )
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

function ArrowRight({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home',     href: '/'         },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about'    },
  { label: 'Careers',  href: '/careers'  },
  { label: 'Contact',  href: '/contact'  },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-[0_1px_0_#E5E7EB]' : 'bg-white/70 backdrop-blur-sm'}`}>
        <nav className="max-w-7xl mx-auto px-5 lg:px-10 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 flex items-center justify-center text-white font-black text-sm transition-transform duration-300 group-hover:scale-110" style={{ background: '#F59E0B', clipPath: 'polygon(20% 0%,80% 0%,100% 50%,80% 100%,20% 100%,0% 50%)' }}>A</div>
            <span className="font-black text-xl tracking-[3px] text-gray-900" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24 }}>AJAX<span className="text-amber-400">.</span></span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-0.5 list-none">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200">{l.label}</Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+18554794089" className="text-sm font-semibold text-gray-500 hover:text-amber-600 transition-colors duration-200 flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              +1 (855) 479-4089
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(245,158,11,0.35)]">
              Get Dispatched <ArrowRight size={14} />
            </Link>
          </div>

          {/* Hamburger */}
          <button className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <span className={`block w-5 h-[1.5px] bg-gray-800 rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-gray-800 rounded transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-gray-800 rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div className={`absolute top-[68px] inset-x-0 bg-white border-b border-gray-100 shadow-xl p-6 transition-all duration-300 ${open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'}`}>
          <ul className="flex flex-col gap-1 mb-5 list-none">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200">{l.label}</Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 bg-amber-400 text-gray-900 font-bold px-6 py-3.5 rounded-xl text-sm w-full">
            Get Dispatched Now <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </>
  )
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('[data-a]')
    els?.forEach((el, i) => {
      el.style.cssText = 'opacity:0;transform:translateY(26px)'
      setTimeout(() => {
        el.style.cssText = 'opacity:1;transform:translateY(0);transition:opacity 0.7s ease,transform 0.7s ease'
      }, 80 + i * 110)
    })
  }, [])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A14]">
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.12) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      {/* Amber glow */}
      <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[650px] h-[650px] pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(245,158,11,0.14) 0%,rgba(245,158,11,0.04) 45%,transparent 70%)' }} />
      {/* Bottom road line */}
      <div className="absolute bottom-0 inset-x-0 h-[2px]" style={{ background: 'linear-gradient(to right,transparent,rgba(245,158,11,0.6),transparent)' }} />

      {/* Truck illustration */}
      <div className="absolute right-0 top-0 bottom-0 w-[50%] max-w-[760px] hidden lg:flex items-center justify-end pr-8 pointer-events-none">
        <div className="w-full opacity-[0.12]" style={{ animation: 'floatY 5s ease-in-out infinite' }}>
          <svg viewBox="0 0 760 400" fill="none" className="w-full">
            <rect x="30" y="120" width="490" height="185" rx="14" fill="#F59E0B" />
            <rect x="42" y="132" width="466" height="162" rx="8" fill="#B45309" />
            <text x="280" y="234" fontFamily="'Bebas Neue',sans-serif" fontSize="68" fill="#F59E0B" textAnchor="middle" letterSpacing="10">AJAX</text>
            <line x1="42" y1="216" x2="518" y2="216" stroke="#F59E0B" strokeWidth="1.5" opacity="0.3" />
            <rect x="520" y="158" width="196" height="147" rx="18" fill="#F59E0B" />
            <rect x="532" y="170" width="174" height="88" rx="10" fill="#92400E" />
            <rect x="604" y="182" width="92" height="66" rx="8" fill="#FCD34D" opacity="0.5" />
            <rect x="514" y="92" width="12" height="78" rx="6" fill="#6B7280" />
            <rect x="530" y="84" width="12" height="86" rx="6" fill="#4B5563" />
            {[160, 320, 568, 672].map((cx, i) => (
              <g key={i}>
                <circle cx={cx} cy={322} r="42" fill="#1F2937" stroke="#F59E0B" strokeWidth="7" />
                <circle cx={cx} cy={322} r="18" fill="#111827" />
              </g>
            ))}
            <rect x="30" y="298" width="682" height="24" rx="4" fill="#374151" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 pt-[72px] pb-10 w-full">
        <div className="max-w-[680px]">

          {/* Live badge */}
          <div data-a className="inline-flex items-center gap-2.5 bg-amber-400/10 border border-amber-400/28 rounded-full px-4 py-2 mb-7">
            <span className="w-2 h-2 rounded-full bg-amber-400" style={{ animation: 'pulseDot 2s ease-in-out infinite' }} />
            <span className="text-amber-300 text-[11px] font-bold tracking-[2.5px] uppercase">Now Dispatching — Mon–Sat  ·  9AM–6PM EST</span>
          </div>

          {/* H1 */}
          <h1 data-a className="leading-[0.88] tracking-wide mb-6" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
            <span className="block text-white"  style={{ fontSize: 'clamp(60px,9.5vw,116px)' }}>KEEP YOUR</span>
            <span className="block"             style={{ fontSize: 'clamp(60px,9.5vw,116px)', background: 'linear-gradient(90deg,#F59E0B 0%,#FCD34D 35%,#F59E0B 65%,#B45309 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3.5s linear infinite' }}>TRUCKS</span>
            <span className="block text-white"  style={{ fontSize: 'clamp(60px,9.5vw,116px)' }}>MOVING.</span>
          </h1>

          {/* Subhead */}
          <p data-a className="text-gray-400 text-lg lg:text-[1.18rem] leading-[1.82] max-w-[510px] mb-10 font-light">
            Professional dispatch services for owner-operators &amp; carriers across the USA.
            We find the loads, negotiate the best rates, and handle all paperwork —
            so you stay focused on the road.
          </p>

          {/* CTAs */}
          <div data-a className="flex flex-wrap gap-4 mb-12">
            <Link href="/contact" className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-[15px] px-8 py-4 rounded-xl transition-all duration-220 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(245,158,11,0.38)]">
              Start Dispatch Today <ArrowRight />
            </Link>
            <Link href="/services" className="inline-flex items-center gap-2.5 border border-white/20 hover:border-amber-400/50 text-white hover:text-amber-300 font-semibold text-[15px] px-8 py-4 rounded-xl transition-all duration-220 hover:bg-amber-400/05">
              See Our Services
            </Link>
          </div>

          {/* Trust pills */}
          <ul data-a className="flex flex-wrap gap-x-6 gap-y-2 list-none">
            {['No hidden fees', 'Dedicated dispatcher', 'Start within 24 hours'].map(t => (
              <li key={t} className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Stats strip */}
        <div data-a className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden border border-white/[0.07]">
          {STATS.map((s, i) => (
            <div key={i} className="group bg-white/[0.03] hover:bg-amber-400/[0.06] transition-colors duration-300 px-7 py-7 border-r border-white/[0.06] last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r">
              <div className="text-white group-hover:text-amber-400 transition-colors duration-300 leading-none tracking-wide mb-1.5" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,5vw,54px)' }}>{s.value}</div>
              <div className="text-gray-500 text-[11px] font-semibold uppercase tracking-[1.8px]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   TRUST BAR
───────────────────────────────────────── */
function TrustBar() {
  return (
    <section className="bg-white border-y border-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <p className="text-center text-[11px] font-bold uppercase tracking-[2.5px] text-gray-400 mb-7">Trusted by carriers across the United States</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {TRUST_BADGES.map((b, i) => (
            <div key={i} className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-amber-200 hover:bg-amber-50 transition-all duration-250 cursor-default">
              <span className="text-xl">{b.icon}</span>
              <span className="text-[11px] font-semibold text-gray-500 group-hover:text-amber-800 text-center leading-snug transition-colors duration-250">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   SERVICES
───────────────────────────────────────── */
function Services() {
  return (
    <section className="py-24 lg:py-32 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="max-w-2xl mb-16">
          <SectionPill>What We Handle For You</SectionPill>
          <h2 className="leading-[0.93] mb-5 text-gray-900" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(44px,5.5vw,76px)' }}>
            EVERYTHING YOUR<br /><span className="text-amber-400">OPERATION NEEDS</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed font-light">End-to-end dispatch support — from finding the load to filing the invoice. You drive. We handle the rest.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <div key={i} className={`group relative rounded-2xl p-7 border transition-all duration-280 hover:-translate-y-1 ${s.featured ? 'bg-[#0A0A14] border-gray-800 hover:border-amber-400/40 hover:shadow-[0_24px_64px_rgba(0,0,0,0.35)]' : 'bg-gray-50 border-gray-100 hover:bg-white hover:border-amber-300 hover:shadow-[0_20px_56px_rgba(0,0,0,0.07)]'}`}>
              {s.featured && <span className="absolute top-5 right-5 text-[10px] font-bold tracking-[1.5px] uppercase bg-amber-400/10 text-amber-400 border border-amber-400/20 px-3 py-1 rounded-full">Key Differentiator</span>}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors duration-280 ${s.featured ? 'bg-amber-400/10 text-amber-400' : 'bg-white border border-gray-200 text-gray-500 group-hover:border-amber-300 group-hover:text-amber-500'}`}>{s.icon}</div>
              <h3 className={`font-semibold text-[17px] mb-2.5 ${s.featured ? 'text-white' : 'text-gray-900 group-hover:text-amber-700'} transition-colors duration-280`}>{s.title}</h3>
              <p className={`text-sm leading-relaxed mb-5 font-light ${s.featured ? 'text-gray-400' : 'text-gray-500'}`}>{s.desc}</p>
              <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${s.featured ? 'bg-amber-400/10 text-amber-400' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${s.featured ? 'bg-amber-400' : 'bg-amber-400'}`} />
                {s.tag}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-amber-600 transition-colors duration-200 group">
            View full service breakdown
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="group-hover:translate-x-1 transition-transform duration-200"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   EQUIPMENT
───────────────────────────────────────── */
function Equipment() {
  return (
    <section className="py-20 lg:py-24 bg-gray-50 border-y border-gray-100" id="equipment">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <div>
            <SectionPill>Equipment We Dispatch</SectionPill>
            <h2 className="leading-[0.93] text-gray-900" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,4.5vw,62px)' }}>
              ALL TRUCK TYPES. <span className="text-amber-400">ALL LANES.</span>
            </h2>
          </div>
          <p className="text-gray-500 text-base leading-relaxed max-w-xs font-light lg:text-right">Whether you run dry van or flatbed, we have the broker network and experience to keep you loaded.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {EQUIPMENT.map((eq, i) => (
            <div key={i} className="group flex flex-col items-center text-center bg-white border border-gray-100 rounded-2xl px-4 py-7 cursor-default transition-all duration-280 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_20px_48px_rgba(0,0,0,0.07)]">
              <div className="text-[36px] mb-3 group-hover:scale-110 transition-transform duration-250">{eq.emoji}</div>
              <div className="text-gray-900 font-semibold text-sm mb-1.5 group-hover:text-amber-700 transition-colors duration-250">{eq.name}</div>
              <div className="text-gray-400 text-[11px] leading-snug">{eq.desc}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">Operating across <span className="font-semibold text-gray-700">48 states</span> — serving owner-operators, small fleets &amp; independent carriers.</p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────── */
function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-xl mx-auto mb-20">
          <SectionPill>How It Works</SectionPill>
          <h2 className="leading-[0.93] mb-5 text-gray-900" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(42px,5vw,72px)' }}>
            FROM SIGN-UP TO<br /><span className="text-amber-400">FIRST LOAD IN 24H</span>
          </h2>
          <p className="text-gray-500 text-base leading-relaxed font-light">Our onboarding is straightforward by design. We cut the red tape so you can start earning faster.</p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-[56px] left-[calc(10%+52px)] right-[calc(10%+52px)] h-[1px]" style={{ background: 'linear-gradient(to right,#FDE68A,#F59E0B,#FDE68A)' }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-4">
            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="relative z-10 w-[112px] h-[112px] rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mb-6 shadow-sm group-hover:border-amber-400 group-hover:shadow-[0_0_0_6px_rgba(245,158,11,0.08)] transition-all duration-300">
                  <span className="text-amber-400 leading-none tracking-wide" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36 }}>{step.n}</span>
                </div>
                <h3 className="text-gray-900 font-semibold text-[15px] mb-2 group-hover:text-amber-700 transition-colors duration-300">{step.title}</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed font-light max-w-[170px]">{step.desc}</p>
                {step.docs && (
                  <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                    {step.docs.map(d => <span key={d} className="text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-0.5 rounded-full">{d}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/contact" className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-[15px] px-9 py-4 rounded-xl transition-all duration-220 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(245,158,11,0.35)]">
            Begin Onboarding Now <ArrowRight />
          </Link>
          <p className="text-gray-400 text-sm mt-3">No commitment required. Talk to a dispatcher first.</p>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   WHY US  (dark section)
───────────────────────────────────────── */
function WhyUs() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A14] overflow-hidden" id="why-us">
      <div className="absolute inset-0 opacity-[0.17]" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.1) 1px,transparent 1px)', backgroundSize: '44px 44px' }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(ellipse,rgba(245,158,11,0.06) 0%,transparent 65%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/22 rounded-full px-4 py-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-amber-300 text-[11px] font-bold tracking-[2px] uppercase">Why Choose AJAX</span>
            </div>
            <h2 className="text-white leading-[0.93]" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(42px,5.5vw,78px)' }}>
              THE DISPATCH<br />PARTNER YOU<br /><span className="text-amber-400">ACTUALLY NEED.</span>
            </h2>
          </div>
          <div>
            <p className="text-gray-400 text-lg leading-relaxed font-light mb-8">Most carriers waste hours each week chasing loads, fighting for fair rates, and drowning in broker paperwork. AJAX Dispatch eliminates all of that — putting more money in your pocket and more miles on your odometer.</p>
            <div className="flex items-center gap-8">
              {[{ v: '$2.8', u: 'avg / mile' }, { v: '24h', u: 'to first load' }, { v: '98%', u: 'on-time rate' }].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-amber-400 leading-none" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 38 }}>{s.v}</div>
                  <div className="text-gray-600 text-[10px] uppercase tracking-[1.5px] mt-1 font-semibold">{s.u}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REASONS.map((r, i) => (
            <div key={i} className="group flex gap-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:bg-amber-400/[0.04] hover:border-amber-400/20 transition-all duration-280 hover:-translate-y-0.5">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-400/08 border border-amber-400/14 flex items-center justify-center text-amber-400 group-hover:bg-amber-400/15 transition-colors duration-280">{r.icon}</div>
              <div>
                <h3 className="text-white font-semibold text-[14px] mb-1.5 group-hover:text-amber-300 transition-colors duration-280">{r.title}</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed font-light">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────── */
function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50 border-t border-gray-100" id="testimonials">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-lg mx-auto mb-16">
          <SectionPill>Carrier Reviews</SectionPill>
          <h2 className="leading-[0.93] mb-4 text-gray-900" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,4.5vw,64px)' }}>
            CARRIERS LOVE<br /><span className="text-amber-400">WORKING WITH US</span>
          </h2>
          <p className="text-gray-500 text-base font-light">Real results from real owner-operators across the USA.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div key={i} className="group bg-white border border-gray-100 rounded-2xl p-7 flex flex-col hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_24px_60px_rgba(0,0,0,0.07)] transition-all duration-280">
              <Stars n={r.rating} />
              <blockquote className="flex-1 mt-5 mb-6">
                <p className="text-gray-600 text-[15px] leading-relaxed font-light italic">&ldquo;{r.quote}&rdquo;</p>
              </blockquote>
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${r.color}`}>{r.initials}</div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">{r.name}</div>
                  <div className="text-gray-400 text-[12px]">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <Stars n={5} />
          <span className="text-gray-500 text-sm"><span className="font-semibold text-gray-900">4.9 / 5</span> — based on 120+ carrier reviews</span>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────── */
function CTABanner() {
  return (
    <section className="relative py-24 lg:py-32 bg-amber-400 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }} />
      <div className="absolute -left-20 top-0 bottom-0 w-[38%] bg-black/08" style={{ clipPath: 'polygon(0 0,80% 0,100% 100%,0 100%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-5 lg:px-10 text-center">
        <p className="text-amber-900 text-[11px] font-bold tracking-[3px] uppercase mb-4">Ready to Maximize Your Revenue?</p>
        <h2 className="text-[#0A0A14] leading-[0.9] mb-6" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(48px,7vw,96px)' }}>
          LET&apos;S GET YOUR<br />TRUCK LOADED.
        </h2>
        <p className="text-amber-900 text-lg leading-relaxed max-w-xl mx-auto mb-10 font-medium">
          Join 500+ carriers who trust AJAX Dispatch to keep their trucks moving and their revenue growing. Your first load can be booked within 24 hours.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <Link href="/contact" className="inline-flex items-center gap-2.5 bg-[#0A0A14] hover:bg-gray-800 text-white font-bold text-[15px] px-9 py-4 rounded-xl transition-all duration-220 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(0,0,0,0.28)]">
            Get Dispatched Today <ArrowRight />
          </Link>
          <a href="tel:+18554794089" className="inline-flex items-center gap-2.5 bg-black/10 hover:bg-black/18 text-[#0A0A14] font-bold text-[15px] px-8 py-4 rounded-xl transition-all duration-200">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
            +1 (855) 479-4089
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-amber-900 text-sm font-medium">
          {['No long-term contracts', 'Start within 24 hours', 'Dedicated dispatcher assigned', 'Mon–Sat support'].map(item => (
            <div key={item} className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
const FOOTER_LINKS = {
  Company:  [{ label: 'About Us', href: '/about' }, { label: 'Careers', href: '/careers' }, { label: 'Contact', href: '/contact' }],
  Services: [{ label: 'Load Searching', href: '/services' }, { label: 'Rate Negotiation', href: '/services' }, { label: 'Broker Comms', href: '/services' }, { label: 'Route Planning', href: '/services' }, { label: 'Documentation', href: '/services' }],
  Equipment:[{ label: 'Dry Van', href: '/services' }, { label: 'Reefer', href: '/services' }, { label: 'Flatbed', href: '/services' }, { label: 'Step Deck', href: '/services' }, { label: 'Power Only', href: '/services' }, { label: 'Box Truck', href: '/services' }],
}

function Footer() {
  return (
    <footer className="bg-[#0A0A14] text-gray-400">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 flex items-center justify-center text-white font-black text-sm" style={{ background: '#F59E0B', clipPath: 'polygon(20% 0%,80% 0%,100% 50%,80% 100%,20% 100%,0% 50%)' }}>A</div>
              <span className="text-white" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: 3 }}>AJAX<span className="text-amber-400">.</span></span>
            </Link>
            <p className="text-[14px] leading-relaxed text-gray-500 max-w-xs mb-6 font-light">Professional truck dispatch services for owner-operators and carriers across the United States. We keep your trucks moving and your revenue growing.</p>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="tel:+18554794089"                className="flex items-center gap-2 text-gray-500 hover:text-amber-400 transition-colors duration-200"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>+1 (855) 479-4089</a>
              <a href="mailto:info@ajaxdispatch.com"     className="flex items-center gap-2 text-gray-500 hover:text-amber-400 transition-colors duration-200"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>info@ajaxdispatch.com</a>
              <span className="flex items-center gap-2 text-gray-600"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>Wyoming, United States</span>
              <span className="flex items-center gap-2 text-gray-600"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>Mon–Sat · 9:00 AM – 6:00 PM EST</span>
            </div>
          </div>
          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h3 className="text-white text-[11px] font-bold uppercase tracking-[2px] mb-5">{heading}</h3>
              <ul className="flex flex-col gap-2.5 list-none">
                {items.map(item => <li key={item.label}><Link href={item.href} className="text-[14px] text-gray-500 hover:text-amber-400 transition-colors duration-200">{item.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-gray-600">© {new Date().getFullYear()} AJAX Dispatch. All rights reserved.</p>
          <div className="flex gap-5 text-[13px]">
            <Link href="/privacy-policy"   className="text-gray-600 hover:text-amber-400 transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-gray-600 hover:text-amber-400 transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────
   ICONS
───────────────────────────────────────── */
function IconSearch() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg> }
function IconDollar() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> }
function IconChat()   { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> }
function IconFile()   { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> }
function IconRoute()  { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="3" cy="6" r="2"/><circle cx="21" cy="18" r="2"/><path d="M5.5 6H19a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 00-2 2v2"/></svg> }
function IconPerson() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
function IconMap()    { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg> }
function IconClock()  { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }

/* ─────────────────────────────────────────
   JSON-LD SCHEMA
───────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'AJAX Dispatch',
  description: 'Professional truck dispatch services for owner-operators and trucking companies across the USA.',
  url: 'https://www.ajaxdispatch.com',
  telephone: '+18554794089',
  email: 'info@ajaxdispatch.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Wyoming', addressCountry: 'US' },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '18:00' }],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '120' },
}

/* ─────────────────────────────────────────
   KEYFRAMES  (injected once)
───────────────────────────────────────── */
const KEYFRAMES = `
  @keyframes floatY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes pulseDot{ 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
`

/* ─────────────────────────────────────────
   PAGE EXPORT
───────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Navbar />

      <main>
        {/* 1 · Dark hero — first impression above the fold */}
        <Hero />
        {/* 2 · White trust bar — credibility signals */}
        <TrustBar />
        {/* 3 · White services — 6 service cards */}
        <Services />
        {/* 4 · Gray equipment — all truck types */}
        <Equipment />
        {/* 5 · White how-it-works — 5-step onboarding */}
        <HowItWorks />
        {/* 6 · Dark why-us — brand strength contrast section */}
        <WhyUs />
        {/* 7 · Gray testimonials — social proof */}
        <Testimonials />
        {/* 8 · Amber CTA banner — final conversion push */}
        <CTABanner />
      </main>

      <Footer />
    </>
  )
}