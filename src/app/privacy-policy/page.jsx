import React from 'react';
import styles from '../legal-pages.module.css';

export default function PrivacyPolicy() {
  return (
    <main className={styles.legalPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            Legal Information
          </div>
          <h1 className={styles.title}>
            Privacy <span className={styles.titleAccent}>Policy.</span>
          </h1>
        </div>

        <div className={styles.article}>
          <p className={styles.updatedAt}>
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className={styles.sections}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>1. Introduction</h2>
              <p className={styles.sectionBody}>Welcome to Bimqubator Engineering. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>2. The Data We Collect</h2>
              <p className={styles.sectionBody}>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data, Contact Data, Technical Data, and Usage Data.</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>3. How We Use Your Data</h2>
              <p className={styles.sectionBody}>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you; Where it is necessary for our legitimate interests; Where we need to comply with a legal obligation.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
