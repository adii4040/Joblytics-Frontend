import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, LogOut, BarChart3, FileText, Plus, Map, Home } from 'lucide-react'
import { Button } from './Button'
import { useCurrentUser } from '../hooks/useAuth/useCurrentUser'
import { useLogout } from '../hooks/useAuth/useLogout'

export function Sidebar() {
  const { data, isLoading, isError } = useCurrentUser()
  const logout = useLogout()
  
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const user = data?.data?.user

  const handleLogout = () => {
    logout.mutate()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { label: 'Applications', path: '/applications', icon: FileText },
    { label: 'Add Application', path: '/add-application', icon: Plus },
    //{ label: 'Map View', path: '/map-view', icon: Map },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 w-64 h-screen bg-slate-900 border-r border-white/10 flex flex-col transition-all duration-300 z-40 ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-8 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
              <span className="text-white font-bold text-lg">📊</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg tracking-tight">Joblytic</span>
              <span className="text-slate-500 text-xs font-medium">Job Analytics</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/10">
          {isLoading ? (
            <div className="mb-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700 animate-pulse"></div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="h-4 w-24 bg-slate-700 animate-pulse rounded"></div>
                  <div className="h-3 w-32 bg-slate-700 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          ) : user ? (
            <div className="mb-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar?.url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username || user.email}`}
                  alt={user.fullname || user.username}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{user.fullname || user.username}</p>
                  <p className="text-slate-400 text-xs truncate">{user.email}</p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="space-y-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                <Home size={18} />
                Back to Home
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              disabled={logout.isPending}
              className="w-full justify-start gap-2 bg-red-600 hover:bg-red-700"
            >
              <LogOut size={18} />
              {logout.isPending ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  )
}

export default Sidebar
