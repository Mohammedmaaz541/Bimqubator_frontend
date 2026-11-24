import React from 'react';
import styles from '../legal-pages.module.css';

export default function Disclaimer() {
  return (
    <main className={styles.legalPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            Legal Information
          </div>
          <h1 className={styles.title}>
            Legal <span className={styles.titleAccent}>Disclaimer.</span>
          </h1>
        </div>

        <div className={styles.article}>
          <p className={styles.updatedAt}>
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className={styles.sections}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>General Disclaimer</h2>
              <p className={styles.sectionBody}>The information contained on this website is for general information purposes only. The information is provided by Bimqubator Engineering and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Professional Advice</h2>
              <p className={styles.sectionBody}>The content of this website does not constitute professional engineering or architectural advice. For specific engineering solutions or BIM consulting, please contact our team directly to discuss your specific project requirements.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
