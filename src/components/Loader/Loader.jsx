import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Loader.css";

export default function Loader({ onFinished }) {
  const containerRef = useRef(null);
  const coinRef = useRef(null);
  const skipRef = useRef(null);

  const handleSkip = () => {
    sessionStorage.setItem("tnps_forge_loaded", "true");
    if (onFinished) onFinished();
  };

  useEffect(() => {
    // Session storage double check to skip intro instantly on re-visits
    if (sessionStorage.getItem("tnps_forge_loaded") === "true") {
      if (onFinished) onFinished();
      return;
    }

    const coin = coinRef.current;
    const container = containerRef.current;

    // Set initial off-screen state with deep 3D rotation and blur
    gsap.set(coin, {
      y: "100vh",
      scale: 0.5,
      rotateX: -180,
      rotateY: -360,
      rotateZ: -45,
      filter: "blur(4px)"
    });

    // Hide the text branding elements initially
    gsap.set([".coin-brand-name", ".coin-date"], {
      opacity: 0,
      y: 12
    });

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("tnps_forge_loaded", "true");
        if (onFinished) onFinished();
      }
    });

    // ==========================================
    // Phase 1: Initial Launch (0.0s - 0.8s)
    // ==========================================
    tl.to(coin, {
      y: "-25vh",
      scale: 1.25,
      rotateX: 900,
      rotateY: 540,
      rotateZ: 90,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power3.out"
    }, 0);

    // ==========================================
    // Phase 2: Apex & Fall (0.8s - 1.8s)
    // ==========================================
    // Decelerating and floating downward from apex to center
    tl.to(coin, {
      y: 0,
      scale: 1.0,
      rotateX: 0, // Settle to 0 degrees to guarantee front face matches camera
      rotateY: 0, // Settle to 0 degrees to guarantee front face matches camera
      rotateZ: 0,
      duration: 1.0,
      ease: "power2.inOut"
    }, 0.8);

    // Sweep light reflection across the coin faces during apex spin
    tl.fromTo(
      ".coin-shine",
      { left: "-200%" },
      { left: "200%", duration: 1.1, ease: "power2.inOut" },
      0.9
    );

    // ==========================================
    // Phase 3: Landing & Reveal (1.8s - 2.6s)
    // ==========================================
    // Squash and stretch bounce impact
    tl.to(coin, { scaleY: 0.82, scaleX: 1.15, duration: 0.08, ease: "power1.out" }, 1.8)
      .to(coin, { scaleY: 1.08, scaleX: 0.93, y: -25, duration: 0.15, ease: "power1.inOut" })
      .to(coin, { scaleY: 0.96, scaleX: 1.03, y: 0, duration: 0.12, ease: "power1.inOut" })
      .to(coin, { scaleY: 1.0, scaleX: 1.0, duration: 0.15, ease: "power1.out" });

    // SPECULAR radial light flash behind the coin on landing
    tl.fromTo(
      ".coin-glow-effect",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1.25, duration: 0.35, ease: "power2.out" },
      1.8
    );
    tl.to(".coin-glow-effect", { opacity: 0.3, scale: 1.0, duration: 0.65, ease: "power2.out" }, 2.15);

    // Secondary slow light sweep once settled to showcase the 3D metallic texture
    tl.fromTo(
      ".coin-shine",
      { left: "-200%" },
      { left: "200%", duration: 2.0, ease: "power1.out" },
      2.2
    );

    // Fade and slide in the brand name and date once the coin stops
    tl.to(".coin-brand-name", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, 2.1);

    tl.to(".coin-date", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, 2.3);

    // Embossed text specular glow highlight (pulses and scales continuously to highlight the branding)
    tl.fromTo(
      ".coin-brand-name",
      { 
        scale: 1.0,
        filter: "brightness(1) drop-shadow(-1px -1px 0px rgba(255,255,255,0.45)) drop-shadow(1px 2px 2px rgba(0,0,0,0.85))" 
      },
      { 
        scale: 1.08,
        filter: "brightness(2.2) drop-shadow(0 0 15px rgba(255, 224, 130, 0.95))", 
        duration: 0.5, 
        yoyo: true, 
        repeat: 5, // 5 yoyo iterations = 3 seconds of continuous pulsing
        ease: "power1.inOut" 
      },
      2.6
    );

    // Expanding shockwave ripples
    tl.fromTo(
      ".coin-shockwave-1",
      { scale: 0.5, opacity: 0 },
      { scale: 2.1, opacity: 1, duration: 0.85, ease: "power2.out" },
      1.8
    );
    tl.to(".coin-shockwave-1", { opacity: 0, duration: 0.4 }, 2.25);

    tl.fromTo(
      ".coin-shockwave-2",
      { scale: 0.5, opacity: 0 },
      { scale: 2.5, opacity: 0.8, duration: 0.95, ease: "power2.out" },
      1.9
    );
    tl.to(".coin-shockwave-2", { opacity: 0, duration: 0.45 }, 2.4);

    // ==========================================
    // Phase 4: Exit Transition (4.8s - 5.4s)
    // ==========================================
    // Coin scales up / bursts slightly on exit
    tl.to(coin, {
      scale: 1.15,
      duration: 0.6,
      ease: "power2.in"
    }, 4.8);

    // Smooth overlay fadeout
    tl.to(container, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut"
    }, 4.8);

    return () => {
      tl.kill();
    };
  }, [onFinished]);

  return (
    <div ref={containerRef} className="loader-container">
      <div className="coin-3d-stage">
        {/* Glow flare on impact */}
        <div className="coin-glow-effect"></div>
        {/* Shockwave ripples */}
        <div className="coin-shockwave coin-shockwave-1"></div>
        <div className="coin-shockwave coin-shockwave-2"></div>
        
        {/* 3D Forged Coin */}
        <div ref={coinRef} className="coin-entity">
          {/* 3D Sides Thickness Layers (10 layers declared first to stack underneath the faces) */}
          <div className="coin-side-layer layer-1"></div>
          <div className="coin-side-layer layer-2"></div>
          <div className="coin-side-layer layer-3"></div>
          <div className="coin-side-layer layer-4"></div>
          <div className="coin-side-layer layer-5"></div>
          <div className="coin-side-layer layer-6"></div>
          <div className="coin-side-layer layer-7"></div>
          <div className="coin-side-layer layer-8"></div>
          <div className="coin-side-layer layer-9"></div>
          <div className="coin-side-layer layer-10"></div>

          {/* Front Face: Brand Title (Declared after side layers to render on top) */}
          <div className="coin-face coin-front">
            <div className="coin-inner-ring">
              <svg viewBox="0 0 64 64" className="coin-svg-icon anvil-icon">
                <path d="M12 16h40c2 0 4 2 4 4v6c0 2-2 4-4 4h-6.2c-2.4 0-4.5 1.6-5.1 4L38 46H26l-2.7-12c-.6-2.4-2.7-4-5.1-4H12c-2 0-4-2-4-4v-6c0-2 2-4 4-4z" fill="#5a4209" />
                <path d="M18 46h28v6H18z" fill="#5a4209" />
                <path d="M32 10l-4 6h8z" fill="#aa7c11" />
              </svg>
              <h2 className="coin-brand-name">TNPS Forge</h2>
              <span className="coin-date">ESTD 2026</span>
            </div>
            <div className="coin-shine"></div>
          </div>
          
          {/* Back Face: Logo Emblem (Declared after side layers to render on top) */}
          <div className="coin-face coin-back">
            <div className="coin-inner-ring">
              <svg viewBox="0 0 64 64" className="coin-svg-icon hammer-icon">
                <path d="M22 28.5L34.5 16c.8-.8.8-2 0-2.8l-5.7-5.7c-.8-.8-2-.8-2.8 0L13.5 20c-.8.8-.8 2 0 2.8l5.7 5.7c.8.8 2 .8 2.8 0z" fill="#aa7c11" />
                <path d="M28 42L47 23c.8-.8 2-.8 2.8 0l5.7 5.7c.8.8.8 2 0 2.8L36.5 50.5c-.8.8-2.8 1.8-3.8 1l-5.7-5.7c-1-1 0-3 1-3.8z" fill="#aa7c11" />
                <path d="M15 48.5l29.5-29.5" stroke="#5a4209" strokeWidth="5" strokeLinecap="round" />
              </svg>
              <span className="coin-motto">APEX CODING CLUB</span>
            </div>
            <div className="coin-shine"></div>
          </div>
        </div>
      </div>

      {/* Skip Controls */}
      <button ref={skipRef} onClick={handleSkip} className="skip-intro-btn">
        Skip Intro
      </button>
    </div>
  );
}
