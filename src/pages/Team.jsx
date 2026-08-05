import { Terminal } from "lucide-react";
import { members } from "../data/members";
import MemberCard from "../components/Team/MemberCard";
import SlideAnimation from "../animations/SlideAnimation";
import "./Team.css";

export default function Team() {
  // Sort members into respective groups
  const faculty = members.filter(m => m.team === "Faculty");
  const core = members.filter(m => m.team === "President" || m.team === "Vice President");
  const techLeads = members.filter(m => m.team === "Technical Leads");
  const design = members.filter(m => m.team === "Design Team");
  const management = members.filter(m => m.team === "Management Team");
  const developers = members.filter(m => m.team === "Developers");

  return (
    <div className="team-page section-padding">
      <div className="container">
        {/* Title Header */}
        <div className="section-header">
          <div className="sub-title">
            <Terminal size={14} className="title-icon" />
            <span>THE ORG CHART</span>
          </div>
          <h2>Meet the <span className="text-gradient">ByteCraft Team</span></h2>
          <p>The students driving technical learning, event hosting, and project building on campus.</p>
        </div>

        {/* Faculty Advisors */}
        <div className="team-group-section">
          <h2 className="team-group-title">Faculty Advisors</h2>
          <div className="members-grid compact-grid">
            {faculty.map(member => (
              <SlideAnimation key={member.id} className="grid-item">
                <MemberCard member={member} />
              </SlideAnimation>
            ))}
          </div>
        </div>

        {/* Core Leadership */}
        <div className="team-group-section section-margin">
          <h2 className="team-group-title">Club Leadership</h2>
          <div className="members-grid center-grid">
            {core.map(member => (
              <SlideAnimation key={member.id} className="grid-item">
                <MemberCard member={member} />
              </SlideAnimation>
            ))}
          </div>
        </div>

        {/* Technical Leads */}
        <div className="team-group-section section-margin">
          <h2 className="team-group-title">Technical Domain Leads</h2>
          <div className="members-grid">
            {techLeads.map(member => (
              <SlideAnimation key={member.id} className="grid-item">
                <MemberCard member={member} />
              </SlideAnimation>
            ))}
          </div>
        </div>

        {/* Design Team */}
        <div className="team-group-section section-margin">
          <h2 className="team-group-title">Creative & UI/UX Design</h2>
          <div className="members-grid">
            {design.map(member => (
              <SlideAnimation key={member.id} className="grid-item">
                <MemberCard member={member} />
              </SlideAnimation>
            ))}
          </div>
        </div>

        {/* Management Team */}
        <div className="team-group-section section-margin">
          <h2 className="team-group-title">Operations & Management</h2>
          <div className="members-grid">
            {management.map(member => (
              <SlideAnimation key={member.id} className="grid-item">
                <MemberCard member={member} />
              </SlideAnimation>
            ))}
          </div>
        </div>

        {/* Developers */}
        <div className="team-group-section section-margin">
          <h2 className="team-group-title">Core Developers & Interns</h2>
          <div className="members-grid">
            {developers.map(member => (
              <SlideAnimation key={member.id} className="grid-item">
                <MemberCard member={member} />
              </SlideAnimation>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
