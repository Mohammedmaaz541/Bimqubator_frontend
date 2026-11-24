'use client';

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './careers.module.css'

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

const Careers = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api2.bimqubator.com'
        const res = await fetch(`${backendUrl}/api/v1/jobs`)
        if (!res.ok) {
          throw new Error(`Failed to load jobs (HTTP ${res.status})`)
        }
        const data = await res.json()

        let jobsData = data?.jobs || data?.data?.jobs || []

        jobsData = jobsData.map((job) => ({
          id: job.id,
          title: job.jobTitle,
          location: job.location || 'Not specified',
          type: job.jobType,
          description:
            parseJsonArray(job.aboutTheJob)?.join(', ') ||
            'No description provided.',
          benefits: parseJsonArray(job.benefits),
          whoCanApply: parseJsonArray(job.whoCanApply),
          skillsRequired: parseJsonArray(job.skillsRequired),
          perks: job.perks,
          experience: job.experienceRequired,
          salaryRange: job.salaryRange,
          lastDateToApply: job.lastDateToApply,
        }))

        setJobs(jobsData)
      } catch (err) {
        console.error('❌ Error fetching jobs:', err)
        setJobs([])
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const openJobDetails = (jobId) => {
    router.push(`/careers/${jobId}`)
  }

  const openApplication = (jobId) => {
    router.push(`/careers/${jobId}/apply`)
  }

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skillsRequired.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  )

  return (
    <main className={styles.careersPage}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroCopy}>
          <h1 className={styles.heroTitle}>
            Join the <span className="text-blue-600">BIM Revolution.</span>
          </h1>
          <p className={styles.heroDescription}>
            We are looking for high-performance engineers and BIM specialists to join our global team.
          </p>
          </div>
        </section>

        <div className={styles.content}>
            <div className={styles.searchWrap}>
              <input
                type="text"
                placeholder="Search by job title, location or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <div className={styles.searchIcon} aria-hidden="true">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
            </div>

            <div className={styles.jobGrid}>
              {!loading && (
                filteredJobs.length > 0 ? (
                  filteredJobs.map((job, i) => (
                    <div
                      key={job.id || i}
                      onClick={() => openJobDetails(job.id)}
                      className={styles.jobCard}
                    >
                      <div className={styles.jobMain}>
                        <div className={styles.jobMeta}>
                          <span className={styles.location}>
                            {job.location}
                          </span>
                          <span className={styles.jobType}>
                            {job.type}
                          </span>
                        </div>
                        <h3 className={styles.jobTitle}>
                          {job.title}
                        </h3>
                      </div>

                      <div className={styles.jobAside}>
                        <div className={styles.experience}>
                          <span>
                            Experience
                          </span>
                          <span>
                            {job.experience || 'Not specified'}
                          </span>
                        </div>
                        <div className={styles.jobArrow} aria-hidden="true">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.noJobs}>
                    <p>
                      No jobs found matching your criteria.
                    </p>
                  </div>
                )
              )}
            </div>
        </div>
      </div>
    </main>
  )
}

export default Careers
