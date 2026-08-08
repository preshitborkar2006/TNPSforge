import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import HyperSpeedBackground from "./components/HyperSpeedBackground";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Gallery from "./pages/Gallery";
import Achievements from "./pages/Achievements";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

export default function App() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem("bytecraft_loaded");
  });

  const handleFinishLoading = () => {
    setLoading(false);
    sessionStorage.setItem("bytecraft_loaded", "true");
  };

  if (loading) {
    return <Loader onFinished={handleFinishLoading} />;
  }

  return (
    <BrowserRouter>
      <HyperSpeedBackground />
      {/* Matrix Glowing Background Grid */}
      <div className="animated-bg">
        <div className="grid-glow"></div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      {/* Global Interface components */}
      <Navbar />
      
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <ScrollToTop />
      <Footer />
    </BrowserRouter>
  );
}
