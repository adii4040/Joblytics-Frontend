import React from 'react'
import { motion } from 'framer-motion'
import { Twitter, Github, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function FooterSection() {
  // Footer animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <footer className="relative bg-gradient-to-b from-[#0d1117] to-[#0a0e27] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12"
        >
          {/* Left Section - Brand + Description + Social Icons */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">
                {/* UPDATE: Change brand name here */}
                Joblytic
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              {/* UPDATE: Change description here */}
              The intelligent job application tracking platform that helps you understand and improve your career journey.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* Twitter */}
              <a
                href="#"
                className="w-10 h-10 rounded-md bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 hover:border-slate-600 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>

              {/* GitHub */}
              <a
                href="#"
                className="w-10 h-10 rounded-md bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 hover:border-slate-600 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="w-10 h-10 rounded-md bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 hover:border-slate-600 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {/* Email */}
              <a
                href="#"
                className="w-10 h-10 rounded-md bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 hover:border-slate-600 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Section - Link Columns */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
              {/* Product Column */}
              <div>
                <h4 className="text-white font-semibold text-sm mb-4">
                  {/* UPDATE: Change column title here */}
                  Product
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link to="/" className="text-slate-400 hover:text-white text-sm transition-colors">
                      {/* UPDATE: Change link text here */}
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-slate-400 hover:text-white text-sm transition-colors">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-slate-400 hover:text-white text-sm transition-colors">
                      Changelog
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-slate-400 hover:text-white text-sm transition-colors">
                      Roadmap
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h4 className="text-white font-semibold text-sm mb-4">
                  {/* UPDATE: Change column title here */}
                  Company
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link to="/" className="text-slate-400 hover:text-white text-sm transition-colors">
                      {/* UPDATE: Change link text here */}
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-slate-400 hover:text-white text-sm transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-slate-400 hover:text-white text-sm transition-colors">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-slate-400 hover:text-white text-sm transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Copyright Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          {/* Left Side - Copyright */}
          <p className="text-slate-500 text-sm">
            {/* UPDATE: Change copyright text here */}
            © 2025 Joblytic. All rights reserved.
          </p>

          {/* Right Side - Legal Links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
              {/* UPDATE: Change legal link text here */}
              Privacy Policy
            </Link>
            <Link to="/" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
