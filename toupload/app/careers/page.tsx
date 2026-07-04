'use client'

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
    <motion.div ref={ref} variants={stagger(delay)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}

function SectionPill({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <motion.div variants={fadeUp} className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-2 rounded-full mb-6 ${
      dark ? 'bg-amber-400/10 border border-amber-400/25 text-amber-300' : 'bg-amber-50 border border-amber-200 text-amber-800'
    }`}>
      <motion.span 
        className={`w-2 h-2 rounded-full ${dark ? 'bg-amber-400' : 'bg-amber-500'}`} 
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} 
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} 
      />
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
const JOBS = [
  {
    title: "Truck Dispatcher",
    location: "Remote",
    type: "Full-Time",
    description: "Manage loads, communicate with brokers, and coordinate drivers efficiently to maximize carrier profits.",
  },
  {
    title: "Sales Representative",
    location: "Lahore, Pakistan",
    type: "Full-Time",
    description: "Build relationships with new carriers, expand our network, and help grow Ajax Dispatch services globally.",
  },
  {
    title: "Support Specialist",
    location: "Remote",
    type: "Part-Time",
    description: "Assist carriers and clients with daily inquiries, documentation, and operational support.",
  },
]

const BENEFITS = [
  { 
    icon: <IconBriefcase />, 
    title: 'Career Growth', 
    desc: 'Learn the complex dispatching business and grow rapidly with an expanding logistics company.' 
  },
  { 
    icon: <IconClock />, 
    title: 'Flexible Work', 
    desc: 'Enjoy remote opportunities and adaptable schedules depending on your specific role and location.' 
  },
  { 
    icon: <IconGlobe />, 
    title: 'Global Team', 
    desc: 'Work alongside talented professionals serving top-tier freight carriers across the United States.' 
  },
]

/* ─────────────────────────────────────────────────────────────────
   HERO — Dark, highly textured, typography-focused
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
    <section ref={heroRef} className="relative min-h-[75vh] flex items-center overflow-hidden bg-[#0A0A14]">
      {/* Background Layers */}
      <div className="absolute inset-0 z-[1] opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0 z-[2] opacity-[0.09]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)', backgroundSize: '38px 38px' }} />
      <div className="absolute z-[3] inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
        {['CAREERS', 'AT AJAX'].map(w => (
          <span key={w} className="block text-center leading-[0.80] tracking-tight" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(96px, 19vw, 300px)', color: 'rgba(255,255,255,0.028)' }}>{w}</span>
        ))}
      </div>
      <div className="absolute z-[4] left-1/2 -translate-x-1/2 top-1/4 w-[800px] h-[640px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.02) 40%, transparent 66%)' }} />

      {/* Content */}
      <motion.div style={{ y: contentY }} className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-10 pt-32 pb-20 text-center">
        <motion.div variants={heroStagger} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
          <SectionPill dark>Join The Team</SectionPill>

          <motion.h1 variants={fadeUp} className="leading-[0.87] tracking-wide mb-7" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
            <span className="block text-white" style={{ fontSize: 'clamp(50px,7vw,100px)' }}>BUILD YOUR CAREER IN</span>
            <span className="block" style={{ fontSize: 'clamp(50px,7vw,100px)', background: 'linear-gradient(90deg,#F59E0B 0%,#FCD34D 35%,#F59E0B 65%,#B45309 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3.5s linear infinite' }}>TRUCK DISPATCHING.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-gray-400 text-base lg:text-[1.15rem] leading-[1.85] max-w-2xl mx-auto mb-10 font-light">
            Become part of a fast-growing logistics company helping carriers maximize profits and keep trucks moving safely across the USA.
          </motion.p>

          <motion.div variants={fadeUp}>
             <button onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-[#0A0A14] font-bold text-[15px] px-9 py-4 rounded-xl shadow-[0_10px_32px_rgba(245,158,11,0.15)] hover:shadow-[0_16px_44px_rgba(245,158,11,0.25)] transition-all duration-200">
               View Open Positions <ArrowRight />
             </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   WHY JOIN US — Cream strip (Matches ContactStrip)
─────────────────────────────────────────────────────────────────── */
function BenefitsStrip() {
  return (
    <section className="bg-[#F8F7F3] border-b border-[#E8E5DE] py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <FadeSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#0A0A14] leading-[0.9] tracking-wide mb-5" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5vw,64px)' }}>
            WHY JOIN AJAX DISPATCH?
          </h2>
          <p className="text-gray-600 text-base lg:text-lg font-medium leading-relaxed">
            We focus on aggressive growth, tight-knit teamwork, and building long-term, lucrative careers in the logistics industry.
          </p>
        </FadeSection>

        <FadeSection className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -6, borderColor: '#F59E0B', backgroundColor: '#FFFBEB' }}
              className="bg-white border-2 border-[#E8E5DE] rounded-2xl p-8 transition-all duration-250 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-6">
                {b.icon}
              </div>
              <h3 className="text-gray-900 font-bold text-xl mb-3">{b.title}</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed font-medium">{b.desc}</p>
            </motion.div>
          ))}
        </FadeSection>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   JOB LISTINGS — Dark theme glassmorphism cards
─────────────────────────────────────────────────────────────────── */
function JobsBoard() {
  return (
    <section id="open-positions" className="bg-[#0A0A14] py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10">
        <FadeSection className="mb-14">
          <SectionPill dark>Hiring Now</SectionPill>
          <h2 className="text-white leading-[0.9] tracking-wide mb-4" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5vw,64px)' }}>
            OPEN POSITIONS
          </h2>
          <p className="text-gray-400 font-medium">Explore current opportunities to join our remote and in-house teams.</p>
        </FadeSection>

        <FadeSection className="space-y-5">
          {JOBS.map((job, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(245,158,11,0.3)' }}
              className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm rounded-2xl p-6 lg:p-8 transition-all duration-300 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl text-white font-bold mb-4 group-hover:text-amber-400 transition-colors">{job.title}</h3>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[1px] uppercase bg-white/5 text-gray-300 px-3 py-1.5 rounded-lg">
                      <IconPin size={14} /> {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[1px] uppercase bg-amber-400/10 text-amber-300 border border-amber-400/20 px-3 py-1.5 rounded-lg">
                      <IconClock size={14} /> {job.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 text-[15px] leading-relaxed max-w-3xl">
                    {job.description}
                  </p>
                </div>

                <div className="pt-2 lg:pt-0">
                  <button className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-amber-400 text-white hover:text-black font-bold text-[14px] px-8 py-3.5 rounded-xl transition-all duration-200">
                    Apply Now
                  </button>
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
   FINAL CTA — Amber cross-hatch (Matches Contact CTABanner)
─────────────────────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section className="relative py-24 lg:py-32 bg-amber-400 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.055] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }} />

      <FadeSection className="relative z-10 max-w-4xl mx-auto px-5 lg:px-10 text-center">
        <motion.p variants={fadeIn} className="text-amber-900 text-[11px] font-bold tracking-[3px] uppercase mb-4">Don't see your role?</motion.p>
        <motion.h2 variants={fadeUp} className="text-[#0A0A14] leading-[0.88] mb-6" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(50px,7.5vw,100px)' }}>
          READY TO START<br />YOUR CAREER?
        </motion.h2>
        <motion.p variants={fadeUp} className="text-amber-900 text-base lg:text-lg leading-relaxed max-w-xl mx-auto mb-10 font-medium">
          We're always looking for driven talent. Send us your resume and we'll keep you in mind for future dispatch or sales opportunities.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
          <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
            <Link href="/contact" className="inline-flex items-center gap-2.5 bg-[#0A0A14] hover:bg-gray-800 text-white font-bold text-[15px] px-9 py-4 rounded-xl shadow-[0_10px_32px_rgba(0,0,0,0.28)] hover:shadow-[0_16px_44px_rgba(0,0,0,0.36)] transition-all duration-200">
              Contact Our Team <ArrowRight />
            </Link>
          </motion.div>
        </motion.div>
      </FadeSection>
    </section>
  )
}

/* ─────────────────────────────────────────
   ICONS
───────────────────────────────────────── */
function IconBriefcase({ size = 20 }: { size?: number }) { 
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> 
}
function IconClock({ size = 20 }: { size?: number }) { 
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 
}
function IconGlobe({ size = 20 }: { size?: number }) { 
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> 
}
function IconPin({ size = 20 }: { size?: number }) { 
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> 
}

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
export default function CareersPage() {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <Hero />
      <BenefitsStrip />
      <JobsBoard />
      <CTABanner />
    </>
  )
}