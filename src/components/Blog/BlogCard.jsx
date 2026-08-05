import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import "./BlogCard.css";

export default function BlogCard({ blog, onClick }) {
  const { title, category, author, date, readTime, image, excerpt } = blog;

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  return (
    <div className="blog-card glass-card" onClick={onClick}>
      <div className="blog-card-image">
        <img src={image} alt={title} loading="lazy" />
        <span className="blog-category-badge">{category}</span>
      </div>

      <div className="blog-card-body">
        <div className="blog-meta-row">
          <span className="meta-info">
            <User size={12} className="meta-icon" /> {author}
          </span>
          <span className="meta-info">
            <Clock size={12} className="meta-icon" /> {readTime}
          </span>
        </div>
        <h3 className="blog-title">{title}</h3>
        <p className="blog-excerpt">{excerpt}</p>
      </div>

      <div className="blog-card-footer">
        <span className="blog-date">
          <Calendar size={12} className="meta-icon" /> {formatDate(date)}
        </span>
        <button className="read-more-btn" onClick={onClick}>
          Read Article <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
