import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
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

import useFetchAnalytics from '../hooks/useAnalytics/useFetchAnalytics'


export default function Analytics() {
  const navigate = useNavigate()

  const [range, setRange] = useState('all');

  const { data, isLoading, isError } = useFetchAnalytics(range)

  const overview = data?.data?.overview || {}

  const totalApplications = overview.totalApplications || 0
  const workLocationType = overview.workLocationType || []
  const workType = overview.workType || []

  const remoteWork = workLocationType.find((item) => item.workLocationType === 'Remote') || {}
  const hybridWork = workLocationType.find((item) => item.workLocationType === 'Hybrid') || {}
  const onSiteWork = workLocationType.find((item) => item.workLocationType === 'On-Site') || {}

  const jobWork = workType.find((item) => item.workType === 'Job') || {}
  const internshipWork = workType.find((item) => item.workType === 'Internship') || {}

  const analytics = {
    totalApplications,
    applied: overview.applied || 0,
    interviewing: overview.interviewing || 0,
    offered: overview.offered || 0,
    accepted: overview.accepted || 0,
    rejected: overview.rejected || 0,
    withdrawn: overview.withdrawn || 0,
    remoteJobs: remoteWork.total || 0,
    hybridJobs: hybridWork.total || 0,
    onSiteJobs: onSiteWork.total || 0,
    Jobs: jobWork.total || 0,
    Internships: internshipWork.total || 0,
    sources: overview.sources || [],
    status_rates: overview.overall_status_rates || {},
    workLocationType_rates: {
      remotePercentage: Number(remoteWork.workLocationTypePercentage || 0),
      hybridPercentage: Number(hybridWork.workLocationTypePercentage || 0),
      onSitePercentage: Number(onSiteWork.workLocationTypePercentage || 0),
    },
    jobType_rates: {
      jobPercentage: Number(jobWork.workTypePercentage || 0),
      internshipPercentage: Number(internshipWork.workTypePercentage || 0),
    },
  }

  const sourcePerformanceData = (analytics.sources || []).map((source) => ({
    ...source,
    offerRate: Number(source.offerRate || 0),
    interviewRate: Number(source.interviewRate || 0),
  }))

  const statusRates = analytics.status_rates || {}
  const workLocationRates = analytics.workLocationType_rates || {}
  const jobTypeRates = analytics.jobType_rates || {}

  const conversionMetrics = conversionMetricConfigs(statusRates)
  const metricCards = metricCardConfigs(analytics)
  const statusBreakdownData = buildStatusBreakdownData(analytics)
  const workLocationData = buildWorkLocationData(analytics)
  const jobTypeData = buildJobTypeData(analytics)

  return (
    isLoading ? (
      <div className="flex min-h-screen bg-slate-950">
        <Sidebar />
        <main className="flex-1 overflow-auto flex items-center justify-center">
          <p className="text-white text-lg">Loading analytics...</p>
        </main>
      </div>
    ) : isError ? (
      <div className="flex min-h-screen bg-slate-950">
        <Sidebar />
        <main className="flex-1 overflow-auto flex items-center justify-center">
          <p className="text-red-400 text-lg">Error loading analytics</p>
        </main>
      </div>
    ) : (
      <div className="flex h-screen bg-[#070b17]">
        <Sidebar />

        <main className="flex-1 overflow-auto">
          {/* Header */}
          <div className="border-b border-white/10 bg-[#0b1021]/80 backdrop-blur">
            <div className='flex flex-col md:flex-row md:justify-between md:items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6'>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Analytics</h1>
                <p className="text-slate-400 mt-1 text-sm md:text-base">Track your job search metrics and success rates</p>
              </div>

              <div className='flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5'>
                <div className='flex items-center gap-2 md:gap-3 w-full md:w-auto'>
                  <label htmlFor="range" className='text-slate-300 text-xs md:text-sm whitespace-nowrap'>Range</label>
                  <select value={range} onChange={(e) => setRange(e.target.value)} name="range" id="range" className='flex-1 md:flex-none bg-[#0f172a] border border-white/10 text-slate-200 px-2 md:px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm'>
                    <option value="all">All Time</option>
                    <option value="1m">1 Month</option>
                    <option value="3m">3 Months</option>
                    <option value="6m">6 Months</option>
                    <option value="1y">1 Year</option>
                  </select>
                </div>

                <button
                  onClick={() => navigate('/report')}
                  className='w-full md:w-auto bg-[#0f172a] hover:bg-[#1e293b] text-white border border-white/10 px-3 md:px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center justify-center md:justify-start gap-2'
                >
                  <span>📊</span>
                  <span>Get Full Report</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Key Metrics */}
            <MetricCards metricCards={metricCards} />

            {/* Charts Row 1 - Conversion Rates and Distributions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
          </div>
        </main>
      </div>
    )
  )
}
