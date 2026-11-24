import Link from 'next/link'
import styles from './CTA.module.css'

export default function CTA({ heading, subheading, buttonText1, buttonText2, link1, link2 }) {
    return (
        <section className={`${styles.cta} relative isolate overflow-hidden border-y border-blue-200 px-6 py-14 text-center text-slate-950 sm:py-16 md:py-20`}>
            <div aria-hidden="true" className={styles.grid} />
            <div aria-hidden="true" className={styles.glow} />
            <div aria-hidden="true" className={`${styles.corner} ${styles.cornerLeft}`} />
            <div aria-hidden="true" className={`${styles.corner} ${styles.cornerRight}`} />

            <div className="relative mx-auto max-w-4xl">
                <div aria-hidden="true" className={styles.rule} />
                <h2 className={`${styles.heading} mb-4 text-2xl font-black uppercase leading-[1.05] tracking-[-0.045em] sm:text-3xl md:text-4xl`}>
                    {heading}
                </h2>
                <p className={`${styles.subheading} mx-auto mb-7 max-w-2xl text-xs font-medium leading-6 text-slate-600 sm:text-sm sm:leading-7`}>
                    {subheading}
                </p>
                <div className="flex w-full flex-col justify-center gap-3 px-2 sm:w-auto sm:flex-row sm:px-0">
                    {buttonText1 && link1 && (
                        <Link
                            href={link1}
                            className={`${styles.primaryButton} group inline-flex min-h-12 w-full items-center justify-center gap-3 px-7 py-3 text-[10px] font-bold uppercase tracking-[0.16em] sm:w-auto sm:px-8`}
                        >
                            {buttonText1}
                            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
                                <path d="M2.5 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    )}
                    {buttonText2 && link2 && (
                        <Link
                            href={link2}
                            className={`${styles.secondaryButton} inline-flex min-h-12 w-full items-center justify-center px-7 py-3 text-[10px] font-bold uppercase tracking-[0.16em] sm:w-auto sm:px-8`}
                        >
                            {buttonText2}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    )
}
