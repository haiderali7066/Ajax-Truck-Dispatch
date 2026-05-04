'use client'

// ─── services/page.tsx ────────────────────────────────────────────────────────
// v5 — texture-only hero (no image/video), lean imagery, strong CTA flow
// Design system matches HomeClient exactly.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
} from 'framer-motion'
import ServiceMarquee from "@/components/ServiceMarquee";


// Note: useScroll / useTransform retained for hero parallax contentY

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

function FadeSection({ children, className, delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      variants={stagger(delay)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionPill({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <motion.div variants={fadeUp} className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-5 ${
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" className="flex-shrink-0 mt-0.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const STATS = [
  { value: '500+',    label: 'Carriers Served'  },
  { value: '98%',     label: 'On-Time Dispatch' },
  { value: '$2.8/mi', label: 'Avg Rate Secured' },
  { value: '48',      label: 'States Covered'   },
]

const SERVICES = [
  {
    id:       'load-searching',
    icon:     <IconSearch />,
    title:    'Load Searching',
    tag:      'Best rates, every time',
    short:    'We hunt freight on every major board so your truck never sits.',
    desc:     'Our dispatch team works across DAT, Truckstop, and direct broker networks to find the highest-paying freight for your equipment type and preferred lanes. We don\'t take the first offer — we dig until we find loads that make sense for your bottom line.',
    features: [
      'DAT, Truckstop & direct broker access',
      'Lane-specific load matching',
      'High-value freight prioritized',
      'Real-time load board monitoring',
    ],
    color: 'amber',
  },
  {
    id:       'rate-negotiation',
    icon:     <IconDollar />,
    title:    'Rate Negotiation',
    tag:      'Avg. $2.80 / mile',
    short:    'We push brokers hard. You keep the difference.',
    desc:     'Brokers know how to talk drivers down. Our dispatchers know exactly how to push back. We benchmark every load against current market rates and use professional negotiation skills and real broker relationships to close at the highest number possible.',
    features: [
      'Live market rate benchmarking',
      'Direct broker relationship leverage',
      'Per-load rate optimization',
      'No low-ball accepts without your approval',
    ],
    color: 'amber',
  },
  {
    id:       'broker-communication',
    icon:     <IconChat />,
    title:    'Broker Communication',
    tag:      'Zero hassle for drivers',
    short:    'Every call, every update, every dispute — we handle it all.',
    desc:     'You drive. We talk. From first contact to final delivery confirmation, our team manages every single communication between you and your brokers. No distractions, no back-and-forth, no phone tag behind the wheel.',
    features: [
      '100% broker contact handled',
      'Real-time driver status updates',
      'Dispute resolution and escalation',
      'Professional representation on every call',
    ],
    color: 'amber',
  },
  {
    id:       'paperwork-docs',
    icon:     <IconFile />,
    title:    'Paperwork & Docs',
    tag:      'Full back-office support',
    short:    'Setup packets to invoices — all handled, always on time.',
    desc:     'The paperwork that kills small operators — broker setup packets, rate confirmations, PODs, invoices — we handle the full cycle professionally. Everything is organized, submitted on time, and followed up so your cash flow never stalls.',
    features: [
      'Broker setup packets completed',
      'Rate confirmations reviewed & signed',
      'Invoice generation & submission',
      'POD tracking and billing follow-up',
    ],
    color: 'amber',
  },
  {
    id:       'route-planning',
    icon:     <IconRoute />,
    title:    'Route Planning',
    tag:      'More miles, less deadhead',
    short:    'Smart load sequences that cut empty miles and protect home time.',
    desc:     'Empty miles are profit you can\'t recover. Our dispatchers plan your load sequences strategically — weighing deadhead costs, fuel stops, home time, and layover risk — to build weeks that generate maximum revenue with minimum waste.',
    features: [
      'Multi-load route sequencing',
      'Deadhead minimization planning',
      'Home time respected every week',
      'Fuel and rest stop optimization',
    ],
    color: 'amber',
  },
  {
    id:       'dedicated-dispatcher',
    icon:     <IconPerson />,
    title:    'Dedicated Dispatcher',
    tag:      'Your personal partner',
    short:    'One person. Your truck. Their full attention, every day.',
    desc:     'You don\'t get a call center. You get one experienced dispatcher who knows your truck, your lanes, your home time needs, and your revenue goals — and works every single day to advance all of them. This is the core of the AJAX difference.',
    features: [
      'One dispatcher assigned permanently',
      'Full knowledge of your preferences',
      'Direct line — no hold queues ever',
      'Monday–Saturday, 9AM–6PM EST',
    ],
    color: 'amber',
  },
]

const EQUIPMENT = [
  { emoji: '🚛', name: 'Dry Van',    desc: 'Enclosed, most common' },
  { emoji: '❄️', name: 'Reefer',     desc: 'Temp-controlled loads' },
  { emoji: '🏗️', name: 'Flatbed',    desc: 'Open-deck & oversize'  },
  { emoji: '📐', name: 'Step Deck',  desc: 'Tall oversized freight' },
  { emoji: '⚡', name: 'Power Only', desc: 'Drop-and-hook loads'   },
  { emoji: '📦', name: 'Box Truck',  desc: 'Local & urban routes'  },
]

/* ─────────────────────────────────────────────────────────────────
   HERO — pure texture, no image or video
   Layered: dot grid + diagonal rule lines + amber glow blobs
   + large faded "DISPATCH" watermark
─────────────────────────────────────────────────────────────────── */
function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  const heroStagger: Variants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  }

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0A0A14]">

      {/* ── Layer 1: cross-hatch texture matching CTA section ── */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Layer 2: fine dot grid ── */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.09]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
        }}
      />

      {/* ── Layer 3: "AJAX DISPATCH" stacked centred watermark ── */}
      <div className="absolute z-[3] inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="block text-center leading-[0.80] tracking-tight"
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 'clamp(96px, 19vw, 300px)',
            color: 'rgba(255,255,255,0.028)',
          }}
        >
          AJAX
        </span>
        <span
          className="block text-center leading-[0.80] tracking-tight"
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 'clamp(96px, 19vw, 300px)',
            color: 'rgba(255,255,255,0.028)',
          }}
        >
          DISPATCH
        </span>
      </div>

      {/* ── Layer 4: amber glow — left bloom ── */}
      <div
        className="absolute z-[4] -left-24 top-1/2 -translate-y-1/2 w-[640px] h-[640px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.03) 44%, transparent 66%)' }}
      />

      {/* ── Layer 5: amber glow — top right ── */}
      <div
        className="absolute z-[4] right-[-80px] top-[-60px] w-[480px] h-[480px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 62%)' }}
      />

      {/* ── Top amber hairline ── */}
      <div className="absolute top-0 inset-x-0 h-[1px] z-10 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

      {/* ── Bottom: hard dark stop — clean seam into next section ── */}
      <div className="absolute bottom-0 inset-x-0 h-24 z-[8] pointer-events-none" style={{ background: 'linear-gradient(to top, #0A0A14 0%, #0A0A14 20%, transparent 100%)' }} />

      {/* ── Content ── */}
      <motion.div style={{ y: contentY }} className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-10 pt-28 pb-20">

        {/* 2-col hero layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-20">

          {/* ── Left: headline + CTAs ── */}
          <motion.div variants={heroStagger} initial="hidden" animate="visible">

            {/* Pill */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-2 rounded-full mb-6">
              <motion.span
                className="w-2 h-2 rounded-full bg-amber-400"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              Full-Service Truck Dispatch
            </motion.div>

            {/* H1 */}
            <motion.h1 variants={fadeUp} className="leading-[0.87] tracking-wide mb-7" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
              <span className="block text-white" style={{ fontSize: 'clamp(54px,7vw,108px)' }}>EVERYTHING</span>
              <span className="block text-white" style={{ fontSize: 'clamp(54px,7vw,108px)' }}>YOUR TRUCK</span>
              <span
                className="block"
                style={{
                  fontSize: 'clamp(54px,7vw,108px)',
                  background: 'linear-gradient(90deg,#F59E0B 0%,#FCD34D 35%,#F59E0B 65%,#B45309 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 3.5s linear infinite',
                }}
              >
                NEEDS.
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p variants={fadeUp} className="text-gray-400 text-base lg:text-[1.08rem] leading-[1.85] max-w-[480px] mb-10 font-light">
              From finding the load to filing the invoice — AJAX covers every step so you focus on driving and growing.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-10">
              <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-[15px] px-8 py-4 rounded-xl transition-colors duration-200 shadow-[0_8px_28px_rgba(245,158,11,0.32)] hover:shadow-[0_14px_40px_rgba(245,158,11,0.44)]"
                >
                  Get Dispatched Today <ArrowRight />
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2.5 border border-white/20 hover:border-amber-400/55 text-white hover:text-amber-300 font-semibold text-[15px] px-8 py-4 rounded-xl transition-all duration-200 bg-white/[0.04]"
                >
                  See All Services
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                </a>
              </motion.div>
            </motion.div>

            {/* Trust micro-copy */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-2">
              {['No hidden fees', 'No long-term contracts', 'Start in under 24 hours'].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: services checklist panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div className="rounded-2xl border border-white/[0.09] bg-white/[0.03] backdrop-blur-sm overflow-hidden">
              {/* Panel header */}
              <div className="px-6 py-4 border-b border-white/[0.07] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-white text-[12px] font-bold tracking-[1.5px] uppercase">Services Included — All Carriers</span>
                </div>
                <span className="text-[10px] font-bold tracking-[1.5px] uppercase bg-amber-400/10 text-amber-400 border border-amber-400/20 px-2.5 py-1 rounded-full">Full Package</span>
              </div>
              {/* Service rows */}
              <div className="divide-y divide-white/[0.05]">
                {[
                  { icon: <IconSearch />, label: 'Load Searching',       note: 'DAT, Truckstop & direct brokers' },
                  { icon: <IconDollar />, label: 'Rate Negotiation',     note: 'Every load, every time'          },
                  { icon: <IconChat />,   label: 'Broker Communication', note: 'All calls handled for you'       },
                  { icon: <IconFile />,   label: 'Paperwork & Docs',     note: 'Setup to invoicing'              },
                  { icon: <IconRoute />,  label: 'Route Planning',       note: 'Min deadhead, max revenue'       },
                  { icon: <IconPerson />, label: 'Dedicated Dispatcher', note: 'One person, your account'        },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.65 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/[0.03] transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/15 flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:bg-amber-400/15 transition-colors duration-200">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-[13px] font-semibold leading-tight">{item.label}</div>
                      <div className="text-gray-500 text-[11px] mt-0.5">{item.note}</div>
                    </div>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" className="flex-shrink-0 opacity-60">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </motion.div>
                ))}
              </div>
              {/* Panel footer CTA */}
              <div className="px-6 py-4 bg-amber-400/[0.06] border-t border-white/[0.07]">
                <p className="text-amber-300/80 text-[12px] font-medium">
                  Every carrier gets all six services — no tiers, no add-ons.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats strip — full width below both columns */}
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden border border-white/[0.08] backdrop-blur-sm"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ backgroundColor: 'rgba(245,158,11,0.07)' }}
              className="group bg-white/[0.04] transition-colors duration-300 px-7 py-7 border-r border-white/[0.06] last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
            >
              <div className="text-white group-hover:text-amber-400 transition-colors duration-300 leading-none tracking-wide mb-1.5" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,4.5vw,50px)' }}>
                {s.value}
              </div>
              <div className="text-gray-500 text-[11px] font-semibold uppercase tracking-[1.8px]">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SERVICES GRID — all 6 services as expandable cards
   One real truck/highway image used sparingly in the featured card
─────────────────────────────────────────────────────────────────── */
function ServicesGrid() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section className="bg-[#F8F7F3] border-b border-[#E8E5DE] py-20 lg:py-28" id="services">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <FadeSection className="max-w-2xl mb-14">
          <SectionPill>What We Do</SectionPill>
          <motion.h2 variants={fadeUp} className="leading-[0.92] mb-5 text-gray-900" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(42px,5.5vw,76px)' }}>
            SIX SERVICES.<br /><span className="text-amber-500">ONE TEAM DOING ALL OF IT.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-600 text-lg leading-relaxed font-light">
            You don't pick and choose — every carrier gets the full package. Tap any card to see what's included.
          </motion.p>
        </FadeSection>

        <FadeSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s) => (
            <motion.div
              key={s.id}
              variants={scaleIn}
              layout
              onClick={() => setExpanded(expanded === s.id ? null : s.id)}
              whileHover={{ y: -5 }}
              transition={{ layout: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}
              className="relative bg-white rounded-2xl border-2 border-[#E8E5DE] hover:border-amber-300 cursor-pointer transition-all duration-250 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] overflow-hidden"
            >
              <div className="p-7">
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-amber-50 border border-amber-200 text-amber-600 mb-5">
                  {s.icon}
                </div>

                {/* Title + expand toggle */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-[17px] leading-tight text-gray-900">
                    {s.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: expanded === s.id ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 mt-0.5 text-gray-400"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </motion.div>
                </div>

                {/* Short description */}
                <p className="text-sm leading-relaxed mb-5 font-light text-gray-500">
                  {s.short}
                </p>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {expanded === s.id && (
                    <motion.div
                      key="expanded"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="text-sm leading-relaxed mb-4 font-light text-gray-600">
                        {s.desc}
                      </p>
                      <ul className="space-y-2 mb-5">
                        {s.features.map(f => (
                          <li key={f} className="flex items-start gap-2.5 text-[13px] rounded-lg px-3 py-2 bg-amber-50/70 border border-amber-100 text-gray-700">
                            <Check />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tag pill */}
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full border bg-amber-50 text-amber-700 border-amber-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {s.tag}
                </div>
              </div>
            </motion.div>
          ))}
        </FadeSection>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   INLINE CTA #1 — mid-page amber strip (after services grid)
─────────────────────────────────────────────────────────────────── */
function InlineCTA1() {
  return (
    <FadeSection className="bg-amber-400">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10 lg:py-12">
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-amber-900 text-[11px] font-bold tracking-[2.5px] uppercase mb-1">Ready to get started?</p>
            <h3 className="text-[#0A0A14] leading-tight" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(28px,3.5vw,46px)' }}>
              YOUR FIRST LOAD CAN BE BOOKED IN UNDER 24 HOURS.
            </h3>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#0A0A14] hover:bg-gray-800 text-white font-bold text-[14px] px-7 py-3.5 rounded-xl transition-colors duration-200 shadow-[0_6px_20px_rgba(0,0,0,0.22)]"
              >
                Start Onboarding <ArrowRight size={15} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <a
                href="tel:+18554794089"
                className="inline-flex items-center gap-2 bg-black/10 hover:bg-black/[0.18] text-[#0A0A14] font-bold text-[14px] px-6 py-3.5 rounded-xl transition-all duration-200"
              >
                Call Now
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </FadeSection>
  )
}

/* ─────────────────────────────────────────────────────────────────
   TWO FEATURED DEEP-DIVES
   Only 2 images: one truck on highway, one dispatcher close-up.
   Alternating dark / light layout rows.
─────────────────────────────────────────────────────────────────── */
const DEEP_DIVES = [
  {
    tag:    'The #1 Priority',
    title:  'MAX RATE.\nEVERY LOAD.',
    body:   'The single biggest thing a dispatcher does for your revenue is fight hard on rates. We track live market data across all your lanes and never accept what a broker throws out first. Our dispatchers negotiate every single load — and we average $2.80/mile across our entire carrier network.',
    stats:  [{ v: '$2.8/mi', l: 'Network avg rate' }, { v: '0', l: 'Low-ball loads accepted' }, { v: '100%', l: 'Loads negotiated' }],
    dark:   false,
    visual: 'stats', // renders a dark rate-focused visual panel
  },
  {
    tag:    'Your Key Person',
    title:  'ONE DISPATCHER.\nFULL ATTENTION.',
    body:   'Most dispatch services run you through a rotation. At AJAX you get one dispatcher who owns your account. They know your truck specs, your home-time requirements, your best-paying lanes, and your weekly goals — and they\'re proactively planning your next week while you\'re still finishing this one.',
    stats:  [{ v: '1', l: 'Dispatcher per carrier' }, { v: '6-day', l: 'Mon–Sat availability' }, { v: '24h', l: 'Onboard to first load' }],
    dark:   true,
    visual: 'features', // renders an icon feature grid
  },
]

function DeepDives() {
  return (
    <>
      {DEEP_DIVES.map((d, i) => (
        <section
          key={i}
          className={`border-b overflow-hidden ${d.dark ? 'bg-[#0A0A14] border-white/[0.06]' : 'bg-[#F8F7F3] border-[#E8E5DE]'}`}
        >
          <div className="max-w-7xl mx-auto px-5 lg:px-10 py-20 lg:py-28">
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>

              {/* Text */}
              <FadeSection>
                <SectionPill dark={d.dark}>{d.tag}</SectionPill>
                <motion.h2
                  variants={fadeUp}
                  className={`leading-[0.9] mb-6 whitespace-pre-line ${d.dark ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5vw,74px)' }}
                >
                  {d.title}
                </motion.h2>
                <motion.p variants={fadeUp} className={`text-base lg:text-[17px] leading-relaxed mb-8 font-light ${d.dark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {d.body}
                </motion.p>

                {/* Stats row */}
                <motion.div variants={fadeUp} className="flex flex-wrap gap-8 mb-8">
                  {d.stats.map((s, si) => (
                    <div key={si} className={`border-l-2 pl-4 ${d.dark ? 'border-amber-400/40' : 'border-amber-400/60'}`}>
                      <div className={`leading-none mb-0.5 ${d.dark ? 'text-amber-400' : 'text-amber-600'}`} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 34 }}>
                        {s.v}
                      </div>
                      <div className={`text-[11px] font-semibold uppercase tracking-[1.5px] ${d.dark ? 'text-gray-600' : 'text-gray-500'}`}>{s.l}</div>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp}>
                  <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }} className="inline-block">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-sm px-6 py-3 rounded-xl transition-colors duration-200 shadow-[0_4px_18px_rgba(245,158,11,0.28)]"
                    >
                      Get Dispatched <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                </motion.div>
              </FadeSection>

              {/* Right: negotiation process panel — zero pricing shown */}
              {d.visual === 'stats' ? (
                <FadeSection className="relative">
                  <motion.div
                    variants={scaleIn}
                    className="relative rounded-2xl overflow-hidden border border-[#E8E5DE] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
                  >
                    {/* Header */}
                    <div className="bg-[#0A0A14] px-7 py-5 flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-[10px] font-bold tracking-[2px] uppercase mb-1">How We Negotiate</p>
                        <div className="text-white font-semibold text-[16px]">Every load. Every time.</div>
                      </div>
                      <span className="text-[10px] font-bold tracking-[1.5px] uppercase bg-amber-400/10 text-amber-400 border border-amber-400/20 px-2.5 py-1 rounded-full">Our Process</span>
                    </div>
                    {/* Process steps */}
                    <div className="divide-y divide-[#F0EDE8]">
                      {[
                        { n: '01', t: 'Benchmark the market',  d: 'We check live load board data before picking up the phone' },
                        { n: '02', t: 'Leverage relationships', d: 'Direct broker contacts get better starting numbers'        },
                        { n: '03', t: 'Counter every offer',   d: 'We never accept the first offer — always push back'        },
                        { n: '04', t: 'Your approval first',   d: 'No load is confirmed without your sign-off'                },
                      ].map((step, ri) => (
                        <motion.div
                          key={ri}
                          variants={fadeUp}
                          className="flex items-start gap-4 px-7 py-4"
                        >
                          <span
                            className="text-amber-400 leading-none flex-shrink-0 mt-0.5"
                            style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22 }}
                          >
                            {step.n}
                          </span>
                          <div>
                            <div className="text-gray-900 text-sm font-semibold mb-0.5">{step.t}</div>
                            <div className="text-gray-500 text-[12px] leading-snug">{step.d}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    {/* Footer */}
                    <div className="px-7 py-4 bg-amber-50 border-t border-amber-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                      <p className="text-amber-800 text-[12px] font-semibold">Result: consistently above-market rates for every carrier we dispatch.</p>
                    </div>
                  </motion.div>
                </FadeSection>
              ) : (
                /* Dispatcher feature grid */
                <FadeSection className="grid grid-cols-2 gap-3">
                  {[
                    { icon: <IconPerson />, t: 'One Person, Your Account', d: 'Never shuffled to someone new' },
                    { icon: <IconClock />,  t: 'Mon–Sat, 9AM–6PM',         d: 'Right when freight moves'     },
                    { icon: <IconRoute />,  t: 'Route Intelligence',        d: 'Built around your schedule'  },
                    { icon: <IconChat />,   t: 'Direct Line Always',        d: 'No hold queues, ever'        },
                    { icon: <IconFile />,   t: 'Full Paperwork Handled',    d: 'Start-to-finish, every load' },
                    { icon: <IconDollar />, t: 'Revenue-First Mindset',     d: 'Your profit is our metric'   },
                  ].map((item, j) => (
                    <motion.div
                      key={j}
                      variants={fadeUp}
                      whileHover={{ borderColor: 'rgba(245,158,11,0.35)', y: -2 }}
                      className="bg-white/[0.04] border border-white/[0.09] rounded-xl p-4 transition-all duration-200"
                    >
                      <div className="text-amber-400 mb-2.5">{item.icon}</div>
                      <div className="text-white text-[13px] font-semibold mb-0.5 leading-snug">{item.t}</div>
                      <div className="text-gray-500 text-[11px] leading-snug">{item.d}</div>
                    </motion.div>
                  ))}
                </FadeSection>
              )}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────
   INLINE CTA #2 — between deep-dives and equipment
   Dark version with amber text
─────────────────────────────────────────────────────────────────── */
function InlineCTA2() {
  return (
    <FadeSection>
      <div className="bg-[#0A0A14] border-b border-white/[0.06]">
        {/* Thin amber accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14 lg:py-16 text-center">
          <motion.p variants={fadeUp} className="text-amber-400 text-[11px] font-bold tracking-[3px] uppercase mb-3">
            No red tape. No wait.
          </motion.p>
          <motion.h3
            variants={fadeUp}
            className="text-white mb-5"
            style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(32px,4.5vw,62px)' }}
          >
            ONBOARDING TAKES LESS THAN <span className="text-amber-400">24 HOURS.</span>
          </motion.h3>
          <motion.p variants={fadeUp} className="text-gray-400 text-base max-w-lg mx-auto mb-8 font-light leading-relaxed">
            Submit your info, upload documents, sign a simple agreement — and we assign your dispatcher the same day. Your first load gets booked before your next trip starts.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-[15px] px-8 py-4 rounded-xl shadow-[0_8px_28px_rgba(245,158,11,0.28)] hover:shadow-[0_14px_40px_rgba(245,158,11,0.38)] transition-all duration-200"
              >
                Begin Onboarding <ArrowRight />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <a
                href="tel:+18554794089"
                className="inline-flex items-center gap-2.5 border border-white/20 hover:border-amber-400/50 text-white hover:text-amber-300 font-semibold text-[15px] px-8 py-4 rounded-xl transition-all duration-200 bg-white/[0.04]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                +1 (346) 428-0370
              </a>
            </motion.div>
          </motion.div>
        </div>
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      </div>
    </FadeSection>
  )
}

/* ─────────────────────────────────────────────────────────────────
   EQUIPMENT — dark, no image needed
─────────────────────────────────────────────────────────────────── */
function Equipment() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="py-20 lg:py-28 bg-[#0A0A14] border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <FadeSection className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <SectionPill dark>Equipment We Dispatch</SectionPill>
            <motion.h2
              variants={fadeUp}
              className="text-white leading-[0.93]"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,4.5vw,60px)' }}
            >
              ALL TYPES. <span className="text-amber-400">ALL LANES.</span><br />48 STATES.
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="text-gray-500 text-base leading-relaxed max-w-xs font-light lg:text-right">
            Tap any type below. We dispatch every major equipment category nationwide.
          </motion.p>
        </FadeSection>

        <FadeSection className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {EQUIPMENT.map((eq, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              onHoverStart={() => setActive(eq.name)}
              onHoverEnd={() => setActive(null)}
              onTap={() => setActive(active === eq.name ? null : eq.name)}
              animate={{
                scale:           active === eq.name ? 1.06 : active !== null ? 0.96 : 1,
                borderColor:     active === eq.name ? '#F59E0B' : 'rgba(255,255,255,0.08)',
                backgroundColor: active === eq.name ? 'rgba(245,158,11,0.07)' : 'rgba(255,255,255,0.03)',
              }}
              transition={{ type: 'spring', stiffness: 340, damping: 22 }}
              className="flex flex-col items-center text-center border-2 rounded-2xl px-3 py-6 cursor-pointer"
            >
              <motion.div
                animate={{ scale: active === eq.name ? 1.22 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="text-[32px] lg:text-[36px] mb-2.5"
              >
                {eq.emoji}
              </motion.div>
              <div className={`font-semibold text-[13px] mb-1 transition-colors duration-200 ${active === eq.name ? 'text-amber-400' : 'text-gray-200'}`}>
                {eq.name}
              </div>
              <div className="text-gray-500 text-[10px] leading-snug">{eq.desc}</div>
            </motion.div>
          ))}
        </FadeSection>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          Serving owner-operators, small fleets &amp; independent carriers across <span className="font-semibold text-gray-300">48 states</span>.
        </motion.p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   PROCESS STRIP — 3 steps, cream bg
─────────────────────────────────────────────────────────────────── */
function ProcessStrip() {
  const steps = [
    { n: '01', t: 'Submit & Upload', d: 'Share your details and upload MC authority, insurance, DOT number, and W9 — takes under 5 minutes.' },
    { n: '02', t: 'Meet Your Dispatcher', d: 'We assign a dedicated dispatcher the same day. They learn your truck, lanes, and goals before your first load.' },
    { n: '03', t: 'Start Earning More', d: 'Your dispatcher finds loads, negotiates rates, handles paperwork, and keeps your truck moving profitably.' },
  ]

  return (
    <section className="bg-[#F8F7F3] border-b border-[#E8E5DE] py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <FadeSection className="text-center max-w-xl mx-auto mb-14">
          <SectionPill>How It Works</SectionPill>
          <motion.h2 variants={fadeUp} className="leading-[0.92] text-gray-900" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,5vw,68px)' }}>
            UP AND RUNNING<br /><span className="text-amber-500">IN UNDER 24 HOURS.</span>
          </motion.h2>
        </FadeSection>

        <FadeSection className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative bg-white border-2 border-[#E8E5DE] rounded-2xl p-7 hover:border-amber-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-250"
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-[52px] -right-4 w-8 h-[2px] bg-amber-200 z-10" />
              )}
              <div
                className="text-amber-400 leading-none mb-4"
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 52 }}
              >
                {step.n}
              </div>
              <h3 className="text-gray-900 font-semibold text-[16px] mb-2">{step.t}</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed font-light">{step.d}</p>
            </motion.div>
          ))}
        </FadeSection>

        {/* CTA inside process strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-[15px] px-8 py-4 rounded-xl shadow-[0_6px_22px_rgba(245,158,11,0.28)] hover:shadow-[0_12px_32px_rgba(245,158,11,0.38)] transition-all duration-200"
            >
              Start Today — Free Onboarding <ArrowRight />
            </Link>
          </motion.div>
          <p className="text-gray-400 text-sm">No contract. No setup fee. Cancel anytime.</p>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   FINAL CTA BANNER — clean flat amber, no tilt
─────────────────────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section className="relative py-24 lg:py-32 bg-amber-400 overflow-hidden">
      {/* Cross-hatch texture only */}
      <div
        className="absolute inset-0 opacity-[0.055] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <FadeSection className="relative z-10 max-w-4xl mx-auto px-5 lg:px-10 text-center">
        <motion.p variants={fadeIn} className="text-amber-900 text-[11px] font-bold tracking-[3px] uppercase mb-4">
          No truck sits idle with AJAX
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="text-[#0A0A14] leading-[0.88] mb-6"
          style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(50px,7.5vw,100px)' }}
        >
          LET&apos;S GET YOUR<br />TRUCK LOADED.
        </motion.h2>
        <motion.p variants={fadeUp} className="text-amber-900 text-base lg:text-lg leading-relaxed max-w-lg mx-auto mb-10 font-medium">
          Join 500+ carriers who trust AJAX Dispatch. Your dedicated dispatcher will be
          booking loads before your next trip begins.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-[#0A0A14] hover:bg-gray-800 text-white font-bold text-[15px] px-9 py-4 rounded-xl shadow-[0_10px_32px_rgba(0,0,0,0.28)] hover:shadow-[0_16px_44px_rgba(0,0,0,0.36)] transition-all duration-200"
            >
              Get Dispatched Today <ArrowRight />
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <a
              href="tel:+18554794089"
              className="inline-flex items-center gap-2.5 bg-black/10 hover:bg-black/[0.18] text-[#0A0A14] font-bold text-[15px] px-8 py-4 rounded-xl transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              +1 (346) 428-0370
            </a>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-5 lg:gap-8 text-amber-900 text-[13px] font-semibold">
          {['No long-term contracts', 'Start within 24 hours', 'Dedicated dispatcher assigned', 'Mon–Sat support'].map(item => (
            <div key={item} className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
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
function IconSearch() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg> }
function IconDollar() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> }
function IconChat()   { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> }
function IconFile()   { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> }
function IconRoute()  { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="3" cy="6" r="2"/><circle cx="21" cy="18" r="2"/><path d="M5.5 6H19a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 00-2 2v2"/></svg> }
function IconPerson() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
function IconClock()  { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }

/* ─────────────────────────────────────────
   KEYFRAMES
───────────────────────────────────────── */
const KEYFRAMES = `
  @keyframes shimmer {
    0%   { background-position: -200% center }
    100% { background-position:  200% center }
  }
`

/* ─────────────────────────────────────────
   PAGE EXPORT
───────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <Hero />
      <ServicesGrid />
      <ServiceMarquee />
      <InlineCTA1 />
      <DeepDives />
      <InlineCTA2 />
      <Equipment />
      <ProcessStrip />
      <CTABanner />
    </>
  )
}