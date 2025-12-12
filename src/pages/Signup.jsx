import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/Card'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import useSignup from '../hooks/useAuth/useSignup'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'

export default function Signup() {
  const signupMutation = useSignup()

  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    avatar: null
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formDataObj = new FormData()
    formDataObj.append("username", formData.username)
    formDataObj.append("fullname", formData.fullname)
    formDataObj.append("email", formData.email)
    formDataObj.append("password", formData.password)
    if (formData.avatar) {
      formDataObj.append("avatar", formData.avatar)
    }

    signupMutation.mutate(formDataObj)
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
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Start tracking your job applications today</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {signupMutation.isError && (
                <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  {signupMutation.error?.response?.data?.message || 'Signup failed. Please try again.'}
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-slate-500" size={18} />
                  <Input
                    type="text"
                    name="fullname"
                    placeholder="John Doe"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-slate-500" size={18} />
                  <Input
                    type="text"
                    name="username"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

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

              <div className="space-y-2">
                <label htmlFor="avatar" className="block text-sm font-medium text-white cursor-pointer">
                  Avatar (Optional)
                </label>
                <Input
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={handleChange}
                  accept="image/*"
                  className="cursor-pointer"
                />
                {formData.avatar && (
                  <p className="text-xs text-slate-400 mt-1">{formData.avatar.name}</p>
                )}
              </div>

              <Button 
                type="submit" 
                variant="default" 
                className="w-full group"
                disabled={signupMutation.isPending}
              >
                {signupMutation.isPending ? 'Creating Account...' : 'Create Account'} 
                {!signupMutation.isPending && <ArrowRight size={18} className="group-hover:translate-x-1 transition" />}
              </Button>
            </form>

            <div className="mt-6 text-center text-slate-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 transition font-medium">
                Login here
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Success Message */}
        {signupMutation.isSuccess && (
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-center">
            <p className="text-sm font-medium">Account created successfully! Redirecting...</p>
          </div>
        )}

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700 text-center">
          <p className="text-xs text-slate-400 mb-2">Sign up to get started:</p>
          <p className="text-sm text-slate-300">Track applications, analyze progress, and land your dream job</p>
        </div>
      </div>
    </div>
  )
}
