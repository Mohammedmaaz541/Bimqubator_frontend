"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CardPro from "@/components/CardPro";
import CardSol from "@/components/CardSol";
import CTA from "@/components/CTA";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api2.bimqubator.com';

export default function Home() {
  const [visibleElements, setVisibleElements] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/services`);
        const data = await response.json();
        if (data && data.success) {
          const activeSolutions = data.items.filter(item => item.status === 'Active' && item.is_featured === true).slice(0, 3);
          setSolutions(activeSolutions || []);
        }
      } catch (error) {
        console.error("Error fetching solutions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  const getImageUrl = (path) => {
    if (!path) return "/MEP System Design.jpeg"; // default fallback
    return path.startsWith('http') ? path : `${API_URL}${path}`;
  };

  const handleHeroPointerMove = (event) => {
    if (
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const stage = event.currentTarget;
    const tilt = stage.querySelector(".hero-image-tilt");
    if (!tilt) return;

    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    tilt.style.setProperty("--hero-rotate-x", `${(0.5 - y) * 3}deg`);
    tilt.style.setProperty("--hero-rotate-y", `${(x - 0.5) * 3}deg`);
  };

  const resetHeroPointer = (event) => {
    const tilt = event.currentTarget.querySelector(".hero-image-tilt");
    if (!tilt) return;

    tilt.style.setProperty("--hero-rotate-x", "0deg");
    tilt.style.setProperty("--hero-rotate-y", "0deg");
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/pm/projectFeachered`);
        const data = await response.json();
        if (data && data.success) {
          const isFeaturedProjects = data.data.filter((item) => item.is_featured === true);
          setFeaturedProjects(isFeaturedProjects);
        }
      } catch (error) {
        console.error("Failed to fetch featured projects:", error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('data-id');
        if (entry.isIntersecting) {
          setVisibleElements((prev) => [...new Set([...prev, id])]);
        } else {
          setVisibleElements((prev) => prev.filter((i) => i !== id));
        }
      });
    }, { threshold: 0.6 });

    const elements = document.querySelectorAll('.scroll-observe');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main className="bg-white text-gray-900 overflow-x-hidden font-sans">

        <section className="hero-section relative isolate overflow-hidden border-b border-slate-200 bg-[#f7f9fc] px-5 pb-14 pt-16 sm:px-7 sm:pb-16 sm:pt-20 lg:min-h-[calc(100svh-84px)] lg:px-8 lg:py-16">
          <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
          <div
            aria-hidden="true"
            className="hero-glow pointer-events-none absolute -right-32 top-12 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl md:h-[28rem] md:w-[28rem]"
          />

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10 xl:gap-16">
              <div className="hero-copy relative z-10 max-w-2xl">
                <div className="hero-eyebrow mb-5 inline-flex items-center gap-2.5 rounded-full border border-slate-200/90 bg-white/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur-sm sm:mb-7">
                  <span className="relative flex h-2 w-2">
                    <span className="hero-status-pulse absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                  </span>
                  Engineering Solution Consultants
                </div>

                <h1 className="mb-6 text-[clamp(3rem,6.1vw,5.25rem)] font-black uppercase leading-[1.04] tracking-[-0.045em] text-slate-950 sm:mb-7">
                  <span className="hero-heading-line block">Building</span>
                  <span className="hero-heading-line hero-heading-line-delay hero-heading-emphasis block text-blue-700">
                    Excellence.
                  </span>
                </h1>

                <p className="hero-description mb-8 max-w-xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">
                  Delivering precise BIM-driven engineering solutions across
                  design, construction, and facility management stages.
                </p>

                <div className="hero-actions flex flex-wrap gap-3 sm:gap-4">
                  <Link
                    href="/solution"
                    className="inline-flex min-h-12 items-center justify-center rounded-sm border border-blue-700 bg-blue-700 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.13em] text-white shadow-[0_10px_24px_rgba(29,78,216,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-800 hover:bg-blue-800 hover:shadow-[0_16px_30px_rgba(29,78,216,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 sm:min-h-14 sm:px-7"
                  >
                    Our Solution
                  </Link>
                  <Link
                    href="/contact-us"
                    className="inline-flex min-h-12 items-center justify-center rounded-sm border border-slate-300 bg-white/80 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.13em] text-slate-800 shadow-[0_8px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-900 hover:bg-slate-900 hover:text-white hover:shadow-[0_14px_28px_rgba(15,23,42,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-700 sm:min-h-14 sm:px-7"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              <div
                className="hero-visual-stage relative mx-auto w-full max-w-[760px] lg:max-w-none"
                onPointerMove={handleHeroPointerMove}
                onPointerLeave={resetHeroPointer}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-4 -left-3 right-5 top-5 border border-blue-200/80 sm:-bottom-5 sm:-left-5 sm:right-8 sm:top-8"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-3 h-14 w-14 border-r border-t border-blue-600/70 sm:-right-4 sm:-top-4 sm:h-20 sm:w-20"
                />

                <div className="hero-image-float relative z-10">
                  <div className="hero-image-tilt">
                    <div className="hero-image-frame relative aspect-[3/2] overflow-hidden border border-white bg-white p-1.5 shadow-[0_28px_70px_rgba(15,23,42,0.16)] sm:p-2">
                      <Image
                        src="/Bim Engineering.jpg"
                        alt="BIM Engineering"
                        width={1024}
                        height={682}
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="h-full w-full object-contain"
                      />
                      <div aria-hidden="true" className="hero-image-sheen pointer-events-none absolute inset-0" />
                      <div
                        aria-hidden="true"
                        className="hero-accent-scan pointer-events-none absolute bottom-2 left-2 top-2 w-px bg-blue-500/80 shadow-[0_0_12px_rgba(59,130,246,0.7)] sm:bottom-3 sm:left-3 sm:top-3"
                      />
                    </div>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-7 right-[14%] flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 bg-blue-600" />
                  <span className="hero-marker-line h-px w-20 bg-blue-300 sm:w-28" />
                </div>
              </div>
            </div>
          </div>

          <style jsx global>{`
            .hero-grid {
              background-image:
                linear-gradient(to right, rgba(15, 23, 42, 0.035) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(15, 23, 42, 0.035) 1px, transparent 1px);
              background-size: 64px 64px;
              mask-image: linear-gradient(to bottom, transparent, black 12%, black 82%, transparent);
              animation: hero-grid-appear 1.2s ease-out both;
            }

            .hero-copy {
              opacity: 1;
            }

            .hero-eyebrow {
              animation: hero-fade-up 650ms 80ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
            }

            .hero-heading-line {
              opacity: 0;
              transform: translateY(14px);
              animation: hero-heading-reveal 800ms 180ms cubic-bezier(0.2, 0.75, 0.25, 1) both;
            }

            .hero-heading-line-delay {
              animation-delay: 320ms;
            }

            .hero-heading-emphasis {
              position: relative;
              width: fit-content;
            }

            .hero-heading-emphasis::after {
              position: absolute;
              bottom: -0.04em;
              left: 0;
              width: 0;
              height: 3px;
              border-radius: 9999px;
              background: #2563eb;
              content: "";
              animation: hero-heading-accent 700ms 1s cubic-bezier(0.2, 0.7, 0.2, 1) both;
            }

            .hero-description {
              animation: hero-fade-up 700ms 1.12s cubic-bezier(0.2, 0.7, 0.2, 1) both;
            }

            .hero-actions {
              animation: hero-fade-up 700ms 1.3s cubic-bezier(0.2, 0.7, 0.2, 1) both;
            }

            .hero-image-frame {
              animation: hero-image-enter 900ms 240ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
            }

            .hero-image-float {
              animation: hero-float 9s 1.15s ease-in-out infinite;
              will-change: transform;
            }

            .hero-image-tilt {
              transform: perspective(1200px) rotateX(var(--hero-rotate-x, 0deg))
                rotateY(var(--hero-rotate-y, 0deg));
              transform-style: preserve-3d;
              transition: transform 450ms cubic-bezier(0.2, 0.7, 0.2, 1);
            }

            @media (hover: hover) and (pointer: fine) {
              .hero-image-tilt {
                will-change: transform;
              }
            }

            .hero-glow {
              animation: hero-glow-breathe 8s ease-in-out infinite;
            }

            .hero-status-pulse {
              animation: hero-status-pulse 2.6s ease-out infinite;
            }

            .hero-image-sheen {
              background: linear-gradient(
                112deg,
                transparent 34%,
                rgba(255, 255, 255, 0.18) 47%,
                rgba(255, 255, 255, 0.06) 52%,
                transparent 66%
              );
              opacity: 0;
              transform: translateX(-110%);
              animation: hero-image-sheen 8s 1.8s cubic-bezier(0.2, 0.7, 0.2, 1) infinite;
            }

            .hero-accent-scan {
              animation: hero-scan 6s 1.6s ease-in-out infinite;
            }

            .hero-grid::after {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 1px;
              background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.22), transparent);
              content: "";
              animation: hero-grid-sweep 12s 1.4s ease-in-out infinite;
            }

            .hero-marker-line {
              transform-origin: left center;
              animation: hero-marker-draw 2s 1.5s cubic-bezier(0.2, 0.7, 0.2, 1) both,
                hero-marker-glow 5s 3.5s ease-in-out infinite;
            }

            @keyframes hero-heading-reveal {
              from {
                opacity: 0;
                transform: translateY(110%);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes hero-fade-up {
              from {
                opacity: 0;
                transform: translateY(18px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes hero-heading-accent {
              to {
                width: 38%;
              }
            }

            @keyframes hero-image-enter {
              from {
                opacity: 0;
                transform: scale(0.965);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }

            @keyframes hero-float {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-7px);
              }
            }

            @keyframes hero-glow-breathe {
              0%, 100% {
                opacity: 0.55;
              }
              50% {
                opacity: 0.9;
              }
            }

            @keyframes hero-status-pulse {
              0% {
                opacity: 0.4;
                transform: scale(1);
              }
              75%, 100% {
                opacity: 0;
                transform: scale(2.4);
              }
            }

            @keyframes hero-image-sheen {
              0%, 12%, 100% {
                opacity: 0;
                transform: translateX(-110%);
              }
              20% {
                opacity: 1;
              }
              48% {
                opacity: 0.75;
                transform: translateX(110%);
              }
              58% {
                opacity: 0;
                transform: translateX(110%);
              }
            }

            @keyframes hero-scan {
              0%, 14%, 100% {
                left: 0;
                opacity: 0;
              }
              22% {
                opacity: 0.8;
              }
              72% {
                left: calc(100% - 1px);
                opacity: 0.65;
              }
              82% {
                opacity: 0;
              }
            }

            @keyframes hero-grid-appear {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes hero-grid-sweep {
              0%, 100% {
                transform: translateY(0);
                opacity: 0;
              }
              15%, 75% {
                opacity: 1;
              }
              90% {
                transform: translateY(100vh);
                opacity: 0;
              }
            }

            @keyframes hero-marker-draw {
              from {
                transform: scaleX(0);
              }
              to {
                transform: scaleX(1);
              }
            }

            @keyframes hero-marker-glow {
              0%, 100% {
                opacity: 0.65;
              }
              50% {
                opacity: 1;
              }
            }

            @media (max-width: 767px) {
              .hero-image-float {
                animation-duration: 12s;
              }

              .hero-image-sheen,
              .hero-accent-scan {
                display: none;
              }

              .hero-grid::after {
                animation-duration: 18s;
                opacity: 0.6;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .hero-grid,
              .hero-copy,
              .hero-eyebrow,
              .hero-heading-line,
              .hero-description,
              .hero-actions,
              .hero-image-frame,
              .hero-image-float,
              .hero-image-tilt,
              .hero-accent-scan,
              .hero-marker-line,
              .hero-glow,
              .hero-status-pulse,
              .hero-image-sheen {
                animation: none !important;
              }

              .hero-image-tilt {
                transform: none !important;
                transition: none !important;
              }

              .hero-grid::after {
                display: none;
              }

              .hero-image-sheen {
                display: none;
              }

              .hero-heading-emphasis::after {
                width: 38%;
              }
            }
          `}</style>
        </section>

        {/* 2D BIM LIFECYCLE - CIRCULAR PATH */}
        <section className="relative isolate overflow-hidden border-y border-slate-200 bg-[#f7f9fc] px-5 py-14 sm:px-7 md:py-16 lg:px-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(rgba(185, 210, 241, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(185, 210, 241, 0.055) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage: "linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent)",
            }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute -right-48 top-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-blue-200/30 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mb-10 sm:mb-12">
              <h2 className="mb-3 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-700 sm:text-xs">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                Continuous Process
              </h2>
              <h3 className="text-3xl font-black uppercase tracking-[-0.04em] text-slate-950 sm:text-4xl md:text-5xl">
                BIM Lifecycle.
              </h3>
            </div>

            <div className="relative">
              <div className="relative z-10 grid gap-7 md:grid-cols-2 md:gap-16">
                {[
                  {
                    id: "01",
                    stage: "Pre-Design",
                    lod: "LOD 100-200",
                    img: "/Bim Engineering.jpg",
                    desc: "The cycle begins with a robust BIM Execution Plan and schematic models that define the project's digital DNA and spatial requirements.",
                    orderClasses: "order-1 md:order-1",
                    lineElement: <div aria-hidden="true" className="absolute right-[-4rem] top-1/2 z-0 hidden h-px w-16 -translate-y-1/2 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300 md:block" />
                  },
                  {
                    id: "02",
                    stage: "Design Development",
                    lod: "LOD 300-350",
                    img: "/Bim Model.png",
                    desc: "Information density increases as MEP models are coordinated across disciplines to resolve clashes and prepare for technical tender documentation.",
                    orderClasses: "order-2 md:order-2",
                    lineElement: <div aria-hidden="true" className="absolute -bottom-16 left-1/2 z-0 hidden h-16 w-px -translate-x-1/2 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-300 md:block" />
                  },
                  {
                    id: "03",
                    stage: "Construction",
                    lod: "LOD 400",
                    img: "/MEP System Design.jpeg",
                    desc: "The digital model translates to the physical site through fabrication-ready details and precise shop drawings that minimize on-site wastage.",
                    orderClasses: "order-3 md:order-4",
                    lineElement: <div aria-hidden="true" className="absolute left-[-4rem] top-1/2 z-0 hidden h-px w-16 -translate-y-1/2 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300 md:block" />
                  },
                  {
                    id: "04",
                    stage: "Operations",
                    lod: "LOD 500",
                    img: "/BIM Coordination.webp",
                    desc: "The lifecycle returns full circle as LOD 500 as-built data provides a digital twin that powers efficient facility management and future renovations.",
                    orderClasses: "order-4 md:order-3",
                    lineElement: <div aria-hidden="true" className="absolute -top-16 left-1/2 z-0 hidden h-16 w-px -translate-x-1/2 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-300 md:block" />
                  }
                ].map((stage, i) => {
                  return (
                    <div key={i} className={`relative h-full w-full ${stage.orderClasses}`}>
                      {stage.lineElement}
                      <article className="group relative z-10 flex h-full w-full flex-col overflow-hidden rounded-t-2xl border border-slate-200/80 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_48px_rgba(15,23,42,0.12)]">
                        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-white">
                          <Image
                            src={stage.img}
                            alt={stage.stage}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                          />
                          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />
                          <div className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-white/40 bg-blue-600 text-xs font-black text-white shadow-lg shadow-blue-950/15">
                            {stage.id}
                          </div>
                        </div>

                        <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700">
                            {stage.lod}
                          </div>
                          <h4 className="mb-2 text-lg font-extrabold uppercase tracking-[-0.02em] text-slate-950 transition-colors duration-300 group-hover:text-blue-700 sm:text-xl">
                            {stage.stage}
                          </h4>
                          <p className="max-w-[95%] text-xs font-medium leading-6 text-slate-600 sm:text-sm">
                            {stage.desc}
                          </p>

                          <div aria-hidden="true" className="mt-5 h-0.5 w-8 bg-blue-600 transition-all duration-300 group-hover:w-14" />
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ADVANCED CAPABILITIES - FLAT GEOMETRIC */}
        <section className="relative isolate overflow-hidden border-y border-slate-200 bg-[#f7f9fc] px-5 py-14 sm:px-7 md:py-16 lg:px-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(rgba(185, 210, 241, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(185, 210, 241, 0.045) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage: "linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent)",
            }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-24 -z-10 h-[34rem] w-[34rem] rounded-full bg-blue-200/30 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mb-9 flex flex-col gap-5 sm:mb-11 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-blue-700 sm:text-base">Core Strategy</h2>
                <h3 className="text-3xl font-black uppercase leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-4xl md:text-5xl">
                  BIM Implementation.
                </h3>
              </div>
              <div aria-hidden="true" className="hidden items-center gap-2 pb-2 lg:flex">
                <span className="h-px w-12 bg-blue-200" />
                <span className="h-2 w-2 rotate-45 bg-blue-600" />
                <span className="h-px w-12 bg-blue-300" />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {[
                { title: "BIM Content Management", desc: "Standardized family creation & professional library maintenance." },
                { title: "Costing from Models", desc: "Accurate quantity take-offs with cost estimating." },
                { title: "BIM-to-Manufacturing", desc: "Automated fabrication data & modular construction design." },
                { title: "4D Programming", desc: "Visual scheduling & construction sequencing." },
                { title: "5D Cost Modelling", desc: "Integrated quantity take-offs & precise technical cost estimation." },
                { title: "Digital Twinning", desc: "Real-time IoT integration for intelligent facility monitoring." },].map((solution, i) => {
                  const isVisible = visibleElements.includes(`capability-${i}`);
                  return (
                    <article
                      key={i}
                      data-id={`capability-${i}`}
                      className={`scroll-observe group relative flex min-h-[250px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.045)] transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-[0_22px_46px_rgba(37,99,235,0.14)] motion-reduce:transform-none motion-reduce:transition-none md:p-7 ${isVisible ? 'max-md:border-blue-300 max-md:shadow-[0_12px_28px_rgba(37,99,235,0.1)]' : ''}`}
                    >
                      <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-blue-600 transition-transform duration-500 group-hover:scale-x-100 ${isVisible ? 'max-md:scale-x-100' : ''}`} />
                      <div aria-hidden="true" className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-100/80 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${isVisible ? 'max-md:opacity-60' : ''}`} />

                      <div className="relative z-10 flex flex-1 flex-col">
                        <div className="mb-6 flex items-center gap-3">
                          <span className="text-[10px] font-bold tracking-[0.18em] text-blue-700">SPEC_0{i + 1}</span>
                          <div className="h-px flex-1 bg-blue-100 transition-colors duration-300 group-hover:bg-blue-300"></div>
                          <span aria-hidden="true" className="h-2 w-2 rotate-45 border border-blue-300 transition-all duration-300 group-hover:rotate-0 group-hover:bg-blue-600 group-hover:border-blue-600" />
                        </div>

                        <h4 className="mb-3 min-h-14 text-lg font-extrabold uppercase leading-snug tracking-[-0.02em] text-slate-950 transition-colors duration-300 group-hover:text-blue-700 sm:text-xl">
                          {solution.title}
                        </h4>
                        <p className="text-sm font-medium leading-6 text-slate-600">
                          {solution.desc}
                        </p>

                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
                          <span className={`h-0.5 w-8 bg-blue-600 transition-all duration-300 group-hover:w-14 ${isVisible ? 'max-md:w-14' : ''}`} />
                          <span className={`flex h-7 w-7 items-center justify-center rounded-full border border-blue-200 transition-all duration-300 group-hover:border-blue-600 group-hover:bg-blue-600 ${isVisible ? 'max-md:border-blue-600 max-md:bg-blue-600' : ''}`}>
                            <span className={`h-1.5 w-1.5 rounded-full bg-blue-600 transition-colors duration-300 group-hover:bg-white ${isVisible ? 'max-md:bg-white' : ''}`} />
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
            </div>
          </div>
        </section>

        {/* BIM LIFECYCLE - REFINED FLAT GRID */}
        <section className="relative isolate overflow-hidden border-y border-slate-200 bg-[#f7f9fc] px-5 py-14 sm:px-7 md:py-16 lg:px-8">
          <div aria-hidden="true" className="pointer-events-none absolute -right-48 top-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-blue-200/30 blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <div className="mb-10 text-center md:mb-12">
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-blue-700 sm:text-xs">The Lifecycle</h2>
              <h3 className="text-3xl font-black uppercase tracking-[-0.04em] text-slate-950 sm:text-4xl md:text-5xl">BIM Stages.</h3>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {[
                {
                  title: "Design Stage Modelling",
                  lod: "LOD 200-300",
                  subtitle: "Comprehensive Design Support",
                  services: "Architectural, Structural, MEPF, Interior, Joinery, Tiles, Facade, Visualizations.",
                  deliverables: [
                    "Schematic LOD 200 models",
                    "Detailed LOD 300 design models",
                    "IFC tender documentation",
                    "Interdisciplinary coordination",
                    "Photorealistic visualizations"
                  ]
                },
                {
                  title: "Construction Stage Modelling",
                  lod: "LOD 400",
                  subtitle: "Contractor Fabrication Support",
                  services: "BIM Content, Point-Cloud BIM, Arch/Facade/Struct, MEPF Modular, QTO, 2D-3D.",
                  deliverables: [
                    "Shop drawings for all trades",
                    "Clash management",
                    "Fabrication spools",
                    "As-built asset models"
                  ]
                },
                {
                  title: "As-Built AIM Modelling",
                  lod: "LOD 500",
                  subtitle: "FM-Ready Digital Handover",
                  services: "Operational Digital Twins, Data Structuring, Asset Documentation.",
                  deliverables: [
                    "LOD 500 models with COBie compliance",
                    "Asset parameters & classification systems",
                    "2D records",
                    "Digital handover packages"
                  ]
                },
              ].map((stage, i) => (
                <article key={i} className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-[6px_6px_0_rgba(37,99,235,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-[9px_9px_0_rgba(37,99,235,0.3)] motion-reduce:transform-none motion-reduce:transition-none md:p-7">
                  <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-blue-600 transition-transform duration-500 group-hover:scale-x-100" />
                  <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-100/70 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 flex flex-1 flex-col">
                    <div className="mb-5">
                      <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700">{stage.lod}</span>
                      <span className="mt-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{stage.subtitle}</span>
                    </div>
                    <h4 className="mb-4 min-h-14 text-xl font-extrabold uppercase leading-tight tracking-[-0.025em] text-slate-950 transition-colors duration-300 group-hover:text-blue-700 md:text-2xl">{stage.title}</h4>

                    <div className="mb-6">
                      <h5 className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Services:</h5>
                      <p className="text-sm font-medium leading-6 text-slate-600">
                        {stage.services}
                      </p>
                    </div>

                    <div className="mt-auto border-t border-slate-100 pt-5">
                      <h5 className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Deliverables:</h5>
                      <ul className="space-y-3">
                        {stage.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-blue-600 transition-transform duration-300 group-hover:rotate-0" />
                            <span className="text-sm font-medium leading-5 text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTION - DYNAMIC GRID */}
        {solutions.length > 0 && <section className="py-10 md:py-16 px-6 bg-white border-b-2 border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col mb-10 md:mb-12 gap-2 md:gap-3">
              <div className="flex flex-row items-center justify-between w-full gap-4">
                <div>
                  <h2 className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em] mb-2">MEP & BIM Engineering Solutions</h2>
                  <h3 className="text-2xl md:text-4xl font-black text-gray-900 uppercase leading-none">
                    Core Expertise.
                  </h3>
                </div>
                <Link
                  href="/solution"
                  className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white border-2 border-blue-600 text-blue-600 font-black uppercase tracking-widest text-[8px] md:text-[10px] hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 shrink-0"
                >
                  View Our Solution
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {loading ? (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : solutions.length === 0 ? (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-gray-500 font-bold uppercase">
                  No active Solution found.
                </div>
              ) : (
                solutions.map((item, i) => (
                  <CardSol key={item.id || i} item={item} index={i} getImageUrl={getImageUrl} />
                ))
              )}
            </div>
          </div>
        </section>}

        {/* TECH PARTNERS - FLAT ICONIC */}
        <section className="py-10 px-6 bg-white overflow-hidden">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 20s linear infinite;
            }
            .animate-marquee:hover, .animate-marquee:active {
              animation-play-state: paused;
            }
          `}</style>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="mb-2 text-sm font-black uppercase tracking-[0.3em] text-blue-600 sm:text-base">Technology Partners</h2>
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 uppercase ">Digital Construction Stack.</h3>
            </div>

            <div className="w-full relative overflow-hidden py-4 [mask-image:_linear-gradient(to_right,transparent_0,_black_100px,_black_calc(100%-100px),transparent_100%)]">
              <div
                className="flex w-max gap-4 md:gap-6 animate-marquee"
                onTouchStart={(e) => (e.currentTarget.style.animationPlayState = "paused")}
                onTouchEnd={(e) => (e.currentTarget.style.animationPlayState = "running")}
              >
                {[
                  "Revit", "Navisworks", "Revizto", "Enscape", "COBie", "pyRevit", "BIM 360", "Dynamo",
                  "Revit", "Navisworks", "Revizto", "Enscape", "COBie", "pyRevit", "BIM 360", "Dynamo"
                ].map((tech, i) => (
                  <div key={i} className="group relative bg-white border border-gray-200 px-6 md:px-8 py-3 md:py-4 transition-all duration-300 shadow-[3px_3px_0_0_rgba(229,231,235,1)] hover:shadow-[3px_3px_0_0_rgba(37,99,235,1)] hover:-translate-y-0.5 cursor-default flex items-center justify-center min-w-[120px] md:min-w-[140px] shrink-0">
                    <span className="text-gray-900 font-black text-base md:text-lg uppercase tracking-tighter group-hover:text-blue-600 transition-colors">{tech}</span>
                    {/* Technical Rivets */}
                    <div className="absolute top-1.5 left-1.5 w-1 h-1 bg-gray-200 group-hover:bg-blue-600 transition-colors rounded-full"></div>
                    <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-gray-200 group-hover:bg-blue-600 transition-colors rounded-full"></div>
                    <div className="absolute bottom-1.5 left-1.5 w-1 h-1 bg-gray-200 group-hover:bg-blue-600 transition-colors rounded-full"></div>
                    <div className="absolute bottom-1.5 right-1.5 w-1 h-1 bg-gray-200 group-hover:bg-blue-600 transition-colors rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {featuredProjects.length > 0 && (
          <section
            aria-labelledby="featured-projects-heading"
            className="relative overflow-hidden border-y border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50/70 px-5 py-16 sm:px-7 md:py-20 lg:px-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl"
            />
            <div className="relative mx-auto max-w-7xl">
              <div className="mb-9 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-3xl">
                  <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.24em] text-blue-700">
                    Selected work
                  </p>
                  <h2
                    id="featured-projects-heading"
                    className="text-3xl font-black uppercase leading-[1.05] tracking-tight text-slate-950 sm:text-4xl lg:text-5xl"
                  >
                    Global portfolio excellence.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                    Explore engineering projects delivered through precision,
                    coordination, and BIM expertise.
                  </p>
                </div>
                <Link
                  href="/projects"
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start rounded-md border border-blue-700 bg-blue-700 px-5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-900/10 transition hover:-translate-y-0.5 hover:bg-blue-800 sm:self-auto"
                >
                  View all projects
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div
                className={`grid gap-6 md:gap-8 ${
                  featuredProjects.length === 1
                    ? "grid-cols-1"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {featuredProjects.map((project, i) => (
                  <CardPro
                    key={project.project_id || i}
                    project={project}
                    featuredLayout={featuredProjects.length === 1}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <CTA heading="Start Your Project."
          subheading="Precise Engineering. World-Class Coordination."
          buttonText1="Get In Touch"
          link1="/contact-us"
        />
      </main>
    </>
  );
}