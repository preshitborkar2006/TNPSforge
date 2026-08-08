import { useState } from "react";
import { Mail, CheckCircle2, Terminal } from "lucide-react";
import { Github, Linkedin } from "../Icons";
import "./MemberCard.css";

export default function MemberCard({ member }) {
  const { name, role, team, department, year, image, socials } = member;
  const [isFlipped, setIsFlipped] = useState(false);

  const getBio = () => {
    if (team === "Faculty") {
      return `Faculty Coordinator supervising TNPS Forge academic initiatives, coordinating projects, and mentoring student developers.`;
    }
    return `Active ${role} at TNPS Forge. Specializing in ${department || "Engineering"} and dedicated to coding bootcamps and open-source project sprints.`;
  };

  const getSkills = () => {
    switch (team) {
      case "Faculty":
        return ["Mentorship", "Governance", "Research"];
      case "President":
      case "Vice President":
        return ["Leadership", "Relations", "Strategy"];
      case "Technical Leads":
        return ["Algorithms", "Architecture", "System Design"];
      case "Design Team":
        return ["UI/UX Design", "Animations", "CSS Art"];
      case "Management Team":
        return ["Agile", "Coordination", "Operations"];
      default:
        return ["React.js", "Node.js", "JavaScript"];
    }
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSocialClick = (e) => {
    e.stopPropagation(); // prevent card flipping when clicking social links
  };

  return (
    <div className={`member-card-wrapper ${isFlipped ? "is-flipped" : ""}`} onClick={handleCardClick}>
      <div className="member-card-inner">
        
        {/* Front Side */}
        <div className="member-card-front">
          <div className="member-photo">
            <img src={image} alt={name} loading="lazy" />
            <div className="member-overlay">
              <span className="flip-hint">Click to inspect guild card</span>
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

        {/* Back Side */}
        <div className="member-card-back">
          <div className="back-header">
            <Terminal size={14} className="back-logo-icon" />
            <span>GUILD RECORD // {team ? team.toUpperCase() : "MEMBER"}</span>
          </div>

          <div className="back-identity">
            <h3 className="back-name">{name}</h3>
            <p className="back-role">{role}</p>
          </div>

          <p className="back-bio">{getBio()}</p>

          <div className="back-skills-container">
            {getSkills().map((skill, index) => (
              <span key={index} className="skill-tag">
                <CheckCircle2 size={10} className="tag-icon" /> {skill}
              </span>
            ))}
          </div>

          <div className="member-social-row">
            {socials.linkedin && socials.linkedin !== "#" && (
              <a 
                href={socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-pill" 
                aria-label="LinkedIn Profile"
                onClick={handleSocialClick}
              >
                <Linkedin size={16} />
              </a>
            )}
            {socials.github && socials.github !== "#" && (
              <a 
                href={socials.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-pill" 
                aria-label="GitHub Profile"
                onClick={handleSocialClick}
              >
                <Github size={16} />
              </a>
            )}
            {socials.email && (
              <a 
                href={`mailto:${socials.email}`} 
                className="social-pill" 
                aria-label="Email Address"
                onClick={handleSocialClick}
              >
                <Mail size={16} />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
