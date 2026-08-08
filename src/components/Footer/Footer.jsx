import { Link } from "react-router-dom";
import { Code, Mail, MapPin } from "lucide-react";
import { Github, Linkedin, Twitter } from "../Icons";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <Code className="logo-icon" size={24} />
            <span className="logo-text">TNPS<span className="accent-text"> Forge</span></span>
          </Link>
          <p className="brand-description">
            The official coding community of Apex Institute of Technology. Building software, compiling futures, and fostering a community of passionate developers.
          </p>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="footer-links-group">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/events">Events Board</Link></li>
            <li><Link to="/projects">Club Projects</Link></li>
            <li><Link to="/team">Meet The Team</Link></li>
            <li><Link to="/gallery">Club Gallery</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h3>Tech Hub</h3>
          <ul className="footer-links">
            <li><Link to="/blog">Tech Blogs</Link></li>
            <li><Link to="/achievements">Achievements</Link></li>
            <li><Link to="/admin">Admin Console</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h3>Contact Info</h3>
          <ul className="footer-contact">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>ST.VINCENT PALLOTI COLLEGE OF ENGINERRING AND TECHNOLOGY NAGPUR.</span>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <span>forge@apex.edu</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} TNPS Forge - Coding Club. All rights reserved.</p>
          <p className="developer-credits">
            Crafted & Built by <span className="dev-name">PRESHIT BORKAR</span> | Contact: <a href="tel:9226428491" className="dev-phone">9226428491</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
