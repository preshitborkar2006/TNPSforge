import { Download, ExternalLink, Map, FileText, Video, Globe } from "lucide-react";
import "./ResourceItem.css";

export default function ResourceItem({ resource }) {
  const { title, category, type, downloadUrl, size, description, link } = resource;

  const getIcon = () => {
    switch (category) {
      case "Roadmaps":
        return <Map className="res-icon purple" size={20} />;
      case "Cheat Sheets":
        return <FileText className="res-icon cyan" size={20} />;
      case "Learning Videos":
        return <Video className="res-icon blue" size={20} />;
      default:
        return <Globe className="res-icon yellow" size={20} />;
    }
  };

  return (
    <div className="resource-item glass-card">
      <div className="res-header">
        <div className="res-icon-wrapper">{getIcon()}</div>
        <span className="res-category">{category}</span>
      </div>

      <div className="res-body">
        <h3 className="res-title">{title}</h3>
        <p className="res-desc">{description}</p>
        {size && size !== "N/A" && <span className="res-size">Size: {size}</span>}
      </div>

      <div className="res-footer">
        {type === "PDF" && downloadUrl && downloadUrl !== "#" ? (
          <a href={downloadUrl} className="btn btn-primary btn-sm btn-block" download>
            <Download size={14} /> Download PDF
          </a>
        ) : (
          <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm btn-block">
            <ExternalLink size={14} /> Open {type}
          </a>
        )}
      </div>
    </div>
  );
}
