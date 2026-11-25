
'use client';

import React, { useState } from 'react';
import styles from './careers.module.css';

const jobs = [
  {
    id: 1,
    title: 'BIM Modeler - MEP',
    department: 'BIM Engineering',
    location: 'Hyderabad, India',
    jobType: 'Full-time',
    experience: '2-4 Years',
    salary: '3.5 - 6 LPA',
    skills: ['Revit', 'MEP Modeling', 'AutoCAD', 'Navisworks'],
    description: 'Create and maintain detailed MEP BIM models.',
    postedDate: 'Nov 20, 2026',
    workMode: 'On-site'
  },
  {
    id: 2,
    title: 'BIM Coordinator',
    department: 'BIM Coordination',
    location: 'Hyderabad, India',
    jobType: 'Full-time',
    experience: '4-7 Years',
    salary: '6 - 10 LPA',
    skills: ['Revit', 'Navisworks', 'Clash Detection', 'BIM 360'],
    description: 'Manage BIM coordination and multidisciplinary models.',
    postedDate: 'Nov 21, 2026',
    workMode: 'Hybrid'
  },
  {
    id: 3,
    title: 'Structural BIM Engineer',
    department: 'Structural Engineering',
    location: 'Hyderabad, India',
    jobType: 'Full-time',
    experience: '2-5 Years',
    salary: '4 - 7 LPA',
    skills: ['Revit Structure', 'Tekla', 'AutoCAD'],
    description: 'Develop structural BIM models and documentation.',
    postedDate: 'Nov 22, 2026',
    workMode: 'On-site'
  },
  {
    id: 4,
    title: 'BIM Architect',
    department: 'Architecture',
    location: 'Hyderabad, India',
    jobType: 'Full-time',
    experience: '2-4 Years',
    salary: '4 - 7 LPA',
    skills: ['Revit Architecture', 'AutoCAD', 'Enscape'],
    description: 'Develop architectural BIM models and design documentation.',
    postedDate: 'Nov 23, 2026',
    workMode: 'On-site'
  },
  {
    id: 5,
    title: 'Quantity Surveyor - BIM',
    department: 'Cost Estimation',
    location: 'Hyderabad, India',
    jobType: 'Full-time',
    experience: '2-5 Years',
    salary: '4 - 7 LPA',
    skills: ['Quantity Takeoff', 'Revit', 'Cost Estimation', 'Excel'],
    description: 'Perform quantity takeoffs and cost estimation using BIM models.',
    postedDate: 'Nov 24, 2026',
    workMode: 'Hybrid'
  },
  {
    id: 6,
    title: 'BIM Automation Engineer',
    department: 'BIM Technology',
    location: 'Hyderabad, India',
    jobType: 'Full-time',
    experience: '2-5 Years',
    salary: '5 - 9 LPA',
    skills: ['Dynamo', 'Python', 'Revit API', 'C#'],
    description: 'Develop automation tools and improve BIM workflows.',
    postedDate: 'Nov 25, 2026',
    workMode: 'Hybrid'
  }
];

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter((job) => {
    const search = searchTerm.toLowerCase();

    return (
      job.title.toLowerCase().includes(search) ||
      job.location.toLowerCase().includes(search) ||
      job.department.toLowerCase().includes(search) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(search)
      )
    );
  });

  const handleApply = (job) => {
    // Replace with your application URL when available
    window.location.href = `mailto:careers@bimqubator.com?subject=${encodeURIComponent(
      `Application for ${job.title}`
    )}`;
  };

  return (
    <main className={styles.careersPage}>
      <div className={styles.container}>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />

          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>
              Join the{' '}
              <span className="text-blue-600">
                BIM Revolution.
              </span>
            </h1>

            <p className={styles.heroDescription}>
              We are looking for high-performance engineers
              and BIM specialists to join our global team.
            </p>
          </div>
        </section>

        {/* Jobs Section */}
        <div className={styles.content}>

          <div className={styles.jobsHeading}>
            <span className={styles.sectionTag}>
              CAREERS AT BIMQUBATOR
            </span>

            <h2>Explore Opportunities</h2>

            <p>
              Join our team and build the future of digital
              construction and BIM technology.
            </p>
          </div>

          {/* Search */}
          <div className={styles.searchWrap}>
            <input
              type="text"
              placeholder="Search by job title, location or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />

            <div className={styles.searchIcon} aria-hidden="true">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Job Count */}
          <div className={styles.resultsCount}>
            Showing {filteredJobs.length} opportunities
          </div>

          {/* Job Cards */}
          <div className={styles.jobGrid}>

            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <article
                  key={job.id}
                  className={styles.jobCard}
                >

                  {/* <div className={styles.jobCardTop}>
                    <div className={styles.companyLogo}>
                      B
                    </div>

                    <span className={styles.jobPosted}>
                      {job.postedDate}
                    </span>
                  </div> */}

                  <div className={styles.jobMain}>
                    <span className={styles.jobDepartment}>
                      {job.department}
                    </span>

                    <h3 className={styles.jobTitle}>
                      {job.title}
                    </h3>

                    <p className={styles.jobDescription}>
                      {job.description}
                    </p>
                  </div>

                  <div className={styles.jobDetails}>
                    <span>📍 {job.location}</span>
                    <span>💼 {job.experience}</span>
                    <span>💰 {job.salary}</span>
                  </div>

                  <div className={styles.jobTags}>
                    <span>{job.jobType}</span>
                    <span>{job.workMode}</span>
                  </div>

                  <div className={styles.jobSkills}>
                    {job.skills.map((skill) => (
                      <span key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className={styles.jobCardFooter}>
                    <button
                      onClick={() => handleApply(job)}
                      className={styles.applyBtn}
                    >
                      Apply Now <span>→</span>
                    </button>
                  </div>

                </article>
              ))
            ) : (
              <div className={styles.noJobs}>
                <h3>No jobs found</h3>
                <p>
                  Try searching with another job title,
                  location or skill.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
};

export default Careers;
