import React from 'react';
import styles from '../legal-pages.module.css';

export default function TermsOfService() {
  return (
    <main className={styles.legalPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            Legal Information
          </div>
          <h1 className={styles.title}>
            Terms of <span className={styles.titleAccent}>Service.</span>
          </h1>
        </div>

        <div className={styles.article}>
          <p className={styles.updatedAt}>
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className={styles.sections}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
              <p className={styles.sectionBody}>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>2. Service Description</h2>
              <p className={styles.sectionBody}>Bimqubator Engineering provides Building Information Modeling (BIM) and MEP engineering consulting services. The information provided on this website is for general informational purposes only.</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>3. Intellectual Property</h2>
              <p className={styles.sectionBody}>All content included on this site, such as text, graphics, logos, images, and digital downloads, is the property of Bimqubator Engineering or its content suppliers and protected by international copyright laws. Unauthorised use of any content may violate copyright, trademark, and other laws.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
