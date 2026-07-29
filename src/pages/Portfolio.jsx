import React, { useEffect, useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub,
} from "react-icons/fa";
import styles from "./Portfolio.module.css";
import projectsData from "../database/projectsData.json";

// --- Direct image imports ---
import warmpaws from "../assets/projectImg/warmpaws.jpg";
import appsphere from "../assets/projectImg/appsphere.jpeg";
import crimeReportImage from "../assets/projectImg/crimeReport.jpg";
import ecommerceImage from "../assets/projectImg/ecommerce.jpg";
import portfolioImage from "../assets/projectImg/portfolio.jpg";
import emergencyServiceImage from "../assets/projectImg/EmergencyService.jpeg";
import greenEarthImage from "../assets/projectImg/GreenEarth.jpeg";
import customerSupportImage from "../assets/projectImg/CustomerService.jpg";
// IMPORTANT: You need to import the TravelEase image, not GoRide
// Since TravelEase uses GoRide's demo URL, you can use the same image if that's what you want
import goRideImage from "../assets/projectImg/goride.jpg";
import quizy from "../assets/projectImg/quizy.jpeg"; // This is actually for TravelEase project

// If you have a separate image for TravelEase, import it:
// import travelEaseImage from '../assets/projectImg/travel-ease.jpg';

const Portfolio = () => {
  const projectItems = useRef([]);
  const [imageSources, setImageSources] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Make sure the keys in fallbackImages match EXACTLY with project titles from projectsData.json
  const fallbackImages = {
    "Quizy - Quiz Application": quizy,
    "TravelEase - Vehicle Booking Platform": goRideImage, // Fixed: Changed key to match JSON
    "WarmPaws - Pet Care in Winter": warmpaws,
    "AppSphere - Modern App Discovery Platform": appsphere,
    "Live Crime Reporting System": crimeReportImage,
    "eCommerce Website": ecommerceImage,
    "Personal Portfolio": portfolioImage,
    "Emergency Service": emergencyServiceImage,
    "Green Earth: Dynamic Tree Planting App": greenEarthImage,
    "Customer Support System": customerSupportImage,
    // Removed "GoRide - Ride Sharing Application" since it doesn't exist in your JSON
  };

  // Add a placeholder image
  const placeholderImage =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjEyNDJjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2plY3QgSW1hZ2U8L3RleHQ+PC9zdmc+";

  // --- Debug logging ---
  useEffect(() => {
    console.log("Available fallback images:", Object.keys(fallbackImages));
    console.log(
      "Projects from JSON:",
      projectsData.map((p) => p.title),
    );
  }, []);

  // --- Pagination setup ---
  const projectsPerPage = 3;
  const totalPages = Math.ceil(projectsData.length / projectsPerPage);

  const currentProjects = isMobile
    ? showAll
      ? projectsData
      : projectsData.slice(0, 3)
    : projectsData.slice(
        currentPage * projectsPerPage,
        (currentPage + 1) * projectsPerPage,
      );

  const handleImageError = (title, e) => {
    console.log(`Image failed to load for: "${title}"`);
    console.log(`Looking for fallback image with key: "${title}"`);

    const fallback = fallbackImages[title];
    console.log(`Found fallback: ${fallback ? "Yes" : "No"}`);

    if (fallback) {
      // If we have a fallback, update the source
      setImageSources((prev) => ({
        ...prev,
        [title]: fallback,
      }));
    } else {
      // If no fallback, set to placeholder
      console.log(`No fallback found for "${title}", using placeholder`);
      e.target.src = placeholderImage;
      e.target.onerror = null; // Prevent infinite loop
    }
  };

  // Helper function to get image source with logging
  const getImageSource = (project) => {
    console.log(`Getting image for: "${project.title}"`);

    // First check if we have a manually set source (from error handling)
    if (imageSources[project.title]) {
      console.log(`Using cached image source for "${project.title}"`);
      return imageSources[project.title];
    }

    // Then check fallback images
    if (fallbackImages[project.title]) {
      console.log(`Using fallback image for "${project.title}"`);
      return fallbackImages[project.title];
    }

    // Then check if project has an image URL from JSON
    if (project.image) {
      console.log(
        `Using JSON image URL for "${project.title}": ${project.image}`,
      );
      return project.image;
    }

    // Finally, use placeholder
    console.log(`No image found for "${project.title}", using placeholder`);
    return placeholderImage;
  };

  // --- Pagination Controls ---
  const nextPage = () => {
    if (currentPage < totalPages - 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage((prev) => prev + 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage((prev) => prev - 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // --- Detect Mobile Screen ---
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Reveal animation ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
          }
        });
      },
      { threshold: 0.2 },
    );

    projectItems.current.forEach((item) => item && observer.observe(item));
    return () =>
      projectItems.current.forEach((item) => item && observer.unobserve(item));
  }, [currentProjects]);

  if (!projectsData || projectsData.length === 0) return null;

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Projects</h2>

        <div className={styles.portfolioContainer}>
          {/* === Desktop Navigation === */}
          {!isMobile && totalPages > 1 && (
            <button
              className={`${styles.navArrow} ${styles.navArrowLeft} ${currentPage === 0 ? styles.disabled : ""}`}
              onClick={prevPage}
              disabled={currentPage === 0 || isAnimating}
              aria-label="Previous projects"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* === Projects Grid === */}
          <div
            className={`${styles.portfolioContent} ${isAnimating ? styles.animating : ""}`}
          >
            <div className={styles.portfolioGrid}>
              {currentProjects.map((project, index) => (
                <div
                  key={`${currentPage}-${index}-${project.title}`}
                  className={`${styles.projectCard} ${styles.glassCard}`}
                  ref={(el) => (projectItems.current[index] = el)}
                >
                  <div className={styles.projectImage}>
                    <img
                      src={getImageSource(project)}
                      alt={project.title}
                      onError={(e) => handleImageError(project.title, e)}
                      loading="lazy"
                    />
                    <div className={styles.projectOverlay}>
                      <div className={styles.projectLinks}>
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            className={styles.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaExternalLinkAlt />
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            className={styles.codeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaGithub />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.projectContent}>
                    <span className={styles.projectTag}>
                      {project.category}
                    </span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>

                    {project.technologies && (
                      <div className={styles.techTags}>
                        {project.technologies
                          .split(",")
                          .map((tech, techIndex) => (
                            <span key={techIndex} className={styles.techTag}>
                              {tech.trim()}
                            </span>
                          ))}
                      </div>
                    )}

                    <div className={styles.projectActions}>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          className={styles.viewProject}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          className={styles.viewSource}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGithub /> Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* === Desktop Page Indicator === */}
            {!isMobile && totalPages > 1 && (
              <div className={styles.pageIndicator}>
                <span className={styles.currentPage}>{currentPage + 1}</span>
                <span className={styles.pageSeparator}>/</span>
                <span className={styles.totalPages}>{totalPages}</span>
              </div>
            )}
          </div>

          {/* === Desktop Right Arrow === */}
          {!isMobile && totalPages > 1 && (
            <button
              className={`${styles.navArrow} ${styles.navArrowRight} ${currentPage === totalPages - 1 ? styles.disabled : ""}`}
              onClick={nextPage}
              disabled={currentPage === totalPages - 1 || isAnimating}
              aria-label="Next projects"
            >
              <FaChevronRight />
            </button>
          )}
        </div>

        {/* === Mobile "See More / See Less" Button === */}
        {isMobile && projectsData.length > 3 && (
          <div className={styles.seeMoreContainer}>
            <button
              className={styles.seeMoreButton}
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
