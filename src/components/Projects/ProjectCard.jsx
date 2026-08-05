import { ExternalLink, Users } from "lucide-react";
import { Github } from "../Icons";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  const { title, category, description, tech, github, live, team, image } = project;

  // Decide hover glow color based on category
  const getGlowClass = () => {
    switch (category) {
      case "AI": return "glow-purple";
      case "Cyber Security": return "glow-cyan";
      default: return "glow-blue";
    }
  };

  return (
    <div className={`project-card glass-card ${getGlowClass()}`}>
      <div className="project-image">
        <img src={image} alt={title} loading="lazy" />
        <span className="project-category">{category}</span>
      </div>

      <div className="project-body">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>

        <div className="project-tech">
          {tech.map((t, idx) => (
            <span key={idx} className="tech-pill">{t}</span>
          ))}
        </div>

        <div className="project-team">
          <Users size={14} className="team-icon" />
          <span>By: {team.join(", ")}</span>
        </div>
      </div>

      <div className="project-footer">
        <a href={github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" aria-label="GitHub Repository">
          <Github size={16} /> Code
        </a>
        {live && live !== "#" && (
          <a href={live} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm" aria-label="Live Demo">
            <ExternalLink size={16} /> Demo
          </a>
        )}
      </div>
    </div>
  );
}
