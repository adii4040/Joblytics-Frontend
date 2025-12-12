import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card'

const applications = [
  { id: 1, company: 'Google', location: 'Mountain View, CA', status: 'interviewing', lat: 37.4225, lng: -122.0841, logo: '🔍' },
  { id: 2, company: 'Microsoft', location: 'Seattle, WA', status: 'offered', lat: 47.6062, lng: -122.3321, logo: '🪟' },
  { id: 3, company: 'Meta', location: 'Menlo Park, CA', status: 'applied', lat: 37.4847, lng: -122.1477, logo: 'f' },
  { id: 4, company: 'Apple', location: 'Cupertino, CA', status: 'interviewing', lat: 37.3382, lng: -122.0724, logo: '🍎' },
]

const getStatusColor = (status) => {
  const colors = {
    applied: '#3b82f6',
    interviewing: '#fbbf24',
    offered: '#10b981',
    rejected: '#ef4444',
    accepted: '#8b5cf6',
  }
  return colors[status] || colors.applied
}

const statusBgColors = {
  applied: 'bg-blue-500/20 text-blue-300',
  interviewing: 'bg-yellow-500/20 text-yellow-300',
  offered: 'bg-green-500/20 text-green-300',
  rejected: 'bg-red-500/20 text-red-300',
  accepted: 'bg-purple-500/20 text-purple-300',
}

export default function MapView() {
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Header - Fixed to top of scrollable area */}
        <div className="border-b border-white/10 bg-slate-900/50 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Map View</h1>
            <p className="text-slate-400 mt-1">Visualize your job applications geographically</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-900 border-slate-800 h-[600px]">
                <CardContent className="h-full p-0 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-124.5,24.5,-66.9,49.4&layer=mapnik"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                    © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Legend & Locations */}
            <div className="lg:col-span-1 space-y-6">
              {/* Status Legend */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle>Status Legend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { status: 'Applied', color: '#3b82f6' },
                      { status: 'Interviewing', color: '#fbbf24' },
                      { status: 'Offered', color: '#10b981' },
                      { status: 'Accepted', color: '#8b5cf6' },
                      { status: 'Withdrawn', color: '#f97316' },
                      { status: 'Rejected', color: '#ef4444' },
                    ].map((item) => (
                      <div key={item.status} className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-slate-400 text-sm">{item.status}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Applications by Location */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle>Applications by Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div key={app.id} className="p-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm flex-shrink-0">
                            {app.logo}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-semibold text-sm">{app.company}</h4>
                            <p className="text-slate-400 text-xs mt-0.5">{app.location}</p>
                            <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${statusBgColors[app.status]}`}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Info Box */}
          <Card className="bg-slate-800 border-slate-700 mt-6">
            <CardContent className="pt-6">
              <p className="text-slate-300 text-sm">
                💡 <strong>Pro Tip:</strong> The map feature helps you visualize your job search geographically, identify hotspots of opportunity, and plan your relocation strategy. Each color represents a different application status.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
