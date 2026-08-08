import { useState } from "react";
import { Terminal, Search } from "lucide-react";
import { projects as defaultProjects } from "../data/projects";
import ProjectCard from "../components/Projects/ProjectCard";
import SlideAnimation from "../animations/SlideAnimation";
import "./Projects.css";

export default function Projects() {
  const [projects] = useState(() => {
    const saved = localStorage.getItem("admin_projects");
    return saved ? JSON.parse(saved) : defaultProjects;
  });
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = ["All", "Web Development", "AI", "Android", "Cyber Security", "Competitive Programming"];

  // Filter & Search Logic
  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === "All" || project.category === filter;
    
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tech.some(t => t.toLowerCase().includes(query)) ||
      project.team.some(m => m.toLowerCase().includes(query));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="projects-page section-padding">
      <div className="container">
        {/* Title Header */}
        <div className="section-header">
          <div className="sub-title">
            <Terminal size={14} className="title-icon" />
            <span>PORTFOLIO GRID</span>
          </div>
          <h2>Club <span className="text-gradient">Projects Vault</span></h2>
          <p>Inspect custom tools, applications, and scripts built by student teams in ByteCraft.</p>
        </div>

        {/* Filter and Search Bar */}
        <div className="projects-control-bar glass-card">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by title, stack, or developer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-tab ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="projects-grid-layout">
            {filteredProjects.map(project => (
              <SlideAnimation key={project.id}>
                <ProjectCard project={project} />
              </SlideAnimation>
            ))}
          </div>
        ) : (
          <div className="empty-projects glass-card">
            <h3>No Projects Found</h3>
            <p>We couldn't find any repositories matching your search query. Try searching for other technologies like 'React', 'PyTorch', or 'Kotlin'.</p>
          </div>
        )}

      </div>
    </div>
  );
}
