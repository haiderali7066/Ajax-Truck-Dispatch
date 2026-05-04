'use client'

import { HeroSection } from './HeroSection'
import {
  TrustBar,
  ServicesSection,
  EquipmentSection,
} from './Sections1'

import {
  HowItWorksSection,
  WhyUsSection,
  TestimonialsSection,
  CTABannerSection,
} from './Sections2'

import { KEYFRAMES } from './shared'
import ServiceMarquee from "@/components/ServiceMarquee";



export function HomeClient() {
  return (
    <>
      <style>{KEYFRAMES}</style>

      <main>
        <HeroSection />
        <TrustBar />
        <ServiceMarquee />
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