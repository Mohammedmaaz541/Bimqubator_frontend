import React from 'react';
import styles from '../legal-pages.module.css';

export default function CookiesPolicy() {
  return (
    <main className={styles.legalPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            Legal Information
          </div>
          <h1 className={styles.title}>
            Cookies <span className={styles.titleAccent}>Policy.</span>
          </h1>
        </div>

        <div className={styles.article}>
          <p className={styles.updatedAt}>
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className={styles.sections}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>What Are Cookies</h2>
              <p className={styles.sectionBody}>As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience.</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>How We Use Cookies</h2>
              <p className={styles.sectionBody}>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>The Cookies We Set</h2>
              <p className={styles.sectionBody}>If you submit a form (such as a contact or application form), we may use cookies for the management of the signup process, general administration, and to remember your user details for future correspondence. We also utilize standard analytics cookies to understand how our site is being used.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
