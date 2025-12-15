// Utility builders for analytics UI data
export const metricCardConfigs = (analytics = {}) => [
  { label: 'Total Applications', value: analytics.totalApplications || 0, color: 'from-[#0a1f3a] to-[#0a1f3a]', iconBg: 'bg-[#2457ff]' },
  { label: 'Accepted', value: analytics.accepted || 0, color: 'from-[#0d2818] to-[#0d2818]', iconBg: 'bg-[#16a34a]' },
  { label: 'Offered', value: analytics.offered || 0, color: 'from-[#1f0f2f] to-[#1f0f2f]', iconBg: 'bg-[#a855f7]' },
  { label: 'Interviewing', value: analytics.interviewing || 0, color: 'from-[#0a1f2a] to-[#0a1f2a]', iconBg: 'bg-[#06b6d4]' },
  { label: 'Rejected', value: analytics.rejected || 0, color: 'from-[#2a0f0f] to-[#2a0f0f]', iconBg: 'bg-[#ef4444]' },
  { label: 'Withdrawn', value: analytics.withdrawn || 0, color: 'from-[#2a1f0a] to-[#2a1f0a]', iconBg: 'bg-[#f97316]' },
]

export const conversionMetricConfigs = (statusRates = {}) => [
  { label: 'Performance Rate', value: statusRates.performance_rate },
  { label: 'Success Rate', value: statusRates.success_rate, color: 'text-green-400' },
  { label: 'Applied → Interview', value: statusRates.applied_to_interview_conversion },
  { label: 'Interview → Offer', value: statusRates.interview_to_offer_conversion },
  { label: 'Offer Acceptance', value: statusRates.offer_acceptance_rate },
  { label: 'Rejection Rate', value: statusRates.rejection_rate, color: 'text-red-400' },
]

export const buildStatusBreakdownData = (analytics = {}) => [
  { name: 'Applied', value: analytics.applied || 0, fill: '#3b82f6' },
  { name: 'Interviewing', value: analytics.interviewing || 0, fill: '#fbbf24' },
  { name: 'Offered', value: analytics.offered || 0, fill: '#10b981' },
  { name: 'Accepted', value: analytics.accepted || 0, fill: '#8b5cf6' },
  { name: 'Rejected', value: analytics.rejected || 0, fill: '#ef4444' },
  { name: 'Withdrawn', value: analytics.withdrawn || 0, fill: '#64748b' },
]

export const buildWorkLocationData = (analytics = {}) => [
  { name: 'Remote', value: analytics.remoteJobs || 0, fill: '#3b82f6' },
  { name: 'Hybrid', value: analytics.hybridJobs || 0, fill: '#8b5cf6' },
  { name: 'On-Site', value: analytics.onSiteJobs || 0, fill: '#06b6d4' },
]

export const buildJobTypeData = (analytics = {}) => [
  { name: 'Jobs', value: analytics.Jobs || 0, fill: '#22c55e' },
  { name: 'Internships', value: analytics.Internships || 0, fill: '#f97316' },
]
