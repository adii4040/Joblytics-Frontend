import React, { useState, useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { useNavigate } from 'react-router-dom'
import { Trash2, Edit2, MapPin, FileText, DollarSign, Search } from 'lucide-react'

import useFetchApplications from '../hooks/useApplications/useFetchApplications'
import useDeleteApplication from '../hooks/useApplications/useDeleteApplication'


export default function Applications() {

  const { data, isLoading, } = useFetchApplications()
  const deleteApplicationMutation = useDeleteApplication()

  const navigate = useNavigate()
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [gridView, setGridView] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300) // 300ms debounce delay

    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery])


  const filterStatusOpt = [
    { label: 'All', value: 'all' },
    { label: 'Applied', value: 'applied' },
    { label: 'Interviewing', value: 'interviewing' },
    { label: 'Offered', value: 'offered' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Withdrawn', value: 'withdrawn' },
  ]

  const filterTypeOpt = [
    { label: 'All Types', value: 'all' },
    { label: 'Job', value: 'job' },
    { label: 'Internship', value: 'internship' },
  ]

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase()
    const colors = {
      applied: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      interviewing: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      offered: 'bg-green-500/20 text-green-300 border-green-500/30',
      rejected: 'bg-red-500/20 text-red-300 border-red-500/30',
      accepted: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      withdrawn: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    }
    return colors[statusLower] || colors.applied
  }

  const getWorkTypeColor = (workType) => {
    const colors = {
      'Remote': 'bg-cyan-500/20 text-cyan-300',
      'Hybrid': 'bg-purple-500/20 text-purple-300',
      'On-Site': 'bg-pink-500/20 text-pink-300',
    }
    return colors[workType] || 'bg-slate-500/20 text-slate-300'
  }

  // Format salary
  const formatSalary = (salary) => {
    if (!salary || !salary.amount) return 'Not specified'
    const { amount, currency } = salary
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency || 'INR',
      maximumFractionDigits: 0
    }).format(amount)
    return formatted
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // Get company initials for logo
  const getCompanyInitials = (companyName) => {
    if (!companyName) return '?'
    const words = companyName.split(' ')
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase()
    }
    return companyName.slice(0, 2).toUpperCase()
  }

  const applications = data?.data?.applications || []
  //console.log(applications)

  const filteredApps = applications.filter((app) => {
    const statusMatch = filterStatus === 'all' || app.applicationStatus.toLowerCase() === filterStatus.toLowerCase()
    const typeMatch = filterType === 'all' || app.workType.toLowerCase() === filterType.toLowerCase()
    
    // Search filter - search across company, role, location
    const searchMatch = !debouncedSearch || 
      app.companyName?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      app.role?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      app.location?.toLowerCase().includes(debouncedSearch.toLowerCase())
    
    return statusMatch && typeMatch && searchMatch
  })

  // Handle delete application
  const handleDelete = (appId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      console.log(appId)
      deleteApplicationMutation.mutate(appId)
    }
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Header - Fixed to top of scrollable area */}
        <div className="border-b border-white/10 bg-slate-900/50 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">Applications</h1>
                <p className="text-slate-400 mt-1">Manage all your job applications in one place</p>
              </div>
              <Button variant="default" onClick={() => navigate('/add-application')}>
                + New Application
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filter & Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by company, role, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 text-slate-300 pl-10 pr-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder:text-slate-500"
              />
            </div>
            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-800 border border-white/10 text-slate-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                {filterStatusOpt.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            {/* Type Filter */}
            <div className="relative inline-block w-full sm:w-48">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-slate-800 border border-white/10 text-slate-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm w-full"
              >
                {filterTypeOpt.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            {/* View Toggle */}
            <div className="flex gap-2">
              <button className={`px-3 py-2 rounded-lg ${gridView ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400'}`} onClick={() => setGridView(true)}>⊞</button>
              <button className={`px-3 py-2 rounded-lg ${!gridView ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400'}`} onClick={() => setGridView(false)}>≡</button>
            </div>
          </div>

          {/* Applications Grid */}

          <div className={`${gridView ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}`}>
            {filteredApps.map((app) => (
              <Card key={app._id} className="bg-slate-900 border-slate-800 hover:border-slate-600 transition flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {getCompanyInitials(app.companyName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-white truncate" title={app.companyName}>{app.companyName}</h3>
                        <p className="text-slate-400 text-sm truncate" title={app.role}>{app.role}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  {/* Status Badge */}
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.applicationStatus)}`}>
                      {app.applicationStatus}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getWorkTypeColor(app.workLocationType)}`}>
                        {app.workLocationType}
                      </span>
                      <span className="px-2 py-1 rounded bg-slate-700 text-slate-300 text-xs font-medium">
                        {app.workType}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <DollarSign size={16} />
                      <span className="text-white font-medium">{formatSalary(app.salary)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin size={16} />
                      <span className="text-white text-sm truncate">{app.location || 'Not specified'}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-700 text-slate-500 text-xs">
                      Applied: {formatDate(app.appliedDate)}
                    </div>
                  </div>
                </CardContent>

                {/* Footer Actions */}
                <div className="p-4 border-t border-slate-700 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => navigate(`/update-application/${app._id}`)}
                  >
                    <Edit2 size={16} />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 gap-2">
                    <FileText size={16} />
                    PDF
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 gap-2 text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(app._id)}
                    disabled={deleteApplicationMutation.isLoading}
                  >
                    <Trash2 size={16} />
                    {deleteApplicationMutation.isLoading ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>


          {isLoading ? <div className="text-white">Loading applications...</div> : filteredApps.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg mb-4">No applications found</p>
              <Button variant="default" onClick={() => navigate('/add-application')}>
                Add Your First Application
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
