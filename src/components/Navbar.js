// Navbar.js

import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { FaFacebook, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logoContainer">
        <Link to="/" className="logo">LEO</Link>
      </div>
      <div className="iconsContainer">
        <a href="https://www.facebook.com/leo.ahlgren.90" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="social-icon" />
        </a>
        <a href="https://www.linkedin.com/in/leo-ahlgren-b978b880/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="social-icon" />
        </a>
        <a href="https://www.instagram.com/leoahlgren/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="social-icon" />
        </a>
        <a href="https://github.com/Kyllinglolsson" target="_blank" rel="noopener noreferrer">
          <FaGithub className="social-icon" />
        </a>
      </div> {/* iconsContainer */}
      <div className="linkContainer">
        <Link to="/photography" className="link">Photography</Link>
        <Link to="/projects" className="link">Projects</Link>
        <Link to="/about" className="link">About</Link>
        <Link to="/blog" className="link">Blog</Link>
      </div>  {/* linkContainer */}
    </nav>
  );
}

export default Navbar;
