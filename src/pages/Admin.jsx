import { useState } from "react";
import { 
  Terminal, 
  Users, 
  Calendar, 
  BookOpen, 
  Layers, 
  BarChart3, 
  Plus, 
  Trash2, 
  Mail, 
  CheckCircle,
  Image as ImageIcon,
  Award,
  LogOut,
  ShieldAlert
} from "lucide-react";
import { events as defaultEvents } from "../data/events";
import { blogs as defaultBlogs } from "../data/blogs";
import { members as defaultMembers } from "../data/members";
import { projects as defaultProjects } from "../data/projects";
import { gallery as defaultGallery } from "../data/gallery";
import { achievements as defaultAchievements } from "../data/achievements";
import SlideAnimation from "../animations/SlideAnimation";
import "./Admin.css";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");

  // Admin authentication state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("bytecraft_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState("");

  // Simulated datasets loaded from localStorage or defaults
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("admin_events");
    return saved ? JSON.parse(saved) : defaultEvents;
  });
  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem("admin_blogs");
    return saved ? JSON.parse(saved) : defaultBlogs;
  });
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem("admin_members");
    return saved ? JSON.parse(saved) : defaultMembers;
  });
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("admin_projects");
    return saved ? JSON.parse(saved) : defaultProjects;
  });
  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem("admin_gallery");
    return saved ? JSON.parse(saved) : defaultGallery;
  });
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem("admin_achievements");
    return saved ? JSON.parse(saved) : defaultAchievements;
  });

  const [registrations, setRegistrations] = useState(() => {
    return JSON.parse(localStorage.getItem("bytecraft_registrations") || "[]");
  });
  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem("bytecraft_messages") || "[]");
  });

  // Form states for adding items
  const [eventForm, setEventForm] = useState({ title: "", category: "Web Development", date: "", venue: "", description: "" });
  const [blogForm, setBlogForm] = useState({ title: "", category: "Web Development", author: "", date: "", excerpt: "", content: "" });
  const [memberForm, setMemberForm] = useState({ name: "", role: "", team: "Developers", department: "" });
  const [projectForm, setProjectForm] = useState({ title: "", category: "Web Development", description: "", tech: "", team: "" });
  const [galleryForm, setGalleryForm] = useState({ title: "", category: "Hackathons", date: "", image: "" });
  const [achievementForm, setAchievementForm] = useState({ title: "", category: "Hackathon Wins", winner: "", date: "", description: "", metric: "" });

  // LocalStorage synchronizers
  const saveAndSetEvents = (newEvents) => {
    setEvents(newEvents);
    localStorage.setItem("admin_events", JSON.stringify(newEvents));
  };
  const saveAndSetBlogs = (newBlogs) => {
    setBlogs(newBlogs);
    localStorage.setItem("admin_blogs", JSON.stringify(newBlogs));
  };
  const saveAndSetMembers = (newMembers) => {
    setMembers(newMembers);
    localStorage.setItem("admin_members", JSON.stringify(newMembers));
  };
  const saveAndSetProjects = (newProjects) => {
    setProjects(newProjects);
    localStorage.setItem("admin_projects", JSON.stringify(newProjects));
  };
  const saveAndSetGallery = (newGallery) => {
    setGallery(newGallery);
    localStorage.setItem("admin_gallery", JSON.stringify(newGallery));
  };
  const saveAndSetAchievements = (newAchievements) => {
    setAchievements(newAchievements);
    localStorage.setItem("admin_achievements", JSON.stringify(newAchievements));
  };

  // Add Item Handlers
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.date) return;
    const newEvent = {
      ...eventForm,
      id: Date.now(),
      status: new Date(eventForm.date) >= new Date() ? "upcoming" : "past",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
    };
    saveAndSetEvents([newEvent, ...events]);
    setEventForm({ title: "", category: "Web Development", date: "", venue: "", description: "" });
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.author) return;
    const newBlog = {
      ...blogForm,
      id: Date.now(),
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80"
    };
    saveAndSetBlogs([newBlog, ...blogs]);
    setBlogForm({ title: "", category: "Web Development", author: "", date: "", excerpt: "", content: "" });
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!memberForm.name || !memberForm.role) return;
    const newMember = {
      ...memberForm,
      id: Date.now(),
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
      socials: { email: `${memberForm.name.toLowerCase().replace(" ", ".")}@apex.edu`, linkedin: "#", github: "#" }
    };
    saveAndSetMembers([newMember, ...members]);
    setMemberForm({ name: "", role: "", team: "Developers", department: "" });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) return;
    const newProj = {
      ...projectForm,
      id: Date.now(),
      tech: projectForm.tech.split(",").map(t => t.trim()).filter(Boolean),
      team: projectForm.team.split(",").map(t => t.trim()).filter(Boolean),
      github: "#",
      live: "#",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80"
    };
    saveAndSetProjects([newProj, ...projects]);
    setProjectForm({ title: "", category: "Web Development", description: "", tech: "", team: "" });
  };

  const handleAddGallery = (e) => {
    e.preventDefault();
    if (!galleryForm.title) return;
    const newGal = {
      ...galleryForm,
      id: Date.now(),
      image: galleryForm.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
    };
    saveAndSetGallery([newGal, ...gallery]);
    setGalleryForm({ title: "", category: "Hackathons", date: "", image: "" });
  };

  const handleAddAchievement = (e) => {
    e.preventDefault();
    if (!achievementForm.title || !achievementForm.winner) return;
    const newAch = {
      ...achievementForm,
      id: Date.now()
    };
    saveAndSetAchievements([newAch, ...achievements]);
    setAchievementForm({ title: "", category: "Hackathon Wins", winner: "", date: "", description: "", metric: "" });
  };

  // Delete Item Handlers
  const handleDeleteEvent = (id) => saveAndSetEvents(events.filter(e => e.id !== id));
  const handleDeleteBlog = (id) => saveAndSetBlogs(blogs.filter(b => b.id !== id));
  const handleDeleteMember = (id) => saveAndSetMembers(members.filter(m => m.id !== id));
  const handleDeleteProject = (id) => saveAndSetProjects(projects.filter(p => p.id !== id));
  const handleDeleteGallery = (id) => saveAndSetGallery(gallery.filter(g => g.id !== id));
  const handleDeleteAchievement = (id) => saveAndSetAchievements(achievements.filter(a => a.id !== id));

  // Authentication Logic
  const handleAuthLogin = (e) => {
    e.preventDefault();
    // Set admin user in local storage if email includes "admin"
    if (authForm.email.toLowerCase().includes("admin")) {
      const loggedUser = { email: authForm.email, isAdmin: true };
      localStorage.setItem("bytecraft_user", JSON.stringify(loggedUser));
      setUser(loggedUser);
      setAuthError("");
    } else {
      setAuthError("Invalid credentials. Root Access requires administrator permissions.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("bytecraft_user");
    setUser(null);
  };

  // Secure Lockscreen render
  if (!user || !user.isAdmin) {
    return (
      <div className="admin-page section-padding">
        <div className="container admin-container" style={{ maxWidth: "460px", margin: "0 auto" }}>
          <SlideAnimation className="admin-lockscreen glass-card">
            <div className="lockscreen-header">
              <ShieldAlert size={42} className="lock-icon" />
              <h2>Root Secure Gate</h2>
              <p>TNPS Forge administrative access is encrypted.</p>
            </div>
            
            {authError && <div className="auth-error-banner">{authError}</div>}
            
            <form onSubmit={handleAuthLogin} className="lockscreen-form">
              <div className="form-group">
                <label className="form-label">Authorized Email Address</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="admin@apex.edu" 
                  value={authForm.email} 
                  onChange={e => setAuthForm({ ...authForm, email: e.target.value })} 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Terminal Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••" 
                  value={authForm.password} 
                  onChange={e => setAuthForm({ ...authForm, password: e.target.value })} 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block" style={{ width: "100%", marginTop: "10px" }}>
                Authenticate Session
              </button>
            </form>
          </SlideAnimation>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page section-padding">
      <div className="container admin-container">
        {/* Title Header */}
        <div className="section-header text-left">
          <div className="sub-title">
            <Terminal size={14} className="title-icon" />
            <span>ROOT CONSOLE</span>
          </div>
          <h2>Admin <span className="text-gradient">Console Dashboard</span></h2>
          <p>Configure events, blogs, review registrations, and verify system metrics.</p>
        </div>

        <div className="admin-grid-layout">
          {/* Sidebar */}
          <div className="admin-sidebar glass-card">
            <button className={`admin-tab ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
              <BarChart3 size={18} /> Overview
            </button>
            <button className={`admin-tab ${activeTab === "events" ? "active" : ""}`} onClick={() => setActiveTab("events")}>
              <Calendar size={18} /> Manage Events
            </button>
            <button className={`admin-tab ${activeTab === "blogs" ? "active" : ""}`} onClick={() => setActiveTab("blogs")}>
              <BookOpen size={18} /> Manage Blogs
            </button>
            <button className={`admin-tab ${activeTab === "members" ? "active" : ""}`} onClick={() => setActiveTab("members")}>
              <Users size={18} /> Manage Members
            </button>
            <button className={`admin-tab ${activeTab === "projects" ? "active" : ""}`} onClick={() => setActiveTab("projects")}>
              <Layers size={18} /> Manage Projects
            </button>
            <button className={`admin-tab ${activeTab === "gallery" ? "active" : ""}`} onClick={() => setActiveTab("gallery")}>
              <ImageIcon size={18} /> Manage Gallery
            </button>
            <button className={`admin-tab ${activeTab === "achievements" ? "active" : ""}`} onClick={() => setActiveTab("achievements")}>
              <Award size={18} /> Achievements
            </button>
            <button className={`admin-tab ${activeTab === "registrations" ? "active" : ""}`} onClick={() => setActiveTab("registrations")}>
              <CheckCircle size={18} /> Registrations ({registrations.length})
            </button>
            <button className={`admin-tab ${activeTab === "messages" ? "active" : ""}`} onClick={() => setActiveTab("messages")}>
              <Mail size={18} /> Messages ({messages.length})
            </button>
            
            <button className="admin-tab logout-tab" onClick={handleLogout}>
              <LogOut size={18} /> Log Out Console
            </button>
          </div>

          {/* Content Pane */}
          <div className="admin-content-pane">
            
            {/* Tab: Overview */}
            {activeTab === "overview" && (
              <SlideAnimation className="overview-tab-pane">
                <div className="admin-stats-summary-grid">
                  <div className="stat-pill glass-card">
                    <h4>Events Compiled</h4>
                    <p>{events.length}</p>
                  </div>
                  <div className="stat-pill glass-card">
                    <h4>Tech Blogs</h4>
                    <p>{blogs.length}</p>
                  </div>
                  <div className="stat-pill glass-card">
                    <h4>Team Members</h4>
                    <p>{members.length}</p>
                  </div>
                  <div className="stat-pill glass-card">
                    <h4>Submissions</h4>
                    <p>{registrations.length}</p>
                  </div>
                </div>

                <div className="chart-preview-section glass-card">
                  <h3>Simulated Growth metrics (Activity Log)</h3>
                  <div className="mock-chart">
                    <div className="chart-bar-container">
                      <div className="chart-bar purple" style={{ height: "45%" }}></div>
                      <span>Feb</span>
                    </div>
                    <div className="chart-bar-container">
                      <div className="chart-bar blue" style={{ height: "65%" }}></div>
                      <span>Mar</span>
                    </div>
                    <div className="chart-bar-container">
                      <div className="chart-bar cyan" style={{ height: "80%" }}></div>
                      <span>Apr</span>
                    </div>
                    <div className="chart-bar-container">
                      <div className="chart-bar purple" style={{ height: "95%" }}></div>
                      <span>May</span>
                    </div>
                  </div>
                </div>
              </SlideAnimation>
            )}

            {/* Tab: Manage Events */}
            {activeTab === "events" && (
              <SlideAnimation className="tab-pane-flow">
                <div className="form-block-wrapper glass-card">
                  <h3>Add Mock Event</h3>
                  <form onSubmit={handleAddEvent} className="admin-inline-form">
                    <div className="form-group">
                      <label className="form-label">Event Title</label>
                      <input type="text" className="form-input" placeholder="e.g. Kotlin Boot" value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select className="form-input select-input" value={eventForm.category} onChange={e => setEventForm({...eventForm, category: e.target.value})}>
                        <option value="Web Development">Web Development</option>
                        <option value="AI">AI</option>
                        <option value="Android">Android</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="Competitive Programming">Competitive Programming</option>
                      </select>
                    </div>
                    <div className="form-row-double">
                      <div className="form-group">
                        <label className="form-label">Date</label>
                        <input type="date" className="form-input" value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Venue</label>
                        <input type="text" className="form-input" placeholder="Lab 4" value={eventForm.venue} onChange={e => setEventForm({...eventForm, venue: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <textarea className="form-input" rows="3" placeholder="Brief outline" value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary"><Plus size={16} /> Compile Event</button>
                  </form>
                </div>

                <div className="admin-list-card glass-card">
                  <h3>Current System Events ({events.length})</h3>
                  <div className="admin-list-container">
                    {events.map(e => (
                      <div key={e.id} className="admin-list-item">
                        <div>
                          <h4>{e.title}</h4>
                          <span>{e.category} • {e.date}</span>
                        </div>
                        <button className="delete-row-btn" onClick={() => handleDeleteEvent(e.id)}><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideAnimation>
            )}

            {/* Tab: Manage Blogs */}
            {activeTab === "blogs" && (
              <SlideAnimation className="tab-pane-flow">
                <div className="form-block-wrapper glass-card">
                  <h3>Add Mock Tech Blog</h3>
                  <form onSubmit={handleAddBlog} className="admin-inline-form">
                    <div className="form-group">
                      <label className="form-label">Blog Title</label>
                      <input type="text" className="form-input" placeholder="e.g. Mastering React" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} required />
                    </div>
                    <div className="form-row-double">
                      <div className="form-group">
                        <label className="form-label">Author Name</label>
                        <input type="text" className="form-input" placeholder="Aryan Sen" value={blogForm.author} onChange={e => setBlogForm({...blogForm, author: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Publish Date</label>
                        <input type="text" className="form-input" placeholder="e.g. Jul 28, 2026" value={blogForm.date} onChange={e => setBlogForm({...blogForm, date: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select className="form-input select-input" value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})}>
                        <option value="Web Development">Web Development</option>
                        <option value="AI">AI</option>
                        <option value="Android">Android</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="Competitive Programming">Competitive Programming</option>
                        <option value="Club News">Club News</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Excerpt Description</label>
                      <input type="text" className="form-input" placeholder="Short preview text" value={blogForm.excerpt} onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Content Body</label>
                      <textarea className="form-input" rows="4" placeholder="Blog Markdown/Text" value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary"><Plus size={16} /> Compile Blog</button>
                  </form>
                </div>

                <div className="admin-list-card glass-card">
                  <h3>Current System Blogs ({blogs.length})</h3>
                  <div className="admin-list-container">
                    {blogs.map(b => (
                      <div key={b.id} className="admin-list-item">
                        <div>
                          <h4>{b.title}</h4>
                          <span>By {b.author} • {b.category}</span>
                        </div>
                        <button className="delete-row-btn" onClick={() => handleDeleteBlog(b.id)}><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideAnimation>
            )}

            {/* Tab: Manage Members */}
            {activeTab === "members" && (
              <SlideAnimation className="tab-pane-flow">
                <div className="form-block-wrapper glass-card">
                  <h3>Add Club Representative</h3>
                  <form onSubmit={handleAddMember} className="admin-inline-form">
                    <div className="form-group">
                      <label className="form-label">FullName</label>
                      <input type="text" className="form-input" placeholder="e.g. Priya Sharma" value={memberForm.name} onChange={e => setMemberForm({...memberForm, name: e.target.value})} required />
                    </div>
                    <div className="form-row-double">
                      <div className="form-group">
                        <label className="form-label">Representative Role</label>
                        <input type="text" className="form-input" placeholder="e.g. Technical Lead" value={memberForm.role} onChange={e => setMemberForm({...memberForm, role: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Department / Branch</label>
                        <input type="text" className="form-input" placeholder="CSE" value={memberForm.department} onChange={e => setMemberForm({...memberForm, department: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Guild Allocation (Team)</label>
                      <select className="form-input select-input" value={memberForm.team} onChange={e => setMemberForm({...memberForm, team: e.target.value})}>
                        <option value="Faculty">Faculty</option>
                        <option value="President">President</option>
                        <option value="Vice President">Vice President</option>
                        <option value="Technical Leads">Technical Leads</option>
                        <option value="Design Team">Design Team</option>
                        <option value="Management Team">Management Team</option>
                        <option value="Developers">Developers</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary"><Plus size={16} /> Link Representative</button>
                  </form>
                </div>

                <div className="admin-list-card glass-card">
                  <h3>Active Representative Directory ({members.length})</h3>
                  <div className="admin-list-container">
                    {members.map(m => (
                      <div key={m.id} className="admin-list-item">
                        <div>
                          <h4>{m.name}</h4>
                          <span>{m.role} • {m.team}</span>
                        </div>
                        <button className="delete-row-btn" onClick={() => handleDeleteMember(m.id)}><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideAnimation>
            )}

            {/* Tab: Manage Projects */}
            {activeTab === "projects" && (
              <SlideAnimation className="tab-pane-flow">
                <div className="form-block-wrapper glass-card">
                  <h3>Compile Team Project</h3>
                  <form onSubmit={handleAddProject} className="admin-inline-form">
                    <div className="form-group">
                      <label className="form-label">Project Title</label>
                      <input type="text" className="form-input" placeholder="e.g. Smart Campus Map" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select className="form-input select-input" value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value})}>
                        <option value="Web Development">Web Development</option>
                        <option value="AI">AI</option>
                        <option value="Android">Android</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="Competitive Programming">Competitive Programming</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Tech Stack (comma separated)</label>
                      <input type="text" className="form-input" placeholder="React, Node.js, Express" value={projectForm.tech} onChange={e => setProjectForm({...projectForm, tech: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Team Members (comma separated)</label>
                      <input type="text" className="form-input" placeholder="Rohan J, Simran K" value={projectForm.team} onChange={e => setProjectForm({...projectForm, team: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <textarea className="form-input" rows="3" placeholder="Brief repo summary" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary"><Plus size={16} /> Compile Project</button>
                  </form>
                </div>

                <div className="admin-list-card glass-card">
                  <h3>Current Projects ({projects.length})</h3>
                  <div className="admin-list-container">
                    {projects.map(p => (
                      <div key={p.id} className="admin-list-item">
                        <div>
                          <h4>{p.title}</h4>
                          <span>{p.category} • Team: {p.team.join(", ")}</span>
                        </div>
                        <button className="delete-row-btn" onClick={() => handleDeleteProject(p.id)}><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideAnimation>
            )}

            {/* Tab: Manage Gallery */}
            {activeTab === "gallery" && (
              <SlideAnimation className="tab-pane-flow">
                <div className="form-block-wrapper glass-card">
                  <h3>Add Gallery Record</h3>
                  <form onSubmit={handleAddGallery} className="admin-inline-form">
                    <div className="form-group">
                      <label className="form-label">Image Event Title</label>
                      <input type="text" className="form-input" placeholder="e.g. Hackathon Final Showcase" value={galleryForm.title} onChange={e => setGalleryForm({...galleryForm, title: e.target.value})} required />
                    </div>
                    <div className="form-row-double">
                      <div className="form-group">
                        <label className="form-label">Category</label>
                        <select className="form-input select-input" value={galleryForm.category} onChange={e => setGalleryForm({...galleryForm, category: e.target.value})}>
                          <option value="Hackathons">Hackathons</option>
                          <option value="Workshops">Workshops</option>
                          <option value="Meetups">Meetups</option>
                          <option value="Celebrations">Celebrations</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Date</label>
                        <input type="text" className="form-input" placeholder="e.g. Jul 20, 2026" value={galleryForm.date} onChange={e => setGalleryForm({...galleryForm, date: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Image URL</label>
                      <input type="text" className="form-input" placeholder="https://images.unsplash.com/..." value={galleryForm.image} onChange={e => setGalleryForm({...galleryForm, image: e.target.value})} />
                    </div>
                    <button type="submit" className="btn btn-primary"><Plus size={16} /> Publish to Gallery</button>
                  </form>
                </div>

                <div className="admin-list-card glass-card">
                  <h3>Gallery Repository ({gallery.length})</h3>
                  <div className="admin-list-container">
                    {gallery.map(g => (
                      <div key={g.id} className="admin-list-item">
                        <div className="admin-list-item-meta">
                          <img src={g.image} alt={g.title} className="admin-list-thumbnail" />
                          <div>
                            <h4>{g.title}</h4>
                            <span>{g.category} • {g.date}</span>
                          </div>
                        </div>
                        <button className="delete-row-btn" onClick={() => handleDeleteGallery(g.id)}><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideAnimation>
            )}

            {/* Tab: Achievements */}
            {activeTab === "achievements" && (
              <SlideAnimation className="tab-pane-flow">
                <div className="form-block-wrapper glass-card">
                  <h3>Log Record/Award Achievement</h3>
                  <form onSubmit={handleAddAchievement} className="admin-inline-form">
                    <div className="form-group">
                      <label className="form-label">Award Title</label>
                      <input type="text" className="form-input" placeholder="e.g. 1st Place - Smart India Hackathon" value={achievementForm.title} onChange={e => setAchievementForm({...achievementForm, title: e.target.value})} required />
                    </div>
                    <div className="form-row-double">
                      <div className="form-group">
                        <label className="form-label">Winner Name</label>
                        <input type="text" className="form-input" placeholder="Team Titan / Student Name" value={achievementForm.winner} onChange={e => setAchievementForm({...achievementForm, winner: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Event Date</label>
                        <input type="text" className="form-input" placeholder="e.g. Aug 2026" value={achievementForm.date} onChange={e => setAchievementForm({...achievementForm, date: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-row-double">
                      <div className="form-group">
                        <label className="form-label">Category</label>
                        <select className="form-input select-input" value={achievementForm.category} onChange={e => setAchievementForm({...achievementForm, category: e.target.value})}>
                          <option value="Hackathon Wins">Hackathon Wins</option>
                          <option value="Certifications">Certifications</option>
                          <option value="Leaderboards">Leaderboards</option>
                          <option value="Hall of Fame">Hall of Fame</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Metric / High Record Score</label>
                        <input type="text" className="form-input" placeholder="e.g. Cash Prize ₹1,00,000" value={achievementForm.metric} onChange={e => setAchievementForm({...achievementForm, metric: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Brief Description</label>
                      <textarea className="form-input" rows="2" placeholder="Brief outline" value={achievementForm.description} onChange={e => setAchievementForm({...achievementForm, description: e.target.value})}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary"><Plus size={16} /> Record Achievement</button>
                  </form>
                </div>

                <div className="admin-list-card glass-card">
                  <h3>Achievements Log ({achievements.length})</h3>
                  <div className="admin-list-container">
                    {achievements.map(a => (
                      <div key={a.id} className="admin-list-item">
                        <div>
                          <h4>{a.title}</h4>
                          <span>Recipient: {a.winner} • {a.category}</span>
                        </div>
                        <button className="delete-row-btn" onClick={() => handleDeleteAchievement(a.id)}><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideAnimation>
            )}

            {/* Tab: Registrations */}
            {activeTab === "registrations" && (
              <SlideAnimation className="tab-pane-flow text-left">
                <div className="panel-header-row">
                  <h3>Student Applications ({registrations.length})</h3>
                  <button className="btn btn-secondary btn-sm" onClick={() => { localStorage.removeItem("bytecraft_registrations"); setRegistrations([]); }}>Clear All</button>
                </div>
                {registrations.length > 0 ? (
                  <div className="submissions-list">
                    {registrations.map(reg => (
                      <div key={reg.id} className="submission-card glass-card">
                        <div className="sub-card-header">
                          <h4>{reg.name}</h4>
                          <span>Roll: {reg.rollNumber} • {reg.date}</span>
                        </div>
                        <div className="sub-card-body">
                          <p><strong>Dept:</strong> {reg.department} ({reg.year})</p>
                          <p><strong>Contact:</strong> {reg.email} // {reg.phone || "N/A"}</p>
                          <p><strong>Interests:</strong> {reg.interests}</p>
                          <p><strong>Skills:</strong> {reg.skills || "N/A"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-submissions glass-card">
                    <CheckCircle size={36} />
                    <p>No new student applications in registry.</p>
                  </div>
                )}
              </SlideAnimation>
            )}

            {/* Tab: Messages */}
            {activeTab === "messages" && (
              <SlideAnimation className="tab-pane-flow text-left">
                <div className="panel-header-row">
                  <h3>Direct Tickets ({messages.length})</h3>
                  <button className="btn btn-secondary btn-sm" onClick={() => { localStorage.removeItem("bytecraft_messages"); setMessages([]); }}>Clear All</button>
                </div>
                {messages.length > 0 ? (
                  <div className="submissions-list">
                    {messages.map(msg => (
                      <div key={msg.id} className="submission-card glass-card">
                        <div className="sub-card-header">
                          <h4>{msg.name}</h4>
                          <span>{msg.date}</span>
                        </div>
                        <div className="sub-card-body">
                          <p><strong>Email:</strong> {msg.email}</p>
                          <p><strong>Subject:</strong> {msg.subject || "N/A"}</p>
                          <p className="message-content-text"><strong>Message:</strong> {msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-submissions glass-card">
                    <Mail size={36} />
                    <p>No contact messages in mailbox currently.</p>
                  </div>
                )}
              </SlideAnimation>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
