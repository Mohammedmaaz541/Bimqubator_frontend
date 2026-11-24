'use client';

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeftLong } from 'react-icons/fa6';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api2.bimqubator.com'

const parseJsonArray = (str) => {
    try {
        if (!str) return []
        const parsed = JSON.parse(str)
        if (Array.isArray(parsed)) return parsed
        const doubleParsed = JSON.parse(parsed)
        return Array.isArray(doubleParsed) ? doubleParsed : [String(doubleParsed)]
    } catch {
        return [String(str)]
    }
}

const JobDetailsPage = () => {
    const params = useParams()
    const jobId = params?.id
    const router = useRouter()
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!jobId) return;

        const fetchJob = async () => {
            try {
                setLoading(true)
                const res = await fetch(`${backendUrl}/api/v1/jobs/${jobId}`)
                const data = await res.json()

                const jobData = data?.job || data?.data?.job
                if (jobData) {
                    const formattedJob = {
                        id: jobData.id,
                        title: jobData.jobTitle,
                        location: jobData.location || 'Not specified',
                        type: jobData.jobType,
                        description: parseJsonArray(jobData.aboutTheJob) || [],
                        benefits: parseJsonArray(jobData.benefits),
                        whoCanApply: parseJsonArray(jobData.whoCanApply),
                        skillsRequired: parseJsonArray(jobData.skillsRequired),
                        perks: jobData.perks,
                        experience: jobData.experienceRequired,
                        salaryRange: jobData.salaryRange,
                        lastDateToApply: jobData.lastDateToApply,
                        openPositions: jobData.noOfOpenings,
                        duration: jobData.duration,
                    }
                    // console.log(formattedJob);

                    setJob(formattedJob)
                } else {
                    setError('Job not found')
                }
            } catch (err) {
                console.error('❌ Error fetching job:', err)
                setError('Failed to load job details. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        fetchJob()
    }, [jobId])

    const handleApply = () => {
        router.push(`/application-form?jobId=${jobId}`)
    }

    if (loading) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-5">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
                    Loading position
                </div>
            </main>
        )
    }

    if (error || !job) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-5">
                <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[0_16px_44px_rgba(15,23,42,0.08)]">
                    <p className="mb-6 text-sm font-semibold text-slate-700">
                        {error || 'Job not found'}
                    </p>
                    <Link
                        href="/careers"
                        className="inline-flex min-h-12 items-center justify-center rounded-md bg-blue-700 px-6 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-blue-800"
                    >
                        Back to Careers
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-slate-50 pb-16">
            <section className="relative isolate overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
                <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-8 sm:px-7 sm:pb-14 lg:px-8 lg:pt-10">
                    <Link
                        href="/careers"
                        className="mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-100 transition hover:text-white"
                    >
                        <FaArrowLeftLong className="text-sm" />
                        All open positions
                    </Link>

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-4xl">
                            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-blue-300">
                                Career opportunity
                            </p>
                            <h1 className="text-3xl font-black uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
                                {job.title}
                            </h1>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {job.location && (
                                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-50 backdrop-blur">
                                        {job.location}
                                    </span>
                                )}
                                {job.type && (
                                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-50 backdrop-blur">
                                        {job.type}
                                    </span>
                                )}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleApply}
                            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-white px-7 text-[11px] font-bold uppercase tracking-[0.12em] text-blue-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
                        >
                            Apply for this role
                        </button>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-5 py-8 sm:px-7 lg:px-8 lg:py-12">
                <div className="mb-6 grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_36px_rgba(15,23,42,0.05)] sm:grid-cols-4 sm:p-5">
                    {[
                        ['Location', job.location],
                        ['Job type', job.type],
                        ['Experience', job.experience],
                        ['Openings', job.openPositions],
                    ].map(([label, value]) => value ? (
                        <div key={label} className="border-slate-100 px-2 py-2 sm:border-r sm:last:border-r-0">
                            <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
                            <p className="text-sm font-bold text-slate-900">{value}</p>
                        </div>
                    ) : null)}
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.65fr)] lg:items-start">
                    <div className="space-y-6">
                        {job.description?.filter(Boolean).length > 0 && (
                            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">Position overview</p>
                                <h2 className="mb-5 text-xl font-bold text-slate-950 sm:text-2xl">About the role</h2>
                                <ul className="space-y-3">
                                    {job.description.filter(Boolean).map((point, index) => (
                                        <li key={index} className="flex gap-3 text-sm leading-7 text-slate-600">
                                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {job.whoCanApply?.length > 0 && (
                            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">Requirements</p>
                                <h2 className="mb-5 text-xl font-bold text-slate-950 sm:text-2xl">Qualifications</h2>
                                <ul className="space-y-3">
                                    {job.whoCanApply.map((requirement, index) => (
                                        <li key={index} className="flex gap-3 text-sm leading-7 text-slate-600">
                                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                                            <span>{requirement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {job.skillsRequired?.length > 0 && (
                            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">Core expertise</p>
                                <h2 className="mb-5 text-xl font-bold text-slate-950 sm:text-2xl">Required skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {job.skillsRequired.map((skill, index) => (
                                        <span key={index} className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-800">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <aside className="space-y-6 lg:sticky lg:top-24">
                        {job.benefits?.length > 0 && (
                            <section className="rounded-2xl border border-slate-200 bg-white p-6">
                                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">What we offer</p>
                                <h2 className="mb-5 text-lg font-bold text-slate-950">Benefits</h2>
                                <ul className="space-y-3">
                                    {job.benefits.map((benefit, index) => (
                                        <li key={index} className="flex gap-3 text-sm leading-6 text-slate-600">
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {(job.salaryRange || job.duration || job.lastDateToApply) && (
                            <section className="rounded-2xl border border-slate-200 bg-white p-6">
                                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">Role information</p>
                                <dl className="space-y-4">
                                    {job.salaryRange && (
                                        <div>
                                            <dt className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">Salary range</dt>
                                            <dd className="mt-1 text-sm font-bold text-slate-900">{job.salaryRange}</dd>
                                        </div>
                                    )}
                                    {job.duration && (
                                        <div>
                                            <dt className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">Duration</dt>
                                            <dd className="mt-1 text-sm font-bold text-slate-900">{job.duration}</dd>
                                        </div>
                                    )}
                                    {job.lastDateToApply && (
                                        <div>
                                            <dt className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">Application deadline</dt>
                                            <dd className="mt-1 text-sm font-bold text-slate-900">
                                                {new Date(job.lastDateToApply).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    timeZone: 'UTC',
                                                })}
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </section>
                        )}

                        {job.perks && (
                            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
                                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">Perks</p>
                                <p className="text-sm leading-6 text-slate-700">{job.perks}</p>
                            </section>
                        )}

                        <button
                            type="button"
                            onClick={handleApply}
                            className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-blue-700 px-6 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-900/10 transition hover:-translate-y-0.5 hover:bg-blue-800"
                        >
                            Apply now
                        </button>
                    </aside>
                </div>
            </div>
        </main>
    )
}

export default JobDetailsPage