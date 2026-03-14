'use client'

// ─── app/careers/page.tsx ─────────────────────────────────────────────────────
// Design: identical tokens to services-page.tsx
//  • Hero: bg-[#0A0A14] + crosshatch + dot-grid + AJAX watermark — no image
//  • Perks: bg-[#F8F7F3] cream cards
//  • Values: bg-[#0A0A14] dark feature grid (replaces open positions)
//  • Application form: bg-[#F8F7F3] — sends to email via /api/careers
//  • CTA: flat amber, no tilt, same as services page
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  useInView,
  AnimatePresence,
  type Variants,
} from 'framer-motion'

/* ─────────────────────────────────────────
   ANIMATION PRESETS  (identical to services page)
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

function FadeSection({ children, className, delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} variants={stagger(delay)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}

function SectionPill({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <motion.div variants={fadeUp} className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4 ${
      dark
        ? 'bg-amber-400/10 border border-amber-400/25 text-amber-300'
        : 'bg-amber-50 border border-amber-200 text-amber-800'
    }`}>
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
      {children}
    </motion.div>
  )
}

function ArrowRight({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.8" strokeLinecap="round" className="flex-shrink-0 mt-0.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const PERKS = [
  {
    icon: <IconRemote />,
    title: '100% Remote',
    desc: 'Work from anywhere in the US. No commute, no office politics, no dress code.',
    tag: 'Work anywhere',
  },
  {
    icon: <IconGrowth />,
    title: 'Growth Focused',
    desc: 'We promote from within. High performers move fast at AJAX — we have a clear path from coordinator to lead dispatcher.',
    tag: 'Promote from within',
  },
  {
    icon: <IconClock />,
    title: 'Great Hours',
    desc: 'Monday to Saturday, 9AM–6PM EST. Sundays always off. No late nights, no surprise shifts.',
    tag: 'Mon–Sat only',
  },
  {
    icon: <IconTeam />,
    title: 'Small, Tight-Knit Team',
    desc: 'You\'re not a number here. Your work makes a direct, visible difference every single day.',
    tag: 'Real impact',
  },
  {
    icon: <IconImpact />,
    title: 'Carrier Impact',
    desc: 'You\'re directly helping trucking business owners grow, earn more, and run smoother operations.',
    tag: 'Meaningful work',
  },
  {
    icon: <IconExpert />,
    title: 'Industry Expertise',
    desc: 'Learn from experienced dispatch professionals daily. We cross-train and share knowledge constantly.',
    tag: 'Learn every day',
  },
]

const VALUES = [
  {
    n: '01',
    title: 'Carriers Come First',
    desc: 'Every decision we make is filtered through one question: does this help our carriers earn more and drive better? That\'s it.',
  },
  {
    n: '02',
    title: 'Extreme Ownership',
    desc: 'We don\'t blame brokers, load boards, or the market. We find solutions and we own the outcome for every carrier on our roster.',
  },
  {
    n: '03',
    title: 'Relentless on Rates',
    desc: 'The easiest thing to do is accept the first offer. We don\'t. We push until we get a rate that actually moves the needle.',
  },
  {
    n: '04',
    title: 'No Red Tape',
    desc: 'Flat team, fast decisions, zero bureaucracy. If something isn\'t working, we change it — fast.',
  },
  {
    n: '05',
    title: 'Transparent Always',
    desc: 'With our carriers, and with each other. No hidden fees, no hidden agendas, no surprises ever.',
  },
  {
    n: '06',
    title: 'Keep Improving',
    desc: 'We track our rates, our on-time numbers, and our carrier satisfaction weekly. Always asking: how do we get better?',
  },
]

const ROLE_OPTIONS = [
  'Truck Dispatcher',
  'Freight Coordinator',
  'Customer Support Specialist',
  'Other / Not Listed',
]

const EXP_OPTIONS = [
  'Less than 1 year',
  '1–2 years',
  '3–5 years',
  '5+ years',
]

/* ─────────────────────────────────────────
   FORM STATE
───────────────────────────────────────── */
type FormState = {
  name: string
  email: string
  phone: string
  role: string
  experience: string
  message: string
}

const EMPTY_FORM: FormState = {
  name: '', email: '', phone: '', role: '', experience: '', message: '',
}

/* ─────────────────────────────────────────
   HERO — texture bg, NO image/video
   Identical approach to services-page hero
───────────────────────────────────────── */
function Hero() {
  const heroStagger: Variants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  }

  return (
    <section className="relative min-h-[82vh] flex items-center overflow-hidden bg-[#0A0A14]">

      {/* Layer 1: cross-hatch texture */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Layer 2: fine dot grid */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.09]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
        }}
      />

      {/* Layer 3: "AJAX" watermark */}
      <div className="absolute z-[3] inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="block text-center leading-[0.80]"
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 'clamp(100px, 20vw, 320px)',
            color: 'rgba(255,255,255,0.025)',
          }}
        >
          AJAX
        </span>
        <span
          className="block text-center leading-[0.80]"
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 'clamp(60px, 12vw, 190px)',
            color: 'rgba(255,255,255,0.025)',
          }}
        >
          CAREERS
        </span>
      </div>

      {/* Layer 4: amber glow — left */}
      <div
        className="absolute z-[4] -left-24 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.11) 0%, rgba(245,158,11,0.03) 44%, transparent 66%)' }}
      />

      {/* Layer 5: amber glow — top right */}
      <div
        className="absolute z-[4] right-[-80px] top-[-60px] w-[440px] h-[440px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 62%)' }}
      />

      {/* Top amber hairline */}
      <div className="absolute top-0 inset-x-0 h-[1px] z-10 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

      {/* Bottom white blend — deep smooth fade into next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-44 z-[8] pointer-events-none"
        style={{ background: 'linear-gradient(to top,#F8F7F3 0%,#F8F7F3 15%,rgba(248,247,243,0.85) 40%,rgba(248,247,243,0.3) 70%,transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-10 pt-28 pb-28 lg:pb-36">
        <motion.div variants={heroStagger} initial="hidden" animate="visible">

          {/* Two-col: heading left, desc + CTA right */}
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 items-end mb-14">

            {/* Left — heading */}
            <div>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-2 rounded-full mb-6">
                <motion.span
                  className="w-2 h-2 rounded-full bg-amber-400"
                  animate={{ scale: [1, 1.55, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                We&apos;re Hiring
              </motion.div>

              <motion.h1 variants={fadeUp} className="leading-[0.88] tracking-wide" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
                <span className="block text-white" style={{ fontSize: 'clamp(56px,8.5vw,114px)' }}>JOIN THE</span>
                <span
                  className="block"
                  style={{
                    fontSize: 'clamp(56px,8.5vw,114px)',
                    background: 'linear-gradient(90deg,#F59E0B 0%,#FCD34D 35%,#F59E0B 65%,#B45309 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shimmer 3.5s linear infinite',
                  }}
                >
                  AJAX TEAM.
                </span>
              </motion.h1>
            </div>

            {/* Right — desc + CTAs */}
            <div>
              <motion.p variants={fadeUp} className="text-gray-300 text-base lg:text-[17px] leading-[1.82] mb-8 font-light">
                We&apos;re building the best dispatch team in the country. If you&apos;re driven, experienced, and passionate about logistics — we want to hear from you.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-7">
                <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
                  <a href="#apply" className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-[15px] px-7 py-3.5 rounded-xl transition-colors duration-200 shadow-[0_6px_24px_rgba(245,158,11,0.28)]">
                    Apply Now <ArrowRight />
                  </a>
                </motion.div>
                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                  <a href="#perks" className="inline-flex items-center gap-2.5 border border-white/18 hover:border-amber-400/50 text-white hover:text-amber-300 font-semibold text-[15px] px-7 py-3.5 rounded-xl transition-all duration-200 bg-white/[0.04]">
                    Why Work Here
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                  </a>
                </motion.div>
              </motion.div>

              <motion.ul variants={fadeUp} className="flex flex-wrap gap-x-5 gap-y-2 list-none">
                {['100% Remote', 'Mon–Sat schedule', 'Promote from within'].map(t => (
                  <li key={t} className="flex items-center gap-1.5 text-[13px] text-gray-500 font-medium">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.8" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                    {t}
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>

          {/* Stats strip */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden border border-white/[0.07]"
          >
            {[
              { value: '500+',   label: 'Carriers We Serve'   },
              { value: '100%',   label: 'Remote Positions'    },
              { value: 'Mon–Sat', label: 'Work Schedule'      },
              { value: '24h',    label: 'Onboard to First Load' },
            ].map((s, i) => (
              <motion.div key={i} whileHover={{ backgroundColor: 'rgba(245,158,11,0.07)' }}
                className="group bg-white/[0.03] transition-colors duration-300 px-6 py-6 lg:px-8 lg:py-7 border-r border-white/[0.06] last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r">
                <div className="text-white group-hover:text-amber-400 transition-colors duration-300 leading-none tracking-wide mb-1" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(28px,4vw,46px)' }}>{s.value}</div>
                <div className="text-gray-500 text-[10px] font-semibold uppercase tracking-[1.8px]">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   PERKS — cream section, 6 cards
───────────────────────────────────────── */
function Perks() {
  return (
    <section className="bg-[#F8F7F3] border-b border-[#E8E5DE] py-16 lg:py-24" id="perks">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        <FadeSection className="max-w-2xl mb-12">
          <SectionPill>Why Work Here</SectionPill>
          <motion.h2 variants={fadeUp} className="leading-[0.92] mb-4 text-gray-900" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5vw,74px)' }}>
            WHAT YOU<br /><span className="text-amber-500">GET AT AJAX</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-600 text-base lg:text-[17px] leading-relaxed font-light">
            We&apos;re a lean, fast-moving team that takes care of its people. Here&apos;s what working at AJAX actually looks like.
          </motion.p>
        </FadeSection>

        <FadeSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PERKS.map((p, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -5, borderColor: '#FCD34D' }}
              className="bg-white border-2 border-[#E8E5DE] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-250"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-amber-50 border border-amber-200 text-amber-600 mb-5">
                {p.icon}
              </div>
              <h3 className="font-semibold text-[16px] text-gray-900 mb-2">{p.title}</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed font-light mb-4">{p.desc}</p>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] uppercase text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                <span className="w-1 h-1 rounded-full bg-amber-400" />
                {p.tag}
              </div>
            </motion.div>
          ))}
        </FadeSection>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   VALUES — dark section (replaces open positions)
───────────────────────────────────────── */
function Values() {
  return (
    <section className="bg-[#0A0A14] border-b border-white/[0.06] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        <FadeSection className="grid lg:grid-cols-[1fr_380px] gap-10 items-end mb-14">
          <div>
            <SectionPill dark>How We Operate</SectionPill>
            <motion.h2 variants={fadeUp} className="leading-[0.92] text-white" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5vw,74px)' }}>
              THE VALUES THAT<br /><span className="text-amber-400">DRIVE EVERYTHING.</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="text-gray-400 text-base leading-relaxed font-light">
            We hire people who believe in these principles — not just candidates who can recite them in an interview.
          </motion.p>
        </FadeSection>

        <FadeSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VALUES.map((v, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: 'rgba(245,158,11,0.32)' }}
              className="bg-white/[0.03] border border-white/[0.09] rounded-2xl p-6 transition-all duration-250"
            >
              <div
                className="text-amber-400 leading-none mb-4"
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 38 }}
              >
                {v.n}
              </div>
              <h3 className="text-white font-semibold text-[15px] mb-2">{v.title}</h3>
              <p className="text-gray-500 text-[13px] leading-relaxed font-light">{v.desc}</p>
            </motion.div>
          ))}
        </FadeSection>

        {/* Inline dark CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-7 py-6 flex flex-col md:flex-row md:items-center justify-between gap-5"
        >
          <div>
            <p className="text-white font-semibold text-[15px] mb-1">These values sound like you?</p>
            <p className="text-gray-500 text-[13px] font-light">We&apos;d love to hear from you — even if you don&apos;t see a listed role that fits perfectly.</p>
          </div>
          <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }} className="flex-shrink-0">
            <a href="#apply" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-sm px-6 py-3 rounded-xl transition-colors duration-200 shadow-[0_4px_18px_rgba(245,158,11,0.28)]">
              Apply Now <ArrowRight size={14} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   APPLICATION FORM — cream bg, sends to email
   POST → /api/careers  (Next.js API route)
   Falls back gracefully if API unavailable.
───────────────────────────────────────── */
function ApplicationForm() {
  const [form, setForm]       = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors]   = useState<Partial<FormState>>({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus]   = useState<'idle' | 'success' | 'error'>('idle')

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const validate = (): boolean => {
    const e: Partial<FormState> = {}
    if (!form.name.trim())    e.name    = 'Required'
    if (!form.email.trim())   e.email   = 'Required'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.role)           e.role    = 'Required'
    if (!form.message.trim()) e.message = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch('/api/careers', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm(EMPTY_FORM)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  /* shared input classes */
  const input = (hasErr: boolean) =>
    `w-full bg-white border-2 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none transition-colors duration-200 ${
      hasErr
        ? 'border-red-300 focus:border-red-400'
        : 'border-[#E8E5DE] focus:border-amber-400'
    }`

  return (
    <section className="bg-[#F8F7F3] border-b border-[#E8E5DE] py-16 lg:py-24" id="apply">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Section heading */}
        <FadeSection className="max-w-2xl mb-12">
          <SectionPill>Join the Team</SectionPill>
          <motion.h2 variants={fadeUp} className="leading-[0.92] mb-4 text-gray-900" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5vw,74px)' }}>
            APPLY TO<br /><span className="text-amber-500">AJAX DISPATCH</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-600 text-base lg:text-[17px] leading-relaxed font-light">
            Don&apos;t see a perfect match? Apply anyway — we&apos;re always looking for great people who fit our culture.
          </motion.p>
        </FadeSection>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">

          {/* ── Form ── */}
          <FadeSection>
            <motion.div
              variants={scaleIn}
              className="bg-white border-2 border-[#E8E5DE] rounded-2xl p-7 lg:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  /* Success state */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center mb-5">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="text-gray-900 font-semibold text-xl mb-2" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32 }}>APPLICATION SENT!</h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                      We&apos;ll review your application and reach out within 3–5 business days.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-6 text-[13px] font-semibold text-amber-600 hover:text-amber-700 transition-colors duration-200"
                    >
                      Submit another application →
                    </button>
                  </motion.div>
                ) : (
                  /* Form */
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-5" noValidate>

                    {/* Row 1: name + email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-gray-500 font-bold uppercase tracking-[1.8px] mb-2">Full Name *</label>
                        <input value={form.name} onChange={set('name')} placeholder="Your name" className={input(!!errors.name)} />
                        {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-500 font-bold uppercase tracking-[1.8px] mb-2">Email *</label>
                        <input type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" className={input(!!errors.email)} />
                        {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Row 2: phone + role */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-gray-500 font-bold uppercase tracking-[1.8px] mb-2">Phone</label>
                        <input value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000" className={input(false)} />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-500 font-bold uppercase tracking-[1.8px] mb-2">Applying For *</label>
                        <select value={form.role} onChange={set('role')} className={input(!!errors.role)}>
                          <option value="">Select a role</option>
                          {ROLE_OPTIONS.map(r => <option key={r}>{r}</option>)}
                        </select>
                        {errors.role && <p className="text-red-400 text-[11px] mt-1">{errors.role}</p>}
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <label className="block text-[11px] text-gray-500 font-bold uppercase tracking-[1.8px] mb-2">Years of Experience</label>
                      <select value={form.experience} onChange={set('experience')} className={input(false)}>
                        <option value="">Select experience level</option>
                        {EXP_OPTIONS.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[11px] text-gray-500 font-bold uppercase tracking-[1.8px] mb-2">Tell Us About Yourself *</label>
                      <textarea
                        value={form.message}
                        onChange={set('message')}
                        rows={5}
                        placeholder="Briefly describe your dispatch or logistics experience and why you'd be a great fit for AJAX..."
                        className={`${input(!!errors.message)} resize-none`}
                      />
                      {errors.message && <p className="text-red-400 text-[11px] mt-1">{errors.message}</p>}
                    </div>

                    {/* Error banner */}
                    {status === 'error' && (
                      <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
                        Something went wrong. Please try again or email us directly at <a href="mailto:careers@ajaxdispatch.com" className="font-semibold underline">careers@ajaxdispatch.com</a>
                      </div>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ y: loading ? 0 : -2, scale: loading ? 1 : 1.01 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      className="w-full flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-[15px] py-4 rounded-xl transition-colors duration-200 shadow-[0_6px_22px_rgba(245,158,11,0.28)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                          Submit Application
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-[12px] text-gray-400 font-light">
                      Your application is sent directly to our hiring team at{' '}
                      <span className="text-gray-500 font-medium">careers@ajaxdispatch.com</span>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </FadeSection>

          {/* ── Side info panel ── */}
          <FadeSection delay={0.1}>
            <div className="space-y-4">
              {/* What happens next */}
              <motion.div variants={fadeUp} className="bg-white border-2 border-[#E8E5DE] rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 text-[15px] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </span>
                  What Happens Next
                </h4>
                <div className="space-y-3">
                  {[
                    { n: '1', t: 'We review your application', d: 'Usually within 1–2 business days' },
                    { n: '2', t: 'Quick intro call',           d: '15–20 min phone screen with our team' },
                    { n: '3', t: 'Skills assessment',          d: 'Short practical exercise relevant to the role' },
                    { n: '4', t: 'Final interview & offer',    d: 'Meet the team and get your offer letter' },
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-amber-400 flex-shrink-0 mt-0.5" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18 }}>{step.n}</span>
                      <div>
                        <div className="text-gray-800 text-[13px] font-semibold leading-tight">{step.t}</div>
                        <div className="text-gray-400 text-[12px] mt-0.5">{step.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Roles we're always looking for */}
              <motion.div variants={fadeUp} className="bg-white border-2 border-[#E8E5DE] rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 text-[15px] mb-4">Roles We&apos;re Always Considering</h4>
                <ul className="space-y-2 list-none">
                  {ROLE_OPTIONS.filter(r => r !== 'Other / Not Listed').map(r => (
                    <li key={r} className="flex items-center gap-2.5 text-[13px] text-gray-600 bg-[#F8F7F3] border border-[#E8E5DE] rounded-lg px-3 py-2.5">
                      <Check />
                      {r}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Direct contact */}
              <motion.div variants={fadeUp} className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5">
                <p className="text-amber-800 text-[13px] font-semibold mb-1">Have a question before applying?</p>
                <p className="text-amber-700 text-[12px] mb-3 font-light">Reach out directly and we&apos;ll get back to you fast.</p>
                <a href="mailto:careers@ajaxdispatch.com" className="inline-flex items-center gap-1.5 text-amber-700 font-bold text-[13px] hover:text-amber-900 transition-colors duration-200">
                  careers@ajaxdispatch.com
                  <ArrowRight size={12} />
                </a>
              </motion.div>
            </div>
          </FadeSection>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   CTA BANNER — flat amber, no tilt
───────────────────────────────────────── */
function CTABanner() {
  return (
    <section className="relative py-16 lg:py-24 bg-amber-400 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.055] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <FadeSection className="relative z-10 max-w-4xl mx-auto px-5 lg:px-10 text-center">
        <motion.p variants={fadeIn} className="text-amber-900 text-[10px] font-bold tracking-[3px] uppercase mb-3">Not the careers page you were looking for?</motion.p>
        <motion.h2 variants={fadeUp} className="text-[#0A0A14] leading-[0.9] mb-5" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(44px,7vw,88px)' }}>
          NEED DISPATCH<br />FOR YOUR TRUCK?
        </motion.h2>
        <motion.p variants={fadeUp} className="text-amber-900 text-base lg:text-[17px] leading-relaxed max-w-xl mx-auto mb-8 font-medium">
          If you&apos;re a carrier looking for dispatch services — not a job — head over to our contact page. We&apos;ll get your truck loaded within 24 hours.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
            <Link href="/contact" className="inline-flex items-center gap-2.5 bg-[#0A0A14] hover:bg-gray-800 text-white font-bold text-[15px] px-8 py-3.5 rounded-xl transition-colors duration-200 shadow-[0_6px_28px_rgba(0,0,0,0.22)]">
              Get Dispatched Today <ArrowRight />
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <Link href="/services" className="inline-flex items-center gap-2.5 bg-black/10 hover:bg-black/[0.18] text-[#0A0A14] font-bold text-[15px] px-7 py-3.5 rounded-xl transition-all duration-200">
              View Our Services <ArrowRight size={14} />
            </Link>
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
function IconRemote() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 010 16c-4 0-8-4-8-8S8 2 12 2z"/><path d="M12 18v4M8 22h8"/></svg> }
function IconGrowth() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> }
function IconClock()  { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }
function IconTeam()   { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> }
function IconImpact() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> }
function IconExpert() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> }

/* ─────────────────────────────────────────
   KEYFRAMES
───────────────────────────────────────── */
const KEYFRAMES = `@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}`

/* ─────────────────────────────────────────────────────────────────
   API ROUTE SETUP INSTRUCTIONS
   Create: app/api/careers/route.ts

   import { NextResponse } from 'next/server'
   import nodemailer from 'nodemailer'

   export async function POST(req: Request) {
     const body = await req.json()
     const { name, email, phone, role, experience, message } = body

     const transporter = nodemailer.createTransport({
       host:   process.env.SMTP_HOST,
       port:   Number(process.env.SMTP_PORT) || 587,
       secure: false,
       auth: {
         user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASS,
       },
     })

     await transporter.sendMail({
       from:    `"AJAX Careers" <${process.env.SMTP_USER}>`,
       to:      process.env.CAREERS_EMAIL || 'careers@ajaxdispatch.com',
       replyTo: email,
       subject: `New Application: ${role} — ${name}`,
       html: `
         <h2>New Career Application</h2>
         <p><strong>Name:</strong> ${name}</p>
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
         <p><strong>Role:</strong> ${role}</p>
         <p><strong>Experience:</strong> ${experience || 'Not specified'}</p>
         <hr/>
         <p><strong>Message:</strong><br/>${message}</p>
       `,
     })

     return NextResponse.json({ ok: true })
   }

   .env.local variables needed:
     SMTP_HOST=smtp.gmail.com        (or your provider)
     SMTP_PORT=587
     SMTP_USER=your@gmail.com
     SMTP_PASS=your-app-password
     CAREERS_EMAIL=careers@ajaxdispatch.com
─────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────
   PAGE EXPORT
───────────────────────────────────────── */
export default function CareersPage() {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <Hero />
      <Perks />
      <Values />
      <ApplicationForm />
      <CTABanner />
    </>
  )
}