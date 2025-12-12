import React from 'react'
import { cn } from '../lib/utils'

export function Button({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-slate-700 text-white hover:bg-slate-800 focus:ring-slate-600',
    outline: 'border border-slate-600 text-foreground hover:bg-slate-900 focus:ring-slate-500',
    ghost: 'hover:bg-slate-800 text-foreground',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
