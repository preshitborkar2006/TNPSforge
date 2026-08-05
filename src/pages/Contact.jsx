import { Terminal, Mail, Phone, MapPin } from "lucide-react";
import { Github, Linkedin, Twitter } from "../components/Icons";
import ContactForm from "../components/Contact/ContactForm";
import SlideAnimation from "../animations/SlideAnimation";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page section-padding">
      <div className="container">
        {/* Title Header */}
        <div className="section-header">
          <div className="sub-title">
            <Terminal size={14} className="title-icon" />
            <span>DISPATCH TICKETS</span>
          </div>
          <h2>Contact <span className="text-gradient">TNPS Forge Hub</span></h2>
          <p>Have questions about hackathons, workshops, or partner sponsorships? Write to us.</p>
        </div>

        <div className="contact-grid">
          {/* Form Side */}
          <SlideAnimation className="form-column">
            <ContactForm />
          </SlideAnimation>

          {/* Info Side */}
          <SlideAnimation className="info-column" delay={0.2}>
            {/* Quick Contact info */}
            <div className="info-block glass-card">
              <h3>Connect Directly</h3>
              <div className="contact-links-list">
                <div className="contact-link-item">
                  <div className="icon-box-small purple">
                    <Mail size={18} />
                  </div>
                  <div className="link-details">
                    <span>Email Address</span>
                    <p>forge@apex.edu</p>
                  </div>
                </div>

                <div className="contact-link-item">
                  <div className="icon-box-small cyan">
                    <Phone size={18} />
                  </div>
                  <div className="link-details">
                    <span>Phone Number</span>
                    <p>+91 (161) 500-2432</p>
                  </div>
                </div>

                <div className="contact-link-item">
                  <div className="icon-box-small blue">
                    <MapPin size={18} />
                  </div>
                  <div className="link-details">
                    <span>Physical Location</span>
                    <p>Lab Block 4, AIT Campus, Punjab, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Google Map */}
            <div className="mock-map-container glass-card">
              <div className="map-grid-overlay">
                <div className="map-scanner"></div>
                <div className="map-marker">
                  <span className="marker-ping"></span>
                  <div className="marker-label">AIT Campus (TNPS Forge Labs)</div>
                </div>
                <div className="map-coordinates">
                  30.7333° N, 76.7794° E
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="contact-social-block glass-card">
              <h3>Follow Our Code</h3>
              <div className="social-icon-row">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-contact-pill">
                  <Github size={20} /> <span>GitHub</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-contact-pill">
                  <Linkedin size={20} /> <span>LinkedIn</span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-contact-pill">
                  <Twitter size={20} /> <span>Twitter</span>
                </a>
              </div>
            </div>
          </SlideAnimation>
        </div>

      </div>
    </div>
  );
}
