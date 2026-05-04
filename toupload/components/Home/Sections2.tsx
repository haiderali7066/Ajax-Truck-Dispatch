'use client'

// components/Home/Sections2.tsx
// HowItWorksSection, WhyUsSection, TestimonialsSection, CTABannerSection

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
} from 'framer-motion'
import {
  fadeUp, fadeIn, FadeSection, SectionPill, Stars, ArrowRight,
  IconPerson, IconDollar, IconRoute, IconFile, IconMap, IconClock,
} from './shared'

/* ─────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────── */



const STEPS = [
  {
    n: '01',
    title: 'Submit Your Info',
    desc: 'Share your company details, truck type, and preferred lanes. Takes under 5 minutes.',
  },
  {
    n: '02',
    title: 'Upload Documents',
    desc: 'Securely upload your required carrier documents to get your account set up.',
  },
  {
    n: '03',
    title: 'Sign Agreement',
    desc: 'Review and sign a simple, transparent dispatch agreement — no long-term lock-in.',
  },
  {
    n: '04',
    title: 'Meet Your Dispatcher',
    desc: 'We assign a dedicated dispatcher who learns your schedule, goals, and preferences.',
  },
  {
    n: '05',
    title: 'Start Rolling',
    desc: 'Your dispatcher finds loads, negotiates rates, and keeps your truck profitable.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-gray-200" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <h2
            className="leading-[0.95] mb-6 text-gray-900"
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 'clamp(42px,5vw,76px)',
            }}
          >
            FROM SIGN-UP TO<br />
            <span className="text-amber-500">FIRST LOAD IN 24H</span>
          </h2>

          <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
            Simple onboarding. No delays. No confusion. Just a clear path to getting your truck on the road and earning fast.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 sm:gap-y-14 lg:gap-x-6">

          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center px-2"
            >
              {/* Circle */}
              <div className="w-[90px] h-[90px] lg:w-[105px] lg:h-[105px] rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mb-5 shadow-sm">
                <span
                  className="text-amber-500"
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: 'clamp(28px,2.5vw,36px)',
                  }}
                >
                  {step.n}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-[15px] lg:text-[17px] text-gray-900 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-[13px] lg:text-[14px] leading-relaxed max-w-[240px]">
                {step.desc}
              </p>
            </motion.div>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-16 lg:mt-20 flex justify-center">
          <Link
            href="/contact"
            className="px-10 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-white text-sm lg:text-base font-bold transition-all shadow-md hover:shadow-lg"
          >
            Get Started
          </Link>
        </div>

      </div>
    </section>
  )
}
/* ─────────────────────────────────────────
   WHY US
───────────────────────────────────────── */

const REASONS = [
  { icon: <IconPerson />, title: 'One Dedicated Dispatcher',    desc: "You're never passed around. One person manages your account daily and knows your operation inside out." },
  { icon: <IconDollar />, title: 'Maximum Revenue Focus',       desc: 'Our dispatchers are motivated to get you the highest rates possible — your success is our success.' },
  { icon: <IconRoute />,  title: 'Zero Empty Miles Strategy',   desc: 'Smart backhaul planning and lane pairing keeps deadhead to an absolute minimum.' },
  { icon: <IconFile />,   title: 'Complete Paperwork Coverage', desc: 'Rate confirmations, broker packets, invoicing — handled on time so your cash flow never stalls.' },
  { icon: <IconMap />,    title: '48-State Load Network',       desc: 'Strong broker relationships and load board access across all major US freight lanes every day.' },
  { icon: <IconClock />,  title: 'Mon–Sat Availability',        desc: 'Our team is available 9AM–6PM EST, Monday through Saturday — right when freight moves.' },
]

export function WhyUsSection() {
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
   TESTIMONIALS
───────────────────────────────────────── */

const REVIEWS = [
  { role: 'Owner-Operator · Dry Van · Texas', initials: 'MT', color: 'bg-amber-100 text-amber-700', rating: 5, quote: 'AJAX doubled my weekly revenue in the first month. My dispatcher knows exactly what I need — high rates, no drama, and loads that respect my home time.' },
  { role: 'Fleet Owner · 3 Trucks · Ohio', initials: 'SR', color: 'bg-blue-100 text-blue-700', rating: 5, quote: 'Managing three trucks was exhausting. AJAX handles everything now. Loads are always lined up. Huge stress relief.' },
  { role: 'Independent Driver · Flatbed · Georgia', initials: 'JK', color: 'bg-emerald-100 text-emerald-700', rating: 5, quote: "Rates I couldn't get on my own. I haven't had an empty day in months. The paperwork alone made it worth switching." },
  { role: 'Owner-Operator · Reefer · Illinois', initials: 'DM', color: 'bg-purple-100 text-purple-700', rating: 5, quote: 'Zero empty miles back from the northeast. Revenue increased significantly within weeks.' },
  { role: 'Small Fleet · 5 Trucks · California', initials: 'PW', color: 'bg-rose-100 text-rose-700', rating: 5, quote: 'All paperwork is handled before I even hear about it. Drivers are happier and operations run smoother.' },
  { role: 'Power Only · Step Deck · Tennessee', initials: 'TH', color: 'bg-teal-100 text-teal-700', rating: 5, quote: 'Rates are consistently higher than what I used to book myself. Switching was the best decision.' },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return
    const id = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % REVIEWS.length)
    }, 5200)
    return () => clearInterval(id)
  }, [isHovered])

  const paginate = (dir: number) => {
    setDirection(dir)
    setCurrent((c) => (c + dir + REVIEWS.length) % REVIEWS.length)
  }

  return (
    <section className="py-14 lg:py-20 bg-white border-b border-gray-200" id="testimonials">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className="leading-[0.93] mb-3 text-gray-900"
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 'clamp(44px,5.5vw,80px)',
            }}
          >
            CARRIERS LOVE<br />
            <span className="text-amber-500">WORKING WITH US</span>
          </h2>
          <p className="text-gray-600 text-base">
            Real results from real owner-operators across the USA.
          </p>
        </div>

        <div
          className="w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

          {/* Desktop: 3-card */}
          <div className="hidden md:grid grid-cols-3 gap-5 w-full">
            {[-1, 0, 1].map((offset) => {
              const idx = (current + offset + REVIEWS.length) % REVIEWS.length
              const rv = REVIEWS[idx]
              const isCenter = offset === 0

              return (
                <motion.div
                  key={`${current}-${offset}`}
                  animate={{
                    opacity: isCenter ? 1 : 0.45,
                    scale: isCenter ? 1 : 0.97,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => {
                    if (offset !== 0) paginate(offset as 1 | -1)
                  }}
                  className={`w-full bg-white rounded-2xl p-7 flex flex-col ${
                    isCenter
                      ? 'border-2 border-amber-300 shadow-[0_8px_40px_rgba(0,0,0,0.08)]'
                      : 'border border-gray-200 shadow-sm cursor-pointer'
                  }`}
                >
                  <Stars n={rv.rating} />

                  <blockquote className="flex-1 mt-4 mb-6">
                    <p className="text-gray-700 text-[15px] lg:text-[16px] leading-[1.9] font-light italic">
                      &ldquo;{rv.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Footer (NO NAME) */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${rv.color}`}
                    >
                      {rv.initials}
                    </div>
                    <div className="text-gray-500 text-[13px] font-medium tracking-wide">
                      {rv.role}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile: single card */}
          <div className="md:hidden w-full">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -50 : 50,
                  transition: { duration: 0.3 },
                }}
                className="w-full bg-white border-2 border-amber-300 rounded-2xl p-6 shadow-[0_6px_28px_rgba(0,0,0,0.08)]"
              >
                <Stars n={REVIEWS[current].rating} />

                <blockquote className="mt-4 mb-5">
                  <p className="text-gray-700 text-[15px] lg:text-[16px] leading-[1.9] font-light italic">
                    &ldquo;{REVIEWS[current].quote}&rdquo;
                  </p>
                </blockquote>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${REVIEWS[current].color}`}
                  >
                    {REVIEWS[current].initials}
                  </div>
                  <div className="text-gray-500 text-[13px] font-medium tracking-wide">
                    {REVIEWS[current].role}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-7">
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => paginate(-1)}
              className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 hover:border-amber-400 hover:text-amber-500 transition"
            >
              ‹
            </motion.button>

            <div className="flex items-center gap-1.5">
              {REVIEWS.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1)
                    setCurrent(i)
                  }}
                  animate={{
                    width: i === current ? 22 : 7,
                    opacity: i === current ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-[3px] rounded-full bg-amber-500"
                />
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => paginate(1)}
              className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 hover:border-amber-400 hover:text-amber-500 transition"
            >
              ›
            </motion.button>
          </div>

          <p className="text-center text-[11px] text-gray-400 mt-2.5 font-medium">
            {current + 1} / {REVIEWS.length}
          </p>
        </div>

        {/* Bottom rating */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Stars n={5} />
          <span className="text-gray-600 text-sm">
            <span className="font-semibold text-gray-900">4.9 / 5</span> — based on 120+ reviews
          </span>
        </div>
      </div>
    </section>
  )
}
/* ─────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────── */

export function CTABannerSection() {
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
              +1 (346) 428-0370
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
