import { useState, useEffect } from "react";
import { Users, Calendar, FolderGit, Trophy } from "lucide-react";
import "./Stats.css";

export default function Stats() {
  const statList = [
    {
      id: 1,
      icon: <Users size={28} className="stat-icon purple" />,
      target: 50,
      suffix: "+",
      label: "Active Members"
    },
    {
      id: 2,
      icon: <Calendar size={28} className="stat-icon cyan" />,
      target: 5,
      suffix: "+",
      label: "Events Conducted"
    },
    {
      id: 3,
      icon: <FolderGit size={28} className="stat-icon blue" />,
      target: 10,
      suffix: "+",
      label: "Open Source Projects"
    },
    {
      id: 4,
      icon: <Trophy size={28} className="stat-icon yellow" />,
      target: 8,
      suffix: " LPA+",
      label: "Highest Placement"
    }
  ];

  return (
    <div className="stats-section">
      <div className="container stats-grid">
        {statList.map(stat => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>
    </div>
  );
}

function StatCard({ icon, target, suffix, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = Math.ceil(target / (duration / 16));
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="stat-card glass-card">
      <div className="stat-icon-wrapper">
        {icon}
      </div>
      <div className="stat-value">
        {count}
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
