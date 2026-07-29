// About.jsx
import React from 'react';
import styles from './About.module.css';
import profileImage from "../assets/about.jpeg";
// Import data from the clean JSON file (src/database/aboutData.json)
import aboutData from "../database/aboutData.json"; 

// -------------------------------------------------------------------
// 1. IMPORT REACT ICONS
// We use 'Fa' (Font Awesome) icons for social media
// -------------------------------------------------------------------
import { 
  FaGithub, 
  FaLinkedinIn, 
  FaTwitter, 
  FaInstagram 
} from 'react-icons/fa';

const About = () => {
  // Destructure for clean and readable access to data properties
  const { name, bio, socialLinks } = aboutData;

  // Functionally split the bio string into paragraphs for proper JSX rendering
  const bioParagraphs = bio
    .trim()
    .split(/\n+/)
    .filter((p) => p.trim() !== '');

  // -------------------------------------------------------------------
  // 2. UPDATED SocialIcon COMPONENT
  // It now accepts an 'Icon' component instead of a class string.
  // -------------------------------------------------------------------
  const SocialIcon = ({ href, Icon, label }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialIcon}
      aria-label={label}
    >
      <Icon /> 
    </a>
  );

  // -------------------------------------------------------------------
  // 3. UPDATED List of social links to render
  // 'icon' property is replaced with 'IconComponent'
  // -------------------------------------------------------------------
  const links = [
    { key: 'linkedin', href: socialLinks.linkedin, IconComponent: FaLinkedinIn, label: 'LinkedIn profile' },
    { key: 'github', href: socialLinks.github, IconComponent: FaGithub, label: 'GitHub profile' },
    { key: 'twitter', href: socialLinks.twitter, IconComponent: FaTwitter, label: 'Twitter profile' },
    { key: 'instagram', href: socialLinks.instagram, IconComponent: FaInstagram, label: 'Instagram profile' },
  ];

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        {/* Left Side — Image + Socials Card */}
        <div className={styles.profileSidebar}>
          <div className={styles.profileImage}>
            <img src={profileImage} alt={name} />
          </div>

          <div className={styles.socialLinks}>
            {/* Map over the links array for dynamic and clean rendering */}
            {links.map((link) => 
              // Only render if the URL exists in the data
              link.href && (
                <SocialIcon
                  key={link.key}
                  href={link.href}
                  // Pass the component itself as a prop
                  Icon={link.IconComponent} 
                  label={link.label}
                />
              )
            )}
          </div>
        </div>

        {/* Right Side — About Text */}
        <div className={styles.aboutContent}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          {/* Use the mapped paragraphs */}
          {bioParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;