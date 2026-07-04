'use client'

// components/Home/HeroSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Root cause of carousel freeze:
//   The original code applied `style={{ opacity: bgOpacity }}` (a MotionValue)
//   directly on each AnimatePresence child. Framer Motion's exit animation also
//   animates opacity — the two systems fought each other, the MotionValue won,
//   and the slide got stuck at opacity 0 / never cleaned up.
//
// Fix:
//   • bgOpacity (scroll-driven) lives on a STATIC wrapper div — never on a
//     slide child that AnimatePresence is managing.
//   • Each slide div only handles x / scale enter/exit — opacity separately
//     tuned inside the variants so it can't conflict.
//   • isTransitioning guard prevents a new interval tick from starting a second
//     slide swap before the first one finishes.
//   • All images preloaded on mount — prevents mid-transition blank frames.
//   • Dot indicators are now clickable buttons (also guarded by isTransitioning).
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
} from 'framer-motion'
import { fadeUp, ArrowRight } from './shared'

// ── Slides: all truck/highway themed, different from every other page ─────────
const HERO_SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=1920&q=85',
    alt: 'Semi truck driving through mountain pass at sunrise',
  },
  {
    src: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=1920&q=85',
    alt: 'Long-haul truck on empty desert highway',
  },
  { src: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=85', alt: 'Semi truck driving on open highway' },
  
  {
    src: 'https://images.unsplash.com/photo-1485575301924-6891ef935dcd?w=1920&q=85',
    alt: 'Truck fleet on interstate highway at golden hour',
  },
]

const STATS = [
  { value: '500+',    label: 'Carriers Served'  },
  { value: '98%',     label: 'On-Time Dispatch' },
  { value: '$2.8/mi', label: 'Avg Rate Secured' },
  { value: '48',      label: 'States Covered'   },
]

// Total duration one slide is visible before the next starts
const SLIDE_DURATION = 5500
// Must be >= the longest framer transition duration below (1400ms)
const TRANSITION_LOCK = 1500

export function HeroSection() {
  const [slide, setSlide]               = useState(0)
  const [direction, setDirection]       = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })

  // Content parallax — only on the text block, never on the carousel
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  // Scroll-dim — applied to the OUTER carousel wrapper, NOT individual slides
  const bgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.35])

  // Preload all images on first render so transitions are instant
  useEffect(() => {
    HERO_SLIDES.forEach(({ src }) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  // Helper — advance to a specific index, guarded by transition lock
  const goTo = (next: number, dir: number) => {
    if (isTransitioning || next === slide) return
    setIsTransitioning(true)
    setDirection(dir)
    setSlide(next)
    setTimeout(() => setIsTransitioning(false), TRANSITION_LOCK)
  }

  // Auto-advance timer — resets whenever isTransitioning changes
  useEffect(() => {
    if (isTransitioning) return
    const id = setInterval(() => {
      const next = (slide + 1) % HERO_SLIDES.length
      goTo(next, 1)
    }, SLIDE_DURATION)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide, isTransitioning])

  // ── Slide variants ───────────────────────────────────────────────────────────
  // Key: opacity is ONLY controlled here, never by an external MotionValue
  const slideV: Variants = {
    enter: (d: number) => ({
      x:       d > 0 ? '5%' : '-5%',
      opacity: 0,
      scale:   1.05,
    }),
    center: {
      x:          '0%',
      opacity:    1,
      scale:      1,
      transition: {
        duration: 1.4,
        ease:     [0.22, 1, 0.36, 1],
        opacity:  { duration: 0.9 },
      },
    },
    exit: (d: number) => ({
      x:          d > 0 ? '-4%' : '4%',
      opacity:    0,
      scale:      0.97,
      transition: {
        duration: 0.75,
        ease:     'easeIn',
        opacity:  { duration: 0.55 },
      },
    }),
  }

  const heroStagger: Variants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  }

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A14]">

      {/* ── Carousel wrapper ─────────────────────────────────────────────────
          bgOpacity (MotionValue) sits HERE — outside AnimatePresence.
          Individual slide divs only receive enter/center/exit variants.      */}
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slide}
            custom={direction}
            variants={slideV}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO_SLIDES[slide].src}
              alt={HERO_SLIDES[slide].alt}
              className="w-full h-full object-cover"
              fetchPriority={slide === 0 ? 'high' : 'auto'}
            />
            {/* Gradient: keeps headline legible whatever the image brightness */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A14]/92 via-[#0A0A14]/62 to-[#0A0A14]/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14]/90 via-transparent to-[#0A0A14]/18" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.10] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.15) 1px,transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* Amber glow — left */}
      <div
        className="absolute z-[1] left-[-60px] top-1/2 -translate-y-1/2 w-[480px] h-[480px] pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(245,158,11,0.10) 0%,transparent 70%)' }}
      />

      {/* Bottom dark fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-28 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(to top,#0A0A14,transparent)' }}
      />

      {/* Slide progress dots — clickable */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i, i > slide ? 1 : -1)}
            animate={{ width: i === slide ? 28 : 8, opacity: i === slide ? 1 : 0.38 }}
            transition={{ duration: 0.35 }}
            className="h-[3px] rounded-full bg-amber-400 cursor-pointer"
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Content — parallax y only ────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-10 pt-24 pb-16"
      >
        <motion.div className="max-w-[680px]" variants={heroStagger} initial="hidden" animate="visible">

          {/* Live badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 bg-amber-400/10 border border-amber-400/28 rounded-full px-4 py-2 mb-6"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-amber-400"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-amber-300 text-[11px] font-bold tracking-[2.5px] uppercase">
              Now Dispatching — Mon–Sat · 9AM–6PM EST
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="leading-[0.88] tracking-wide mb-5"
            style={{ fontFamily: "'Bebas Neue',sans-serif" }}
          >
            <span className="block text-white" style={{ fontSize: 'clamp(52px,9vw,116px)' }}>
              KEEP YOUR
            </span>
            <span
              className="block"
              style={{
                fontSize:             'clamp(52px,9vw,116px)',
                background:           'linear-gradient(90deg,#F59E0B,#FCD34D 35%,#F59E0B 65%,#B45309)',
                backgroundSize:       '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                backgroundClip:       'text',
                animation:            'shimmer 3.5s linear infinite',
              }}
            >
              TRUCKS
            </span>
            <span className="block text-white" style={{ fontSize: 'clamp(52px,9vw,116px)' }}>
              MOVING.
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={fadeUp}
            className="text-gray-300 text-base lg:text-lg leading-[1.8] max-w-[500px] mb-8 font-light"
          >
            Professional dispatch services for owner-operators &amp; carriers across the USA.
            We find the loads, negotiate the best rates, and handle all paperwork —
            so you stay focused on the road.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-[15px] px-7 py-3.5 rounded-xl transition-colors duration-200 shadow-[0_6px_24px_rgba(245,158,11,0.30)]"
              >
                Start Dispatch Today <ArrowRight />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/services"
                className="inline-flex items-center gap-2.5 border border-white/20 hover:border-amber-400/55 text-white hover:text-amber-300 font-semibold text-[15px] px-7 py-3.5 rounded-xl transition-all duration-200 bg-white/5"
              >
                See Our Services
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust pills */}
          <motion.ul variants={fadeUp} className="flex flex-wrap gap-x-5 gap-y-2 list-none">
            {['No hidden fees', 'Dedicated dispatcher', 'Start within 24 hours'].map(t => (
              <li key={t} className="flex items-center gap-1.5 text-sm text-gray-400 font-medium">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden border border-white/[0.08] backdrop-blur-sm"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ backgroundColor: 'rgba(245,158,11,0.07)' }}
              className="group bg-white/[0.04] transition-colors duration-300 px-5 py-6 lg:px-7 lg:py-7 border-r border-white/[0.06] last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
            >
              <div
                className="text-white group-hover:text-amber-400 transition-colors duration-300 leading-none tracking-wide mb-1"
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(32px,4.5vw,50px)' }}
              >
                {s.value}
              </div>
              <div className="text-gray-500 text-[10px] font-semibold uppercase tracking-[1.8px]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}