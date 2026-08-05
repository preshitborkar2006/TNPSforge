import { Link } from "react-router-dom";
import { Terminal, Award, HelpCircle, Code, ArrowRight, Star } from "lucide-react";
import Hero from "../components/Hero/Hero";
import Stats from "../components/Stats/Stats";
import AboutOverview from "../components/About/AboutOverview";
import EventCard from "../components/Events/EventCard";
import ProjectCard from "../components/Projects/ProjectCard";
import { events } from "../data/events";
import { projects } from "../data/projects";
import SlideAnimation from "../animations/SlideAnimation";
import HyperSpeedBackground from "../components/HyperSpeedBackground";
import "./Home.css";

export default function Home() {
  // Get upcoming and featured lists
  const upcomingEvents = events.filter(e => e.status === "upcoming").slice(0, 3);
  const featuredProjects = projects.slice(0, 3);

  const testimonials = [
    {
      name: "Aryan Sen",
      role: "Club President",
      quote: "ByteCraft is not just a club, it's a family. I learned how to build production-level apps and lead teams here.",
      stars: 5
    },
    {
      name: "Zara Khan",
      role: "Design Lead",
      quote: "Collaborating with developers in our bootcamps helped me understand how developers interpret design tokens.",
      stars: 5
    },
    {
      name: "Siddharth Sen",
      role: "Coding Lead",
      quote: "Practicing on ByteCode Arena raised my speed and logic capabilities. It helped me clear Google coding rounds.",
      stars: 5
    }
  ];

  const timelineSteps = [
    { year: "2023", title: "TNPS Foundation", desc: "Started by 5 computer science seniors with a goal to promote open source work." },
    { year: "2024", title: "Milestone: 30+ Members", desc: "Conducted our first campus-wide programming bootcamps and local hackathons." },
    { year: "2025", title: "Smart India Hackathon Winners", desc: "Our core developers secured the grand national trophy in AI agriculture analytics." },
    { year: "2026", title: "AIT Portal & Cloud Launch", desc: "Launched full developer resource vaults and internal automated grading systems." }
  ];

  const sponsors = ["Google", "Microsoft", "GitHub", "Vercel", "OpenAI"];

  return (
    <div className="home-page">
      <HyperSpeedBackground />
      <Hero />
      <Stats />
      
      <SlideAnimation>
        <AboutOverview />
      </SlideAnimation>

      {/* Why Join Section */}
      <section className="why-join section-padding">
        <div className="container">
          <div className="section-header">
            <div className="sub-title">
              <HelpCircle size={14} className="title-icon" />
              <span>THE BENEFITS</span>
            </div>
            <h2>Why Join <span className="text-gradient">TNPS Forge</span>?</h2>
            <p>We provide a modern ecosystem designed to accelerate your engineering growth.</p>
          </div>

          <div className="why-grid">
            <div className="why-card glass-card">
              <h3>Collaborative Projects</h3>
              <p>Team up with backend, mobile, and design leads to build real web applications and launch them to production.</p>
            </div>
            <div className="why-card glass-card">
              <h3>National Tournaments</h3>
              <p>Represent the college in hackathons, capture the flag challenges, and competitive coding events globally.</p>
            </div>
            <div className="why-card glass-card">
              <h3>Placement Referral Pipeline</h3>
              <p>Get direct referrals from alumni working at tech giants like Google, CRED, and Microsoft through mock reviews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="featured-events section-padding">
        <div className="container">
          <div className="section-header">
            <div className="sub-title">
              <Terminal size={14} className="title-icon" />
              <span>LEARN & HACK</span>
            </div>
            <h2>Upcoming <span className="text-gradient">Events</span></h2>
            <p>Secure your slots for our forthcoming hackathons and programming classes.</p>
          </div>

          <div className="cards-grid">
            {upcomingEvents.map(event => (
              <SlideAnimation key={event.id}>
                <EventCard event={event} />
              </SlideAnimation>
            ))}
          </div>

          <div className="view-all-container">
            <Link to="/events" className="btn btn-outline">
              View All Events <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-projects section-padding">
        <div className="container">
          <div className="section-header">
            <div className="sub-title">
              <Code size={14} className="title-icon" />
              <span>OUR WORK</span>
            </div>
            <h2>Featured <span className="text-gradient">Projects</span></h2>
            <p>Inspect code repositories and live implementations crafted entirely by our club developers.</p>
          </div>

          <div className="cards-grid">
            {featuredProjects.map(project => (
              <SlideAnimation key={project.id}>
                <ProjectCard project={project} />
              </SlideAnimation>
            ))}
          </div>

          <div className="view-all-container">
            <Link to="/projects" className="btn btn-outline">
              Explore Repositories <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Club Timeline */}
      <section className="club-timeline section-padding">
        <div className="container">
          <div className="section-header">
            <div className="sub-title">
              <Award size={14} className="title-icon" />
              <span>THE JOURNEY</span>
            </div>
            <h2>TNPS Forge <span className="text-gradient">Timeline</span></h2>
            <p>Our rapid evolution from a simple class meeting to a premier developer academy.</p>
          </div>

          <div className="timeline-trail">
            {timelineSteps.map((step, idx) => (
              <SlideAnimation key={idx} className="timeline-node">
                <div className="timeline-year">{step.year}</div>
                <div className="timeline-content glass-card">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </SlideAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section-padding">
        <div className="container">
          <div className="section-header">
            <div className="sub-title">
              <Star size={14} className="title-icon" />
              <span>COMMUNITY REVIEWS</span>
            </div>
            <h2>Member <span className="text-gradient">Feedback</span></h2>
            <p>Hear what our active members say about their training experiences in ByteCraft.</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card glass-card">
                <div className="stars-row">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" />
                  ))}
                </div>
                <p className="quote">"{t.quote}"</p>
                <div className="reviewer-info">
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="sponsors section-padding">
        <div className="container">
          <p className="sponsors-title">POWERING OUR INITIATIVES</p>
          <div className="sponsors-row">
            {sponsors.map((s, idx) => (
              <span key={idx} className="sponsor-logo">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section-padding">
        <div className="container cta-container glass-card">
          <h2>Ready to write your next chapter?</h2>
          <p>Join TNPS Forge and connect with a group of builders, solvers, and tech enthusiasts.</p>
          <div className="cta-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Apply Now <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-lg">
              Talk to Coordinators
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
