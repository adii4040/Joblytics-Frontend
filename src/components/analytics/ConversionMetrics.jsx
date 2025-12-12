import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card'

export function ConversionMetrics({ conversionMetrics }) {
  return (
    <Card className="h-full bg-[#0c1326] border border-white/5 shadow-lg shadow-black/30">
      <CardHeader>
        <CardTitle className="text-white">Conversion Rates</CardTitle>
        <p className="text-slate-400 text-sm">Funnel performance</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {conversionMetrics.map((item, idx) => (
            <div
              key={item.label}
              className={`flex justify-between items-center ${idx < conversionMetrics.length - 1 ? 'pb-3 border-b border-white/5' : ''}`}
            >
              <span className="text-slate-300 text-sm">{item.label}</span>
              <span className={`${item.color || 'text-white'} font-bold text-lg`}>
                {(item.value ?? 0).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ConversionMetrics
