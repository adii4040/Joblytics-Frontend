import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/Card'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { useLogin } from '../hooks/useAuth/useLogin'
import { Mail, Lock, ArrowRight } from 'lucide-react'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const loginMutation = useLogin()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate(formData)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">J</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Joblytic</span>
        </Link>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Login to your Joblytic account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {loginMutation.isError && (
                <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  {loginMutation.error?.response?.data?.message || 'Login failed. Please try again.'}
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                variant="default" 
                className="w-full group"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? 'Logging in...' : 'Login'} 
                {!loginMutation.isPending && <ArrowRight size={18} className="group-hover:translate-x-1 transition" />}
              </Button>
            </form>

            <div className="mt-6 text-center text-slate-400 text-sm">
              New here?{' '}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition font-medium">
                Create an account
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Success Message */}
        {loginMutation.isSuccess && (
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-center">
            <p className="text-sm font-medium">Login successful! Redirecting...</p>
          </div>
        )}

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700 text-center">
          <p className="text-xs text-slate-400 mb-2">Welcome to Joblytic:</p>
          <p className="text-sm text-slate-300">Track your job applications with ease</p>
        </div>
      </div>
    </div>
  )
}
