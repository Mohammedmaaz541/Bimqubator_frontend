'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Phone, Globe } from 'lucide-react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import styles from './contact-us.module.css'

const Contactus = () => {
  const partners = [
    "360 BIM Solutions",
    "Voltas ME",
    "IM Projects",
    "Zephyr Engineering",
    "Acornhive"
  ];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api2.bimqubator.com'
      const response = await fetch(`${backendUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.Name,
          telephone: data.Telephone,
          email: data.Email,
          subject: data.Subject,
          message: data.Message,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Message submitted successfully!')
        reset()
      } else {
        toast.error(result.message || 'Failed to submit the form.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      toast.error('An error occurred. Please try again.')
    }
  }

  const onError = (errors) => {
    const firstError = Object.values(errors)[0];
    if (firstError && firstError.message) {
      toast.error(firstError.message);
    } else {
      toast.error('Please fill all required fields correctly.');
    }
  }


  return (
    <main className={styles.contactPage}>
      <div className={styles.container}>

        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Let's <span>Connect.</span>
          </h1>
          <p className={styles.heroDescription}>
            Have a project in mind or need expert BIM consulting? Our team is ready to deliver precision-driven solutions.
          </p>
        </div>

        <div className={styles.contactGrid}>

        <div className={styles.formColumn}>
          <div className={styles.formPanel}>
            <h3 className={styles.formTitle}>Send Message.</h3>

            <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.formGrid}>
              
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Your Name <span>*</span></label>
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register('Name', { required: 'Name is required' })}
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Telephone <span>*</span></label>
                <input
                  type="tel"
                  placeholder="Your Telephone"
                  {...register('Telephone', { required: 'Telephone is required' })}
                  className={styles.input}
                />
              </div>

              <div className={`${styles.fieldGroup} ${styles.fieldWide}`}>
                <label className={styles.label}>Email Address <span>*</span></label>
                <input
                  type="email"
                  placeholder="Your Email"
                  {...register('Email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={styles.input}
                />
              </div>

              <div className={`${styles.fieldGroup} ${styles.fieldWide}`}>
                <label className={styles.label}>Subject <span>*</span></label>
                <input
                  type="text"
                  placeholder="Inquiry Subject"
                  {...register('Subject', { required: 'Subject is required' })}
                  className={styles.input}
                />
              </div>

              <div className={`${styles.fieldGroup} ${styles.fieldWide}`}>
                <label className={styles.label}>Message <span>*</span></label>
                <textarea
                  placeholder="How can we help you?"
                  {...register('Message', { required: 'Message is required' })}
                  className={styles.textarea}
                  rows={5}
                />
              </div>

              <div className={`${styles.fieldGroup} ${styles.fieldWide}`}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className={styles.infoColumn}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Contact Info.</h3>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <FaMapMarkerAlt size={14} />
                </div>
                <div className={styles.infoText}>
                  <h4 className={styles.infoLabel}>Office</h4>
                  <p className={styles.infoValue}>
                    Red Hills, Hyderabad,<br />Telangana 500089, India
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <FaEnvelope size={14} />
                </div>
                <div className={styles.infoText}>
                  <h4 className={styles.infoLabel}>Email</h4>
                  <a href="mailto:info@bimqubator.com" className={styles.infoLink}>
                    info@bimqubator.com
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <FaPhoneAlt size={14} />
                </div>
                <div className={styles.infoText}>
                  <h4 className={styles.infoLabel}>Phone</h4>
                  <a href="tel:+919000663628" className={styles.infoLink}>
                    +91 90006 63628
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.partnersCard}>
            <h3 className={styles.partnersHeading}>Strategic Partners</h3>
            <div className={styles.partnerList}>
              {partners.map((partner, i) => (
                <span key={i} className={styles.partnerTag}>
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  )
}

export default Contactus