'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
type FormData = {
  name: string
  email: string
  phone: string
  company: string
  truckType: string
  mcNumber: string
  message: string
}

const TRUCK_TYPES = [
  'Dry Van',
  'Reefer',
  'Flatbed',
  'Step Deck',
  'Power Only',
  'Box Truck',
]

const REQUIRED_DOCS = [
  'MC Authority Certificate',
  'USDOT Number',
  'Insurance Certificate (AJAX as cert. holder)',
  'W9 Form',
  'Signed Dispatch Agreement',
]

/* ─────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

/* ─────────────────────────────────────────
   HELPER COMPONENTS
───────────────────────────────────────── */
function SectionPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 rounded-full px-4 py-1.5 mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
      <span className="text-amber-600 text-[11px] font-bold tracking-[2.5px] uppercase">
        {children}
      </span>
    </div>
  )
}

function FadeSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: 0.1, delayChildren: delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Icons ── */
function IconFile() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function FormSection() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fileInfo, setFileInfo] = useState<File | null>(null)
  const [fileDrag, setFileDrag] = useState(false)
  const [fileError, setFileError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  /* File validation */
  const ALLOWED = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]
  const MAX_MB = 10

  function validateFile(file: File): string {
    if (!ALLOWED.includes(file.type)) return 'Only PDF or Word documents (.pdf, .doc, .docx)'
    if (file.size > MAX_MB * 1024 * 1024) return `File must be under ${MAX_MB}MB`
    return ''
  }

  function handleFilePick(file: File) {
    const err = validateFile(file)
    setFileError(err)
    if (!err) setFileInfo(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setFileDrag(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFilePick(file)
  }

  /* Submit */
  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const fd = new window.FormData()
      fd.append('name', data.name)
      fd.append('email', data.email)
      fd.append('phone', data.phone)
      fd.append('company', data.company ?? '')
      fd.append('truckType', data.truckType)
      fd.append('mcNumber', data.mcNumber ?? '')
      fd.append('message', data.message ?? '')
      if (fileInfo) fd.append('agreement', fileInfo, fileInfo.name)

      const res = await fetch('/api/contact', { method: 'POST', body: fd })
      if (res.ok) setSubmitted(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full bg-[#F8F7F3] border-2 border-[#E8E5DE] rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-200 font-medium'
  const labelClass =
    'block text-[10px] text-gray-500 font-bold tracking-[2px] uppercase mb-2'

  return (
    <section className="bg-[#F8F7F3] border-b border-[#E8E5DE] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-3 gap-10 items-start">

          {/* ── Form — 2/3 width ── */}
          <div className="lg:col-span-2">
            <FadeSection className="mb-10">
              <SectionPill>Start Onboarding</SectionPill>
              <motion.h2
                variants={fadeUp}
                className="leading-[0.92] mb-4 text-gray-900"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(40px, 5vw, 68px)',
                }}
              >
                FILL IN YOUR DETAILS.
                <br />
                <span className="text-amber-500">WE'LL HANDLE THE REST.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-gray-600 text-base font-light leading-relaxed max-w-lg"
              >
                Submit your info and we'll reach back within 24 hours to complete onboarding
                and assign your dedicated dispatcher.
              </motion.p>
            </FadeSection>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white border-2 border-amber-300 rounded-2xl p-12 text-center shadow-[0_8px_40px_rgba(0,0,0,0.07)]"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-400/10 border-2 border-amber-400/30 flex items-center justify-center mx-auto mb-6">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3
                    className="text-gray-900 mb-2"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, letterSpacing: '1px' }}
                  >
                    MESSAGE RECEIVED
                  </h3>
                  <p className="text-gray-500 text-[15px] font-light leading-relaxed max-w-sm mx-auto">
                    We'll contact you within 24 hours to complete your onboarding and assign
                    your dedicated dispatcher.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white border-2 border-[#E8E5DE] rounded-2xl p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                >
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Row 1: Name + Email */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input
                          {...register('name', { required: true })}
                          className={inputClass}
                          placeholder="John Smith"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-[11px] mt-1 font-medium">Required</p>
                        )}
                      </div>
                      <div>
                        <label className={labelClass}>Email Address *</label>
                        <input
                          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                          className={inputClass}
                          placeholder="john@company.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-[11px] mt-1 font-medium">Valid email required</p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Phone + Company */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Phone Number *</label>
                        <input
                          {...register('phone', { required: true })}
                          className={inputClass}
                          placeholder="+1 (555) 000-0000"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-[11px] mt-1 font-medium">Required</p>
                        )}
                      </div>
                      <div>
                        <label className={labelClass}>Company Name</label>
                        <input
                          {...register('company')}
                          className={inputClass}
                          placeholder="Your Trucking LLC"
                        />
                      </div>
                    </div>

                    {/* Row 3: Truck Type + MC Number */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Truck Type *</label>
                        <select
                          {...register('truckType', { required: true })}
                          className={inputClass}
                        >
                          <option value="">Select truck type</option>
                          {TRUCK_TYPES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        {errors.truckType && (
                          <p className="text-red-500 text-[11px] mt-1 font-medium">Required</p>
                        )}
                      </div>
                      <div>
                        <label className={labelClass}>MC Number</label>
                        <input
                          {...register('mcNumber')}
                          className={inputClass}
                          placeholder="MC-000000"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className={labelClass}>Message</label>
                      <textarea
                        {...register('message')}
                        rows={4}
                        className={`${inputClass} resize-none`}
                        placeholder="Tell us about your operation — lanes, goals, or any questions..."
                      />
                    </div>

                    {/* ── File Upload: Dispatch Agreement ── */}
                    <div>
                      <label className={labelClass}>
                        Dispatch Agreement
                        <span className="ml-1.5 text-gray-400 normal-case tracking-normal font-normal">
                          (optional — PDF or Word, max 10MB)
                        </span>
                      </label>

                      {/* Drop zone */}
                      <div
                        onDragOver={(e) => {
                          e.preventDefault()
                          setFileDrag(true)
                        }}
                        onDragLeave={() => setFileDrag(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-7 cursor-pointer transition-all duration-200 ${
                          fileDrag
                            ? 'border-amber-400 bg-amber-50'
                            : fileInfo
                            ? 'border-amber-300 bg-amber-50/60'
                            : fileError
                            ? 'border-red-300 bg-red-50/40'
                            : 'border-[#E8E5DE] bg-[#F8F7F3] hover:border-amber-300 hover:bg-amber-50/40'
                        }`}
                      >
                        {/* Hidden native input */}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFilePick(file)
                          }}
                        />

                        {fileInfo ? (
                          <>
                            <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-300 flex items-center justify-center text-amber-600">
                              <IconFile />
                            </div>
                            <div className="text-center">
                              <p className="text-gray-900 text-sm font-semibold leading-tight">
                                {fileInfo.name}
                              </p>
                              <p className="text-gray-500 text-[11px] mt-0.5">
                                {(fileInfo.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setFileInfo(null)
                                setFileError('')
                                if (fileInputRef.current) fileInputRef.current.value = ''
                              }}
                              className="text-[11px] font-bold text-red-500 hover:text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-full transition-colors duration-150"
                            >
                              Remove
                            </button>
                          </>
                        ) : (
                          <>
                            <div
                              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors duration-200 ${
                                fileDrag
                                  ? 'bg-amber-400/15 border-amber-300 text-amber-600'
                                  : 'bg-gray-100 border-[#E8E5DE] text-gray-400'
                              }`}
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              >
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                              </svg>
                            </div>
                            <div className="text-center">
                              <p className="text-gray-700 text-sm font-semibold">
                                {fileDrag ? 'Drop it here' : 'Click to upload or drag & drop'}
                              </p>
                              <p className="text-gray-400 text-[11px] mt-0.5">
                                Signed Dispatch Agreement · PDF, DOC, DOCX · Max 10MB
                              </p>
                            </div>
                          </>
                        )}
                      </div>

                      {fileError && (
                        <p className="text-red-500 text-[11px] mt-1.5 font-medium flex items-center gap-1">
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          {fileError}
                        </p>
                      )}

                      <p className="text-gray-400 text-[11px] mt-1.5">
                        Don&apos;t have the agreement yet?{' '}
                        <a
                          href="/dispatch-agreement.pdf"
                          download
                          className="text-amber-600 font-semibold hover:text-amber-700 underline underline-offset-2"
                        >
                          Download template
                        </a>
                        {' '}— you can also submit without it and we&apos;ll send one during onboarding.
                      </p>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading || !!fileError}
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      className="w-full flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-[15px] py-4 rounded-xl transition-colors duration-200 shadow-[0_6px_22px_rgba(245,158,11,0.28)] hover:shadow-[0_10px_32px_rgba(245,158,11,0.38)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path d="M21 12a9 9 0 11-6.219-8.56" />
                          </svg>
                          Sending…
                        </span>
                      ) : (
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          >
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                          Submit Onboarding Request
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Sidebar — 1/3 width ── */}
          <div className="space-y-5">

            {/* Required docs card */}
            <FadeSection delay={0.15}>
              <motion.div
                variants={scaleIn}
                className="bg-white border-2 border-[#E8E5DE] rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
              >
                {/* Card header */}
                <div className="bg-[#0A0A14] px-6 py-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <IconFile />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-[14px] leading-tight">
                      Required Documents
                    </p>
                    <p className="text-gray-500 text-[11px] mt-0.5">
                      Have these ready to speed up onboarding
                    </p>
                  </div>
                </div>

                {/* Doc rows */}
                <div className="divide-y divide-[#F0EDE8]">
                  {REQUIRED_DOCS.map((doc, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                      className="flex items-start gap-3 px-6 py-3.5"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="flex-shrink-0 mt-0.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-gray-700 text-[13px] leading-snug font-medium">
                        {doc}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
                  <p className="text-amber-800 text-[12px] font-semibold">
                    All documents handled securely — no surprises.
                  </p>
                </div>
              </motion.div>
            </FadeSection>

            {/* Call card */}
            <FadeSection delay={0.25}>
              <motion.div
                variants={scaleIn}
                className="bg-white border-2 border-[#E8E5DE] rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:border-amber-300 transition-all duration-250"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-4">
                  <IconPhone />
                </div>
                <h4 className="text-gray-900 font-semibold text-[15px] mb-2">Prefer to call?</h4>
                <p className="text-gray-500 text-[13px] leading-relaxed font-light mb-5">
                  Call us during business hours and we&apos;ll walk you through the entire process
                  on the spot.
                </p>
                <motion.a
                  href="tel:+13464280370"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-sm py-3 px-5 rounded-xl transition-colors duration-200 shadow-[0_4px_14px_rgba(245,158,11,0.24)]"
                >
                  <IconPhone />
                  +1 (346) 428-0370
                </motion.a>
              </motion.div>
            </FadeSection>

            {/* Business hours */}
            <FadeSection delay={0.35}>
              <motion.div
                variants={fadeUp}
                className="rounded-2xl border-2 border-[#E8E5DE] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <IconClock />
                  </div>
                  <h4 className="text-gray-900 font-semibold text-[14px]">Business Hours</h4>
                </div>
                <div className="space-y-1.5">
                  {[
                    ['Monday – Friday', '9:00 AM – 6:00 PM EST'],
                    ['Saturday', '9:00 AM – 3:00 PM EST'],
                    ['Sunday', 'Closed'],
                  ].map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between text-[12px]">
                      <span className="text-gray-500 font-medium">{day}</span>
                      <span
                        className={`font-semibold ${
                          hours === 'Closed' ? 'text-gray-400' : 'text-gray-800'
                        }`}
                      >
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </FadeSection>
          </div>
        </div>
      </div>
    </section>
  )
}