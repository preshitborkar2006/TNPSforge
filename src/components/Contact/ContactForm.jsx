import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import "./ContactForm.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Save to local storage for the Admin panel to pull
    const existingMessages = JSON.parse(localStorage.getItem("bytecraft_messages") || "[]");
    const newMessage = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0]
    };
    localStorage.setItem("bytecraft_messages", JSON.stringify([...existingMessages, newMessage]));

    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-form-container glass-card">
      {submitted ? (
        <div className="contact-success">
          <CheckCircle2 size={48} className="success-icon" />
          <h3>Message Dispatched!</h3>
          <p>Thank you for reaching out to TNPS Forge. Our team will review your ticket and reply within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="e.g. Jane Doe"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="e.g. jane@example.com"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="subject">Subject</label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="How can we help?"
              value={formData.subject}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              required
              rows="5"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={handleChange}
              className="form-input text-area"
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary submit-btn">
            Send Message <Send size={16} />
          </button>
        </form>
      )}
    </div>
  );
}
