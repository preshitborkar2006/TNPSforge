import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Terminal, Key, Mail, ArrowRight } from "lucide-react";
import { Github, Chrome } from "../components/Icons";
import SlideAnimation from "../animations/SlideAnimation";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    // Standard student authentication only (admin access is barred from this portal)
    localStorage.setItem("bytecraft_user", JSON.stringify({ email, isAdmin: false }));
    navigate("/");
  };

  return (
    <div className="login-page section-padding">
      <div className="container login-container">
        <SlideAnimation className="login-card glass-card">
          <div className="login-header">
            <Terminal size={32} className="login-logo-icon" />
            <h2>Welcome Back, coder</h2>
            <p>Access your TNPS Forge student developer portal.</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="e.g. coder@apex.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="input-with-icon">
                <Key size={16} className="input-icon" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary login-btn">
              Authenticate <ArrowRight size={16} />
            </button>
          </form>

          <div className="login-divider">
            <span>OR EXECUTE VIA</span>
          </div>

          <div className="oauth-buttons">
            <button className="btn btn-secondary oauth-btn" onClick={() => navigate("/")}>
              <Chrome size={16} /> Google
            </button>
            <button className="btn btn-secondary oauth-btn" onClick={() => navigate("/")}>
              <Github size={16} /> GitHub
            </button>
          </div>

          <div className="login-footer">
            <span>Don't have an account? </span>
            <Link to="/register" className="footer-link">Apply to join</Link>
          </div>
        </SlideAnimation>
      </div>
    </div>
  );
}
