import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Plus, TrendingUp, Rocket } from 'lucide-react'
import { useCurrentUser } from '../hooks/useAuth/useCurrentUser'

export default function HowItWorksSection() {
  const navigate = useNavigate()
  const { data } = useCurrentUser()
  const user = data?.data?.user

  const handleStartTracking = () => {
    if (user) {
      navigate('/add-application')
    } else {
      navigate('/login')
    }
  }
  // Step cards data
  const steps = [
    {
      id: 1,
      stepNumber: '01',
      icon: Plus,
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      title: 'Add Your Applications',
      description: 'Easily log your job applications with company details, role, salary, location, and attach job descriptions.',
      labelColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
    },
    {
      id: 2,
      stepNumber: '02',
      icon: TrendingUp,
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      title: 'Track Progress & Interviews',
      description: 'Update statuses as you move through the hiring process. Monitor interviewing, offers, and outcomes.',
      labelColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
    },
    {
      id: 3,
      stepNumber: '03',
      icon: Rocket,
      iconBg: 'bg-gradient-to-br from-pink-500 to-pink-600',
      title: 'Analyze & Improve',
      description: 'View actionable analytics, identify patterns, and optimize your job search strategy for better results.',
      labelColor: 'bg-pink-500/20 text-pink-300 border-pink-400/30',
    },
  ]

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-[#050812] via-[#0f172a] to-[#0d1117] overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {/* UPDATE: Change section title here */}
            How It Works
          </h2>
          <p className="text-slate-400 text-lg">
            {/* UPDATE: Change subtitle here */}
            Get started in minutes. No complex setup required.
          </p>
        </motion.div>

        {/* Steps Grid with Arrow Connectors */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <motion.div
                  key={step.id}
                  variants={cardVariants}
                  className="relative group"
                >
                  {/* Arrow Connector - Only between cards on desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/3 -right-6 lg:-right-8 text-slate-500/60 z-20 items-center justify-center">
                      <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}

                  {/* Step Card */}
                  <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-slate-600 hover:bg-slate-900/70 transition-all duration-300 h-full flex flex-col relative">
                    {/* Step Label - Positioned at top */}
                    <div className={`absolute -top-4 left-8 inline-block px-4 py-1.5 rounded-full text-xs font-semibold border ${step.labelColor}`}>
                      {/* UPDATE: Step labels auto-generated */}
                      Step {step.stepNumber}
                    </div>

                    {/* Icon Container - Top margin to accommodate label */}
                    <div className="mt-6 mb-6">
                      <div className={`${step.iconBg} w-16 h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3">
                      {/* UPDATE: Change step title here */}
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                      {/* UPDATE: Change step description here */}
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-slate-400 text-lg mb-6">
            {/* UPDATE: Change CTA text here */}
            Ready to take control of your job search?
          </p>
          <button 
            onClick={handleStartTracking}
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#4F75FF] via-[#7C3AED] to-[#A855F7] text-white font-semibold text-base hover:shadow-xl hover:shadow-purple-500/50 transition-all hover:scale-105 flex items-center gap-2 mx-auto"
          >
            {/* UPDATE: Change button text here */}
            Start Tracking Now
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
