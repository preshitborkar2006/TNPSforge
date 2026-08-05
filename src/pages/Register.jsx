import { useState } from "react";
import { Terminal, Send, CheckCircle2 } from "lucide-react";
import SlideAnimation from "../animations/SlideAnimation";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    department: "",
    year: "1st Year",
    email: "",
    phone: "",
    skills: "",
    interests: "Web Development"
  });
  const [submitted, setSubmitted] = useState(false);

  const departments = ["Computer Science and engineering", "Information Technology", "Electronics", "Mechanical", "Electrical","Civil"];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const interestsList = ["Web Development", "AI / Machine Learning", "Android Development", "Cyber Security", "Competitive Programming"];

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rollNumber || !formData.email) return;

    // Save registration to local storage
    const currentRegistrations = JSON.parse(localStorage.getItem("bytecraft_registrations") || "[]");
    const newRegistration = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0]
    };
    localStorage.setItem("bytecraft_registrations", JSON.stringify([...currentRegistrations, newRegistration]));

    setSubmitted(true);
    setFormData({
      name: "",
      rollNumber: "",
      department: "",
      year: "1st Year",
      email: "",
      phone: "",
      skills: "",
      interests: "Web Development"
    });
  };

  return (
    <div className="register-page section-padding">
      <div className="container register-container">
        <SlideAnimation className="register-card glass-card">
          {submitted ? (
            <div className="registration-success">
              <CheckCircle2 size={56} className="success-icon" />
              <h2>Application Logged!</h2>
              <p>
                Your registration for TNPS Forge Coding Club has been successfully received. We will run code audits on your submitted skills and contact you for orientation slots soon.
              </p>
              <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
                Submit Another Application
              </button>
            </div>
          ) : (
            <>
              <div className="register-header">
                <Terminal size={32} className="register-logo-icon" />
                <h2>Apply for TNPS Forge Membership</h2>
                <p>Submit your details to register as a student coder.</p>
              </div>

              <form onSubmit={handleRegister} className="register-form">
                <div className="form-row-double">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="rollNumber">Roll Number</label>
                    <input
                      type="text"
                      name="rollNumber"
                      id="rollNumber"
                      required
                      placeholder="e.g. 2310991240"
                      value={formData.rollNumber}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row-double">
                  <div className="form-group">
                    <label className="form-label" htmlFor="department">Department</label>
                    <select
                      name="department"
                      id="department"
                      required
                      value={formData.department}
                      onChange={handleChange}
                      className="form-input select-input"
                    >
                      <option value="">Select Department</option>
                      {departments.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="year">Academic Year</label>
                    <select
                      name="year"
                      id="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="form-input select-input"
                    >
                      {years.map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row-double">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="jane@apex.edu"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="e.g. +91 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="interests">Core Tech Interest</label>
                  <select
                    name="interests"
                    id="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    className="form-input select-input"
                  >
                    {interestsList.map(int => (
                      <option key={int} value={int}>{int}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="skills">Current Skills (comma separated)</label>
                  <input
                    type="text"
                    name="skills"
                    id="skills"
                    placeholder="e.g. Python, CSS, HTML, C++"
                    value={formData.skills}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <button type="submit" className="btn btn-primary register-btn">
                  Submit Application <Send size={16} />
                </button>
              </form>
            </>
          )}
        </SlideAnimation>
      </div>
    </div>
  );
}
