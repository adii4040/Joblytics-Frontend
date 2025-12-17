import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { useVerifyEmail } from '../hooks/useAuth/useVerifyEmail'

export default function VerifyEmail() {
  const { id, emailVerificationToken } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading') // loading, success, error
  const [message, setMessage] = useState('')
  const verifyEmailMutation = useVerifyEmail()

  useEffect(() => {
    if (!id || !emailVerificationToken) {
      setStatus('error')
      setMessage('Invalid verification link. Missing token or user ID.')
      return
    }

    // Trigger the verification mutation
    verifyEmailMutation.mutate(
      { id, emailVerificationToken },
      {
        onSuccess: () => {
          setStatus('success')
          setMessage('Email verified successfully!')
        },
        onError: (error) => {
          setStatus('error')
          setMessage(error.message || 'Email verification failed. Please try again.')
        }
      }
    )
  }, [id, emailVerificationToken])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#0b1021] border border-white/10 rounded-lg shadow-2xl p-8">
          {/* Loading State */}
          {status === 'loading' && (
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin"></div>
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white mb-2">Verifying Email</h1>
                <p className="text-slate-400">Please wait while we verify your email address...</p>
              </div>
            </div>
          )}

          {/* Success State */}
          {status === 'success' && (
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white mb-2">Email Verified!</h1>
                <p className="text-slate-400 mb-4">{message}</p>
                <p className="text-sm text-slate-500">Redirecting you to login in 2 seconds...</p>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-1 overflow-hidden">
                <div className="bg-green-500 h-full animate-[shrink_2s_ease-in-out] origin-left"></div>
              </div>
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white mb-2">Verification Failed</h1>
                <p className="text-slate-400 mb-6">{message}</p>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => navigate('/login')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  Go to Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  Sign Up Again
                </button>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs text-slate-500 text-center">
              {status === 'loading' && 'This may take a few moments...'}
              {status === 'success' && 'You can now log in with your verified email account.'}
              {status === 'error' && 'If this link is expired or invalid, please sign up again or contact support.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
