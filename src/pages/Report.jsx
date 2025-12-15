import React from 'react'
import { Sidebar } from '../components/Sidebar'
import useFetchAnalytics from '../hooks/useAnalytics/useFetchAnalytics'
import OverallStatusReport from '../components/report/OverallStatusReport'
import WorkTypeReport from '../components/report/WorkTypeReport'
import WorkLocationReport from '../components/report/WorkLocationReport'
import SourceReport from '../components/report/SourceReport'

export default function Report() {
  const [range, setRange] = React.useState('all')
  const { data, isLoading, isError } = useFetchAnalytics(range)

  const overview = data?.data?.overview || {}
  const reportData = data?.data?.report || {}

  const getRangeLabel = () => {
    const rangeLabels = {
      '1m': 'Last 1 Month',
      '3m': 'Last 3 Months',
      '6m': 'Last 6 Months',
      '1y': 'Last 1 Year',
      'all': 'All Time'
    }
    return rangeLabels[range] || 'All Time'
  }

  return (
    isLoading ? (
      <div className="flex min-h-screen bg-slate-950">
        <Sidebar />
        <main className="flex-1 overflow-auto flex items-center justify-center">
          <p className="text-white text-lg">Loading report...</p>
        </main>
      </div>
    ) : isError ? (
      <div className="flex min-h-screen bg-slate-950">
        <Sidebar />
        <main className="flex-1 overflow-auto flex items-center justify-center">
          <p className="text-red-400 text-lg">Error loading report</p>
        </main>
      </div>
    ) : (
      <div className="flex h-screen bg-[#070b17]">
        <Sidebar />

        <main className="flex-1 overflow-auto">
          {/* Header */}
          <div className="bg-gradient-to-b from-[#0b1021]/95 to-[#070b17] border-b border-white/10 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Your Job Search Performance Report</h1>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl">A personalized breakdown of your applications, conversions, and opportunities for improvement.</p>
              
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <div className="flex items-center gap-2 text-slate-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Report Period: <span className="text-white font-semibold">{getRangeLabel()}</span></span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">Total Applications: <span className="text-white font-semibold">{overview.totalApplications || 0}</span></span>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                  <label htmlFor="range" className='text-slate-300 text-sm font-medium'>Range:</label>
                  <select 
                    value={range} 
                    onChange={(e) => setRange(e.target.value)} 
                    id="range" 
                    className='bg-[#0f172a] border border-white/10 text-slate-200 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:border-white/20 transition cursor-pointer'
                  >
                    <option value="1m">1 Month</option>
                    <option value="3m">3 Months</option>
                    <option value="6m">6 Months</option>
                    <option value="1y">1 Year</option>
                    <option value="all">All Time</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Overall Status Report */}
            {reportData.overall_status_report && (
              <OverallStatusReport report={reportData.overall_status_report} overview={overview} />
            )}

            {/* Work Type Report */}
            {reportData.workTypeReport && (
              <WorkTypeReport report={reportData.workTypeReport} />
            )}

            {/* Work Location Report */}
            {reportData.workLocationReport && (
              <WorkLocationReport report={reportData.workLocationReport}  />
            )}

            {/* Source Report */}
            {reportData.sourceReport && (
              <SourceReport report={reportData.sourceReport} />
            )}
          </div>
        </main>
      </div>
    )
  )
}
