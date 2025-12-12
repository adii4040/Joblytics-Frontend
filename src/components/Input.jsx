import React from 'react'
import { cn } from '../lib/utils'

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'w-full px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
        className
      )}
      {...props}
    />
  )
}

export default Input
