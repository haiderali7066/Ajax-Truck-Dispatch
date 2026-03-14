'use client'

// components/Home/HomeClient.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Thin client shell — assembles all Home section components in order.
// Imported by the server page (app/page.tsx).
// ─────────────────────────────────────────────────────────────────────────────

import {
  HeroSection,
  TrustBar,
  ServicesSection,
  EquipmentSection,
  HowItWorksSection,
  WhyUsSection,
  TestimonialsSection,
  CTABannerSection,
  KEYFRAMES,
} from './index'

export function HomeClient() {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <main>
        <HeroSection />
        <TrustBar />
        <ServicesSection />
        <EquipmentSection />
        <HowItWorksSection />
        <WhyUsSection />
        <TestimonialsSection />
        <CTABannerSection />
      </main>
    </>
  )
}
