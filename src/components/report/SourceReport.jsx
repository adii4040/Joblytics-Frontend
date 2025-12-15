import React, { useState } from 'react'
import { Card, CardContent } from '../Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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

const getCategoryColor = (category) => {
  if (category === 'Insufficient Data') {
    return 'bg-slate-500/20 text-slate-300'
  }
  return 'bg-green-500/20 text-green-400'
}

const getSourceIcon = (source) => {
  const icons = {
    'LinkedIn': '💼',
    'Indeed': '🔍',
    'Company Website': '🌐',
    'Referral': '🤝',
    'AngelList': '✨',
    'College Placement': '🎓',
    'unStop': '📱',
    'Placement-Cell': '🏫'
  }
  return icons[source] || '📍'
}

export default function SourceReport({ report }) {
  const [expandedSource, setExpandedSource] = useState(null)

  const toggleAccordion = (source) => {
    setExpandedSource(expandedSource === source ? null : source)
  }

  // Prepare data for bar chart
  const chartData = report.map((source) => ({
    name: `${source.source}\n(${source.summary.totalApplications})`,
    Interview: parseFloat(source.summary.interviewRate.toFixed(1)),
    Offer: parseFloat(source.summary.offerRate.toFixed(1)),
    Accept: parseFloat(source.summary.acceptanceRate.toFixed(1))
  }))

  return (
    <div className="mb-16">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">📊</span>
        <h2 className="text-2xl font-bold text-white">Application Source Effectiveness</h2>
      </div>
      <p className="text-slate-400 mb-8">Strategic review of which platforms deliver the best results</p>
      
      {/* Bar Chart */}
      <Card className="bg-[#0c1326] border border-white/10 mb-6">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-white mb-6">Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={120}
                interval={0}
              />
              <YAxis 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8' }}
                label={{ value: 'Rate (%)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0c1326', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
              <Bar dataKey="Interview" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Offer" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Accept" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="space-y-3">
        {report.map((source) => (
          <div key={source.source}>
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(source.source)}
              className="w-full bg-[#0c1326] border border-white/10 hover:border-white/20 transition rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4 flex-1">
                <span className="text-3xl">{getSourceIcon(source.source)}</span>
                <div className="text-left flex-1">
                  <h3 className="text-lg font-semibold text-white">{source.source}</h3>
                  <p className="text-slate-400 text-sm">{source.summary.totalApplications} applications</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Interview</p>
                    <p className="text-sm font-semibold text-white">{source.summary.interviewRate.toFixed(1)}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Offer</p>
                    <p className="text-sm font-semibold text-white">{source.summary.offerRate.toFixed(1)}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Accept</p>
                    <p className="text-sm font-semibold text-white">{source.summary.acceptanceRate.toFixed(1)}%</p>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(source.category)} flex-shrink-0`}>
                  {source.category}
                </span>
                
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${expandedSource === source.source ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </button>

            {/* Accordion Content */}
            {expandedSource === source.source && (
              <div className="bg-[#0c1326] border border-t-0 border-white/10 rounded-b-lg p-6 space-y-6">
                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 pb-6 border-b border-white/10">
                  <div>
                    <p className="text-slate-400 text-xs mb-2">Interview Rate</p>
                    <div className="flex items-end gap-2">
                      <p className="text-2xl font-bold text-white">{source.summary.interviewRate.toFixed(1)}%</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getLevelColor(source.levels.interview)}`}>
                        {source.levels.interview}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-2">Offer Rate</p>
                    <div className="flex items-end gap-2">
                      <p className="text-2xl font-bold text-white">{source.summary.offerRate.toFixed(1)}%</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getLevelColor(source.levels.offer)}`}>
                        {source.levels.offer}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-2">Acceptance Rate</p>
                    <div className="flex items-end gap-2">
                      <p className="text-2xl font-bold text-white">{source.summary.acceptanceRate.toFixed(1)}%</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getLevelColor(source.levels.acceptance)}`}>
                        {source.levels.acceptance}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Performance Insights */}
                <div className="pb-6 border-b border-white/10">
                  <p className="text-slate-300 text-sm font-semibold mb-3">Performance Insights</p>
                  <ul className="space-y-2">
                    {source.insights.map((insight, idx) => (
                      <li key={idx} className="flex gap-2 text-slate-300 text-sm">
                        <span className="text-blue-400 flex-shrink-0">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendation */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4">
                  <div className="flex gap-3">
                    <span className="text-blue-400 flex-shrink-0 text-lg">💡</span>
                    <div>
                      <p className="text-blue-400 text-xs font-semibold mb-1">Recommendation</p>
                      <p className="text-slate-300 text-sm">{source.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
