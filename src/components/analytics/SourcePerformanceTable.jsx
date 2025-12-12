import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card'

export function SourcePerformanceTable({ sourcePerformanceData }) {
  if (!sourcePerformanceData.length) return null

  return (
    <Card className="bg-[#0c1326] border border-white/5 shadow-lg shadow-black/30">
      <CardHeader>
        <CardTitle className="text-white">Source Performance Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Source</th>
                <th className="text-center py-3 px-4 text-slate-400 font-semibold">Total</th>
                <th className="text-center py-3 px-4 text-slate-400 font-semibold">Offered</th>
                <th className="text-center py-3 px-4 text-slate-400 font-semibold">Interviewing</th>
                <th className="text-center py-3 px-4 text-slate-400 font-semibold">Offer Rate</th>
                <th className="text-center py-3 px-4 text-slate-400 font-semibold">Interview Rate</th>
              </tr>
            </thead>
            <tbody>
              {sourcePerformanceData.map((source) => (
                <tr key={source.source} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                  <td className="py-3 px-4 text-white font-medium">{source.source}</td>
                  <td className="text-center py-3 px-4 text-slate-400">{source.total}</td>
                  <td className="text-center py-3 px-4 text-green-400 font-semibold">{source.offered}</td>
                  <td className="text-center py-3 px-4 text-yellow-400 font-semibold">{source.interviewing}</td>
                  <td className="text-center py-3 px-4 text-white font-semibold">{source.offerRate?.toFixed(1)}%</td>
                  <td className="text-center py-3 px-4 text-white font-semibold">{source.interviewRate?.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default SourcePerformanceTable
