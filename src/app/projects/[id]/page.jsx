"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectDetailsPage({ params }) {
    const resolvedParams = React.use(params);
    const { id } = resolvedParams;

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    const API_URL =
        process.env.NEXT_PUBLIC_BACKEND_URL || "https://api2.bimqubator.com";

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/v1/pm/projectFeachered/${id}`
                );

                const data = await response.json();

                if (data?.success && data?.data) {
                    setProject(data.data);
                } else {
                    setProject(null);
                }
            } catch (error) {
                console.error("Failed to fetch project:", error);
                setProject(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProject();
        }
    }, [id, API_URL]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6">
                <h2 className="text-3xl font-black text-gray-900 uppercase mb-4">
                    Project Not Found
                </h2>

                <Link
                    href="/projects"
                    className="text-blue-600 font-bold hover:underline tracking-widest uppercase text-sm"
                >
                    Return to Projects
                </Link>
            </div>
        );
    }

    // Parse images exactly like ProjectCard
    let images = [];

    try {
        images =
            typeof project.project_images === "string"
                ? JSON.parse(project.project_images)
                : project.project_images || [];
    } catch (error) {
        console.error("Error parsing project images:", error);
    }

    const getImageUrl = (img) => {
        if (!img) return "/placeholder.jpg";

        const sanitizedPath = img.replace(/\\/g, "/");

        return `${API_URL.replace(/\/$/, "")}/${sanitizedPath.replace(
            /^\//,
            ""
        )}`;
    };

    const {
        name,
        region,
        country,
        description,
        client_name,
        company_name,
        company_logo,
    } = project;
    const hasProjectDetails = Boolean(
        region || country || company_logo || company_name || client_name
    );

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
                <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-blue-500/20 blur-3xl" />
                <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-7 sm:pb-16 lg:px-8 lg:pt-14">
                    <Link
                        href="/projects"
                        className="mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-100 transition hover:text-white"
                    >
                        <span aria-hidden="true">←</span>
                        All projects
                    </Link>

                    <div className="max-w-4xl">
                        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-blue-300">
                            Project case study
                        </p>
                        <h1 className="text-xl font-black uppercase leading-[1.15] tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">
                            {name || "Untitled Project"}
                        </h1>
                        {(region || country) && (
                            <div className="mt-6 flex flex-wrap gap-2">
                                {[region, country].filter(Boolean).map((location) => (
                                    <span
                                        key={location}
                                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-50 backdrop-blur"
                                    >
                                        {location}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-5 py-8 sm:px-7 sm:py-12 lg:px-8 lg:py-14">
                <div className={`grid gap-6 lg:items-start lg:gap-8 ${hasProjectDetails ? "lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]" : ""}`}>
                    <section aria-label="Project gallery" className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_16px_44px_rgba(15,23,42,0.08)] sm:p-4">
                        {images.length > 0 ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedImage(0);
                                        setIsGalleryOpen(true);
                                    }}
                                    className="group relative block aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 text-left"
                                    aria-label="Open project image gallery"
                                >
                                    <Image
                                        src={getImageUrl(images[0])}
                                        alt={`${name || "Project"} image 1`}
                                        fill
                                        unoptimized
                                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-900 shadow-lg">
                                        View gallery
                                        <span aria-hidden="true">↗</span>
                                    </span>
                                    <span className="absolute right-4 top-4 rounded-full bg-slate-950/70 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
                                        {images.length} {images.length === 1 ? "photo" : "photos"}
                                    </span>
                                </button>

                                {images.length > 1 && (
                                    <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                                        {images.slice(1, 5).map((img, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedImage(index + 1);
                                                    setIsGalleryOpen(true);
                                                }}
                                                className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100"
                                                aria-label={`Open project image ${index + 2}`}
                                            >
                                                <Image
                                                    src={getImageUrl(img)}
                                                    alt={`${name || "Project"} image ${index + 2}`}
                                                    fill
                                                    unoptimized
                                                    className="object-cover transition duration-500 group-hover:scale-105"
                                                />
                                                {index === 3 && images.length > 5 && (
                                                    <span className="absolute inset-0 flex items-center justify-center bg-slate-950/65 text-sm font-bold text-white">
                                                        +{images.length - 5}
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex aspect-[16/10] flex-col items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mb-3 h-12 w-12"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <p className="text-sm font-medium">No project images available</p>
                            </div>
                        )}
                    </section>

                    {hasProjectDetails && (
                    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)] sm:p-7">
                        <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700">
                            Project details
                        </p>

                        {(region || country) && (
                            <div className="border-b border-slate-100 pb-5">
                                <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                                    Location
                                </h2>
                                <p className="text-sm font-semibold text-slate-900">
                                    {[region, country].filter(Boolean).join(", ")}
                                </p>
                            </div>
                        )}

                        {(company_logo || company_name) && (
                            <div className="border-b border-slate-100 py-5">
                                <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                                    Company
                                </h2>
                                <div className="flex items-center gap-3">
                                    {company_logo && (
                                        <div className="relative h-12 w-12 shrink-0 rounded-lg border border-slate-100 bg-white p-1.5">
                                            <Image
                                                src={getImageUrl(company_logo)}
                                                alt={company_name ? `${company_name} logo` : "Company logo"}
                                                fill
                                                unoptimized
                                                className="object-contain p-1"
                                            />
                                        </div>
                                    )}
                                    <p className="text-sm font-bold uppercase text-slate-900">
                                        {company_name || "Company"}
                                    </p>
                                </div>
                            </div>
                        )}

                        {client_name && (
                            <div className="pt-5">
                                <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                                    Client
                                </h2>
                                <p className="text-sm font-bold uppercase text-slate-900">
                                    {client_name}
                                </p>
                            </div>
                        )}
                    </aside>
                    )}
                </div>

                {description?.length > 0 && (
                    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.04)] sm:mt-8 sm:p-8">
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">
                            Project overview
                        </p>
                        <h2 className="mb-4 text-xl font-bold text-slate-950 sm:text-2xl">
                            About this project
                        </h2>
                        <p className="max-w-4xl whitespace-pre-wrap text-sm leading-7 text-slate-600 sm:text-base">
                            {description}
                        </p>
                    </section>
                )}
            </div>

            {isGalleryOpen && (
                <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[9999] flex items-center justify-center">
                    {/* Close */}
                    <button
                        onClick={() => setIsGalleryOpen(false)}
                        className="absolute top-6 right-6 text-red-500 bg-white hover:bg-gray-100 hover:scale-105 hover:text-red-600 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-50 text-3xl shadow-xl shadow-black/50 pb-1"
                        aria-label="Close gallery"
                    >
                        ×
                    </button>

                    {/* Previous */}
                    <button
                        onClick={() =>
                            setSelectedImage((prev) =>
                                prev === 0 ? images.length - 1 : prev - 1
                            )
                        }
                        className="absolute left-4 md:left-8 text-blue-600 bg-white hover:bg-gray-100 hover:scale-105 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 z-50 text-4xl shadow-xl shadow-black/50 pr-1 pb-1"
                        aria-label="Previous image"
                    >
                        ‹
                    </button>

                    {/* Image */}
                    <div className="relative w-full max-w-6xl h-[60vh] md:h-[75vh] px-20">
                        <Image
                            src={getImageUrl(images[selectedImage])}
                            alt={`Gallery image ${selectedImage + 1}`}
                            fill
                            unoptimized
                            className="object-contain"
                        />
                    </div>

                    {/* Next */}
                    <button
                        onClick={() =>
                            setSelectedImage((prev) =>
                                prev === images.length - 1 ? 0 : prev + 1
                            )
                        }
                        className="absolute right-4 md:right-8 text-blue-600 bg-white hover:bg-gray-100 hover:scale-105 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 z-50 text-4xl shadow-xl shadow-black/50 pl-1 pb-1"
                        aria-label="Next image"
                    >
                        ›
                    </button>

                    {/* Thumbnail Strip */}
                    <div className="absolute bottom-6 left-0 right-0 w-full px-4">
                        <div className="flex gap-3 overflow-x-auto justify-center max-w-4xl mx-auto pb-4 snap-x">
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 snap-center ${selectedImage === index
                                        ? "ring-2 ring-white ring-offset-2 ring-offset-black opacity-100 scale-105"
                                        : "opacity-50 hover:opacity-100"
                                        }`}
                                >
                                    <Image
                                        src={getImageUrl(img)}
                                        alt={`Thumbnail ${index + 1}`}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
}