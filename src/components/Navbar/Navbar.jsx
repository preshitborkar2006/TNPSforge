import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Code, Menu, X } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/events", label: "Events" },
    { path: "/projects", label: "Projects" },
    { path: "/team", label: "Team" },
    { path: "/gallery", label: "Gallery" },
    { path: "/achievements", label: "Achievements" },
    { path: "/contact", label: "Contact" }
  ];

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <Code className="logo-icon" size={24} />
          <span className="logo-text">
            TNPS<span className="accent-text">Forge</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/login" className="nav-btn">
            Join/Login
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isOpen ? "open" : ""}`}>
        <div className="mobile-drawer-links">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/login" className="mobile-nav-btn" onClick={() => setIsOpen(false)}>
            Portal Log In
          </Link>
        </div>
      </div>
    </nav>
  );
}
