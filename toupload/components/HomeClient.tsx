'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
} from 'framer-motion'

/* ─────────────────────────────────────────
   ANIMATION PRESETS
───────────────────────────────────────── */
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = (delay = 0): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
})

function FadeSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} variants={stagger(delay)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────── */
interface ServiceItem { icon: React.ReactNode; title: string; desc: string; tag: string }
interface EquipItem   { name: string; emoji: string; desc: string }
interface StepItem    { n: string; title: string; desc: string; docs?: string[] }
interface ReasonItem  { icon: React.ReactNode; title: string; desc: string }
interface ReviewItem  { name: string; role: string; initials: string; color: string; rating: number; quote: string }

/* Hero images — all truck / highway / logistics themed */
const HERO_SLIDES = [
  { src: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=85', alt: 'Semi truck driving on open highway' },
  { src: 'https://images.unsplash.com/photo-1519003300449-424ad0405076?w=1920&q=85', alt: 'Fleet of trucks on interstate highway' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85', alt: 'Long-haul semi truck at dusk' },
  { src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=85', alt: 'Truck convoy on open road' },
]

const STATS = [
  { value: '500+',    label: 'Carriers Served'  },
  { value: '98%',     label: 'On-Time Dispatch' },
  { value: '$2.8/mi', label: 'Avg Rate Secured' },
  { value: '48',      label: 'States Covered'   },
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
  { icon: <IconSearch />, title: 'Load Searching',       desc: 'We find high-paying freight from trusted brokers on DAT, Truckstop, and all major load boards — so your truck never sits idle.',               tag: 'Best rates, every time'    },
  { icon: <IconDollar />, title: 'Rate Negotiation',     desc: 'Our dispatchers negotiate aggressively with brokers to secure the highest freight rates available for your equipment type and lane.',        tag: 'Avg. $2.80 / mile'         },
  { icon: <IconChat />,   title: 'Broker Communication', desc: 'From first contact to load confirmation, we manage all broker communication on your behalf. Zero back-and-forth for you.',                   tag: 'Zero hassle for drivers'   },
  { icon: <IconFile />,   title: 'Paperwork & Docs',     desc: 'Setup packets, rate confirmations, invoices, and billing docs — handled professionally and submitted on time, every time.',                  tag: 'Full back-office support'  },
  { icon: <IconRoute />,  title: 'Route Planning',       desc: 'Smart backhaul planning and load sequencing to reduce empty miles and keep your truck generating revenue throughout the week.',               tag: 'More miles, less deadhead' },
  { icon: <IconPerson />, title: 'Dedicated Dispatcher', desc: 'One dispatcher. One point of contact. They know your truck, your lanes, and your goals — and work every day to move you forward.',          tag: 'Your personal partner'     },
]

const EQUIPMENT: EquipItem[] = [
  { name: 'Dry Van',    emoji: '🚛', desc: 'General freight, enclosed trailer' },
  { name: 'Reefer',     emoji: '❄️', desc: 'Temperature-controlled loads'      },
  { name: 'Flatbed',    emoji: '🏗️', desc: 'Oversized & heavy cargo'           },
  { name: 'Step Deck',  emoji: '📐', desc: 'Taller freight, lower deck'        },
  { name: 'Power Only', emoji: '⚡', desc: 'Drop-and-hook, live loads'         },
  { name: 'Box Truck',  emoji: '📦', desc: 'Local & urban deliveries'          },
]

const STEPS: StepItem[] = [
  { n: '01', title: 'Submit Your Info',     desc: 'Share your company details, truck type, and preferred lanes. Takes under 5 minutes.' },
  { n: '02', title: 'Upload Documents',     desc: 'Securely upload your required carrier documents to get your account set up.', docs: ['MC Authority', 'USDOT #', 'Insurance Cert.', 'W9 Form'] },
  { n: '03', title: 'Sign Agreement',       desc: 'Review and sign a simple, transparent dispatch agreement — no long-term lock-in.' },
  { n: '04', title: 'Meet Your Dispatcher', desc: 'We assign a dedicated dispatcher who learns your schedule, goals, and preferences.' },
  { n: '05', title: 'Start Rolling',        desc: 'Your dispatcher finds loads, negotiates rates, and keeps your truck profitable.' },
]

const REASONS: ReasonItem[] = [
  { icon: <IconPerson />, title: 'One Dedicated Dispatcher',    desc: "You're never passed around. One person manages your account daily and knows your operation inside out." },
  { icon: <IconDollar />, title: 'Maximum Revenue Focus',       desc: 'Our dispatchers are motivated to get you the highest rates possible — your success is our success.' },
  { icon: <IconRoute />,  title: 'Zero Empty Miles Strategy',   desc: 'Smart backhaul planning and lane pairing keeps deadhead to an absolute minimum.' },
  { icon: <IconFile />,   title: 'Complete Paperwork Coverage', desc: 'Rate confirmations, broker packets, invoicing — handled on time so your cash flow never stalls.' },
  { icon: <IconMap />,    title: '48-State Load Network',       desc: 'Strong broker relationships and load board access across all major US freight lanes every day.' },
  { icon: <IconClock />,  title: 'Mon–Sat Availability',        desc: 'Our team is available 9AM–6PM EST, Monday through Saturday — right when freight moves.' },
]

const REVIEWS: ReviewItem[] = [
  { name: 'Marcus T.',   role: 'Owner-Operator · Dry Van · Texas',       initials: 'MT', color: 'bg-amber-100 text-amber-700',    rating: 5, quote: 'AJAX doubled my weekly revenue in the first month. My dispatcher knows exactly what I need — high rates, no drama, and loads that respect my home time. Best decision I made for my business.' },
  { name: 'Sandra R.',   role: 'Fleet Owner · 3 Trucks · Ohio',          initials: 'SR', color: 'bg-blue-100 text-blue-700',      rating: 5, quote: 'Managing three trucks and chasing brokers was exhausting. AJAX handles everything now. I check in with my dispatcher once a day and the loads are always lined up. Huge stress relief.' },
  { name: 'James K.',    role: 'Independent Driver · Flatbed · Georgia', initials: 'JK', color: 'bg-emerald-100 text-emerald-700', rating: 5, quote: "I was skeptical at first — but these guys negotiated rates I couldn't get on my own. I haven't had an empty day in three months. The paperwork coverage alone was worth switching." },
  { name: 'Darius M.',   role: 'Owner-Operator · Reefer · Illinois',     initials: 'DM', color: 'bg-purple-100 text-purple-700',  rating: 5, quote: 'I run reefer loads and the lane pairing they set up for me is incredible. Zero empty miles back from the northeast. My gross went up over $4,000 in the first four weeks.' },
  { name: 'Patricia W.', role: 'Small Fleet · 5 Trucks · California',   initials: 'PW', color: 'bg-rose-100 text-rose-700',      rating: 5, quote: 'The paperwork alone was killing me before. Now every rate con, invoice, and broker packet is handled before I even hear about it. My drivers are happier and so is my accountant.' },
  { name: 'Trevor H.',   role: 'Power Only · Step Deck · Tennessee',     initials: 'TH', color: 'bg-teal-100 text-teal-700',     rating: 5, quote: 'Switched from self-dispatching after three years and I wish I had done it sooner. The rates are consistently 20–30 cents per mile higher than what I was booking on my own.' },
]

/* ─────────────────────────────────────────
   SHARED UI
───────────────────────────────────────── */
function SectionPill({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <motion.div variants={fadeUp} className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4 ${dark ? 'bg-amber-400/10 border border-amber-400/25 text-amber-300' : 'bg-amber-50 border border-amber-200 text-amber-800'}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
      {children}
    </motion.div>
  )
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
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
   HERO — auto carousel, no buttons
───────────────────────────────────────── */
function Hero() {
  const [slide, setSlide]         = useState(0)
  const [direction, setDirection] = useState(1)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const contentY  = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3])

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1)
      setSlide(s => (s + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const slideV: Variants = {
    enter:  (d: number) => ({ x: d > 0 ? '5%' : '-5%', opacity: 0, scale: 1.04 }),
    center: { x: '0%', opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
    exit:   (d: number) => ({ x: d > 0 ? '-4%' : '4%', opacity: 0, scale: 0.98, transition: { duration: 0.7 } }),
  }

  const heroStagger: Variants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  }

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A14]">
      {/* Carousel BG */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div key={slide} custom={direction} variants={slideV} initial="enter" animate="center" exit="exit" style={{ opacity: bgOpacity }} className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO_SLIDES[slide].src} alt={HERO_SLIDES[slide].alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A14]/92 via-[#0A0A14]/65 to-[#0A0A14]/28" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14]/88 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Dot grid */}
      <div className="absolute inset-0 z-[1] opacity-[0.10]" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.15) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      {/* Amber glow */}
      <div className="absolute z-[1] left-[-60px] top-1/2 -translate-y-1/2 w-[480px] h-[480px] pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(245,158,11,0.10) 0%,transparent 70%)' }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 z-[2]" style={{ background: 'linear-gradient(to top,#0A0A14,transparent)' }} />

      {/* Slide progress dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <motion.div key={i} animate={{ width: i === slide ? 28 : 8, opacity: i === slide ? 1 : 0.35 }} transition={{ duration: 0.4 }} className="h-[3px] rounded-full bg-amber-400" />
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ y: contentY }} className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-10 pt-24 pb-16">
        <motion.div className="max-w-[680px]" variants={heroStagger} initial="hidden" animate="visible">
          {/* Live badge */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 bg-amber-400/10 border border-amber-400/28 rounded-full px-4 py-2 mb-6">
            <motion.span className="w-2 h-2 rounded-full bg-amber-400" animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
            <span className="text-amber-300 text-[11px] font-bold tracking-[2.5px] uppercase">Now Dispatching — Mon–Sat · 9AM–6PM EST</span>
          </motion.div>

          {/* H1 */}
          <motion.h1 variants={fadeUp} className="leading-[0.88] tracking-wide mb-5" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
            <span className="block text-white"  style={{ fontSize: 'clamp(52px,9vw,116px)' }}>KEEP YOUR</span>
            <span className="block" style={{ fontSize: 'clamp(52px,9vw,116px)', background: 'linear-gradient(90deg,#F59E0B,#FCD34D 35%,#F59E0B 65%,#B45309)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3.5s linear infinite' }}>TRUCKS</span>
            <span className="block text-white"  style={{ fontSize: 'clamp(52px,9vw,116px)' }}>MOVING.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p variants={fadeUp} className="text-gray-300 text-base lg:text-lg leading-[1.8] max-w-[500px] mb-8 font-light">
            Professional dispatch services for owner-operators &amp; carriers across the USA. We find the loads, negotiate the best rates, and handle all paperwork — so you stay focused on the road.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
              <Link href="/contact" className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-[15px] px-7 py-3.5 rounded-xl transition-colors duration-200 shadow-[0_6px_24px_rgba(245,158,11,0.30)]">
                Start Dispatch Today <ArrowRight />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link href="/services" className="inline-flex items-center gap-2.5 border border-white/20 hover:border-amber-400/55 text-white hover:text-amber-300 font-semibold text-[15px] px-7 py-3.5 rounded-xl transition-all duration-200 bg-white/5">
                See Our Services
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust pills */}
          <motion.ul variants={fadeUp} className="flex flex-wrap gap-x-5 gap-y-2 list-none">
            {['No hidden fees', 'Dedicated dispatcher', 'Start within 24 hours'].map(t => (
              <li key={t} className="flex items-center gap-1.5 text-sm text-gray-400 font-medium">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Stats strip */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden border border-white/[0.08] backdrop-blur-sm">
          {STATS.map((s, i) => (
            <motion.div key={i} whileHover={{ backgroundColor: 'rgba(245,158,11,0.07)' }}
              className="group bg-white/[0.04] transition-colors duration-300 px-5 py-6 lg:px-7 lg:py-7 border-r border-white/[0.06] last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r">
              <div className="text-white group-hover:text-amber-400 transition-colors duration-300 leading-none tracking-wide mb-1" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(32px,4.5vw,50px)' }}>{s.value}</div>
              <div className="text-gray-500 text-[10px] font-semibold uppercase tracking-[1.8px]">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────
   TRUST BAR
───────────────────────────────────────── */
function TrustBar() {
  return (
    <section className="bg-[#F8F7F3] border-b border-[#E8E5DE] py-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <FadeSection>
          <motion.p variants={fadeUp} className="text-center text-[10px] font-bold uppercase tracking-[2.5px] text-amber-700/65 mb-6">Trusted by carriers across the United States</motion.p>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
            {TRUST_BADGES.map((b, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -3, borderColor: '#F59E0B', backgroundColor: '#FFFBEB' }}
                className="group flex flex-col items-center gap-1.5 p-3 lg:p-4 rounded-xl bg-white border border-[#E8E5DE] shadow-sm transition-all duration-200 cursor-default">
                <span className="text-lg lg:text-xl">{b.icon}</span>
                <span className="text-[10px] lg:text-[11px] font-semibold text-gray-500 group-hover:text-amber-800 text-center leading-snug transition-colors duration-200">{b.label}</span>
              </motion.div>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   SERVICES
───────────────────────────────────────── */
function Services() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section className="bg-[#F8F7F3] border-b border-[#E8E5DE] py-16 lg:py-24" id="services">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <FadeSection className="max-w-2xl mb-12">
          <SectionPill>What We Handle For You</SectionPill>
          <motion.h2 variants={fadeUp} className="leading-[0.93] mb-4 text-gray-900" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5.5vw,74px)' }}>
            EVERYTHING YOUR<br /><span className="text-amber-500">OPERATION NEEDS</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-600 text-base lg:text-lg leading-relaxed font-light">
            End-to-end dispatch support — from finding the load to filing the invoice. You drive. We handle the rest.
          </motion.p>
        </FadeSection>

        <FadeSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <motion.div key={i} variants={scaleIn} layout onClick={() => setExpanded(expanded === i ? null : i)} whileHover={{ y: -4 }} transition={{ layout: { duration: 0.28 } }}
              className="rounded-2xl p-6 border-2 cursor-pointer bg-white border-[#E8E5DE] hover:border-amber-300 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.09)] transition-all duration-250">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-amber-50 border border-amber-200 text-amber-600">{s.icon}</div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-[16px] text-gray-900">{s.title}</h3>
                <motion.div animate={{ rotate: expanded === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="mt-0.5 flex-shrink-0 text-gray-400">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </motion.div>
              </div>
              <AnimatePresence initial={false}>
                {expanded === i && (
                  <motion.div key="open" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
                    <p className="text-sm leading-relaxed mb-4 font-light text-gray-600">{s.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              {expanded !== i && <p className="text-sm leading-relaxed mb-4 font-light text-gray-500 line-clamp-2">{s.desc}</p>}
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {s.tag}
              </div>
            </motion.div>
          ))}
        </FadeSection>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 flex justify-center">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-amber-600 transition-colors duration-200">
            View full service breakdown
            <motion.span whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}><ArrowRight size={14} /></motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   EQUIPMENT
───────────────────────────────────────── */
function Equipment() {
  const [active, setActive] = useState<string | null>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section className="bg-[#0A0A14] border-b border-white/[0.06]" id="equipment">
      {/* Parallax truck image header */}
      <div ref={imageRef} className="relative h-[220px] lg:h-[300px] overflow-hidden">
        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1519003300449-424ad0405076?w=1920&q=85" alt="Fleet of trucks on interstate highway" className="w-full h-full object-cover object-center" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A14]/55 via-transparent to-[#0A0A14]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A14]/50 to-transparent" />
        <div className="absolute inset-0 flex items-center px-5 lg:px-10">
          <FadeSection className="max-w-7xl w-full mx-auto">
            <SectionPill dark>Equipment We Dispatch</SectionPill>
            <motion.h2 variants={fadeUp} className="text-white leading-[0.93]" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,4.5vw,60px)' }}>
              ALL TRUCK TYPES. <span className="text-amber-400">ALL LANES.</span>
            </motion.h2>
          </FadeSection>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-5 lg:px-10 pt-2 pb-16 lg:pb-24">
        <FadeSection className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {EQUIPMENT.map((eq, i) => (
            <motion.div key={i} variants={fadeUp}
              onHoverStart={() => setActive(eq.name)} onHoverEnd={() => setActive(null)}
              onTap={() => setActive(active === eq.name ? null : eq.name)}
              animate={{
                scale:           active === eq.name ? 1.06 : active !== null ? 0.96 : 1,
                borderColor:     active === eq.name ? '#F59E0B' : 'rgba(255,255,255,0.08)',
                backgroundColor: active === eq.name ? 'rgba(245,158,11,0.07)' : 'rgba(255,255,255,0.03)',
              }}
              transition={{ type: 'spring', stiffness: 340, damping: 22 }}
              className="flex flex-col items-center text-center border-2 rounded-2xl px-3 py-6 cursor-pointer">
              <motion.div animate={{ scale: active === eq.name ? 1.25 : 1 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="text-[30px] lg:text-[36px] mb-2">{eq.emoji}</motion.div>
              <div className={`font-semibold text-[13px] mb-1 transition-colors duration-200 ${active === eq.name ? 'text-amber-400' : 'text-gray-200'}`}>{eq.name}</div>
              <div className="text-gray-500 text-[10px] leading-snug">{eq.desc}</div>
            </motion.div>
          ))}
        </FadeSection>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-sm text-gray-500">
          Operating across <span className="font-semibold text-gray-300">48 states</span> — serving owner-operators, small fleets &amp; independent carriers.
        </motion.p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────── */
function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="py-16 lg:py-24 bg-[#F8F7F3] border-b border-[#E8E5DE]" id="how-it-works">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <FadeSection className="text-center max-w-xl mx-auto mb-14">
          <SectionPill>How It Works</SectionPill>
          <motion.h2 variants={fadeUp} className="leading-[0.93] mb-4 text-gray-900" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,5vw,70px)' }}>
            FROM SIGN-UP TO<br /><span className="text-amber-500">FIRST LOAD IN 24H</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-600 text-base leading-relaxed font-light">Our onboarding is straightforward by design. We cut the red tape so you can start earning faster.</motion.p>
        </FadeSection>

        <div className="relative">
          <div className="hidden lg:block absolute top-[56px] left-[calc(10%+52px)] right-[calc(10%+52px)] h-[1px] bg-[#E8E5DE]">
            <motion.div className="h-full bg-amber-400 origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: activeStep / (STEPS.length - 1) }} transition={{ duration: 0.5, ease: 'easeOut' }} />
          </div>

          <FadeSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {STEPS.map((step, i) => (
              <motion.div key={i} variants={fadeUp} onClick={() => setActiveStep(i)} className="flex flex-col items-center text-center cursor-pointer">
                <motion.div animate={{ borderColor: i <= activeStep ? '#F59E0B' : '#E8E5DE', boxShadow: i === activeStep ? '0 0 0 8px rgba(245,158,11,0.10)' : '0 0 0 0px transparent' }} transition={{ duration: 0.3 }}
                  className="relative z-10 w-[100px] h-[100px] rounded-full bg-white border-2 flex items-center justify-center mb-5 shadow-md">
                  <motion.span animate={{ color: i <= activeStep ? '#F59E0B' : '#9CA3AF' }} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32 }}>{step.n}</motion.span>
                  <AnimatePresence>
                    {i < activeStep && (
                      <motion.div key="check" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.h3 animate={{ color: i <= activeStep ? '#B45309' : '#111827' }} className="font-semibold text-[14px] mb-2">{step.title}</motion.h3>
                <AnimatePresence mode="wait">
                  {i === activeStep ? (
                    <motion.div key="desc" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}>
                      <p className="text-gray-600 text-[12px] leading-relaxed font-light max-w-[160px]">{step.desc}</p>
                      {step.docs && (
                        <div className="mt-2 flex flex-wrap justify-center gap-1">
                          {step.docs.map(d => <span key={d} className="text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">{d}</span>)}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.p key="short" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-400 text-[11px] max-w-[130px]">{step.title}</motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </FadeSection>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex gap-2">
            {STEPS.map((_, i) => (
              <button key={i} onClick={() => setActiveStep(i)} className={`w-2 h-2 rounded-full transition-all duration-200 ${i === activeStep ? 'bg-amber-400 scale-125' : i < activeStep ? 'bg-amber-200' : 'bg-gray-200'}`} />
            ))}
          </div>
          <div className="flex gap-2.5">
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setActiveStep(s => Math.max(0, s - 1))} disabled={activeStep === 0} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 disabled:opacity-30 transition-all">← Back</motion.button>
            {activeStep < STEPS.length - 1
              ? <motion.button whileTap={{ scale: 0.95 }} onClick={() => setActiveStep(s => Math.min(STEPS.length - 1, s + 1))} className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-bold transition-all">Next →</motion.button>
              : <Link href="/contact" className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-bold transition-all inline-flex items-center gap-1.5">Begin Onboarding <ArrowRight size={13} /></Link>
            }
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   WHY US
───────────────────────────────────────── */
function WhyUs() {
  const imageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section className="relative bg-[#0A0A14] overflow-hidden" id="why-us">
      <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.1) 1px,transparent 1px)', backgroundSize: '44px 44px' }} />

      {/* Parallax truck photo */}
      <div ref={imageRef} className="relative h-[240px] lg:h-[320px] overflow-hidden">
        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=85" alt="Semi truck on open highway" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A14]/50 via-[#0A0A14]/25 to-[#0A0A14]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A14]/50 to-transparent" />
        {/* Stat chips */}
        <div className="absolute bottom-6 right-4 lg:right-10 flex gap-2.5">
          {[{ v: '$2.8/mi', u: 'avg rate' }, { v: '98%', u: 'on-time' }].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 * i, duration: 0.4 }}
              className="bg-black/60 backdrop-blur-md border border-white/12 rounded-xl px-4 py-2.5 text-center">
              <div className="text-amber-400 leading-none" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26 }}>{s.v}</div>
              <div className="text-gray-400 text-[9px] uppercase tracking-[1.5px] mt-0.5 font-semibold">{s.u}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 pt-2 pb-16 lg:pb-24">
        <FadeSection className="grid lg:grid-cols-2 gap-10 items-end mb-12">
          <div>
            <SectionPill dark>Why Choose AJAX</SectionPill>
            <motion.h2 variants={fadeUp} className="text-white leading-[0.93]" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,5.5vw,76px)' }}>
              THE DISPATCH<br />PARTNER YOU<br /><span className="text-amber-400">ACTUALLY NEED.</span>
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <p className="text-gray-400 text-base lg:text-lg leading-relaxed font-light mb-7">Most carriers waste hours each week chasing loads, fighting for fair rates, and drowning in broker paperwork. AJAX eliminates all of that — putting more money in your pocket and more miles on your odometer.</p>
            <div className="flex items-center gap-7">
              {[{ v: '24h', u: 'to first load' }, { v: '500+', u: 'carriers served' }, { v: '0', u: 'hidden fees' }].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className="text-center">
                  <div className="text-amber-400 leading-none" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 34 }}>{s.v}</div>
                  <div className="text-gray-600 text-[9px] uppercase tracking-[1.5px] mt-1 font-semibold">{s.u}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </FadeSection>

        <FadeSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {REASONS.map((r, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y: -3, borderColor: 'rgba(245,158,11,0.32)' }}
              className="flex gap-3.5 bg-white/[0.03] border border-white/[0.09] rounded-2xl p-5 transition-all duration-250">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">{r.icon}</div>
              <div>
                <h3 className="text-white font-semibold text-[13px] mb-1">{r.title}</h3>
                <p className="text-gray-500 text-[12px] leading-relaxed font-light">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </FadeSection>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   TESTIMONIALS — full-width 3-card carousel
───────────────────────────────────────── */
function Testimonials() {
  const [current, setCurrent]     = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return
    const id = setInterval(() => {
      setDirection(1)
      setCurrent(c => (c + 1) % REVIEWS.length)
    }, 4500)
    return () => clearInterval(id)
  }, [isHovered])

  const paginate = (dir: number) => {
    setDirection(dir)
    setCurrent(c => (c + dir + REVIEWS.length) % REVIEWS.length)
  }

  return (
    <section className="py-14 lg:py-20 bg-[#F8F7F3] border-b border-[#E8E5DE]" id="testimonials">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Heading — bigger, tighter gap below */}
        <FadeSection className="text-center mb-10">
          <SectionPill>Carrier Reviews</SectionPill>
          <motion.h2 variants={fadeUp} className="leading-[0.93] mb-3 text-gray-900" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(44px,5.5vw,80px)' }}>
            CARRIERS LOVE<br /><span className="text-amber-500">WORKING WITH US</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-base font-light">Real results from real owner-operators across the USA.</motion.p>
        </FadeSection>

        {/* 3-card full-width layout — no max-width wrapper */}
        <div className="w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>

          {/* Cards row — hidden on mobile (show single), visible md+ */}
          <div className="hidden md:grid grid-cols-3 gap-5 w-full">
            {[-1, 0, 1].map(offset => {
              const idx      = (current + offset + REVIEWS.length) % REVIEWS.length
              const rv       = REVIEWS[idx]
              const isCenter = offset === 0
              return (
                <motion.div
                  key={`${current}-${offset}`}
                  animate={{ opacity: isCenter ? 1 : 0.42, scale: isCenter ? 1 : 0.97 }}
                  transition={{ duration: 0.38 }}
                  onClick={() => { if (offset !== 0) paginate(offset as 1 | -1) }}
                  className={`w-full bg-white rounded-2xl p-7 flex flex-col ${isCenter ? 'border-2 border-amber-300 shadow-[0_6px_32px_rgba(0,0,0,0.09)]' : 'border-2 border-[#E8E5DE] shadow-sm cursor-pointer'}`}
                >
                  <Stars n={rv.rating} />
                  <blockquote className="flex-1 mt-4 mb-6">
                    <p className="text-gray-700 text-[15px] leading-[1.75] font-light italic">&ldquo;{rv.quote}&rdquo;</p>
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${rv.color}`}>{rv.initials}</div>
                    <div>
                      <div className="text-gray-900 font-semibold text-[14px]">{rv.name}</div>
                      <div className="text-gray-400 text-[12px]">{rv.role}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile single card */}
          <div className="md:hidden w-full">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50, transition: { duration: 0.25 } }}
                className="w-full bg-white border-2 border-amber-300 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
              >
                <Stars n={REVIEWS[current].rating} />
                <blockquote className="mt-4 mb-5">
                  <p className="text-gray-700 text-[15px] leading-[1.75] font-light italic">&ldquo;{REVIEWS[current].quote}&rdquo;</p>
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${REVIEWS[current].color}`}>{REVIEWS[current].initials}</div>
                  <div>
                    <div className="text-gray-900 font-semibold text-[14px]">{REVIEWS[current].name}</div>
                    <div className="text-gray-400 text-[12px]">{REVIEWS[current].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-7">
            <motion.button whileTap={{ scale: 0.93 }} onClick={() => paginate(-1)}
              className="w-9 h-9 rounded-full border-2 border-[#E8E5DE] flex items-center justify-center text-gray-400 hover:border-amber-400 hover:text-amber-500 transition-all duration-200">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
            </motion.button>

            <div className="flex items-center gap-1.5">
              {REVIEWS.map((_, i) => (
                <motion.button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  animate={{ width: i === current ? 22 : 7, opacity: i === current ? 1 : 0.32 }} transition={{ duration: 0.28 }}
                  className="h-[3px] rounded-full bg-amber-400" />
              ))}
            </div>

            <motion.button whileTap={{ scale: 0.93 }} onClick={() => paginate(1)}
              className="w-9 h-9 rounded-full border-2 border-[#E8E5DE] flex items-center justify-center text-gray-400 hover:border-amber-400 hover:text-amber-500 transition-all duration-200">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
            </motion.button>
          </div>

          <p className="text-center text-[11px] text-gray-400 mt-2.5 font-medium tracking-wide">{current + 1} / {REVIEWS.length}</p>
        </div>

        {/* Rating bar */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Stars n={5} />
          <span className="text-gray-500 text-sm"><span className="font-semibold text-gray-900">4.9 / 5</span> — based on 120+ carrier reviews</span>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   CTA BANNER — clean flat amber
───────────────────────────────────────── */
function CTABanner() {
  return (
    <section className="relative py-16 lg:py-24 bg-amber-400 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }} />

      <FadeSection className="relative z-10 max-w-4xl mx-auto px-5 lg:px-10 text-center">
        <motion.p variants={fadeIn} className="text-amber-900 text-[10px] font-bold tracking-[3px] uppercase mb-3">Ready to Maximize Your Revenue?</motion.p>
        <motion.h2 variants={fadeUp} className="text-[#0A0A14] leading-[0.9] mb-5" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(44px,7vw,92px)' }}>
          LET&apos;S GET YOUR<br />TRUCK LOADED.
        </motion.h2>
        <motion.p variants={fadeUp} className="text-amber-900 text-base lg:text-lg leading-relaxed max-w-xl mx-auto mb-8 font-medium">
          Join 500+ carriers who trust AJAX Dispatch to keep their trucks moving and their revenue growing. Your first load can be booked within 24 hours.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
            <Link href="/contact" className="inline-flex items-center gap-2.5 bg-[#0A0A14] hover:bg-gray-800 text-white font-bold text-[15px] px-8 py-3.5 rounded-xl transition-colors duration-200 shadow-[0_6px_28px_rgba(0,0,0,0.22)]">
              Get Dispatched Today <ArrowRight />
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <a href="tel:+18554794089" className="inline-flex items-center gap-2.5 bg-black/10 hover:bg-black/18 text-[#0A0A14] font-bold text-[15px] px-7 py-3.5 rounded-xl transition-all duration-200">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              +1 (855) 479-4089
            </a>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 text-amber-900 text-[13px] font-medium">
          {['No long-term contracts', 'Start within 24 hours', 'Dedicated dispatcher assigned', 'Mon–Sat support'].map(item => (
            <div key={item} className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              {item}
            </div>
          ))}
        </motion.div>
      </FadeSection>
    </section>
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
   KEYFRAMES
───────────────────────────────────────── */
const KEYFRAMES = `@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}`

/* ─────────────────────────────────────────
   EXPORT
───────────────────────────────────────── */
export function HomeClient() {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Equipment />
        <HowItWorks />
        <WhyUs />
        <Testimonials />
        <CTABanner />
      </main>
    </>
  )
}