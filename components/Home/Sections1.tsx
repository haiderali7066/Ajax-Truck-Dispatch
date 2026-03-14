'use client'

// components/Home/TrustBar.tsx
// components/Home/ServicesSection.tsx
// components/Home/EquipmentSection.tsx
// — all in one file for brevity; each is a named export

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
} from 'framer-motion'
import {
  fadeUp, scaleIn, stagger, FadeSection, SectionPill, ArrowRight,
  IconSearch, IconDollar, IconChat, IconFile, IconRoute, IconPerson,
} from './shared'

/* ─────────────────────────────────────────
   TRUST BAR
───────────────────────────────────────── */

const TRUST_BADGES = [
  { label: 'MC Authority Verified',   icon: '🛡️' },
  { label: 'FMCSA Compliant',         icon: '✅' },
  { label: 'DAT Load Board Access',   icon: '🌐' },
  { label: 'Truckstop.com Partner',   icon: '🚛' },
  { label: 'A+ Broker Relationships', icon: '⭐' },
  { label: 'Paperwork 100% Handled',  icon: '📋' },
]

export function TrustBar() {
  return (
    <section className="bg-[#F8F7F3] border-b border-[#E8E5DE] py-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <FadeSection>
          <motion.p variants={fadeUp} className="text-center text-[10px] font-bold uppercase tracking-[2.5px] text-amber-700/65 mb-6">
            Trusted by carriers across the United States
          </motion.p>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
            {TRUST_BADGES.map((b, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -3, borderColor: '#F59E0B', backgroundColor: '#FFFBEB' }}
                className="group flex flex-col items-center gap-1.5 p-3 lg:p-4 rounded-xl bg-white border border-[#E8E5DE] shadow-sm transition-all duration-200 cursor-default"
              >
                <span className="text-lg lg:text-xl">{b.icon}</span>
                <span className="text-[10px] lg:text-[11px] font-semibold text-gray-500 group-hover:text-amber-800 text-center leading-snug transition-colors duration-200">
                  {b.label}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   SERVICES SECTION
───────────────────────────────────────── */

const SERVICES = [
  { icon: <IconSearch />, title: 'Load Searching',       desc: 'We find high-paying freight from trusted brokers on DAT, Truckstop, and all major load boards — so your truck never sits idle.',               tag: 'Best rates, every time'    },
  { icon: <IconDollar />, title: 'Rate Negotiation',     desc: 'Our dispatchers negotiate aggressively with brokers to secure the highest freight rates available for your equipment type and lane.',        tag: 'Avg. $2.80 / mile'         },
  { icon: <IconChat />,   title: 'Broker Communication', desc: 'From first contact to load confirmation, we manage all broker communication on your behalf. Zero back-and-forth for you.',                   tag: 'Zero hassle for drivers'   },
  { icon: <IconFile />,   title: 'Paperwork & Docs',     desc: 'Setup packets, rate confirmations, invoices, and billing docs — handled professionally and submitted on time, every time.',                  tag: 'Full back-office support'  },
  { icon: <IconRoute />,  title: 'Route Planning',       desc: 'Smart backhaul planning and load sequencing to reduce empty miles and keep your truck generating revenue throughout the week.',               tag: 'More miles, less deadhead' },
  { icon: <IconPerson />, title: 'Dedicated Dispatcher', desc: 'One dispatcher. One point of contact. They know your truck, your lanes, and your goals — and work every day to move you forward.',          tag: 'Your personal partner'     },
]

export function ServicesSection() {
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
            <motion.div
              key={i}
              variants={scaleIn}
              layout
              onClick={() => setExpanded(expanded === i ? null : i)}
              whileHover={{ y: -4 }}
              transition={{ layout: { duration: 0.28 } }}
              className="rounded-2xl p-6 border-2 cursor-pointer bg-white border-[#E8E5DE] hover:border-amber-300 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.09)] transition-all duration-250"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-amber-50 border border-amber-200 text-amber-600">
                {s.icon}
              </div>
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
            <motion.span whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <ArrowRight size={14} />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   EQUIPMENT SECTION
───────────────────────────────────────── */

const EQUIPMENT = [
  { name: 'Dry Van',    emoji: '🚛', desc: 'General freight, enclosed trailer' },
  { name: 'Reefer',     emoji: '❄️', desc: 'Temperature-controlled loads'      },
  { name: 'Flatbed',    emoji: '🏗️', desc: 'Oversized & heavy cargo'           },
  { name: 'Step Deck',  emoji: '📐', desc: 'Taller freight, lower deck'        },
  { name: 'Power Only', emoji: '⚡', desc: 'Drop-and-hook, live loads'         },
  { name: 'Box Truck',  emoji: '📦', desc: 'Local & urban deliveries'          },
]

export function EquipmentSection() {
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
            <motion.div
              key={i}
              variants={fadeUp}
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
              <motion.div animate={{ scale: active === eq.name ? 1.25 : 1 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="text-[30px] lg:text-[36px] mb-2">
                {eq.emoji}
              </motion.div>
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
