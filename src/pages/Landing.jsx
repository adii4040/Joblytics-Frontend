import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import HowItWorksSection from '../components/HowItWorksSection'
import FooterSection from '../components/FooterSection'

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* New Hero Section */}
      <HeroSection />

      {/* New Features Section */}
      <FeaturesSection />

      {/* New How It Works Section */}
      <HowItWorksSection />

      {/* New Footer Section */}
      <FooterSection />
    </div>
  )
}
