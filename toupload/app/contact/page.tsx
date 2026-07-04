'use client'


import { useRef, useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
} from 'framer-motion'
import FormSection from "./FormSection"

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
    <motion.div variants={fadeUp} className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-5 ${
      dark ? 'bg-amber-400/10 border border-amber-400/25 text-amber-300' : 'bg-amber-50 border border-amber-200 text-amber-800'
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
type FormData = {
  name: string; email: string; phone: string; company: string
  truckType: string; mcNumber: string; message: string
  agreement?: FileList
}

const TRUCK_TYPES = ['Dry Van', 'Reefer', 'Flatbed', 'Step Deck', 'Power Only', 'Box Truck']


const REQUIRED_DOCS = [
  'MC Authority Certificate',
  'USDOT Number',
  'Insurance Certificate (AJAX as cert. holder)',
  'W9 Form',
  'Signed Dispatch Agreement',
]

const CONTACT_INFO = [
  { icon: <IconPhone />, label: 'Phone',    value: '+1 (346) 428-0370',        href: 'tel:+1(346)428-0370'            },
  { icon: <IconMail />,  label: 'Email',    value: 'info@ajaxdispatch.com',    href: 'mailto:info@ajaxdispatch.com'},
  { icon: <IconPin />,   label: 'Location', value: '1500 N. GRANT ST, STE R, Denver, CO 80203, US',   href: null                          },
  { icon: <IconClock />, label: 'Hours',    value: 'Mon–Sat  9AM – 6PM EST',   href: null                          },
]

const STATS = [
  { value: '< 24h', label: 'Onboarding Time' },
  { value: '500+',  label: 'Carriers Served'  },
  { value: '98%',   label: 'Client Retention' },
  { value: 'Free',  label: 'Setup Fee'        },
]

/* ─────────────────────────────────────────────────────────────────
   HERO — texture-only, 2-col
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
      <div className="absolute inset-0 z-[1] opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }} />

      {/* Layer 2: dot grid */}
      <div className="absolute inset-0 z-[2] opacity-[0.09]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)', backgroundSize: '38px 38px' }} />

      {/* Layer 3: AJAX DISPATCH watermark */}
      <div className="absolute z-[3] inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
        {['AJAX', 'DISPATCH'].map(w => (
          <span key={w} className="block text-center leading-[0.80] tracking-tight" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(96px, 19vw, 300px)', color: 'rgba(255,255,255,0.028)' }}>{w}</span>
        ))}
      </div>

      {/* Layer 4: amber glows */}
      <div className="absolute z-[4] -left-24 top-1/2 -translate-y-1/2 w-[640px] h-[640px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.03) 44%, transparent 66%)' }} />
      <div className="absolute z-[4] right-[-80px] top-[-60px] w-[480px] h-[480px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 62%)' }} />

      {/* Top hairline */}
      <div className="absolute top-0 inset-x-0 h-[1px] z-10 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      {/* Bottom dark stop */}
      <div className="absolute bottom-0 inset-x-0 h-24 z-[8] pointer-events-none" style={{ background: 'linear-gradient(to top, #0A0A14 0%, #0A0A14 20%, transparent 100%)' }} />

      {/* Content */}
      <motion.div style={{ y: contentY }} className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-10 pt-28 pb-20">

        {/* 2-col */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-20">

          {/* Left: headline */}
          <motion.div variants={heroStagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-2 rounded-full mb-6">
              <motion.span className="w-2 h-2 rounded-full bg-amber-400" animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
              Start Your Dispatch
            </motion.div>

            <motion.h1 variants={fadeUp} className="leading-[0.87] tracking-wide mb-7" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
              <span className="block text-white" style={{ fontSize: 'clamp(54px,7vw,108px)' }}>LET&apos;S GET</span>
              <span className="block" style={{ fontSize: 'clamp(54px,7vw,108px)', background: 'linear-gradient(90deg,#F59E0B 0%,#FCD34D 35%,#F59E0B 65%,#B45309 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3.5s linear infinite' }}>YOUR TRUCK</span>
              <span className="block text-white" style={{ fontSize: 'clamp(54px,7vw,108px)' }}>LOADED.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-gray-400 text-base lg:text-[1.08rem] leading-[1.85] max-w-[480px] mb-10 font-light">
              Reach out to start your dispatch service. Onboarding takes less than 24 hours — your first load could be booked the same day.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-x-7 gap-y-2">
              {['No setup fee', 'No long-term contracts', 'First load within 24 hours'].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: contact info panel */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="hidden lg:block">
            <div className="rounded-2xl border border-white/[0.09] bg-white/[0.03] backdrop-blur-sm overflow-hidden">
              {/* Panel header */}
              <div className="px-6 py-4 border-b border-white/[0.07] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-white text-[12px] font-bold tracking-[1.5px] uppercase">Get In Touch</span>
                </div>
                <span className="text-[10px] font-bold tracking-[1.5px] uppercase bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 px-2.5 py-1 rounded-full">● Accepting Carriers</span>
              </div>

              {/* Contact rows */}
              <div className="divide-y divide-white/[0.05]">
                {CONTACT_INFO.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.65 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.03] transition-colors duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/15 flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:bg-amber-400/15 transition-colors duration-200">
                      {c.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-500 text-[10px] font-bold tracking-[1.5px] uppercase mb-0.5">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="text-white text-[13px] font-medium hover:text-amber-400 transition-colors duration-150">{c.value}</a>
                      ) : (
                        <span className="text-white text-[13px] font-medium">{c.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-amber-400/[0.06] border-t border-white/[0.07]">
                <p className="text-amber-300/80 text-[12px] font-medium">
                  Prefer to talk? Call us during business hours and we'll walk you through the process.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden border border-white/[0.08] backdrop-blur-sm"
        >
          {STATS.map((s, i) => (
            <motion.div key={i} whileHover={{ backgroundColor: 'rgba(245,158,11,0.07)' }} className="group bg-white/[0.04] transition-colors duration-300 px-7 py-7 border-r border-white/[0.06] last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r">
              <div className="text-white group-hover:text-amber-400 transition-colors duration-300 leading-none tracking-wide mb-1.5" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,4.5vw,50px)' }}>{s.value}</div>
              <div className="text-gray-500 text-[11px] font-semibold uppercase tracking-[1.8px]">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   CONTACT DETAILS — cream 4-col strip
─────────────────────────────────────────────────────────────────── */
function ContactStrip() {
  return (
    <section className="bg-[#F8F7F3] border-b border-[#E8E5DE] py-12">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <FadeSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_INFO.map((c, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -4, borderColor: '#F59E0B', backgroundColor: '#FFFBEB' }}
              className="bg-white border-2 border-[#E8E5DE] rounded-2xl p-6 transition-all duration-250 shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-4">
                {c.icon}
              </div>
              <p className="text-gray-400 text-[10px] font-bold tracking-[2px] uppercase mb-1.5">{c.label}</p>
              {c.href ? (
                <a href={c.href} className="text-gray-900 font-semibold text-[14px] hover:text-amber-600 transition-colors duration-150 leading-snug">{c.value}</a>
              ) : (
                <p className="text-gray-900 font-semibold text-[14px] leading-snug">{c.value}</p>
              )}
            </motion.div>
          ))}
        </FadeSection>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   FORM SECTION — cream bg, 3-col grid (form 2/3 + sidebar 1/3)
─────────────────────────────────────────────────────────────────── */
// function FormSection() {
//   const [submitted, setSubmitted]   = useState(false)
//   const [loading, setLoading]       = useState(false)
//   const [fileInfo, setFileInfo]     = useState<File | null>(null)
//   const [fileDrag, setFileDrag]     = useState(false)
//   const [fileError, setFileError]   = useState('')
//   const fileInputRef                = useRef<HTMLInputElement>(null)

//   const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

//   /* File validation */
//   const ALLOWED = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
//   const MAX_MB  = 10

//   function validateFile(file: File): string {
//     if (!ALLOWED.includes(file.type)) return 'Only PDF or Word documents (.pdf, .doc, .docx)'
//     if (file.size > MAX_MB * 1024 * 1024) return `File must be under ${MAX_MB}MB`
//     return ''
//   }

//   function handleFilePick(file: File) {
//     const err = validateFile(file)
//     setFileError(err)
//     if (!err) setFileInfo(file)
//   }

//   function handleDrop(e: React.DragEvent) {
//     e.preventDefault()
//     setFileDrag(false)
//     const file = e.dataTransfer.files[0]
//     if (file) handleFilePick(file)
//   }

//   /* Submit — send as multipart/form-data so the file travels with the request */
//   const onSubmit = async (data: FormData) => {
//     setLoading(true)
//     try {
//       const fd = new window.FormData()
//       fd.append('name',      data.name)
//       fd.append('email',     data.email)
//       fd.append('phone',     data.phone)
//       fd.append('company',   data.company  ?? '')
//       fd.append('truckType', data.truckType)
//       fd.append('mcNumber',  data.mcNumber ?? '')
//       fd.append('message',   data.message  ?? '')
//       if (fileInfo) fd.append('agreement', fileInfo, fileInfo.name)

//       const res = await fetch('/api/contact', { method: 'POST', body: fd })
//       if (res.ok) setSubmitted(true)
//     } catch (e) { console.error(e) }
//     finally { setLoading(false) }
//   }

//   const inputClass = "w-full bg-[#F8F7F3] border-2 border-[#E8E5DE] rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-200 font-medium"
//   const labelClass = "block text-[10px] text-gray-500 font-bold tracking-[2px] uppercase mb-2"

//   return (
//     <section className="bg-[#F8F7F3] border-b border-[#E8E5DE] py-20 lg:py-28">
//       <div className="max-w-7xl mx-auto px-5 lg:px-10">
//         <div className="grid lg:grid-cols-3 gap-10 items-start">

//           {/* ── Form — 2/3 width ── */}
//           <div className="lg:col-span-2">
//             <FadeSection className="mb-10">
//               <SectionPill>Start Onboarding</SectionPill>
//               <motion.h2 variants={fadeUp} className="leading-[0.92] mb-4 text-gray-900" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5vw,68px)' }}>
//                 FILL IN YOUR DETAILS.<br /><span className="text-amber-500">WE'LL HANDLE THE REST.</span>
//               </motion.h2>
//               <motion.p variants={fadeUp} className="text-gray-600 text-base font-light leading-relaxed max-w-lg">
//                 Submit your info and we'll reach back within 24 hours to complete onboarding and assign your dedicated dispatcher.
//               </motion.p>
//             </FadeSection>

//             <AnimatePresence mode="wait">
//               {submitted ? (
//                 <motion.div
//                   key="success"
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//                   className="bg-white border-2 border-amber-300 rounded-2xl p-12 text-center shadow-[0_8px_40px_rgba(0,0,0,0.07)]"
//                 >
//                   <div className="w-16 h-16 rounded-full bg-amber-400/10 border-2 border-amber-400/30 flex items-center justify-center mx-auto mb-6">
//                     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
//                   </div>
//                   <h3 className="text-gray-900 mb-2" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: '1px' }}>MESSAGE RECEIVED</h3>
//                   <p className="text-gray-500 text-[15px] font-light leading-relaxed max-w-sm mx-auto">
//                     We'll contact you within 24 hours to complete your onboarding and assign your dedicated dispatcher.
//                   </p>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="form"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                   className="bg-white border-2 border-[#E8E5DE] rounded-2xl p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
//                 >
//                   <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

//                     {/* Row 1: Name + Email */}
//                     <div className="grid md:grid-cols-2 gap-5">
//                       <div>
//                         <label className={labelClass}>Full Name *</label>
//                         <input {...register('name', { required: true })} className={inputClass} placeholder="John Smith" />
//                         {errors.name && <p className="text-red-500 text-[11px] mt-1 font-medium">Required</p>}
//                       </div>
//                       <div>
//                         <label className={labelClass}>Email Address *</label>
//                         <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className={inputClass} placeholder="john@company.com" />
//                         {errors.email && <p className="text-red-500 text-[11px] mt-1 font-medium">Valid email required</p>}
//                       </div>
//                     </div>

//                     {/* Row 2: Phone + Company */}
//                     <div className="grid md:grid-cols-2 gap-5">
//                       <div>
//                         <label className={labelClass}>Phone Number *</label>
//                         <input {...register('phone', { required: true })} className={inputClass} placeholder="+1 (555) 000-0000" />
//                         {errors.phone && <p className="text-red-500 text-[11px] mt-1 font-medium">Required</p>}
//                       </div>
//                       <div>
//                         <label className={labelClass}>Company Name</label>
//                         <input {...register('company')} className={inputClass} placeholder="Your Trucking LLC" />
//                       </div>
//                     </div>

//                     {/* Row 3: Truck Type + MC Number */}
//                     <div className="grid md:grid-cols-2 gap-5">
//                       <div>
//                         <label className={labelClass}>Truck Type *</label>
//                         <select {...register('truckType', { required: true })} className={inputClass}>
//                           <option value="">Select truck type</option>
//                           {TRUCK_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
//                         </select>
//                         {errors.truckType && <p className="text-red-500 text-[11px] mt-1 font-medium">Required</p>}
//                       </div>
//                       <div>
//                         <label className={labelClass}>MC Number</label>
//                         <input {...register('mcNumber')} className={inputClass} placeholder="MC-000000" />
//                       </div>
//                     </div>

//                     {/* Message */}
//                     <div>
//                       <label className={labelClass}>Message</label>
//                       <textarea {...register('message')} rows={4} className={`${inputClass} resize-none`} placeholder="Tell us about your operation — lanes, goals, or any questions..." />
//                     </div>

//                     {/* ── File upload: Dispatch Agreement ── */}
//                     <div>
//                       <label className={labelClass}>
//                         Dispatch Agreement
//                         <span className="ml-1.5 text-gray-400 normal-case tracking-normal font-normal">(optional — PDF or Word, max 10MB)</span>
//                       </label>

//                       {/* Drop zone */}
//                       <div
//                         onDragOver={(e) => { e.preventDefault(); setFileDrag(true) }}
//                         onDragLeave={() => setFileDrag(false)}
//                         onDrop={handleDrop}
//                         onClick={() => fileInputRef.current?.click()}
//                         className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-7 cursor-pointer transition-all duration-200 ${
//                           fileDrag
//                             ? 'border-amber-400 bg-amber-50'
//                             : fileInfo
//                             ? 'border-amber-300 bg-amber-50/60'
//                             : fileError
//                             ? 'border-red-300 bg-red-50/40'
//                             : 'border-[#E8E5DE] bg-[#F8F7F3] hover:border-amber-300 hover:bg-amber-50/40'
//                         }`}
//                       >
//                         {/* Hidden native input */}
//                         <input
//                           ref={fileInputRef}
//                           type="file"
//                           accept=".pdf,.doc,.docx"
//                           className="hidden"
//                           onChange={(e) => {
//                             const file = e.target.files?.[0]
//                             if (file) handleFilePick(file)
//                           }}
//                         />

//                         {fileInfo ? (
//                           /* File selected state */
//                           <>
//                             <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-300 flex items-center justify-center text-amber-600">
//                               <IconFile />
//                             </div>
//                             <div className="text-center">
//                               <p className="text-gray-900 text-sm font-semibold leading-tight">{fileInfo.name}</p>
//                               <p className="text-gray-500 text-[11px] mt-0.5">{(fileInfo.size / 1024 / 1024).toFixed(2)} MB</p>
//                             </div>
//                             <button
//                               type="button"
//                               onClick={(e) => { e.stopPropagation(); setFileInfo(null); setFileError(''); if (fileInputRef.current) fileInputRef.current.value = '' }}
//                               className="text-[11px] font-bold text-red-500 hover:text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-full transition-colors duration-150"
//                             >
//                               Remove
//                             </button>
//                           </>
//                         ) : (
//                           /* Empty state */
//                           <>
//                             <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors duration-200 ${fileDrag ? 'bg-amber-400/15 border-amber-300 text-amber-600' : 'bg-gray-100 border-[#E8E5DE] text-gray-400'}`}>
//                               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//                                 <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
//                                 <polyline points="17 8 12 3 7 8"/>
//                                 <line x1="12" y1="3" x2="12" y2="15"/>
//                               </svg>
//                             </div>
//                             <div className="text-center">
//                               <p className="text-gray-700 text-sm font-semibold">
//                                 {fileDrag ? 'Drop it here' : 'Click to upload or drag & drop'}
//                               </p>
//                               <p className="text-gray-400 text-[11px] mt-0.5">Signed Dispatch Agreement · PDF, DOC, DOCX · Max 10MB</p>
//                             </div>
//                           </>
//                         )}
//                       </div>

//                       {fileError && (
//                         <p className="text-red-500 text-[11px] mt-1.5 font-medium flex items-center gap-1">
//                           <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
//                           {fileError}
//                         </p>
//                       )}

//                       <p className="text-gray-400 text-[11px] mt-1.5">
//                         Don't have the agreement yet?{' '}
//                         <a href="/dispatch-agreement.pdf" download className="text-amber-600 font-semibold hover:text-amber-700 underline underline-offset-2">Download template</a>
//                         {' '}— you can also submit without it and we'll send one during onboarding.
//                       </p>
//                     </div>

//                     {/* Submit */}
//                     <motion.button
//                       type="submit"
//                       disabled={loading || !!fileError}
//                       whileHover={{ y: -2, scale: 1.01 }}
//                       whileTap={{ scale: 0.98 }}
//                       transition={{ type: 'spring', stiffness: 400, damping: 18 }}
//                       className="w-full flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-[15px] py-4 rounded-xl transition-colors duration-200 shadow-[0_6px_22px_rgba(245,158,11,0.28)] hover:shadow-[0_10px_32px_rgba(245,158,11,0.38)] disabled:opacity-60 disabled:cursor-not-allowed"
//                     >
//                       {loading ? (
//                         <span className="flex items-center gap-2">
//                           <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
//                           Sending…
//                         </span>
//                       ) : (
//                         <>
//                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
//                           Submit Onboarding Request
//                         </>
//                       )}
//                     </motion.button>
//                   </form>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* ── Sidebar — 1/3 width ── */}
//           <div className="space-y-5">

//             {/* Required docs card */}
//             <FadeSection delay={0.15}>
//               <motion.div
//                 variants={scaleIn}
//                 className="bg-white border-2 border-[#E8E5DE] rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
//               >
//                 {/* Card header */}
//                 <div className="bg-[#0A0A14] px-6 py-5 flex items-center gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 flex-shrink-0">
//                     <IconFile />
//                   </div>
//                   <div>
//                     <p className="text-white font-semibold text-[14px] leading-tight">Required Documents</p>
//                     <p className="text-gray-500 text-[11px] mt-0.5">Have these ready to speed up onboarding</p>
//                   </div>
//                 </div>

//                 {/* Doc rows */}
//                 <div className="divide-y divide-[#F0EDE8]">
//                   {REQUIRED_DOCS.map((doc, i) => (
//                     <motion.div
//                       key={i}
//                       initial={{ opacity: 0, x: 10 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
//                       className="flex items-start gap-3 px-6 py-3.5"
//                     >
//                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" className="flex-shrink-0 mt-0.5">
//                         <polyline points="20 6 9 17 4 12"/>
//                       </svg>
//                       <span className="text-gray-700 text-[13px] leading-snug font-medium">{doc}</span>
//                     </motion.div>
//                   ))}
//                 </div>

//                 <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
//                   <p className="text-amber-800 text-[12px] font-semibold">All documents handled securely — no surprises.</p>
//                 </div>
//               </motion.div>
//             </FadeSection>

//             {/* Call card */}
//             <FadeSection delay={0.25}>
//               <motion.div
//                 variants={scaleIn}
//                 className="bg-white border-2 border-[#E8E5DE] rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:border-amber-300 transition-all duration-250"
//               >
//                 <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-4">
//                   <IconPhone />
//                 </div>
//                 <h4 className="text-gray-900 font-semibold text-[15px] mb-2">Prefer to call?</h4>
//                 <p className="text-gray-500 text-[13px] leading-relaxed font-light mb-5">
//                   Call us during business hours and we'll walk you through the entire process on the spot.
//                 </p>
//                 <motion.a
//                   href="tel:+18554794089"
//                   whileHover={{ y: -2, scale: 1.02 }}
//                   whileTap={{ scale: 0.97 }}
//                   className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-sm py-3 px-5 rounded-xl transition-colors duration-200 shadow-[0_4px_14px_rgba(245,158,11,0.24)]"
//                 >
//                   <IconPhone />
//                   +1 (346) 428-0370
//                 </motion.a>
//               </motion.div>
//             </FadeSection>

//             {/* Hours reminder */}
//             <FadeSection delay={0.35}>
//               <motion.div
//                 variants={fadeUp}
//                 className="rounded-2xl border-2 border-[#E8E5DE] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
//               >
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center flex-shrink-0">
//                     <IconClock />
//                   </div>
//                   <h4 className="text-gray-900 font-semibold text-[14px]">Business Hours</h4>
//                 </div>
//                 <div className="space-y-1.5">
//                   {[['Monday – Friday', '9:00 AM – 6:00 PM EST'], ['Saturday', '9:00 AM – 3:00 PM EST'], ['Sunday', 'Closed']].map(([day, hours]) => (
//                     <div key={day} className="flex items-center justify-between text-[12px]">
//                       <span className="text-gray-500 font-medium">{day}</span>
//                       <span className={`font-semibold ${hours === 'Closed' ? 'text-gray-400' : 'text-gray-800'}`}>{hours}</span>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             </FadeSection>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

/* ─────────────────────────────────────────────────────────────────
   FINAL CTA — flat amber, cross-hatch, no tilt
─────────────────────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section className="relative py-24 lg:py-32 bg-amber-400 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.055] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }} />

      <FadeSection className="relative z-10 max-w-4xl mx-auto px-5 lg:px-10 text-center">
        <motion.p variants={fadeIn} className="text-amber-900 text-[11px] font-bold tracking-[3px] uppercase mb-4">No truck sits idle with AJAX</motion.p>
        <motion.h2 variants={fadeUp} className="text-[#0A0A14] leading-[0.88] mb-6" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(50px,7.5vw,100px)' }}>
          LET&apos;S GET YOUR<br />TRUCK LOADED.
        </motion.h2>
        <motion.p variants={fadeUp} className="text-amber-900 text-base lg:text-lg leading-relaxed max-w-lg mx-auto mb-10 font-medium">
          Join 500+ carriers who trust AJAX Dispatch. Your dedicated dispatcher will be booking loads before your next trip begins.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
            <Link href="/contact" className="inline-flex items-center gap-2.5 bg-[#0A0A14] hover:bg-gray-800 text-white font-bold text-[15px] px-9 py-4 rounded-xl shadow-[0_10px_32px_rgba(0,0,0,0.28)] hover:shadow-[0_16px_44px_rgba(0,0,0,0.36)] transition-all duration-200">
              Get Dispatched Today <ArrowRight />
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <a href="tel:+18554794089" className="inline-flex items-center gap-2.5 bg-black/10 hover:bg-black/[0.18] text-[#0A0A14] font-bold text-[15px] px-8 py-4 rounded-xl transition-all duration-200">
              <IconPhone /> +1 (346) 428-0370
            </a>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-5 lg:gap-8 text-amber-900 text-[13px] font-semibold">
          {['No long-term contracts', 'Start within 24 hours', 'Dedicated dispatcher assigned', 'Mon–Sat support'].map(item => (
            <div key={item} className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
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
function IconPhone() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> }
function IconMail()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> }
function IconPin()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> }
function IconClock() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }
function IconFile()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> }

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
export default function ContactPage() {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <Hero />
      <ContactStrip />
      <FormSection />
      <CTABanner />
    </>
  )
}