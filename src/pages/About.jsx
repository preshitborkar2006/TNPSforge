import { Terminal, Target, Compass, Award, ShieldAlert } from "lucide-react";
import SlideAnimation from "../animations/SlideAnimation";
import "./About.css";

export default function About() {
  const objectives = [
    "Foster a vibrant developer ecosystem within the student community.",
    "Support open-source development and pair programming.",
    "Equip students with skills for national hackathons and coding rounds.",
    "Enable students to earn global cloud, mobile, and web certifications.",
    "Create professional mentor networks linking current juniors to alumni."
  ];

  return (
    <div className="about-page section-padding">
      <div className="container">
        {/* Title Header */}
        <div className="section-header">
          <div className="sub-title">
            <Terminal size={14} className="title-icon" />
            <span>LEARN ABOUT US</span>
          </div>
          <h2>TNPS Forge's <span className="text-gradient">Core Vision</span></h2>
          <p>Compiling software futures, solving real-world problems, and structuring elite student developers.</p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="vision-grid">
          <SlideAnimation className="vision-card glass-card">
            <div className="card-top">
              <div className="card-icon-box purple">
                <Target size={24} />
              </div>
              <h3>Our Vision</h3>
            </div>
            <p>
              To establish an elite student-run dev guild recognized nationally for engineering craftsmanship, fostering research in artificial intelligence, cloud infrastructure, Android applications, and cyber defense systems.
            </p>
          </SlideAnimation>

          <SlideAnimation className="vision-card glass-card" delay={0.2}>
            <div className="card-top">
              <div className="card-icon-box cyan">
                <Compass size={24} />
              </div>
              <h3>Our Mission</h3>
            </div>
            <p>
              To guide student developers of Apex Institute of Technology through practical workspaces, workshops, ethical hacking events, and algorithmic grind cycles, preparing them to build high-end startups and secure SDE positions at top product firms.
            </p>
          </SlideAnimation>
        </div>

        {/* History Block */}
        <div className="history-block section-padding">
          <div className="history-grid">
            <div className="history-text">
              <div className="sub-title">
                <Award size={14} className="title-icon" />
                <span>OUR HISTORY</span>
              </div>
              <h2>Founded with a <span className="text-gradient">simple command</span></h2>
              <p>
                In mid-2023, five CS students realized the campus needed a dedicated sandbox to build real applications. They set up TNPS Forge, organizing evening coding drills in Lab 4.
              </p>
              <p>
                Within one year, the club expanded to 100+ active members, hosting AIT's first midnight hackathon. By 2025, TNPS Forge secured 1st prize in the Smart India Hackathon, establishing its repute as the premier coding hub in the region.
              </p>
            </div>
            <div className="history-visual glass-card">
              <h3>$ cat history.log</h3>
              <div className="log-console">
                <p><span className="log-time">[2023-08-01]</span> Club established with 5 founders.</p>
                <p><span className="log-time">[2024-03-12]</span> First bootcamp: Git & GitHub basics.</p>
                <p><span className="log-time">[2024-10-15]</span> Host of ByteSlash 2024 (120 participants).</p>
                <p><span className="log-time">[2025-12-15]</span> Smart India Hackathon: Grand Prize trophy.</p>
                <p><span className="log-time">[2026-07-29]</span> TNPS Forge Portal 2.0 deployed to production.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Faculty Coordinator Showcase */}
        <div className="faculty-block section-padding">
          <div className="section-header">
            <div className="sub-title">
              <ShieldAlert size={14} className="title-icon" />
              <span>FACULTY MENTOR</span>
            </div>
            <h2>Club <span className="text-gradient">Coordinators</span></h2>
            <p>Guided by engineering professors and industry mentors.</p>
          </div>

          <div className="faculty-card glass-card">
            <div className="faculty-img-box">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" alt="Dr. Rajesh Verma" />
            </div>
            <div className="faculty-details">
              <h3>Dr. Rajesh Verma</h3>
              <p className="faculty-role">Head of CSE Department & Faculty Coordinator</p>
              <p className="faculty-bio">
                Dr. Rajesh Verma has over 18 years of research experience in artificial neural networks and cloud database optimization. Under his leadership, TNPS Forge became the fastest-growing technical group at Apex, securing multiple government innovation grants.
              </p>
              <div className="faculty-meta">
                <span>Email: rajesh.verma@apex.edu</span>
                <span>Office: Block 4, Room 402</span>
              </div>
            </div>
          </div>
        </div>

        {/* Club Objectives */}
        <div className="objectives-block section-padding">
          <div className="section-header">
            <div className="sub-title">
              <Target size={14} className="title-icon" />
              <span>THE TARGETS</span>
            </div>
            <h2>Our <span className="text-gradient">Objectives</span></h2>
            <p>Our core operational targets for every club session.</p>
          </div>

          <div className="objectives-list">
            {objectives.map((obj, i) => (
              <div key={i} className="objective-item glass-card">
                <span className="obj-number">0{i + 1}</span>
                <p>{obj}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
