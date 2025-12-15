import React from 'react'
import { Card, CardContent } from '../Card'

const getCategoryColor = (category) => {
  if (!category) return 'text-slate-400'
  const lower = category.toLowerCase()
  if (lower.includes('excellent') || lower.includes('strong')) return 'text-green-400'
  if (lower.includes('good') || lower.includes('average')) return 'text-yellow-400'
  if (lower.includes('weak') || lower.includes('poor') || lower.includes('low')) return 'text-red-400'
  return 'text-slate-400'
}

const getMetricIcon = (key) => {
  const icons = {
    'performance': '📊',
    'success': '🎯',
    'applied': '📝',
    'interview': '💼',
    'offer': '✅',
    'rejection': '❌'
  }
  for (const [k, v] of Object.entries(icons)) {
    if (key.toLowerCase().includes(k)) return v
  }
  return '📈'
}

const getPerformanceCategory = (value) => {
  if (value >= 80) return 'Excellent'
  if (value >= 60) return 'Good'
  if (value >= 40) return 'Average'
  if (value >= 20) return 'Weak'
  return 'Very Weak'
}

export default function OverallStatusReport({ report, overview }) {
  const statusRates = overview.overall_status_rates || {}
  
  const reportSections = [
    { 
      key: 'performanceReport',
      label: 'Performance Rate', 
      value: statusRates.performance_rate || 0,
      icon: '📊',
      data: report.performanceReport
    },
    { 
      key: 'successRateReport',
      label: 'Success Rate', 
      value: statusRates.success_rate || 0,
      icon: '🎯',
      data: report.successRateReport
    },
    { 
      key: 'appliedToInterviewReport',
      label: 'Applied → Interview', 
      value: statusRates.applied_to_interview_conversion || 0,
      icon: '📝',
      data: report.appliedToInterviewReport
    },
    { 
      key: 'interviewToOfferReport',
      label: 'Interview → Offer', 
      value: statusRates.interview_to_offer_conversion || 0,
      icon: '💼',
      data: report.interviewToOfferReport
    },
    { 
      key: 'offerAcceptanceReport',
      label: 'Offer Acceptance', 
      value: statusRates.offer_acceptance_rate || 0,
      icon: '✅',
      data: report.offerAcceptanceReport
    },
    { 
      key: 'rejectionRateReport',
      label: 'Rejection Rate', 
      value: statusRates.rejection_rate || 0,
      icon: '❌',
      data: report.rejectionRateReport
    },
  ]

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-white mb-2">Overall Performance Summary</h2>
      <p className="text-slate-400 mb-8">Key metrics that define your job search effectiveness</p>
      
      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportSections.map((section) => (
          <Card key={section.key} className="bg-[#0c1326] border border-white/10">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{section.icon}</span>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{section.label}</h3>
                    <p className="text-3xl font-bold text-white mt-1">{section.value.toFixed(1)}%</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(section.data?.category)}`}>
                  {section.data?.category || 'N/A'}
                </span>
              </div>
              
              <div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {section.data?.feedback || 'Analysis in progress...'}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
