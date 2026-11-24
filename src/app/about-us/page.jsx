"use client";

import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import {
  FaBolt,
  FaChartPie,
  FaCrosshairs,
  FaInfinity,
  FaLayerGroup,
} from "react-icons/fa6";
import Link from "next/link";
import CTA from "@/components/CTA";
import styles from "./about-us.module.css";

const statistics = [
  { value: 18, suffix: "+", label: "Team Members" },
  { value: 50, suffix: "+", label: "Global Projects" },
  { value: 3, suffix: "+", label: "Countries" },
  { value: 75, suffix: "%", label: "MEP Focus" },
];

const leadership = [
  {
    name: "Syed Sadiq Ahmed",
    role: "Head of Project Delivery",
    desc: "Syed Sadiq Ahmed leads operations and provides technical oversight to delivery teams. Expertise includes reviewing/analyzing project documents for conflicts and gaps, identifying specification inconsistencies, and contributing productivity/cost efficiency improvements. Successfully delivered 50+ projects across Middle East markets.",
    year: "17+ Years Global Experience Leader",
    responsibilities:
      "Project execution leadership, team technical support, client delivery excellence, operational optimization.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&h=800&auto=format&fit=crop",
  },
  {
    name: "Asif Yazdani",
    role: "Head of BIM Implementation",
    desc: "Asif Yazdani was instrumental in BIM implementation on landmark projects: Dubai Expo 2020 pavilions, Dubai Opera House (Zaha Hadid), Museum of the Future, and King Abdullah Petroleum Studies & Research Center (Zaha Hadid). Pioneered BIM-to-Field in the UAE using Trimble RTS. Prefabricated module installation leadership (Mirdif City Centre Carpark).",
    year: "18+ Years BIM Pioneer - Autodesk Certified Professional",
    responsibilities: "",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&h=800&auto=format&fit=crop",
  },
  {
    name: "Mohammad Ali",
    role: "Head of Operations",
    desc: "Mohammad Ali leads operational strategy, execution, and project coordination across all global active projects. With deep industry experience, he ensures seamless project delivery and optimal resource management. His leadership focuses on operational excellence, timeline adherence, and client satisfaction.",
    year: "Global Operations Leader",
    responsibilities: "",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&h=800&auto=format&fit=crop",
  },
  {
    name: "Mohammad Furqan Baig",
    role: "Head of Human Resources",
    desc: "Leads human capital strategy, talent acquisition, and organizational development to build high-performance teams.",
    year: "Human Resources Leader",
    responsibilities: "",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&h=800&auto=format&fit=crop",
  },
];

const coreValues = [
  { name: "EXCELLENCE", description: "Best-in-class BIM solutions" },
  { name: "INNOVATION", description: "Continuous technology adoption" },
  { name: "EMPOWERMENT", description: "Client insights & transparency" },
  { name: "SUSTAINABILITY", description: "Full project lifecycle approach" },
  { name: "BUILDABILITY", description: "Constructable coordinated solutions" },
];

const benefits = [
  {
    title: "Enhanced Collaboration",
    icon: <FaUsers size={20} />,
    desc: "Unifies architects, engineers, and contractors in a single data environment.",
  },
  {
    title: "Clash Detection",
    icon: <FaLayerGroup size={20} />,
    desc: "Identifies system conflicts in the digital stage, preventing expensive on-site re-works.",
  },
  {
    title: "Cost Efficiency",
    icon: <FaChartPie size={20} />,
    desc: "Provides precise material quantities and cost estimations, reducing budget overruns.",
  },
  {
    title: "Faster Delivery",
    icon: <FaBolt size={20} />,
    desc: "Streamlines the construction process through 4D scheduling and optimized workflows.",
  },
  {
    title: "Lifecycle Management",
    icon: <FaInfinity size={20} />,
    desc: "Creates a rich digital record of the building for facility maintenance.",
  },
  {
    title: "Higher Accuracy",
    icon: <FaCrosshairs size={20} />,
    desc: "Eliminates manual errors through automated data extraction and precise engineering.",
  },
];

const workflowSteps = [
  "Specification / IFC Review",
  "RFI Generation",
  "Model Updating",
  "RFI Response Processing",
  "Shop Drawing Production",
  "Quality Checking",
  "Consultant Submission",
  "Model Data Entry",
  "LOD 400 Final Delivery",
];

function StatNumber({ value, suffix, start }) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    if (!start) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      return undefined;
    }

    let frameId;
    const startTime = performance.now();
    const animateCount = (now) => {
      const progress = Math.min((now - startTime) / 1100, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(value * easedProgress));

      if (progress < 1) {
        frameId = requestAnimationFrame(animateCount);
      }
    };

    setCount(0);
    frameId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(frameId);
  }, [start, value]);

  return (
    <span aria-label={`${value}${suffix}`}>
      {count === null ? `${value}${suffix}` : `${count}${suffix}`}
    </span>
  );
}

export default function About() {
  const [visibleElements, setVisibleElements] = useState([]);
  const [motionReady, setMotionReady] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return undefined;
    }

    const elements = document.querySelectorAll(
      `.${styles.reveal}[data-id]`,
    );
    if (!elements.length) return undefined;

    setMotionReady(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("data-id");
          if (!id) return;
          setVisibleElements((current) =>
            current.includes(id) ? current : [...current, id],
          );
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const revealClass = (id, extraClass = "") =>
    [
      styles.reveal,
      visibleElements.includes(id) ? styles.revealed : "",
      extraClass,
    ]
      .filter(Boolean)
      .join(" ");

  const handleHeroPointerMove = (event) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(hover: hover) and (pointer: fine)").matches === false ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty(
      "--hero-tilt-x",
      `${(0.5 - y) * 2}deg`,
    );
    event.currentTarget.style.setProperty(
      "--hero-tilt-y",
      `${(x - 0.5) * 2}deg`,
    );
    event.currentTarget.style.setProperty(
      "--hero-shift-x",
      `${(x - 0.5) * 7}px`,
    );
    event.currentTarget.style.setProperty(
      "--hero-shift-y",
      `${(y - 0.5) * 7}px`,
    );
  };

  const resetHeroPointer = (event) => {
    event.currentTarget.style.setProperty("--hero-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--hero-tilt-y", "0deg");
    event.currentTarget.style.setProperty("--hero-shift-x", "0px");
    event.currentTarget.style.setProperty("--hero-shift-y", "0px");
  };

  const timelineProgress =
    visibleElements.filter((id) => id.startsWith("workflow-step-")).length /
    workflowSteps.length;

  return (
    <main
      className={`${styles.aboutPage} ${motionReady ? styles.motionReady : ""}`}
    >
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                About Bimqubator
              </div>
              <h1 id="about-title" className={styles.heroTitle}>
                <span className={styles.headingLine}>Built on</span>
                <span className={`${styles.headingLine} ${styles.headingAccent}`}>
                  Precision.
                </span>
              </h1>
              <p className={styles.heroDescription}>
                Bimqubator is a high-performance engineering and BIM consultancy
                delivering technical excellence across global infrastructure.
              </p>
            </div>

            <figure
              className={styles.heroFigure}
              onPointerMove={handleHeroPointerMove}
              onPointerLeave={resetHeroPointer}
            >
              <div className={styles.heroImageFrame}>
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&h=1200&auto=format&fit=crop"
                  alt="Office"
                  className={styles.heroImage}
                />
                <div className={styles.imageCorner} aria-hidden="true" />
                <figcaption className={styles.imageCaption}>
                  Digital Excellence
                </figcaption>
              </div>
            </figure>
          </div>

          <div
            className={revealClass("hero-stats", styles.stats)}
            data-id="hero-stats"
          >
            {statistics.map((item, index) => (
              <div
                className={styles.stat}
                key={item.label}
                style={{ "--reveal-delay": `${index * 80}ms` }}
              >
                <div className={styles.statNumber}>
                  <StatNumber
                    value={item.value}
                    suffix={item.suffix}
                    start={visibleElements.includes("hero-stats")}
                  />
                </div>
                <div className={styles.statLabel}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.story}>
        <div className={`${styles.container} ${styles.storyLayout}`}>
          <div
            className={revealClass("story-title", styles.storyTitleBlock)}
            data-id="story-title"
          >
            <div className={styles.sectionEyebrow}>Who We Are</div>
            <h2 className={styles.storyTitle}>
              Driving Innovation
              <span>Since 2018.</span>
            </h2>
          </div>
          <div
            className={revealClass("story-copy", styles.storyCopy)}
            data-id="story-copy"
          >
            <span className={styles.storyRule} aria-hidden="true" />
            <p>
              We are premier engineering service consultants specializing in
              buildings and infrastructure projects tailored precisely to our
              clients&apos; specific requirements. Bimqubator is a
              forward-thinking engineering and BIM service provider based in
              Hyderabad, India, delivering innovative solutions with vast BIM
              experience across all project stages.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.leadershipSection}>
        <div className={styles.container}>
          <header
            className={revealClass("leadership-heading", styles.sectionHeading)}
            data-id="leadership-heading"
          >
            <div className={styles.sectionEyebrow}>Leadership</div>
            <h2>EXECUTIVE TEAM.</h2>
          </header>

          <div className={styles.leaderGrid}>
            {leadership.map((member, index) => (
              <article
                className={revealClass(
                  `leader-${index}`,
                  styles.leader,
                )}
                data-id={`leader-${index}`}
                key={member.name}
                style={{ "--reveal-delay": `${index * 100}ms` }}
              >
                <div className={styles.leaderImage}>
                  <img src={member.image} alt={member.name} />
                  <span className={styles.leaderImageIndex} aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <div className={styles.leaderCopy}>
                  <a
                    href="#"
                    className={styles.linkedinLink}
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <svg
                      className={styles.linkedinIcon}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <div className={styles.leaderRole}>{member.role}</div>
                  <h3 className={styles.leaderName}>{member.name}</h3>
                  <div className={styles.leaderYear}>{member.year}</div>
                  <p className={styles.leaderDescription}>{member.desc}</p>
                  {member.responsibilities && (
                    <p className={styles.leaderResponsibilities}>
                      <strong>CORE RESPONSIBILITIES:</strong>{" "}
                      {member.responsibilities}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.purpose}>
        <div className={styles.container}>
          <header
            className={revealClass("purpose-heading", styles.purposeHeading)}
            data-id="purpose-heading"
          >
            <div className={styles.sectionEyebrow}>
              Mission Vision &amp; Values
            </div>
            <h2>Driving Excellence.</h2>
          </header>

          <div className={styles.purposeLayout}>
            <div className={styles.purposeStatements}>
              <article
                className={revealClass("vision", styles.purposeStatement)}
                data-id="vision"
              >
                <div className={styles.purposeIndex}>V-01</div>
                <h3>Vision</h3>
                <p>
                  Leading provider for Engineering &amp; BIM solutions through
                  cutting-edge technology, working as extended hand to partners.
                </p>
              </article>
              <article
                className={revealClass("mission", styles.purposeStatement)}
                data-id="mission"
              >
                <div className={styles.purposeIndex}>M-02</div>
                <h3>Mission</h3>
                <p>
                  High-quality customized BIM services empowering client success
                  through latest digital tools and vast experience.
                </p>
              </article>
            </div>

            <div
              className={revealClass("values", styles.valuesBlock)}
              data-id="values"
            >
              <div className={styles.purposeIndex}>C-03</div>
              <h3>Core Values</h3>
              <ul>
                {coreValues.map((value, index) => (
                  <li key={value.name}>
                    <span className={styles.valueNumber} aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span className={styles.valueName}>{value.name}</span>
                    <span className={styles.valueDescription}>
                      {" - "}
                      {value.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.directions}>
        <div className={styles.container}>
          <div className={styles.directionGrid}>
            <article
              className={revealClass("solutions", styles.direction)}
              data-id="solutions"
            >
              <span className={styles.directionEyebrow}>Solutions</span>
              <h2>Engineering &amp; BIM Solutions</h2>
              <p>
                Discover our comprehensive engineering services, BIM modeling,
                coordination, and innovative construction solutions tailored to
                modern project requirements.
              </p>
              <Link href="/solution" className={styles.directionLink}>
                Explore Solutions →
              </Link>
            </article>

            <article
              className={revealClass("portfolio", styles.direction)}
              data-id="portfolio"
            >
              <span className={styles.directionEyebrow}>Projects</span>
              <h2>Explore Our Portfolio</h2>
              <p>
                Browse our completed and ongoing projects showcasing expertise
                in BIM, engineering consultancy, and successful project
                execution across various industries.
              </p>
              <Link href="/projects" className={styles.directionLink}>
                View Projects →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.benefits}>
        <div className={styles.container}>
          <header
            className={revealClass("benefits-heading", styles.benefitsHeading)}
            data-id="benefits-heading"
          >
            <div>
              <div className={styles.sectionEyebrow}>
                Digital Transformation Benefits
              </div>
              <h2>Why BIM Matter?</h2>
            </div>
            <span className={styles.benefitsRule} aria-hidden="true" />
          </header>

          <div className={styles.benefitList}>
            {benefits.map((item, index) => (
              <article
                className={revealClass(
                  `benefit-${index}`,
                  styles.benefit,
                )}
                data-id={`benefit-${index}`}
                key={item.title}
                style={{ "--reveal-delay": `${index * 70}ms` }}
              >
                <span className={styles.benefitNumber} aria-hidden="true">
                  0{index + 1}
                </span>
                <span className={styles.benefitIcon} aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <span className={styles.benefitArrow} aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.workflow}>
        <div className={styles.container}>
          <header
            className={revealClass("workflow-heading", styles.workflowHeading)}
            data-id="workflow-heading"
          >
            <div className={styles.sectionEyebrow}>Technical Process</div>
            <h2>
              Shop Drawing
              <span>Workflow.</span>
            </h2>
          </header>

          <div className={styles.timeline}>
            <div className={styles.timelineRail} aria-hidden="true">
              <span
                className={styles.timelineProgress}
                style={{ transform: `scaleY(${timelineProgress})` }}
              />
            </div>
            {workflowSteps.map((step, index) => {
              const isLeft = index % 2 === 0;
              const id = `workflow-step-${index}`;
              return (
                <article
                  className={revealClass(
                    id,
                    `${styles.timelineItem} ${
                      isLeft ? styles.timelineLeft : styles.timelineRight
                    }`,
                  )}
                  data-id={id}
                  key={step}
                  style={{ "--reveal-delay": `${(index % 3) * 90}ms` }}
                >
                  <span className={styles.timelineNode} aria-hidden="true" />
                  <div className={styles.timelineCard}>
                    <div className={styles.timelineNumber}>
                      {String(index + 1).padStart(2, "0")}.
                    </div>
                    <div>
                      <h3>{step}</h3>
                      <p>{getStepDescription(index)}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTA
        heading="Start Your Project."
        subheading="Precise Engineering. World-Class Coordination."
        buttonText1="Get In Touch"
        link1="/contact-us"
      />
    </main>
  );
}

function getStepDescription(index) {
  const descriptions = [
    "Review project specifications and IFC drawings to identify scope and constraints.",
    "Raise RFIs to clarify design conflicts and missing details.",
    "Update BIM models based on initial findings and inputs.",
    "Incorporate consultant responses into coordinated models.",
    "Generate detailed shop drawings for fabrication and installation.",
    "Perform internal quality checks for accuracy and compliance.",
    "Submit drawings to consultants for approval and feedback.",
    "Update model data with approved changes and documentation.",
    "Deliver finalized LOD 400 models ready for construction execution.",
  ];
  return descriptions[index];
}
