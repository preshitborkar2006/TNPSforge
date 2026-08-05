import { Link } from "react-router-dom";
import { Calendar, MapPin, User, ArrowRight } from "lucide-react";
import "./EventCard.css";

export default function EventCard({ event }) {
  const { title, category, date, time, venue, status, image, description, speakers } = event;

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  return (
    <div className={`event-card glass-card ${status}`}>
      <div className="event-card-image">
        <img src={image} alt={title} loading="lazy" />
        <span className="event-badge">{category}</span>
        {status === "upcoming" && <span className="status-badge upcoming">Upcoming</span>}
      </div>

      <div className="event-card-body">
        <h3 className="event-title">{title}</h3>
        <p className="event-desc">{description}</p>
        
        <div className="event-meta">
          <div className="meta-item">
            <Calendar size={14} className="meta-icon" />
            <span>{formatDate(date)} // {time}</span>
          </div>
          <div className="meta-item">
            <MapPin size={14} className="meta-icon" />
            <span>{venue}</span>
          </div>
          {speakers && speakers.length > 0 && (
            <div className="meta-item speakers">
              <User size={14} className="meta-icon" />
              <span>By: {speakers.join(", ")}</span>
            </div>
          )}
        </div>
      </div>

      <div className="event-card-footer">
        {status === "upcoming" ? (
          <Link to={`/register?event=${encodeURIComponent(title)}`} className="btn btn-primary btn-block">
            Register Now <ArrowRight size={14} />
          </Link>
        ) : (
          <button className="btn btn-secondary btn-block" disabled>
            Event Concluded
          </button>
        )}
      </div>
    </div>
  );
}
