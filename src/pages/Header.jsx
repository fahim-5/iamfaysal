import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const personalInfo = {
    name: "Fahim",
  };

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Gallery", href: "#pictures" },
    { name: "References", href: "#references" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToHero = (e) => {
    e.preventDefault();
    const heroSection = document.getElementById("home");
    if (heroSection) heroSection.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>
            <a
              href="#home"
              onClick={scrollToHero}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {personalInfo.name.toLowerCase()}
            </a>
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.href === "#home") scrollToHero(e);
                    else handleNavLinkClick();
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger / Cross Icon */}
        <div
          className={`${styles.hamburgerMenu} ${isMobileMenuOpen ? styles.open : ""}`}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu-navigation"
          role="button"
          tabIndex="0"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${styles.mobileNavOverlay} ${isMobileMenuOpen ? styles.open : ""}`}
        id="mobile-menu-navigation"
      >
        <nav className={styles.mobileNav}>
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  className={styles.navLink}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href === "#home") scrollToHero(e);
                    else handleNavLinkClick();
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
