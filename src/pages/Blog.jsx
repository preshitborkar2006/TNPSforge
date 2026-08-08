import { useState } from "react";
import { Terminal, Search, X, Clock, User, Calendar } from "lucide-react";
import { blogs as defaultBlogs } from "../data/blogs";
import BlogCard from "../components/Blog/BlogCard";
import SlideAnimation from "../animations/SlideAnimation";
import "./Blog.css";

export default function Blog() {
  const [blogs] = useState(() => {
    const saved = localStorage.getItem("admin_blogs");
    return saved ? JSON.parse(saved) : defaultBlogs;
  });
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const categories = ["All", "Web Development", "AI", "Android", "Cyber Security", "Competitive Programming", "Club News"];

  // Filter & Search Logic
  const filteredBlogs = blogs.filter(blog => {
    const matchesFilter = filter === "All" || blog.category === filter;
    
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      blog.title.toLowerCase().includes(query) ||
      blog.excerpt.toLowerCase().includes(query) ||
      blog.author.toLowerCase().includes(query) ||
      blog.content.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  return (
    <div className="blog-page section-padding">
      <div className="container">
        {/* Title Header */}
        <div className="section-header">
          <div className="sub-title">
            <Terminal size={14} className="title-icon" />
            <span>DEV ARTICLES</span>
          </div>
          <h2>ByteCraft <span className="text-gradient">Tech Blogs</span></h2>
          <p>Read technology write-ups, analysis logs, and announcements published by our community.</p>
        </div>

        {/* Filter and Search Bar */}
        <div className="blog-control-bar glass-card">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search articles, tags, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
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

        {/* Blog Post Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="blog-grid-layout">
            {filteredBlogs.map(blog => (
              <SlideAnimation key={blog.id}>
                <BlogCard blog={blog} onClick={() => setSelectedBlog(blog)} />
              </SlideAnimation>
            ))}
          </div>
        ) : (
          <div className="empty-blogs glass-card">
            <h3>No Articles Found</h3>
            <p>No write-ups match your query. Try searching for terms like 'React', 'Git', or 'WPA3'.</p>
          </div>
        )}

      </div>

      {/* Article Detail Modal */}
      {selectedBlog && (
        <div className="blog-detail-modal" onClick={() => setSelectedBlog(null)}>
          <button className="modal-close" onClick={() => setSelectedBlog(null)}>
            <X size={24} />
          </button>
          <div className="blog-modal-content" onClick={e => e.stopPropagation()}>
            <div className="blog-modal-image">
              <img src={selectedBlog.image} alt={selectedBlog.title} />
              <span className="blog-category-badge">{selectedBlog.category}</span>
            </div>

            <div className="blog-modal-body">
              <div className="blog-modal-meta">
                <span>
                  <User size={14} className="meta-icon" /> {selectedBlog.author}
                </span>
                <span>
                  <Calendar size={14} className="meta-icon" /> {formatDate(selectedBlog.date)}
                </span>
                <span>
                  <Clock size={14} className="meta-icon" /> {selectedBlog.readTime}
                </span>
              </div>
              <h2 className="blog-modal-title">{selectedBlog.title}</h2>
              <div className="blog-modal-text">
                <p>{selectedBlog.content}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sodales feugiat sem, non sodales urna interdum sed. Vestibulum sed mi nec ipsum feugiat convallis facilisis at est. In rhoncus, ipsum quis cursus consequat, sem ligula lacinia metus, eget imperdiet nisl velit tincidunt lorem. Integer a facilisis nisi, vel laoreet lacus.
                </p>
                <p>
                  Proin at purus non ligula accumsan tincidunt ac at nulla. Fusce rhoncus nulla id massa feugiat lobortis. Morbi convallis, arcu a dignissim porta, ante justo commodo tortor, eu condimentum dui risus ut massa. Ut gravida at purus convallis scelerisque. Curabitur sed arcu mi.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
