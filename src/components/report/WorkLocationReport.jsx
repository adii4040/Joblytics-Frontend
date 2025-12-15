import React from 'react'
import { Card, CardContent } from '../Card'

const getLevelColor = (level) => {
  switch (level) {
    case 'Excellent':
      return 'bg-green-500/20 text-green-400'
    case 'Good':
      return 'bg-lime-500/20 text-lime-400'
    case 'Average':
      return 'bg-yellow-500/20 text-yellow-400'
    case 'Weak':
      return 'bg-orange-500/20 text-orange-400'
    case 'Very Weak':
      return 'bg-red-500/20 text-red-400'
    default:
      return 'bg-blue-500/20 text-blue-400'
  }
}

const getLocationIcon = (locationType) => {
  switch (locationType) {
    case 'Hybrid':
      return '🏢'
    case 'On-Site':
      return '🏭'
    case 'Remote':
      return '🌍'
    default:
      return '📍'
  }
}

export default function WorkLocationReport({ report }) {
    
  return (
    <div className="mb-16">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">📍</span>
        <h2 className="text-2xl font-bold text-white">Work Location Performance</h2>
      </div>
      <p className="text-slate-400 mb-8">Analyze effectiveness across remote, hybrid, and on-site positions</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {report.map((location) => {
          const total = location.summary.totalApplications
          return (
            <Card key={location.workLocationType} className="bg-[#0c1326] border border-white/10">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{getLocationIcon(location.workLocationType)}</span>
                    <h3 className="text-lg font-semibold text-white">{location.workLocationType}</h3>
                  </div>
                  <span className="bg-slate-700/50 text-slate-300 text-xs font-semibold px-2 py-1 rounded">
                    {total} applications
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-6 pb-6 border-b border-white/10">
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Interview Rate</p>
                    <p className="text-2xl font-bold text-white">{location.summary.interviewRate}%</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Offer Rate</p>
                    <p className="text-2xl font-bold text-white">{location.summary.offerRate}%</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Acceptance Rate</p>
                    <p className="text-2xl font-bold text-white">{location.summary.offerAcceptanceRate}%</p>
                  </div>
                </div>

                {/* Performance Badges */}
                <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-white/10">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getLevelColor(location.levels.interview)}`}>
                    Resume: {location.levels.interview}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getLevelColor(location.levels.offer)}`}>
                    Interview: {location.levels.offer}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getLevelColor(location.levels.acceptance)}`}>
                    Acceptance: {location.levels.acceptance}
                  </span>
                </div>

                {/* Insights */}
                <div>
                  <ul className="space-y-3">
                    {location.insights.map((insight, idx) => (
                      <li key={idx} className="flex gap-2 text-slate-300 text-sm">
                        <span className="text-blue-400 flex-shrink-0">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
