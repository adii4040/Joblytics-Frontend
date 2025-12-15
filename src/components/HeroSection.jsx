import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Target, TrendingUp, Users } from 'lucide-react'
import { useCurrentUser } from '../hooks/useAuth/useCurrentUser'
import { Navbar } from './Navbar'

export default function HeroSection() {
  const navigate = useNavigate()
  const { data } = useCurrentUser()
  const user = data?.data?.user

  // Handle navigation based on auth status
  const handleDashboardClick = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#111827]">
      {/* Navbar */}
      <Navbar />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Radial Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-32 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-white/90 font-medium">
            {user ? `Welcome back, ${user.fullname || user.username}!` : 'Intelligent Job Application Tracking'}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          {user ? (
            <>
              <div className="text-white mb-2">
                Your Job Search Dashboard.
              </div>
              <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Ready When You Are.
              </div>
            </>
          ) : (
            <>
              <div className="text-white mb-2">
                Track Your Job Applications.
              </div>
              <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Understand Your Career Journey.
              </div>
            </>
          )}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {user 
            ? 'Continue tracking your applications, view analytics, and stay on top of your job search progress. Your next opportunity is just around the corner.'
            : 'Joblytic helps job seekers organize applications, track statuses, and gain insight through intelligent analytics. Improve your success rate with data-driven decisions.'
          }
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          {user ? (
            <>
              {/* Authenticated User Buttons */}
              <button 
                onClick={() => navigate('/dashboard')}
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#4F75FF] via-[#7C3AED] to-[#A855F7] text-white font-semibold text-base hover:shadow-xl hover:shadow-purple-500/50 transition-all flex items-center gap-2"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => navigate('/add-application')}
                className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-base hover:bg-white/20 transition-all"
              >
                + Add New Application
              </button>
            </>
          ) : (
            <>
              {/* Unauthenticated User Buttons */}
              <button 
                onClick={handleDashboardClick}
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#4F75FF] via-[#7C3AED] to-[#A855F7] text-white font-semibold text-base hover:shadow-xl hover:shadow-purple-500/50 transition-all flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => navigate('/demo/analytics')}
                className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-base hover:bg-white/20 transition-all"
              >
                View Live Demo
              </button>
            </>
          )}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-3xl mx-auto"
        >
          {/* Stat 1 */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white">50K+</div>
            <div className="text-sm text-slate-400">Applications Tracked</div>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white">34%</div>
            <div className="text-sm text-slate-400">Success Rate Increase</div>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white">10K+</div>
            <div className="text-sm text-slate-400">Active Users</div>
          </div>
        </motion.div>

        {/* Preview Image Placeholder (from screenshot - the browser window mockup) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Browser Window Chrome */}
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-t-2xl border border-white/10 p-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>
            {/* Placeholder for Dashboard Preview */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-x border-b border-white/10 rounded-b-2xl overflow-hidden">
              <div className="p-8 space-y-6">
                {/* Mock Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h3 className="text-white text-xl font-bold">Analytics Dashboard</h3>
                    <p className="text-slate-400 text-sm mt-1">Track your job search progress</p>
                  </div>
                  <div className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded text-blue-300 text-xs">
                    LIVE DEMO
                  </div>
                </div>

                {/* Mock Metric Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 rounded-lg p-4 border border-blue-500/20">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center mb-3">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                      </svg>
                    </div>
                    <p className="text-slate-400 text-xs">Total Applications</p>
                    <p className="text-white text-2xl font-bold mt-1">42</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 rounded-lg p-4 border border-green-500/20">
                    <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center mb-3">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    </div>
                    <p className="text-slate-400 text-xs">Interviewing</p>
                    <p className="text-white text-2xl font-bold mt-1">8</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 rounded-lg p-4 border border-purple-500/20">
                    <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center mb-3">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <p className="text-slate-400 text-xs">Offers</p>
                    <p className="text-white text-2xl font-bold mt-1">4</p>
                  </div>
                </div>

                {/* Mock Chart Area */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                    <p className="text-white text-sm font-semibold mb-3">Success Rate</p>
                    <div className="h-24 flex items-end gap-2">
                      <div className="flex-1 bg-blue-600 rounded-t" style={{height: '60%'}}></div>
                      <div className="flex-1 bg-blue-600 rounded-t" style={{height: '80%'}}></div>
                      <div className="flex-1 bg-blue-600 rounded-t" style={{height: '45%'}}></div>
                      <div className="flex-1 bg-blue-600 rounded-t" style={{height: '95%'}}></div>
                      <div className="flex-1 bg-blue-600 rounded-t" style={{height: '70%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                    <p className="text-white text-sm font-semibold mb-3">Work Type</p>
                    <div className="flex items-center justify-center h-24">
                      <div className="relative w-20 h-20">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="40" cy="40" r="32" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="60 40" />
                          <circle cx="40" cy="40" r="32" fill="none" stroke="#8b5cf6" strokeWidth="12" strokeDasharray="25 75" strokeDashoffset="-60" />
                          <circle cx="40" cy="40" r="32" fill="none" stroke="#06b6d4" strokeWidth="12" strokeDasharray="15 85" strokeDashoffset="-85" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Full Demo Button */}
                <button 
                  onClick={() => navigate('/demo/analytics')}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  View Full Analytics Demo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
