import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { MapPin } from 'lucide-react'

import useFetchApplicationById from '../hooks/useApplications/useFetchApplicationById.js'
import useUpdateApplication from '../hooks/useApplications/useUpdateApplication'

export default function UpdateApplication() {
    const { appId } = useParams()
    const navigate = useNavigate()

    const { data: applicationData, isLoading, isError } = useFetchApplicationById(appId)

    const updateMutation = useUpdateApplication()

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
        appliedDate: '',
        notes: '',
    })

    // Populate form when data is loaded
    useEffect(() => {
        if (applicationData?.data?.application) {
            const app = applicationData.data.application
            setFormData({
                companyName: app.companyName || '',
                role: app.role || '',
                workType: app.workType || 'Job',
                workLocationType: app.workLocationType || 'Remote',
                salaryAmount: app.salary?.amount || '',
                salaryCurrency: app.salary?.currency || 'INR',
                applicationStatus: app.applicationStatus || 'Applied',
                location: app.location || '',
                source: app.source || 'LinkedIn',
                customSource: '',
                appliedDate: app.appliedDate ? new Date(app.appliedDate).toISOString().split('T')[0] : '',
                notes: app.notes || '',
            })
        }
    }, [applicationData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Prepare data for submission
        const submissionData = {
            companyName: formData.companyName,
            role: formData.role,
            workType: formData.workType,
            workLocationType: formData.workLocationType,
            salaryAmount: formData.salaryAmount,
            salaryCurrency: formData.salaryCurrency,
            applicationStatus: formData.applicationStatus,
            location: formData.location,
            source: formData.source === 'Other' ? formData.customSource : formData.source,
            appliedDate: formData.appliedDate,
            notes: formData.notes,
        }

        updateMutation.mutate({ appId, data: submissionData })
        setTimeout(() => {
            navigate('/applications')
        }, 1500);
    }

    // Redirect after successful update
    useEffect(() => {
        if (updateMutation.isSuccess) {
            navigate('/applications')
        }
    }, [updateMutation.isSuccess, navigate])

    if (isLoading) {
        return (
            <div className="flex min-h-screen bg-slate-950">
                <Sidebar />
                <main className="flex-1 overflow-auto flex items-center justify-center">
                    <p className="text-white text-lg">Loading application...</p>
                </main>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex min-h-screen bg-slate-950">
                <Sidebar />
                <main className="flex-1 overflow-auto flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-red-400 text-lg mb-4">Error loading application</p>
                        <Button onClick={() => navigate('/applications')}>Back to Applications</Button>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="flex h-screen bg-slate-950">
            <Sidebar />

            <main className="flex-1 overflow-auto">
                {/* Header - Fixed to top of scrollable area */}
                <div className="border-b border-white/10 bg-slate-900/50 backdrop-blur">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <h1 className="text-3xl font-bold text-white">Update Application</h1>
                        <p className="text-slate-400 mt-1">Update your job application details</p>
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
                                {/* Error Message */}
                                {updateMutation.isError && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                                        {updateMutation.error?.message || 'Failed to update application'}
                                    </div>
                                )}

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

                                {/* Job Type & Work Location Type */}
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
                                    <Button
                                        type="submit"
                                        variant="default"
                                        className="flex-1"
                                        disabled={updateMutation.isPending}
                                    >
                                        {updateMutation.isPending ? 'Updating...' : 'Update Application'}
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
