import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Upload, MapPin } from 'lucide-react'

import useUploadApplications from '../hooks/useApplications/useUploadApplications'

export default function AddApplication() {
  const uploadMutation = useUploadApplications()

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    workType: 'Job',
    workLocationType: 'Remote',
    salaryAmount: '',
    salaryCurrency: 'INR',
    applicationStatus: 'Applied',
    location: '',
    source: 'LinkedIn',
    customSource: '',
    appliedDate: new Date().toISOString().split('T')[0],
    jobDescription: null,
    notes: '',
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'jobDescription' && files) {
      setFormData(prev => ({
        ...prev,
        jobDescription: files[0]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Prepare data for submission
    const submissionData = {
      ...formData,
      // If source is "Other", use customSource value as the actual source
      source: formData.source === 'Other' ? formData.customSource : formData.source
    }

    // Remove customSource from submission data as it's not in the schema
    delete submissionData.customSource

    const formPayload = new FormData()
    for (const key in submissionData) {
      formPayload.append(key, submissionData[key])
    }

    uploadMutation.mutate(formPayload)
    //console.log('Form submitted:', formPayload)
    navigate('/applications')
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Header - Fixed to top of scrollable area */}
        <div className="border-b border-white/10 bg-slate-900/50 backdrop-blur">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Add New Application</h1>
            <p className="text-slate-400 mt-1">Track a new job application</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company & Role */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Company Name *</label>
                    <Input
                      name="companyName"
                      placeholder="e.g., Google, Microsoft"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Role *</label>
                    <Input
                      name="role"
                      placeholder="e.g., Senior Developer"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Application Type & Work Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Job Type *</label>
                    <select
                      name="workType"
                      value={formData.workType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Job">Job</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Work Location Type *</label>
                    <select
                      name="workLocationType"
                      value={formData.workLocationType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-Site">On-Site</option>
                    </select>
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Salary *</label>
                  <div className="grid grid-cols-5 gap-4">
                    <select
                      name="salaryCurrency"
                      value={formData.salaryCurrency}
                      onChange={handleChange}
                      className="col-span-1 px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                    <Input
                      name="salaryAmount"
                      placeholder="Amount"
                      type="number"
                      min="0"
                      value={formData.salaryAmount}
                      onChange={handleChange}
                      className="col-span-4"
                      required
                    />
                  </div>
                </div>

                {/* Status & Source */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Application Status *</label>
                    <select
                      name="applicationStatus"
                      value={formData.applicationStatus}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Offered">Offered</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Withdrawn">Withdrawn</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Source *</label>
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Indeed">Indeed</option>
                      <option value="Company Website">Company Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Glassdoor">Glassdoor</option>
                      <option value="Other">Other</option>
                    </select>
                    {formData.source === 'Other' && (
                      <Input
                        name="customSource"
                        placeholder="Please specify the source"
                        value={formData.customSource}
                        onChange={handleChange}
                        className="mt-3"
                        required
                      />
                    )}
                  </div>
                </div>

                {/* Location & Applied Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-slate-500" size={18} />
                      <Input
                        name="location"
                        placeholder="e.g., San Francisco, CA"
                        value={formData.location}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Applied Date *</label>
                    <Input
                      name="appliedDate"
                      type="date"
                      value={formData.appliedDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Job Description */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Upload Job Description (PDF)</label>
                  <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      name="jobDescription"
                      accept=".pdf,.doc,.docx"
                      onChange={handleChange}
                      className="hidden"
                      id="jobDescription"
                    />
                    <label htmlFor="jobDescription" className="cursor-pointer">
                      <Upload className="mx-auto text-slate-400 mb-2" size={32} />
                      <p className="text-slate-400">{formData.jobDescription ? formData.jobDescription.name : 'Click to upload or drag and drop'}</p>
                      <p className="text-slate-500 text-sm">PDF, DOC up to 10MB</p>
                    </label>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Notes</label>
                  <textarea
                    name="notes"
                    placeholder="Add any additional notes..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows="4"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-slate-700">
                  <Button type="submit" variant="default" className="flex-1">
                    Save Application
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate('/applications')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
