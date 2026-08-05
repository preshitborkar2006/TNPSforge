import { useState } from "react";
import { Terminal, SlidersHorizontal } from "lucide-react";
import { resources } from "../data/resources";
import ResourceItem from "../components/Resources/ResourceItem";
import SlideAnimation from "../animations/SlideAnimation";
import "./Resources.css";

export default function Resources() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Roadmaps", "Cheat Sheets", "Useful Websites", "Learning Videos"];

  // Filter resources
  const filteredResources = filter === "All"
    ? resources
    : resources.filter(res => res.category === filter);

  return (
    <div className="resources-page section-padding">
      <div className="container">
        {/* Title Header */}
        <div className="section-header">
          <div className="sub-title">
            <Terminal size={14} className="title-icon" />
            <span>KNOWLEDGE VAULT</span>
          </div>
          <h2>Developer <span className="text-gradient">Resources Vault</span></h2>
          <p>Curated learning materials, cheatsheets, and roadmaps verified by our domain leads.</p>
        </div>

        {/* Filters */}
        <div className="filter-bar glass-card">
          <div className="filter-title">
            <SlidersHorizontal size={16} className="filter-icon" />
            <span>Filter Materials:</span>
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

        {/* Resources Grid */}
        <div className="resources-grid-layout">
          {filteredResources.map(res => (
            <SlideAnimation key={res.id}>
              <ResourceItem resource={res} />
            </SlideAnimation>
          ))}
        </div>

      </div>
    </div>
  );
}
