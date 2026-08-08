import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Terminal, Cpu, Shield, ArrowRight } from "lucide-react";
import "./Hero.css";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const codeSnippet = `const tnpsForge = {
  name: "TNPS Forge",
  vision: "Compile Futures, Solve Real Problems",
  motto: "Code. Create. Collaborate.",
  skills: ["WebDev", "AI/ML", "Android", "CyberSec", "CP"],
  isReadyToJoin: () => true
};`;

  return (
    <div className="hero-section">
      <div className="container hero-grid">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-badge" variants={itemVariants}>
            <Terminal size={14} className="badge-icon" />
            <span>ST.VINCENT PALLOTI COLLEGE NAGPUR..</span>
          </motion.div>
          <motion.h1 className="hero-title" variants={itemVariants}>
            Where Code Meets <span className="text-gradient">Creativity</span> & Passion
          </motion.h1>
          <motion.p className="hero-description" variants={itemVariants}>
            TNPS Forge is the premium student-run coding club at Nagpur. We build high-impact software, host hacking tournaments, solve algorithms, and shape the technology leaders of tomorrow.
          </motion.p>
          <motion.div className="hero-actions" variants={itemVariants}>
            <Link to="/register" className="btn btn-primary">
              Join the Forge <ArrowRight size={16} />
            </Link>
            <Link to="/projects" className="btn btn-secondary">
              View Projects
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          {/* Simulated Code Panel */}
          <div className="code-editor-card">
            <div className="editor-titlebar">
              <div className="editor-dot red"></div>
              <div className="editor-dot yellow"></div>
              <div className="editor-dot green"></div>
              <span className="editor-file">tnpsforge.config.js</span>
            </div>
            <div className="editor-content">
              <pre>
                <code>
                  {codeSnippet.split("\n").map((line, idx) => (
                    <div key={idx} className="code-line">
                      <span className="line-num">{idx + 1}</span>
                      <span className="line-text">{line}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>

          {/* Floating UI Badges */}
          <div className="floating-badge badge-top-right">
            <Cpu className="badge-icon purple" />
            <span>AI Models Built: 10+</span>
          </div>
          <div className="floating-badge badge-bottom-left">
            <Shield className="badge-icon cyan" />
            <span>CTFs Solved: 150+</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative Orbs */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>
    </div>
  );
}
