import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import "./Loader.css";

const logSteps = [
  "Initializing TNPS Forge core engine...",
  "Loading student databases & profiles...",
  "Linking competitive programming leaderboards...",
  "Importing neural network weights...",
  "Checking firewall integrity...",
  "TNPS Forge Portal Online. Welcome, Developer!"
];

export default function Loader({ onFinished }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logSteps.length) {
        setLogs(prev => [...prev, logSteps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (onFinished) onFinished();
        }, 800);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div className="loader-container">
      <div className="loader-terminal">
        <div className="terminal-header">
          <div className="terminal-dot red"></div>
          <div className="terminal-dot yellow"></div>
          <div className="terminal-dot green"></div>
          <span className="terminal-title">system_loader.sh</span>
        </div>
        <div className="terminal-body">
          <div className="terminal-intro">
            <Terminal size={18} className="terminal-icon" />
             <span>APEX INSTITUTE OF TECHNOLOGY // TNPS_FORGE_CLUB</span>
          </div>
          <div className="terminal-logs">
            {logs.map((log, index) => (
              <div key={index} className={`terminal-log-line ${index === logSteps.length - 1 ? "success" : ""}`}>
                <span className="terminal-prompt">$</span> {log}
              </div>
            ))}
            {logs.length < logSteps.length && (
              <div className="terminal-cursor-line">
                <span className="terminal-prompt">$</span><span className="blinking-cursor">▒</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
