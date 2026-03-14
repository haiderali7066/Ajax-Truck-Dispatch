'use client'

// ─── about/page.tsx ───────────────────────────────────────────────────────────
// Design system matches ServicesPage exactly:
//   • Texture-only hero — cross-hatch + dot grid + "AJAX DISPATCH" watermark
//   • bg-[#0A0A14] dark sections, bg-[#F8F7F3] cream sections
//   • Bebas Neue headings, SectionPill, FadeSection, fadeUp animations
//   • Inline amber CTA strips woven through the page
//   • Final flat amber CTA banner — no tilt
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
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

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const HERO_STATS = [
  { value: '500+', label: 'Carriers Served'   },
  { value: '5K+',  label: 'Loads Booked'      },
  { value: '98%',  label: 'Client Retention'  },
  { value: '48',   label: 'States Covered'    },
]

const VALUES = [
  {
    icon: <IconShield />,
    title: 'Reliability',
    desc:  'We show up every day, load after load. Consistent service is the foundation of every carrier relationship we build.',
  },
  {
    icon: <IconZap />,
    title: 'Efficiency',
    desc:  'No wasted miles, no wasted time. Every decision we make is aimed at maximising your truck\'s earning potential.',
  },
  {
    icon: <IconUsers />,
    title: 'Partnership',
    desc:  'You\'re not a client number. You\'re a business we\'re invested in. Your growth is our success — that\'s how we think.',
  },
  {
    icon: <IconTrending />,
    title: 'Transparency',
    desc:  'Clear communication, honest rates, no hidden fees. You always know exactly what\'s happening with your loads.',
  },
]

const WHO_WE_SERVE = [
  { n: '01', title: 'Owner-Operators',        desc: 'Solo drivers who want consistent loads without the broker headache.' },
  { n: '02', title: 'Small Trucking Companies', desc: 'Small fleets who need dispatch support without hiring full-time staff.' },
  { n: '03', title: 'Independent Drivers',    desc: 'Leased drivers looking to maximise earnings on their authority.' },
  { n: '04', title: 'Fleet Owners',           desc: 'Multi-truck operations needing scalable dispatch management.' },
]

/* ─────────────────────────────────────────────────────────────────
   HERO — texture-only, 2-col, "AJAX DISPATCH" watermark
   Identical pattern to ServicesPage hero
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

      {/* Layer 3: "AJAX DISPATCH" stacked centred watermark */}
      <div className="absolute z-[3] inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="block text-center leading-[0.80] tracking-tight"
          style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(96px, 19vw, 300px)', color: 'rgba(255,255,255,0.028)' }}
        >
          AJAX
        </span>
        <span
          className="block text-center leading-[0.80] tracking-tight"
          style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(96px, 19vw, 300px)', color: 'rgba(255,255,255,0.028)' }}
        >
          DISPATCH
        </span>
      </div>

      {/* Layer 4: amber glow left */}
      <div
        className="absolute z-[4] -left-24 top-1/2 -translate-y-1/2 w-[640px] h-[640px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.03) 44%, transparent 66%)' }}
      />

      {/* Layer 5: amber glow top-right */}
      <div
        className="absolute z-[4] right-[-80px] top-[-60px] w-[480px] h-[480px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 62%)' }}
      />

      {/* Top amber hairline */}
      <div className="absolute top-0 inset-x-0 h-[1px] z-10 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

      {/* Bottom dark stop */}
      <div className="absolute bottom-0 inset-x-0 h-24 z-[8] pointer-events-none" style={{ background: 'linear-gradient(to top, #0A0A14 0%, #0A0A14 20%, transparent 100%)' }} />

      {/* Content */}
      <motion.div style={{ y: contentY }} className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-10 pt-28 pb-20">

        {/* 2-col layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-20">

          {/* Left: headline */}
          <motion.div variants={heroStagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-2 rounded-full mb-6">
              <motion.span
                className="w-2 h-2 rounded-full bg-amber-400"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              About AJAX Dispatch
            </motion.div>

            <motion.h1 variants={fadeUp} className="leading-[0.87] tracking-wide mb-7" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
              <span className="block text-white" style={{ fontSize: 'clamp(54px,7vw,108px)' }}>WE KEEP</span>
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
                AMERICA
              </span>
              <span className="block text-white" style={{ fontSize: 'clamp(54px,7vw,108px)' }}>MOVING.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-gray-400 text-base lg:text-[1.08rem] leading-[1.85] max-w-[480px] mb-10 font-light">
              AJAX Dispatch is a team of experienced dispatch professionals built to serve the carriers that keep the US economy running — from solo owner-operators to growing fleets.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-[15px] px-8 py-4 rounded-xl transition-colors duration-200 shadow-[0_8px_28px_rgba(245,158,11,0.32)] hover:shadow-[0_14px_40px_rgba(245,158,11,0.44)]"
                >
                  Partner With Us <ArrowRight />
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="#story"
                  className="inline-flex items-center gap-2.5 border border-white/20 hover:border-amber-400/55 text-white hover:text-amber-300 font-semibold text-[15px] px-8 py-4 rounded-xl transition-all duration-200 bg-white/[0.04]"
                >
                  Our Story
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: mission + vision cards stacked */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col gap-4"
          >
            {/* Mission card */}
            <div className="rounded-2xl border border-amber-400/20 bg-white/[0.03] backdrop-blur-sm p-7 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <IconTarget />
                </div>
                <div>
                  <p className="text-amber-400 text-[10px] font-bold tracking-[2px] uppercase mb-1.5">Our Mission</p>
                  <p className="text-gray-300 text-[14px] leading-relaxed font-light">
                    To provide reliable, professional dispatch services that help trucking companies increase revenue, reduce downtime, and simplify operations across the United States.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision card */}
            <div className="rounded-2xl border border-white/[0.09] bg-white/[0.03] backdrop-blur-sm p-7 relative overflow-hidden hover:border-amber-400/20 transition-colors duration-250">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.10] flex items-center justify-center text-gray-400 flex-shrink-0">
                  <IconEye />
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] font-bold tracking-[2px] uppercase mb-1.5">Our Vision</p>
                  <p className="text-gray-400 text-[14px] leading-relaxed font-light">
                    To become the most trusted logistics partner for carriers by delivering efficient dispatch, transparent communication, and consistently high-paying freight.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick facts */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-4 flex items-center justify-between">
              {['Wyoming-based', 'Mon–Sat support', 'No long-term contracts'].map((f, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[12px] text-gray-500 font-medium">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {f}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden border border-white/[0.08] backdrop-blur-sm"
        >
          {HERO_STATS.map((s, i) => (
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
   STORY — cream section, split layout, no images
─────────────────────────────────────────────────────────────────── */
function Story() {
  return (
    <section className="bg-[#F8F7F3] border-b border-[#E8E5DE] py-20 lg:py-28" id="story">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left: story text */}
          <FadeSection>
            <SectionPill>Our Story</SectionPill>
            <motion.h2
              variants={fadeUp}
              className="leading-[0.92] mb-7 text-gray-900"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(42px,5vw,72px)' }}
            >
              BUILT FOR<br /><span className="text-amber-500">CARRIERS.</span><br />BUILT FROM EXPERIENCE.
            </motion.h2>
            <motion.div variants={fadeUp} className="space-y-5 text-gray-600 text-[16px] leading-[1.82] font-light">
              <p>
                AJAX Dispatch was founded with one clear purpose: give owner-operators and small carriers the same back-office muscle that large fleet companies take for granted.
              </p>
              <p>
                Too many drivers were leaving money on the table — accepting broker low-balls, drowning in paperwork, and struggling with empty miles — simply because they didn't have the time or resources to fight back. We built AJAX to change that.
              </p>
              <p>
                Today, our team of experienced dispatch professionals works as a direct extension of your business. We handle the operational side so you can focus entirely on the road.
              </p>
            </motion.div>
          </FadeSection>

          {/* Right: timeline-style milestones */}
          <FadeSection className="space-y-4" delay={0.1}>
            {[
              { year: 'Day One',   t: 'A Simple Problem',          d: 'Carriers were losing revenue to bad rates and broker runaround. We set out to fix that with dedicated, professional dispatch.' },
              { year: 'Month One', t: 'First 50 Carriers',         d: 'Word spread fast. Owner-operators across 12 states joined because they needed a team that fought for their rates — not against them.' },
              { year: 'Year One',  t: '5,000+ Loads Booked',       d: 'Our dispatchers had negotiated thousands of loads, cutting deadhead miles and securing above-market rates across all equipment types.' },
              { year: 'Today',     t: '500+ Carriers, 48 States',  d: 'We\'ve grown into a full-service dispatch operation trusted by solo drivers and multi-truck fleets across the continental US.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="flex gap-5 bg-white border-2 border-[#E8E5DE] rounded-2xl p-5 hover:border-amber-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] transition-all duration-250"
              >
                <div className="flex-shrink-0 text-center">
                  <div
                    className="text-amber-500 leading-none"
                    style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase' }}
                  >
                    {item.year}
                  </div>
                  <div className="w-[1px] h-full bg-amber-200/60 mx-auto mt-1.5" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold text-[14px] mb-1 leading-tight">{item.t}</h4>
                  <p className="text-gray-500 text-[13px] leading-relaxed font-light">{item.d}</p>
                </div>
              </motion.div>
            ))}
          </FadeSection>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   MISSION & VISION — dark section, side-by-side cards
─────────────────────────────────────────────────────────────────── */
function MissionVision() {
  return (
    <section className="bg-[#0A0A14] border-b border-white/[0.06] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <FadeSection className="text-center max-w-xl mx-auto mb-16">
          <SectionPill dark>Who We Are</SectionPill>
          <motion.h2
            variants={fadeUp}
            className="text-white leading-[0.92]"
            style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(42px,5.5vw,76px)' }}
          >
            PURPOSE-BUILT<br /><span className="text-amber-400">FOR THE ROAD.</span>
          </motion.h2>
        </FadeSection>

        <FadeSection className="grid md:grid-cols-2 gap-5 mb-5">
          {/* Mission */}
          <motion.div
            variants={scaleIn}
            className="relative rounded-2xl border border-amber-400/22 bg-white/[0.03] p-9 overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
            <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, rgba(245,158,11,0.08) 0%, transparent 65%)' }} />
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-6">
              <IconTarget />
            </div>
            <p className="text-amber-400 text-[10px] font-bold tracking-[2.5px] uppercase mb-3">Our Mission</p>
            <h3 className="text-white leading-tight mb-4" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(32px,3.5vw,48px)' }}>
              MISSION
            </h3>
            <p className="text-gray-300 text-[15px] leading-relaxed font-light">
              To provide reliable and professional dispatch services that help trucking companies increase revenue, reduce downtime, and simplify logistics operations across the United States.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            variants={scaleIn}
            className="relative rounded-2xl border border-white/[0.09] bg-white/[0.03] p-9 overflow-hidden hover:border-amber-400/20 transition-colors duration-280"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.10] flex items-center justify-center text-gray-400 mb-6">
              <IconEye />
            </div>
            <p className="text-gray-500 text-[10px] font-bold tracking-[2.5px] uppercase mb-3">Our Vision</p>
            <h3 className="text-white leading-tight mb-4" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(32px,3.5vw,48px)' }}>
              VISION
            </h3>
            <p className="text-gray-400 text-[15px] leading-relaxed font-light">
              To become the most trusted logistics partner for trucking companies by delivering efficient dispatch solutions, transparent communication, and consistent high-paying freight opportunities.
            </p>
          </motion.div>
        </FadeSection>

        {/* Supporting fact strip */}
        <FadeSection>
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-7 py-5 flex flex-wrap gap-6 items-center justify-between"
          >
            <p className="text-gray-400 text-[14px] font-light max-w-lg leading-relaxed">
              Every decision at AJAX is made with one question in mind: <span className="text-white font-medium">does this put more money in our carrier's pocket?</span>
            </p>
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-sm px-6 py-3 rounded-xl transition-colors duration-200 shadow-[0_4px_18px_rgba(245,158,11,0.28)] flex-shrink-0"
              >
                Start Today <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </FadeSection>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   VALUES — cream section, 4-col cards
─────────────────────────────────────────────────────────────────── */
function Values() {
  return (
    <section className="bg-[#F8F7F3] border-b border-[#E8E5DE] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <FadeSection className="max-w-2xl mb-14">
          <SectionPill>Our Values</SectionPill>
          <motion.h2
            variants={fadeUp}
            className="leading-[0.92] text-gray-900"
            style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(42px,5.5vw,76px)' }}
          >
            HOW WE<br /><span className="text-amber-500">OPERATE.</span>
          </motion.h2>
        </FadeSection>

        <FadeSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUES.map((v, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -5, borderColor: '#FCD34D', boxShadow: '0 16px 48px rgba(0,0,0,0.10)' }}
              className="bg-white border-2 border-[#E8E5DE] rounded-2xl p-7 transition-all duration-250 shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-5">
                {v.icon}
              </div>
              <h4 className="text-gray-900 font-semibold text-[17px] mb-3">{v.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light">{v.desc}</p>
            </motion.div>
          ))}
        </FadeSection>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   INLINE CTA — amber strip between Values and Who We Serve
─────────────────────────────────────────────────────────────────── */
function InlineCTA() {
  return (
    <FadeSection className="bg-amber-400">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10 lg:py-12">
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-amber-900 text-[11px] font-bold tracking-[2.5px] uppercase mb-1">Ready to work together?</p>
            <h3 className="text-[#0A0A14] leading-tight" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(28px,3.5vw,46px)' }}>
              YOUR DEDICATED DISPATCHER IS WAITING.
            </h3>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#0A0A14] hover:bg-gray-800 text-white font-bold text-[14px] px-7 py-3.5 rounded-xl transition-colors duration-200 shadow-[0_6px_20px_rgba(0,0,0,0.22)]"
              >
                Get Started <ArrowRight size={15} />
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
   WHO WE SERVE — dark section, 4-col numbered cards
─────────────────────────────────────────────────────────────────── */
function WhoWeServe() {
  return (
    <section className="bg-[#0A0A14] border-b border-white/[0.06] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <FadeSection className="max-w-2xl mb-14">
          <SectionPill dark>Who We Serve</SectionPill>
          <motion.h2
            variants={fadeUp}
            className="text-white leading-[0.92]"
            style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(42px,5.5vw,76px)' }}
          >
            BUILT FOR CARRIERS<br /><span className="text-amber-400">LIKE YOU.</span>
          </motion.h2>
        </FadeSection>

        <FadeSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHO_WE_SERVE.map((item, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -4, borderColor: 'rgba(245,158,11,0.30)', backgroundColor: 'rgba(245,158,11,0.04)' }}
              className="border-2 border-white/[0.09] rounded-2xl p-7 transition-all duration-250"
            >
              <div
                className="text-amber-400/30 leading-none mb-4"
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 52 }}
              >
                {item.n}
              </div>
              <h4 className="text-white font-semibold text-[15px] mb-2.5 leading-tight">{item.title}</h4>
              <p className="text-gray-500 text-[13px] leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </FadeSection>

        {/* Supporting line */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center text-sm text-gray-500 mt-10"
        >
          Operating across <span className="font-semibold text-gray-300">48 states</span> — Mon–Sat, 9AM–6PM EST.
        </motion.p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   FINAL CTA BANNER — flat amber, cross-hatch texture, no tilt
─────────────────────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section className="relative py-24 lg:py-32 bg-amber-400 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.055] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <FadeSection className="relative z-10 max-w-4xl mx-auto px-5 lg:px-10 text-center">
        <motion.p variants={fadeIn} className="text-amber-900 text-[11px] font-bold tracking-[3px] uppercase mb-4">
          Let's build something together
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="text-[#0A0A14] leading-[0.88] mb-6"
          style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(50px,7.5vw,100px)' }}
        >
          LET&apos;S PARTNER UP.
        </motion.h2>
        <motion.p variants={fadeUp} className="text-amber-900 text-base lg:text-lg leading-relaxed max-w-lg mx-auto mb-10 font-medium">
          Ready to hand off the operational side and focus on the road? Our dispatchers are ready — onboarding takes less than 24 hours.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-[#0A0A14] hover:bg-gray-800 text-white font-bold text-[15px] px-9 py-4 rounded-xl shadow-[0_10px_32px_rgba(0,0,0,0.28)] hover:shadow-[0_16px_44px_rgba(0,0,0,0.36)] transition-all duration-200"
            >
              Get In Touch <ArrowRight />
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
              +1 (855) 479-4089
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
function IconShield()   { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> }
function IconZap()      { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> }
function IconUsers()    { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> }
function IconTrending() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> }
function IconTarget()   { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> }
function IconEye()      { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> }

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
export default function AboutPage() {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <Hero />
      <Story />
      <MissionVision />
      <Values />
      <InlineCTA />
      <WhoWeServe />
      <CTABanner />
    </>
  )
}