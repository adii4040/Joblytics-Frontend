import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export function DistributionCharts({ workLocationData, workLocationRates, jobTypeData, jobTypeRates }) {
  const remoteColor = workLocationData?.find((d) => d.name === 'Remote')?.fill || '#3b82f6'
  const hybridColor = workLocationData?.find((d) => d.name === 'Hybrid')?.fill || '#8b5cf6'
  const onsiteColor = workLocationData?.find((d) => d.name === 'On-Site')?.fill || '#06b6d4'
  const jobsColor = jobTypeData?.find((d) => d.name === 'Jobs')?.fill || '#22c55e'
  const internshipsColor = jobTypeData?.find((d) => d.name === 'Internships')?.fill || '#f97316'

  return (
    <div className="lg:col-span-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Work Location Distribution */}
        <Card className="bg-[#0b1021] border border-[#11172b] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Work Location Distribution</CardTitle>
            <p className="text-slate-400 text-sm">Remote, Hybrid, and On-site breakdown</p>
          </CardHeader>
          <CardContent className="flex justify-center pt-2 pb-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={workLocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={115}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={6}
                  dataKey="value"
                  stroke="#0b1021"
                  strokeWidth={10}
                >
                  {workLocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1f3a', border: '1px solid #2d3b5c', borderRadius: '6px', padding: '8px 12px' }}
                  labelStyle={{ color: '#fff', fontWeight: 500 }}
                  itemStyle={{ color: '#e2e8f0', fontSize: '13px' }}
                  formatter={(value, name) => [`${value} jobs`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <div className="px-6 pb-6 flex gap-6 justify-center flex-wrap text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: remoteColor }}></span>
              <span>Remote ({(workLocationRates.remotePercentage ?? 0).toFixed(0)}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: hybridColor }}></span>
              <span>Hybrid ({(workLocationRates.hybridPercentage ?? 0).toFixed(0)}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: onsiteColor }}></span>
              <span>On-site ({(workLocationRates.onSitePercentage ?? 0).toFixed(0)}%)</span>
            </div>
          </div>
        </Card>

        {/* Job Type Distribution */}
        <Card className="bg-[#0b1021] border border-[#11172b] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Job Type Distribution</CardTitle>
            <p className="text-slate-400 text-sm">Jobs vs Internships</p>
          </CardHeader>
          <CardContent className="flex justify-center pt-2 pb-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={jobTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={115}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={6}
                  dataKey="value"
                  stroke="#0b1021"
                  strokeWidth={10}
                >
                  {jobTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1f3a', border: '1px solid #2d3b5c', borderRadius: '6px', padding: '8px 12px' }}
                  labelStyle={{ color: '#fff', fontWeight: 500 }}
                  itemStyle={{ color: '#e2e8f0', fontSize: '13px' }}
                  formatter={(value, name) => [`${value} apps`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <div className="px-6 pb-6 flex gap-6 justify-center flex-wrap text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: jobsColor }}></span>
              <span>Jobs ({(jobTypeRates.jobPercentage ?? 0).toFixed(0)}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: internshipsColor }}></span>
              <span>Internships ({(jobTypeRates.internshipPercentage ?? 0).toFixed(0)}%)</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DistributionCharts
