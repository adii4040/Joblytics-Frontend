import React from 'react'
import { Card, CardContent } from '../../components/Card'

export function MetricCards({ metricCards }) {
  const getIcon = (label) => {
    switch (label) {
      case 'Total Applications':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
          </svg>
        )
      case 'Accepted':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        )
      case 'Offered':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        )
      case 'Interviewing':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        )
      case 'Rejected':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        )
      case 'Withdrawn':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
      {metricCards.map((stat, idx) => (
        <Card key={stat.label + idx} className={`border border-white/8 bg-gradient-to-br ${stat.color} shadow-lg shadow-black/50 rounded-lg`}>
          <CardContent className="pt-6 pb-5 px-5">
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-white mb-4 ${stat.iconBg}`}>
              {getIcon(stat.label)}
            </div>
            <p className="text-slate-400 text-xs font-medium">{stat.label}</p>
            <p className="text-xl font-bold text-white mt-2">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default MetricCards
