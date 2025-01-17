import type { Metadata } from 'next'
import {
  HeroSection,
  ImpactSection,
  PartnersSection,
  FeaturesSection,
  TimelineSection,
  CTASection
} from '@/components/sections'


export const metadata: Metadata = {
  title: 'WikiJobs - Career Reentry Platform',
  description: 'Empowering professionals returning to work with AI-powered job matching, upskilling plans, and fair-chance employment opportunities.',
  keywords: 'career reentry, job matching, upskilling, fair-chance employment, career gap',
}

export default function HomePage() {
  return (
    <main className="bg-white">
      <HeroSection />
      <ImpactSection />
      <PartnersSection />
      <FeaturesSection />
      <TimelineSection />
      <CTASection />
    </main>
  )
}