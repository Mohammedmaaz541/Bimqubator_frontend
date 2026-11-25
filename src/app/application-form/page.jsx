'use client';

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { toast } from 'react-hot-toast'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api2.bimqubator.com'

const ApplicationFormContent = () => {
  const searchParams = useSearchParams()
  const jobId = searchParams.get('jobId')
  const router = useRouter()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(Boolean(jobId))
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    city: '',
    type: '',
    yearsOfExperience: '',
    coverLetter: '',
    jobId: jobId || '',
  })
  const [resumeFile, setResumeFile] = useState(null)

  useEffect(() => {
    if (!jobId) {
      return
    }

    const fetchJob = async () => {
      try {
        const res = await fetch(
          `${backendUrl}/api/v1/jobs/${jobId}`
        )
        const data = await res.json()
        const jobData = data?.job || data?.data?.job
        if (jobData) {
          setJob({
            id: jobData.id,
            title: jobData.jobTitle,
            location: jobData.location || 'Not specified',
          })
        }
      } catch (err) {
        console.error('❌ Error fetching job:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [jobId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setResumeFile(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submitData = new FormData()

      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key])
      })

      if (resumeFile) {
        submitData.append('resume', resumeFile)
      }

      // Using fetch instead of axios because axios might be missing on frontend
      const response = await fetch(`${backendUrl}/api/v1/applicants`, {
        method: 'POST',
        body: submitData,
      })

      if (response.ok) {
        toast.success('Application submitted successfully!')
        router.push(`/careers`)
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Failed to submit application. Please try again.')
      }

    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center bg-white">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Loading form...</p>
      </div>
    )
  }

  return (
    <main className="pt-24 md:pt-32 pb-20 px-6 bg-white font-sans overflow-x-hidden min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation */}
        {jobId && (
          <div className="mb-6 md:mb-8">
            <Link
              href={`/careers/${jobId}`}
              className="inline-flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors group"
            >
              <FaArrowLeftLong className="text-sm group-hover:-translate-x-1 transition-transform" /> 
              <span>Back to Job Details</span>
            </Link>
          </div>
        )}

        {/* HEADER SECTION */}
        <div className="mb-12 text-center rounded-2xl border border-gray-100 p-8 shadow-[0_12px_36px_rgba(15,23,42,0.07)] bg-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tighter uppercase mb-6">
            Application <span className="text-blue-600">Form.</span>
          </h1>
          {job && (
            <div className="flex flex-col items-center gap-3">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Applying For</span>
              <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                {job.title}
              </span>
            </div>
          )}
        </div>

        {/* APPLICATION FORM */}
        <div className="rounded-2xl bg-white border border-gray-100 p-6 md:p-10 shadow-[0_16px_44px_rgba(15,23,42,0.08)]">
          <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase mb-8 md:mb-10 tracking-tight flex items-center gap-4">
            <div className="w-3 h-3 bg-blue-600 rotate-45"></div>
            Personal Information
          </h3>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 md:gap-8">
            
            <div className="space-y-2 md:space-y-3">
              <label className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Full Name<span className="text-red-600">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 md:px-5 py-3 md:py-3.5 border-2 border-gray-300 focus:border-blue-600 focus:shadow-[4px_4px_0_0_rgba(37,99,235,0.2)] transition-all outline-none text-gray-900 font-bold text-xs"
                placeholder="Engineering Lead"
              />
            </div>

            <div className="space-y-2 md:space-y-3">
              <label className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Email Address <span className="text-red-600">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 md:px-5 py-3 md:py-3.5 border-2 border-gray-300 focus:border-blue-600 focus:shadow-[4px_4px_0_0_rgba(37,99,235,0.2)] transition-all outline-none text-gray-900 font-bold text-xs"
                placeholder="office@company.com"
              />
            </div>

            <div className="space-y-2 md:space-y-3">
              <label className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Phone Number <span className="text-red-600">*</span></label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 md:px-5 py-3 md:py-3.5 border-2 border-gray-300 focus:border-blue-600 focus:shadow-[4px_4px_0_0_rgba(37,99,235,0.2)] transition-all outline-none text-gray-900 font-bold text-xs"
                placeholder="+91 90000 00000"
              />
            </div>

            <div className="space-y-2 md:space-y-3">
              <label className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Gender <span className="text-red-600">*</span></label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 md:px-5 py-3 md:py-3.5 border-2 border-gray-300 focus:border-blue-600 focus:shadow-[4px_4px_0_0_rgba(37,99,235,0.2)] transition-all outline-none text-gray-900 font-bold text-xs appearance-none bg-white cursor-pointer"
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2 md:space-y-3">
              <label className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Current City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 md:px-5 py-3 md:py-3.5 border-2 border-gray-300 focus:border-blue-600 focus:shadow-[4px_4px_0_0_rgba(37,99,235,0.2)] transition-all outline-none text-gray-900 font-bold text-xs"
                placeholder="Enter your city"
              />
            </div>

            <div className="space-y-2 md:space-y-3">
              <label className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Applicant Type <span className="text-red-600">*</span></label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 md:px-5 py-3 md:py-3.5 border-2 border-gray-300 focus:border-blue-600 focus:shadow-[4px_4px_0_0_rgba(37,99,235,0.2)] transition-all outline-none text-gray-900 font-bold text-xs appearance-none bg-white cursor-pointer"
              >
                <option value="" disabled>Select Type</option>
                <option value="student">Student</option>
                <option value="fresher">Fresher</option>
                <option value="experienced">Experienced</option>
                <option value="freelancer">Freelancer</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2 md:space-y-3">
              <label className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Years of Experience <span className="text-red-600">*</span></label>
              <select
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
                className="w-full px-4 md:px-5 py-3 md:py-3.5 border-2 border-gray-300 focus:border-blue-600 focus:shadow-[4px_4px_0_0_rgba(37,99,235,0.2)] transition-all outline-none text-gray-900 font-bold text-xs appearance-none bg-white cursor-pointer"
              >
                <option value="" disabled>Select Experience</option>
                <option value="0">0 years (Student)</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="4">4 years</option>
                <option value="5">5+ years</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-2 md:space-y-3 pt-4 border-t-2 border-gray-50">
              <label className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Upload Resume (PDF/DOCX) <span className="text-red-600">*</span></label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full px-4 md:px-5 py-3 md:py-3.5 border-2 border-gray-300 focus:border-blue-600 focus:shadow-[4px_4px_0_0_rgba(37,99,235,0.2)] transition-all outline-none text-gray-500 font-bold text-xs file:mr-4 file:py-2 file:px-4 file:border-2 file:border-gray-900 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-gray-100 file:text-gray-900 hover:file:bg-gray-200 file:cursor-pointer file:transition-colors cursor-pointer bg-white"
              />
            </div>

            <div className="md:col-span-2 space-y-2 md:space-y-3">
              <label className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Cover Letter / Additional Information</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows="6"
                className="w-full px-4 md:px-5 py-3 md:py-3.5 border-2 border-gray-300 focus:border-blue-600 focus:shadow-[4px_4px_0_0_rgba(37,99,235,0.2)] transition-all outline-none text-gray-900 font-bold text-xs resize-none"
                placeholder="Share your motivation, relevant experience, and what makes you a great candidate for this role..."
              />
            </div>

            <div className="md:col-span-2 pt-6 border-t-2 border-gray-100 mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl py-4 md:py-5 bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-gray-900 transition-all shadow-lg shadow-blue-900/10 hover:shadow-xl hover:-translate-y-0.5 active:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </main>
  )
}

export default function ApplicationFormPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center bg-white"><p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Loading...</p></div>}>
      <ApplicationFormContent />
    </Suspense>
  )
}
