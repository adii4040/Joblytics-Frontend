import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Button } from './Button'

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="hidden sm:inline-block text-white font-bold text-lg tracking-tight">
              Joblytic
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/#features" className="text-slate-400 hover:text-white transition">
              Features
            </Link>
            <Link to="/#pricing" className="text-slate-400 hover:text-white transition">
              Pricing
            </Link>
            <Link to="/#contact" className="text-slate-400 hover:text-white transition">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-slate-800 py-4 space-y-3">
            <Link to="/#features" className="block text-slate-400 hover:text-white transition py-2">
              Features
            </Link>
            <Link to="/#pricing" className="block text-slate-400 hover:text-white transition py-2">
              Pricing
            </Link>
            <Link to="/#contact" className="block text-slate-400 hover:text-white transition py-2">
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              {user ? (
                <>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => navigate('/dashboard')}
                  >
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-full">
                    <Button variant="ghost" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" className="w-full">
                    <Button variant="default" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
