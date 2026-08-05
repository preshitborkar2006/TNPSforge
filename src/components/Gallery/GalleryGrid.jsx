import { useState } from "react";
import { gallery } from "../../data/gallery";
import CircularGallery from "./CircularGallery";
import "./GalleryGrid.css";

export default function GalleryGrid({ limit = null }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Hackathons", "Workshops", "Meetups", "Celebrations"];

  const filteredGallery = activeFilter === "All" 
    ? gallery 
    : gallery.filter(item => item.category === activeFilter);

  const displayedGallery = limit ? filteredGallery.slice(0, limit) : filteredGallery;

  return (
    <div className="gallery-wrapper">
      {!limit && (
        <div className="gallery-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <CircularGallery items={displayedGallery} />
    </div>
  );
}
