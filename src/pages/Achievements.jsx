import { useState } from "react";
import { Terminal, Award, SlidersHorizontal } from "lucide-react";
import { achievements as defaultAchievements } from "../data/achievements";
import AchievementCard from "../components/Achievements/AchievementCard";
import SlideAnimation from "../animations/SlideAnimation";
import "./Achievements.css";

export default function Achievements() {
  const [achievements] = useState(() => {
    const saved = localStorage.getItem("admin_achievements");
    return saved ? JSON.parse(saved) : defaultAchievements;
  });
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Hackathon Wins", "Certifications", "Leaderboards", "Hall of Fame"];

  // Filter achievements
  const filteredAchievements = filter === "All"
    ? achievements
    : achievements.filter(ach => ach.category === filter);

  const hallOfFame = [
    { name: "Siddharth Sen", title: "Codeforces Candidate Master", year: "2026", desc: "First AIT student to hit 1900+ Codeforces rating in JavaScript/C++." },
    { name: "Shreya Roy", title: "AWS Global Certified Gold Medalist", year: "2026", desc: "Ranked in the top 0.1% worldwide in the AWS Cloud Architecture Challenge." },
    { name: "Aryan Sen", title: "Smart India Hackathon Lead", year: "2025", desc: "Led the developer division to construct AI model crops scanning modules." }
  ];

  return (
    <div className="achievements-page section-padding">
      <div className="container">
        {/* Title Header */}
        <div className="section-header">
          <div className="sub-title">
            <Terminal size={14} className="title-icon" />
            <span>HALL OF FAME</span>
          </div>
          <h2>TNPS Forge <span className="text-gradient">Club Records</span></h2>
          <p>Review our historic hackathon trophies, programming milestones, and technical certifications.</p>
        </div>

        {/* Counter Summary Widgets */}
        <div className="ach-stats-summary">
          <div className="summary-widget glass-card">
            <h3>10+</h3>
            <p>Hackathon Trophies</p>
          </div>
          <div className="summary-widget glass-card">
            <h3>100+</h3>
            <p>Members Trained</p>
          </div>
          <div className="summary-widget glass-card">
            <h3>50+</h3>
            <p>AWS & Security Certifications</p>
          </div>
        </div>

        {/* Filters */}
        <div className="filter-bar glass-card">
          <div className="filter-title">
            <SlidersHorizontal size={16} className="filter-icon" />
            <span>Categories:</span>
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

        {/* Main List */}
        <div className="achievements-grid-layout">
          {filteredAchievements.map(ach => (
            <SlideAnimation key={ach.id}>
              <AchievementCard achievement={ach} />
            </SlideAnimation>
          ))}
        </div>

        {/* Hall of Fame Register */}
        <div className="hall-of-fame-block section-padding">
          <div className="section-header">
            <div className="sub-title">
              <Award size={14} className="title-icon" />
              <span>TNPS FORGE ANCIENTS</span>
            </div>
            <h2>The <span className="text-gradient">Hall of Fame</span></h2>
            <p>Recognizing students who set milestones for AIT coding cultures.</p>
          </div>

          <div className="fame-cards">
            {hallOfFame.map((hero, i) => (
              <SlideAnimation key={i} className="fame-card glass-card">
                <div className="fame-top">
                  <h3>{hero.name}</h3>
                  <span className="fame-year">{hero.year}</span>
                </div>
                <h4 className="fame-title">{hero.title}</h4>
                <p className="fame-desc">{hero.desc}</p>
              </SlideAnimation>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
