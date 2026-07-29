import React, { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import heroData from '../database/heroData.json';
import profileImage from '../assets/Home.jpeg';
// Assuming the filename in 'src/assets' is correct (Fahim Faysal.pdf)
import cvFile from '../assets/Fahim Faysal.pdf';

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaCopy, // Added Copy Icon
} from 'react-icons/fa';

// A separate, clean component for the copy button logic
const CopyButton = ({ value, label, onCopy, copiedField }) => {
  const isCopied = copiedField === label;

  return (
    <button className={styles.copyButton} onClick={() => onCopy(value, label)} aria-label={`Copy ${label}`}>
      <FaCopy className={styles.copyIcon} />
      {isCopied && <span className={styles.copyConfirmation}>Copied!</span>}
    </button>
  );
};

const Hero = () => {
  const {
    greeting,
    name,
    lastName,
    description,
    jobTitle,
    stats,
    buttonText,
    cvButtonText,
    cvLink: cvLinkFromData,
    profileImageUrl,
    personalInfo,
  } = heroData;

  const [showContactModal, setShowContactModal] = useState(false);
  // State to track which field was just copied (e.g., 'email', 'phone')
  const [copiedField, setCopiedField] = useState(null); 
  const modalRef = useRef(null);

  // Function to handle the copy action
  const handleCopy = async (textToCopy, fieldLabel) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedField(fieldLabel); // Set the field that was copied
      // Clear the 'Copied!' message after 2 seconds
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Optional: Add user feedback for failure
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowContactModal(false);
      }
    };
    if (showContactModal) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showContactModal]);

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          {/* Image */}
          <div className={styles.heroImage}>
            <img
              src={profileImageUrl || profileImage}
              alt={`${name} ${lastName}`}
              onError={(e) => (e.target.src = profileImage)}
            />
            <div className={styles.caption}>{jobTitle}</div>
          </div>

          {/* Text Content */}
          <div className={styles.intro}>
            <div className={styles.greetingLine}>
              <span className={styles.greetingDash}>—</span>
              <h2>{greeting}</h2>
            </div>

            <h1>
              <span className={styles.whiteName}>{name}</span>{' '}
              <span className={styles.gradientText}>{lastName}</span>
            </h1>
            <p>{description}</p>

            <div className={styles.stats}>
              {stats.map((stat, i) => (
                <div key={i} className={`${styles.statItem} ${styles.glassCard}`}>
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>

            <div className={styles.buttons}>
              <a href={cvFile} download>
                <button className={styles.btn1}>{cvButtonText}</button>
              </a>
              <button className={styles.btn2} onClick={() => setShowContactModal(true)}>
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.contactModal} ref={modalRef}>
            <button className={styles.closeButton} onClick={() => setShowContactModal(false)}>
              ×
            </button>
            <h2>Get in Touch</h2>

            <div className={styles.contactDetails}>
              {/* Email Item with Copy Button */}
              <div className={styles.contactItem}>
                <FaEnvelope className={styles.contactIcon} />
                <p>{personalInfo.email}</p>
                <CopyButton 
                  value={personalInfo.email} 
                  label="email" 
                  onCopy={handleCopy} 
                  copiedField={copiedField} 
                />
              </div>

              {/* Phone Item with Copy Button */}
              <div className={styles.contactItem}>
                <FaPhoneAlt className={styles.contactIcon} />
                <p>{personalInfo.phone}</p>
                <CopyButton 
                  value={personalInfo.phone} 
                  label="phone" 
                  onCopy={handleCopy} 
                  copiedField={copiedField} 
                />
              </div>

              {/* Location Item (no copy button) */}
              <div className={styles.contactItem}>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <p>{personalInfo.location}</p>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <a href={personalInfo.socialLinks?.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedinIn />
              </a>
              <a href={personalInfo.socialLinks?.github} target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
              <a href={personalInfo.socialLinks?.twitter} target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
              <a href={personalInfo.socialLinks?.instagram} target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating visuals */}
      <div className={`${styles.floatingElement} ${styles.float1}`}></div>
      <div className={`${styles.floatingElement} ${styles.float2}`}></div>
      <div className={`${styles.floatingElement} ${styles.float3}`}></div>
    </section>
  );
};

export default Hero;