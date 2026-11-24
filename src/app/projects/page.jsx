"use client";

import React, { useEffect, useState } from "react";
import CardPro from "@/components/CardPro";
import styles from "./projects.module.css";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://api2.bimqubator.com";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/pm/projectFeachered`);
        const data = await response.json();
        if (data && data.success) {
          setProjects(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className={styles.projectsPage}>
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.heroHeading}>
            <h2 className={styles.eyebrow}>Our Complete Portfolio</h2>
            <h1>All Projects</h1>
            <span className={styles.heroRule} aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className={styles.catalog} aria-label="All projects">
        <div className={styles.container}>
          {loading ? (
            <div className={styles.loadingState}>
              <span className={styles.loader} aria-hidden="true" />
            </div>
          ) : projects.length > 0 ? (
            <>
              <div className={styles.projectGrid}>
                {currentProjects.map((project, index) => (
                  <div
                    className={styles.projectCard}
                    key={project.project_id || index}
                    style={{ "--card-index": index }}
                  >
                    <CardPro project={project} index={index} />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <nav className={styles.pagination} aria-label="Project pages">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={styles.pageButton}
                  >
                    Prev
                  </button>

                  <div className={styles.pageNumbers}>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          aria-current={currentPage === page ? "page" : undefined}
                          className={`${styles.pageNumber} ${
                            currentPage === page ? styles.currentPage : ""
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={styles.pageButton}
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          ) : (
            <div className={styles.emptyState}>
              <p>No projects found.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default ProjectsPage;
