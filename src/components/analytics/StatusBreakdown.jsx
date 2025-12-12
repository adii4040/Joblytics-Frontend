import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts'

export function StatusBreakdown({ statusBreakdownData }) {
  return (
    <Card className="bg-[#0c1326] border border-white/5 shadow-lg shadow-black/30 mb-8">
      <CardHeader>
        <CardTitle className="text-white">Application Status Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statusBreakdownData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #404040' }}
              labelStyle={{ color: '#fafafa' }}
              formatter={(value) => `${value} apps`}
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]}>
              {statusBreakdownData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default StatusBreakdown
