import React from 'react';
import styles from '../legal-pages.module.css';

export default function Declaration() {
  return (
    <main className={styles.legalPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            Legal Information
          </div>
          <h1 className={styles.title}>
            Official <span className={styles.titleAccent}>Declaration.</span>
          </h1>
        </div>

        <div className={styles.article}>
          <p className={styles.updatedAt}>
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className={styles.sections}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>General Declaration</h2>
              <p className={styles.sectionBody}>By using this website, you declare that all information provided by you is true, accurate, and complete to the best of your knowledge.</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Information Accuracy</h2>
              <p className={styles.sectionBody}>We declare that the engineering and BIM services described on this website represent our general capabilities. Specific project deliverables, LOD specifications, and capabilities are subject to formal contractual agreements established directly with our clients.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
