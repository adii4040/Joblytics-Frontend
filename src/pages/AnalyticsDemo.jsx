import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import {
  metricCardConfigs,
  conversionMetricConfigs,
  buildStatusBreakdownData,
  buildWorkLocationData,
  buildJobTypeData,
} from '../utils/analyticsConstants'
import MetricCards from '../components/analytics/MetricCards'
import ConversionMetrics from '../components/analytics/ConversionMetrics'
import DistributionCharts from '../components/analytics/DistributionCharts'
import StatusBreakdown from '../components/analytics/StatusBreakdown'
import SourcePerformanceTable from '../components/analytics/SourcePerformanceTable'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { Button } from '../components/Button'

// Demo data - realistic job search analytics
const demoAnalytics = {
  totalApplications: 42,
  applied: 18,
  interviewing: 8,
  offered: 4,
  accepted: 2,
  rejected: 7,
  withdrawn: 3,
  remoteJobs: 25,
  hybridJobs: 12,
  onSiteJobs: 5,
  Jobs: 35,
  Internships: 7,
  sources: [
    { source: 'LinkedIn', total: 18, offered: 2, interviewing: 4, offerRate: 11.1, interviewRate: 22.2 },
    { source: 'Indeed', total: 12, offered: 1, interviewing: 2, offerRate: 8.3, interviewRate: 16.7 },
    { source: 'Company Website', total: 8, offered: 1, interviewing: 1, offerRate: 12.5, interviewRate: 12.5 },
    { source: 'Referral', total: 4, offered: 0, interviewing: 1, offerRate: 0, interviewRate: 25.0 },
  ],
  status_rates: {
    performance_rate: 28.6,
    success_rate: 9.5,
    applied_to_interview_conversion: 44.4,
    interview_to_offer_conversion: 50.0,
    offer_acceptance_rate: 50.0,
    rejection_rate: 16.7,
  },
  workLocationType_rates: {
    remotePercentage: 59.5,
    hybridPercentage: 28.6,
    onSitePercentage: 11.9,
  },
  jobType_rates: {
    jobPercentage: 83.3,
    internshipPercentage: 16.7,
  },
}

export default function AnalyticsDemo() {
  const [range, setRange] = useState('all')

  const analytics = demoAnalytics
  const sourcePerformanceData = analytics.sources
  const statusRates = analytics.status_rates
  const workLocationRates = analytics.workLocationType_rates
  const jobTypeRates = analytics.jobType_rates

  const conversionMetrics = conversionMetricConfigs(statusRates)
  const metricCards = metricCardConfigs(analytics)
  const statusBreakdownData = buildStatusBreakdownData(analytics)
  const workLocationData = buildWorkLocationData(analytics)
  const jobTypeData = buildJobTypeData(analytics)

  return (
    <div className="flex h-screen bg-[#070b17]">
      {/* Demo Sidebar */}
      <aside className="fixed md:static top-0 left-0 w-64 h-screen bg-slate-900 border-r border-white/10 flex flex-col z-40">
        {/* Logo */}
        <div className="px-6 py-10 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">J</span>
            </div>
            <span className="text-white font-bold tracking-tight">Joblytic</span>
          </Link>
        </div>

        {/* Demo Banner */}
        <div className="p-4">
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold text-sm">Demo Mode</span>
            </div>
            <p className="text-slate-300 text-xs mb-3">
              This is a preview with sample data. Sign up to track your real job applications!
            </p>
            <div className="space-y-2">
              <Link to="/signup">
                <Button variant="default" size="sm" className="w-full text-xs">
                  Sign Up Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="w-full text-xs text-slate-300 hover:text-white">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
            </svg>
            <span className="font-medium">Analytics Demo</span>
          </div>
        </nav>

        {/* Back to Home */}
        <div className="p-4 border-t border-white/10">
          <Link to="/">
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
              <ArrowLeft size={18} />
              Back to Home
            </Button>
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-white/10 bg-[#0b1021]/80 backdrop-blur sticky top-0 z-10">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
                <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-purple-300 text-xs font-medium">
                  DEMO
                </span>
              </div>
              <p className="text-slate-400 mt-1">Track your job search metrics and success rates</p>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="range" className="text-slate-300 text-sm">
                Range
              </label>
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                name="range"
                id="range"
                className="bg-[#0f172a] border border-white/10 text-slate-200 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="all">All Time</option>
                <option value="1m">1 Month</option>
                <option value="3m">3 Months</option>
                <option value="6m">6 Months</option>
                <option value="1y">1 Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Demo Notice */}
          <div className="mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">You're viewing demo analytics</h3>
                <p className="text-slate-300 text-sm">
                  This dashboard shows sample job application data. Create a free account to track your own applications and get
                  personalized insights.
                </p>
              </div>
              <Link to="/signup">
                <Button variant="default" size="sm" className="whitespace-nowrap">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Key Metrics */}
          <MetricCards metricCards={metricCards} />

          {/* Charts Row 1 - Conversion Rates and Distributions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <ConversionMetrics conversionMetrics={conversionMetrics} />
            </div>
            <DistributionCharts
              workLocationData={workLocationData}
              workLocationRates={workLocationRates}
              jobTypeData={jobTypeData}
              jobTypeRates={jobTypeRates}
            />
          </div>

          {/* Status Breakdown */}
          <StatusBreakdown statusBreakdownData={statusBreakdownData} />

          {/* Source Analysis Table */}
          <SourcePerformanceTable sourcePerformanceData={sourcePerformanceData} />

          {/* CTA Section */}
          <div className="mt-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to track your real applications?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Sign up for free and start organizing your job search. Track applications, get insights, and land your dream job
              faster.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/signup">
                <Button variant="default" className="bg-white text-blue-600 hover:bg-slate-100">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost" className="text-white border-white/30 hover:bg-white/10">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
