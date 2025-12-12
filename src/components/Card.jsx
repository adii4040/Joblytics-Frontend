import React from 'react'
import { cn } from '../lib/utils'

export function Card({ className, children, ...props }) {
  return (
    <div className={cn('bg-slate-900 rounded-xl border border-slate-800', className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('p-6 border-b border-slate-800', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h2 className={cn('text-2xl font-bold text-white', className)} {...props}>
      {children}
    </h2>
  )
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn('text-slate-400 text-sm', className)} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div className={cn('p-6 border-t border-slate-800 flex justify-between gap-4', className)} {...props}>
      {children}
    </div>
  )
}
