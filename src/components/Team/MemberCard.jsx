import { Mail } from "lucide-react";
import { Github, Linkedin } from "../Icons";
import "./MemberCard.css";

export default function MemberCard({ member }) {
  const { name, role, department, year, image, socials } = member;

  return (
    <div className="member-card glass-card">
      <div className="member-photo">
        <img src={image} alt={name} loading="lazy" />
        <div className="member-overlay">
          <div className="member-social-row">
            {socials.linkedin && socials.linkedin !== "#" && (
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="LinkedIn Profile">
                <Linkedin size={16} />
              </a>
            )}
            {socials.github && socials.github !== "#" && (
              <a href={socials.github} target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="GitHub Profile">
                <Github size={16} />
              </a>
            )}
            {socials.email && (
              <a href={`mailto:${socials.email}`} className="social-pill" aria-label="Email Address">
                <Mail size={16} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="member-info">
        <h3 className="member-name">{name}</h3>
        <p className="member-role">{role}</p>
        <p className="member-dept">
          {department} {year ? `• ${year}` : ""}
        </p>
      </div>
    </div>
  );
}
