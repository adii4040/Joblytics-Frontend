import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card'
import { Button } from '../components/Button'
import { ArrowUpRight, TrendingUp, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'

import { useCurrentUser } from '../hooks/useAuth/useCurrentUser'
import useFetchApplications from '../hooks/useApplications/useFetchApplications'
import useFetchAnalytics from '../hooks/useAnalytics/useFetchAnalytics'


export default function Dashboard() {
  const { data, isLoading: userLoading, isError: userError } = useCurrentUser()
  const { data: applicationsData, isLoading: appsLoading, isError: appsError } = useFetchApplications()
  const { data: analyticsData, isLoading: analyticsLoading, isError: analyticsError } = useFetchAnalytics()
  const navigate = useNavigate()

  const user = data?.data?.user
  if (applicationsData) {
    console.log(applicationsData.data.applications.slice(0, 5)
    )
  }

  const overview = analyticsData?.data?.overview || {}
  const totalApplications = overview.totalApplications || 0
  const interviewingCount = overview.interviewing || 0
  const offersCount = overview.offered || 0
  const rejectedCount = overview.rejected || 0

  const stats = [
    { label: 'Total Applications', value: String(totalApplications), icon: FileText, color: 'blue' },
    { label: 'Interviewing', value: String(interviewingCount), icon: Clock, color: 'yellow' },
    { label: 'Offers', value: String(offersCount), icon: CheckCircle, color: 'green' },
    { label: 'Rejected', value: String(rejectedCount), icon: XCircle, color: 'red' },
  ]

  const recentApplications = applicationsData?.data?.applications.slice(0, 5) || []

  const getStatusColor = (status) => {
    const colors = {
      Applied: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      Interviewing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Offered: 'bg-green-500/20 text-green-400 border-green-500/30',
      Rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
      Accepted: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      Withdrawn: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    }
    return colors[status] || colors.Applied
  }

  if (userLoading || appsLoading || analyticsLoading) {
    return (
      <div className="flex min-h-screen bg-slate-950">
        <Sidebar />
        <main className="flex-1 overflow-auto flex items-center justify-center">
          <p className="text-white text-lg">Loading dashboard...</p>
        </main>
      </div>
    )
  }

  if (userError || appsError || analyticsError) {
    return (
      <div className="flex min-h-screen bg-slate-950">
        <Sidebar />
        <main className="flex-1 overflow-auto flex items-center justify-center">
          <p className="text-red-400 text-lg">Error loading dashboard data</p>
        </main>
      </div>
    )
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
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400 mt-1">Welcome back, {user?.fullname || user?.username}! 👋</p>
              </div>
              <Button variant="default" onClick={() => navigate('/add-application')}>
                + New Application
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="bg-slate-900 border-slate-800">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">{stat.label}</p>
                        <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                          stat.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                            stat.color === 'green' ? 'bg-green-500/20 text-green-400' :
                              'bg-red-500/20 text-red-400'
                        }`}>
                        <Icon size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Recent Applications */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Applications</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/applications')}>
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app._id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 transition">
                    <div>
                      <h4 className="text-white font-semibold">{app.companyName}</h4>
                      <p className="text-slate-400 text-sm">{app.role}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.applicationStatus)}`}>
                        {app.applicationStatus}
                      </span>
                      <span className="text-slate-400 text-sm">{app.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-slate-900 border-slate-800 cursor-pointer hover:border-blue-500/50 transition">
              <CardContent className="pt-6">
                <div className="text-blue-400 mb-2">📊</div>
                <h3 className="text-white font-semibold mb-2">View Analytics</h3>
                <p className="text-slate-400 text-sm mb-4">Understand your application patterns and success rates.</p>
                <Button variant="ghost" size="sm" onClick={() => navigate('/analytics')}>
                  Go to Analytics →
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 cursor-pointer hover:border-blue-500/50 transition">
              <CardContent className="pt-6">
                <div className="text-purple-400 mb-2">🗺️</div>
                <h3 className="text-white font-semibold mb-2">View Map</h3>
                <p className="text-slate-400 text-sm mb-4">See all your applications on an interactive map.</p>
                <Button variant="ghost" size="sm" onClick={() => navigate('/map-view')}>
                  Open Map →
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 cursor-pointer hover:border-blue-500/50 transition">
              <CardContent className="pt-6">
                <div className="text-green-400 mb-2">➕</div>
                <h3 className="text-white font-semibold mb-2">Add Application</h3>
                <p className="text-slate-400 text-sm mb-4">Quick add a new job application to track.</p>
                <Button variant="ghost" size="sm" onClick={() => navigate('/add-application')}>
                  Add New →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

// Icon component for demo
function FileText(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}
