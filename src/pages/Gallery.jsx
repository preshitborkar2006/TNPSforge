import { Terminal } from "lucide-react";
import GalleryGrid from "../components/Gallery/GalleryGrid";
import "./Gallery.css";

export default function Gallery() {
  return (
    <div className="gallery-page section-padding">
      <div className="container">
        {/* Title Header */}
        <div className="section-header">
          <div className="sub-title">
            <Terminal size={14} className="title-icon" />
            <span>VISUAL CHRONICLES</span>
          </div>
          <h2>Club <span className="text-gradient">Gallery</span></h2>
          <p>A visual log of our coding workshops, competitive contests, and trophy celebrations.</p>
        </div>

        {/* Gallery Grid */}
        <GalleryGrid />
      </div>
    </div>
  );
}
