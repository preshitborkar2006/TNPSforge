import { useState } from "react";
import { Terminal, Calendar, SlidersHorizontal } from "lucide-react";
import { events } from "../data/events";
import EventCard from "../components/Events/EventCard";
import SlideAnimation from "../animations/SlideAnimation";
import "./Events.css";

export default function Events() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Web Development", "AI", "Android", "Cyber Security", "Competitive Programming"];

  // Filter events by category
  const filteredEvents = filter === "All" 
    ? events 
    : events.filter(e => e.category === filter);

  // Divide into upcoming and past
  const upcoming = filteredEvents.filter(e => e.status === "upcoming");
  const past = filteredEvents.filter(e => e.status === "past");

  return (
    <div className="events-page section-padding">
      <div className="container">
        {/* Title Header */}
        <div className="section-header">
          <div className="sub-title">
            <Terminal size={14} className="title-icon" />
            <span>CALENDAR BOARD</span>
          </div>
          <h2>ByteCraft <span className="text-gradient">Events Board</span></h2>
          <p>Register for upcoming workshops, or review materials from past speaker sessions.</p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar glass-card">
          <div className="filter-title">
            <SlidersHorizontal size={16} className="filter-icon" />
            <span>Filter Categories:</span>
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

        {/* Upcoming Section */}
        <div className="events-section-block">
          <h2 className="events-block-title">
            Upcoming Events <span className="count-badge">{upcoming.length}</span>
          </h2>
          {upcoming.length > 0 ? (
            <div className="events-grid-layout">
              {upcoming.map(event => (
                <SlideAnimation key={event.id}>
                  <EventCard event={event} />
                </SlideAnimation>
              ))}
            </div>
          ) : (
            <div className="empty-events glass-card">
              <Calendar size={36} className="empty-icon" />
              <h3>No Upcoming Events</h3>
              <p>Check back later or propose a workshop topic in our contact form!</p>
            </div>
          )}
        </div>

        {/* Past Section */}
        <div className="events-section-block section-margin-top">
          <h2 className="events-block-title">
            Past Events & Speaker Sessions <span className="count-badge muted">{past.length}</span>
          </h2>
          {past.length > 0 ? (
            <div className="events-grid-layout">
              {past.map(event => (
                <SlideAnimation key={event.id}>
                  <EventCard event={event} />
                </SlideAnimation>
              ))}
            </div>
          ) : (
            <div className="empty-events glass-card">
              <Calendar size={36} className="empty-icon" />
              <h3>No Past Sessions Found</h3>
              <p>No concluded events fit this filter category currently.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
