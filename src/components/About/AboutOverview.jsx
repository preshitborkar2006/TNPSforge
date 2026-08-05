import { Link } from "react-router-dom";
import { Terminal, ShieldAlert, Zap, Globe } from "lucide-react";
import "./AboutOverview.css";

export default function AboutOverview() {
  const cards = [
    {
      icon: <Zap size={24} className="icon purple" />,
      title: "Innovate",
      desc: "Build solutions for national hackathons, explore AI modeling, and construct cross-platform apps."
    },
    {
      icon: <Globe size={24} className="icon cyan" />,
      title: "Collaborate",
      desc: "Work with open source projects, participate in peer pair programming, and secure tech referrers."
    },
    {
      icon: <ShieldAlert size={24} className="icon blue" />,
      title: "Succeed",
      desc: "Prepare for placement seasons, compete in algorithms, and collect global certifications."
    }
  ];

  return (
    <section className="about-overview section-padding">
      <div className="container grid-container">
        <div className="about-overview-text">
          <div className="sub-title">
            <Terminal size={14} className="title-icon" />
            <span>WHO WE ARE</span>
          </div>
          <h2>We are compiling the <span className="text-gradient">next generation</span> of tech innovators</h2>
          <p>
            TNPS Forge is a community where students from all departments gather to share ideas, construct products, and grow as engineers.
          </p>
          <p className="highlight-text">
            From local programming bootcamps to national hackathon finals, our members continuously push boundaries.
          </p>
          <div className="about-actions">
            <Link to="/about" className="btn btn-secondary">Read Club History</Link>
          </div>
        </div>

        <div className="about-overview-cards">
          {cards.map((card, i) => (
            <div key={i} className="overview-card glass-card">
              <div className="icon-box">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
