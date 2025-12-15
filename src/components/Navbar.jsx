import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../hooks/useAuth/useCurrentUser'
import { useLogout } from '../hooks/useAuth/useLogout'

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()
  const { data } = useCurrentUser()
  const { mutate: logout } = useLogout()
  
  const user = data?.data?.user

  const handleLogout = () => {
    logout()
  }

  const handleDashboardClick = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }

  const handleHowItWorksClick = () => {
    const section = document.getElementById('how-it-works')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">Joblytic</span>
        </div>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
            Features
          </a>
          <button 
            onClick={handleHowItWorksClick}
            className="text-white/70 hover:text-white transition-colors text-sm font-medium"
          >
            How It Works
          </button>
          <button 
            onClick={() => navigate('/demo/analytics')}
            className="text-white/70 hover:text-white transition-colors text-sm font-medium"
          >
            Analytics Demo
          </button>
        </div>

        {/* Right: Analytics Dashboard Button */}
        <button 
          onClick={handleDashboardClick}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          Analytics Dashboard
        </button>
      </div>
    </nav>
  )
}

export default Navbar
