import { Award, Zap, Trophy, ShieldCheck } from "lucide-react";
import "./AchievementCard.css";

export default function AchievementCard({ achievement }) {
  const { title, category, winner, date, description, metric } = achievement;

  const getIcon = () => {
    switch (category) {
      case "Hackathon Wins":
        return <Trophy className="ach-icon yellow" size={24} />;
      case "Placements":
        return <Zap className="ach-icon purple" size={24} />;
      case "Certifications":
        return <ShieldCheck className="ach-icon cyan" size={24} />;
      default:
        return <Award className="ach-icon blue" size={24} />;
    }
  };

  return (
    <div className="achievement-card glass-card">
      <div className="achievement-header">
        <div className="ach-icon-box">{getIcon()}</div>
        {metric && <span className="ach-metric">{metric}</span>}
      </div>

      <div className="achievement-body">
        <span className="ach-category">{category}</span>
        <h3 className="ach-title">{title}</h3>
        <p className="ach-winner">Accomplished by: {winner}</p>
        <p className="ach-desc">{description}</p>
      </div>

      <div className="achievement-footer">
        <span className="ach-date">{date}</span>
      </div>
    </div>
  );
}
