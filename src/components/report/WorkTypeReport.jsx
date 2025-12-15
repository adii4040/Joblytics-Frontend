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

export default function WorkTypeReport({ report }) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">🏢</span>
        <h2 className="text-2xl font-bold text-white">Job Type Performance Analysis</h2>
      </div>
      <p className="text-slate-400 mb-8">Compare how you perform across full-time jobs and internships</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {report.map((workType) => {
          const total = workType.summary.totalApplications
          return (
            <Card key={workType.workType} className="bg-[#0c1326] border border-white/10">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-6 pb-4 border-b border-white/10">
                  <h3 className="text-lg font-semibold text-white">{workType.workType}</h3>
                  <span className="bg-slate-700/50 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full">
                    {total} applications
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-white/10">
                  <div>
                    <p className="text-slate-400 text-xs mb-2">Interview Rate</p>
                    <p className="text-3xl font-bold text-white">{workType.summary.interviewRate}%</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-2">Offer Rate</p>
                    <p className="text-3xl font-bold text-white">{workType.summary.offerRate}%</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-2">Acceptance Rate</p>
                    <p className="text-3xl font-bold text-white">{workType.summary.offerAcceptanceRate}%</p>
                  </div>
                </div>

                {/* Performance Badges */}
                <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-white/10">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(workType.levels.interviewPerformance)}`}>
                    Resume: {workType.levels.interviewPerformance}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(workType.levels.offerPerformance)}`}>
                    Interview: {workType.levels.offerPerformance}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(workType.levels.acceptancePerformance)}`}>
                    Acceptance: {workType.levels.acceptancePerformance}
                  </span>
                </div>

                {/* Insights */}
                <div>
                  <ul className="space-y-3">
                    {workType.insights.map((insight, idx) => (
                      <li key={idx} className="flex gap-3 text-slate-300 text-sm">
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
