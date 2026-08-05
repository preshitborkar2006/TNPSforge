import { useState } from "react";
import { Terminal, Users, Calendar, BookOpen, Layers, BarChart3, Plus, Trash2, Mail, CheckCircle } from "lucide-react";
import { events as defaultEvents } from "../data/events";
import { blogs as defaultBlogs } from "../data/blogs";
import { members as defaultMembers } from "../data/members";
import { projects as defaultProjects } from "../data/projects";
import SlideAnimation from "../animations/SlideAnimation";
import "./Admin.css";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");

  // State loaded from localStorage or defaults
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

  // Add Handlers
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.date) return;
    const newEvent = {
      ...eventForm,
      id: Date.now(),
      status: "upcoming",
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
      tech: projectForm.tech.split(",").map(t => t.trim()),
      team: projectForm.team.split(",").map(t => t.trim()),
      github: "#",
      live: "#",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80"
    };
    saveAndSetProjects([newProj, ...projects]);
    setProjectForm({ title: "", category: "Web Development", description: "", tech: "", team: "" });
  };

  // Delete Handlers
  const handleDeleteEvent = (id) => saveAndSetEvents(events.filter(e => e.id !== id));
  const handleDeleteBlog = (id) => saveAndSetBlogs(blogs.filter(b => b.id !== id));
  const handleDeleteMember = (id) => saveAndSetMembers(members.filter(m => m.id !== id));
  const handleDeleteProject = (id) => saveAndSetProjects(projects.filter(p => p.id !== id));

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
            <button className={`admin-tab ${activeTab === "registrations" ? "active" : ""}`} onClick={() => setActiveTab("registrations")}>
              <CheckCircle size={18} /> Registrations ({registrations.length})
            </button>
            <button className={`admin-tab ${activeTab === "messages" ? "active" : ""}`} onClick={() => setActiveTab("messages")}>
              <Mail size={18} /> Messages ({messages.length})
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
                  <h3>Write New Blog Post</h3>
                  <form onSubmit={handleAddBlog} className="admin-inline-form">
                    <div className="form-group">
                      <label className="form-label">Post Title</label>
                      <input type="text" className="form-input" placeholder="Understanding REST" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} required />
                    </div>
                    <div className="form-row-double">
                      <div className="form-group">
                        <label className="form-label">Author Name</label>
                        <input type="text" className="form-input" placeholder="Jane Doe" value={blogForm.author} onChange={e => setBlogForm({...blogForm, author: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Date</label>
                        <input type="date" className="form-input" value={blogForm.date} onChange={e => setBlogForm({...blogForm, date: e.target.value})} required />
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
                      <label className="form-label">Excerpt Summary</label>
                      <input type="text" className="form-input" placeholder="Short description" value={blogForm.excerpt} onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Content Body</label>
                      <textarea className="form-input" rows="4" placeholder="Full blog text..." value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary"><Plus size={16} /> Compile Post</button>
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
                  <h3>Add Mock Club Member</h3>
                  <form onSubmit={handleAddMember} className="admin-inline-form">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-input" placeholder="Joe Smith" value={memberForm.name} onChange={e => setMemberForm({...memberForm, name: e.target.value})} required />
                    </div>
                    <div className="form-row-double">
                      <div className="form-group">
                        <label className="form-label">Role Title</label>
                        <input type="text" className="form-input" placeholder="e.g. Lead Developer" value={memberForm.role} onChange={e => setMemberForm({...memberForm, role: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Department</label>
                        <input type="text" className="form-input" placeholder="Computer Science" value={memberForm.department} onChange={e => setMemberForm({...memberForm, department: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Designated Group</label>
                      <select className="form-input select-input" value={memberForm.team} onChange={e => setMemberForm({...memberForm, team: e.target.value})}>
                        <option value="Technical Leads">Technical Leads</option>
                        <option value="Design Team">Design Team</option>
                        <option value="Management Team">Management Team</option>
                        <option value="Developers">Developers</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary"><Plus size={16} /> Add Member</button>
                  </form>
                </div>

                <div className="admin-list-card glass-card">
                  <h3>Current Team Members ({members.length})</h3>
                  <div className="admin-list-container">
                    {members.map(m => (
                      <div key={m.id} className="admin-list-item">
                        <div>
                          <h4>{m.name}</h4>
                          <span>{m.role} ({m.team})</span>
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
                  <h3>Add Mock Project</h3>
                  <form onSubmit={handleAddProject} className="admin-inline-form">
                    <div className="form-group">
                      <label className="form-label">Project Title</label>
                      <input type="text" className="form-input" placeholder="EcoScan App" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} required />
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
                      <label className="form-label">Technologies (comma separated)</label>
                      <input type="text" className="form-input" placeholder="React, PyTorch" value={projectForm.tech} onChange={e => setProjectForm({...projectForm, tech: e.target.value})} />
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
