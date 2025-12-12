import React from 'react'
import { motion } from 'framer-motion'
import { Zap, BarChart3, FileText, Target, MapPin, TrendingUp } from 'lucide-react'

export default function FeaturesSection() {
  // Feature cards data
  const features = [
    {
      id: 1,
      icon: Zap,
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      title: 'Smart Tracking',
      description: 'Automatically track positions, statuses, salary ranges, and application timelines in one organized dashboard.',
    },
    {
      id: 2,
      icon: BarChart3,
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      title: 'Deep Analytics',
      description: 'Understand your conversion rates, success patterns, rejection analysis, and source effectiveness.',
    },
    {
      id: 3,
      icon: FileText,
      iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600',
      title: 'Application Management',
      description: 'Add, edit, and organize applications with document attachments, notes, and status updates.',
    },
    {
      id: 4,
      icon: Target,
      iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
      title: 'Source Analysis',
      description: 'Identify which job sources perform best for you and optimize your application strategy accordingly.',
    },
    {
      id: 5,
      icon: MapPin,
      iconBg: 'bg-gradient-to-br from-pink-500 to-pink-600',
      title: 'Location Insights',
      description: 'Visualize your opportunities geographically and understand job market distribution by region.',
    },
    {
      id: 6,
      icon: TrendingUp,
      iconBg: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
      title: 'Performance Tracking',
      description: 'Monitor your success metrics, response rates, and improvements over time with detailed dashboards.',
    },
  ]

  // Stagger animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-[#0a0e27] via-[#0d1117] to-[#050812] border-t border-white/10 overflow-hidden">
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
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer group">
            <Zap className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm text-white/90 font-medium">Powerful Features</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            <div className="text-white mb-2">
              Everything You Need to
            </div>
            <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Land Your Dream Job
            </div>
          </h2>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-slate-300 text-lg max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          {/* UPDATE: Change this description as needed */}
          Comprehensive tools to organize your job search, analyze your progress, and optimize your application strategy.
        </motion.p>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                className="group relative"
              >
                {/* Card Background Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Feature Card */}
                <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-slate-600 hover:bg-slate-900/70 transition-all duration-300 group-hover:translate-y-[-4px] h-full">
                  {/* Icon Container */}
                  <div className={`${feature.iconBg} w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {/* UPDATE: Change feature title here */}
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                    {/* UPDATE: Change feature description here */}
                    {feature.description}
                  </p>

                  {/* Hover Arrow Indicator */}
                  <div className="mt-4 flex items-center text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-0 transition-opacity">
                    {/* Learn more arrow removed on hover */}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
