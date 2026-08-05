import { useEffect, useRef } from "react";
import "./HyperSpeedBackground.css";

export default function HyperSpeedBackground() {
  const canvasRef = useRef(null);
  
  // We use a mutable ref for animation state to avoid React re-renders and achieve 60fps
  const stateRef = useRef({
    streaks: [],
    particles: [],
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    speedBoost: 0,
    lastScrollTop: 0,
    lastMouseMoveTime: 0,
    isHovering: false,
    hoverX: 0,
    hoverY: 0,
    isTabActive: true,
    time: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    stateRef.current.lastMouseMoveTime = Date.now();
    let animationFrameId;

    // Detect user preferences for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Canvas size configuration
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initial setups for particles and streaks
    const STREAK_COUNT = prefersReducedMotion ? 40 : 150;
    const PARTICLE_COUNT = prefersReducedMotion ? 30 : 100;
    const MAX_DEPTH = 1000;
    const BASE_SPEED = prefersReducedMotion ? 0.3 : 3.5;

    const colors = [
      { core: "#06b6d4", glow: "rgba(6, 182, 212, 0.4)" }, // Cyan
      { core: "#3b82f6", glow: "rgba(59, 130, 246, 0.4)" }, // Blue
      { core: "#a855f7", glow: "rgba(168, 85, 247, 0.4)" }, // Purple
      { core: "#ec4899", glow: "rgba(236, 72, 153, 0.4)" }  // Pink
    ];

    // Helper to generate a streak on a hollow circle cylinder
    const createStreak = (zValue = MAX_DEPTH) => {
      const theta = Math.random() * Math.PI * 2;
      // Hollow center so text remains readable
      const r = 120 + Math.random() * 280; 
      return {
        x: Math.cos(theta) * r,
        y: Math.sin(theta) * r,
        z: zValue,
        length: 50 + Math.random() * 80,
        width: 1.2 + Math.random() * 2.0,
        colorObj: colors[Math.floor(Math.random() * colors.length)],
        theta // Keep theta to reset
      };
    };

    // Helper to generate a static star particle
    const createParticle = (zValue = MAX_DEPTH) => {
      const theta = Math.random() * Math.PI * 2;
      const r = 50 + Math.random() * 450;
      return {
        x: Math.cos(theta) * r,
        y: Math.sin(theta) * r,
        z: zValue,
        size: 0.8 + Math.random() * 1.5,
        alpha: 0.3 + Math.random() * 0.7
      };
    };

    // Initialize arrays
    const streaks = [];
    for (let i = 0; i < STREAK_COUNT; i++) {
      streaks.push(createStreak(Math.random() * MAX_DEPTH));
    }

    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(Math.random() * MAX_DEPTH));
    }

    stateRef.current.streaks = streaks;
    stateRef.current.particles = particles;
    stateRef.current.lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Event listeners
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Normalized coordinates from -0.5 to 0.5
      stateRef.current.targetMouseX = (clientX / w) - 0.5;
      stateRef.current.targetMouseY = (clientY / h) - 0.5;
      stateRef.current.lastMouseMoveTime = Date.now();
      stateRef.current.isHovering = true;
      stateRef.current.hoverX = clientX;
      stateRef.current.hoverY = clientY;
    };

    const handleMouseLeave = () => {
      stateRef.current.isHovering = false;
    };

    const handleScroll = () => {
      if (prefersReducedMotion) return;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const delta = Math.abs(scrollTop - stateRef.current.lastScrollTop);
      stateRef.current.lastScrollTop = scrollTop;
      stateRef.current.speedBoost = Math.min(25, stateRef.current.speedBoost + delta * 0.3);
    };

    const handleVisibilityChange = () => {
      stateRef.current.isTabActive = document.visibilityState === "visible";
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation Loop
    let lastTime = Date.now();
    const focalLength = 350;

    const loop = () => {
      if (!stateRef.current.isTabActive) {
        lastTime = Date.now();
        stateRef.current.animationId = requestAnimationFrame(loop);
        return;
      }

      const now = Date.now();
      const deltaTime = (now - lastTime) / 1000;
      lastTime = now;

      stateRef.current.time += deltaTime; // increment internal time

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clean screen
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, width, height);

      // Radial vignette overlay inside canvas for guaranteed text readability
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, width * 0.05,
        width / 2, height / 2, Math.max(width, height) * 0.75
      );
      vignette.addColorStop(0, "rgba(3, 7, 18, 0.65)");
      vignette.addColorStop(0.5, "rgba(3, 7, 18, 0.85)");
      vignette.addColorStop(1, "rgba(3, 7, 18, 0.98)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Handle mouse interpolation (smooth rotation / camera tilt)
      const state = stateRef.current;
      
      // Idle drift logic
      const isIdle = Date.now() - state.lastMouseMoveTime > 3000;
      if (isIdle && !prefersReducedMotion) {
        // Slow elliptical movement when idle
        const idleTime = now * 0.0006;
        state.targetMouseX = Math.sin(idleTime) * 0.15;
        state.targetMouseY = Math.cos(idleTime * 0.8) * 0.1;
      }

      state.mouseX += (state.targetMouseX - state.mouseX) * 0.08;
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.08;

      // Decay speed boost from scroll
      state.speedBoost *= 0.93;
      const currentSpeed = BASE_SPEED + state.speedBoost;

      // Draw Particles (Background depth)
      particles.forEach((p) => {
        // Move particle
        p.z -= currentSpeed * 0.45;
        if (p.z <= 5) {
          // Reset particle to maximum depth
          const theta = Math.random() * Math.PI * 2;
          const r = 50 + Math.random() * 450;
          p.x = Math.cos(theta) * r;
          p.y = Math.sin(theta) * r;
          p.z = MAX_DEPTH;
        }

        // Project coordinate
        const mouseOffset = 1.0 - p.z / MAX_DEPTH;
        const projX = (p.x * focalLength) / p.z + width / 2 + state.mouseX * 180 * mouseOffset;
        const projY = (p.y * focalLength) / p.z + height / 2 + state.mouseY * 180 * mouseOffset;

        // Size calculation
        const size = (p.size * focalLength) / p.z;

        // Alpha calculation
        let alpha = p.alpha;
        if (p.z > MAX_DEPTH * 0.8) {
          alpha *= (MAX_DEPTH - p.z) / (MAX_DEPTH * 0.2);
        } else if (p.z < 100) {
          alpha *= (p.z - 5) / 95;
        }
        alpha = Math.max(0, Math.min(1, alpha));

        // Draw star particle
        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
          ctx.beginPath();
          ctx.arc(projX, projY, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(186, 230, 253, ${alpha * 0.15})`; // soft sky blue star
          ctx.fill();
        }
      });

      // Draw Speed Streaks
      streaks.forEach((s) => {
        // Move streak
        s.z -= currentSpeed;
        if (s.z <= 10) {
          // Reset streak to far depth
          const resetStreak = createStreak(MAX_DEPTH);
          Object.assign(s, resetStreak);
        }

        const zFront = s.z;
        const zBack = s.z + s.length;

        // Mouse tilting offset factor (creates 3D bend)
        const mouseOffsetFront = 1.0 - zFront / MAX_DEPTH;
        const mouseOffsetBack = 1.0 - zBack / MAX_DEPTH;

        const projXFront = (s.x * focalLength) / zFront + width / 2 + state.mouseX * 220 * mouseOffsetFront;
        const projYFront = (s.y * focalLength) / zFront + height / 2 + state.mouseY * 220 * mouseOffsetFront;

        const projXBack = (s.x * focalLength) / zBack + width / 2 + state.mouseX * 220 * mouseOffsetBack;
        const projYBack = (s.y * focalLength) / zBack + height / 2 + state.mouseY * 220 * mouseOffsetBack;

        // Calculate opacity based on depth to prevent screen clutter at close distances
        let alpha = 1.0;
        if (s.z > MAX_DEPTH * 0.85) {
          alpha = (MAX_DEPTH - s.z) / (MAX_DEPTH * 0.15);
        } else if (s.z < 200) {
          alpha = (s.z - 10) / 190;
        }
        alpha = Math.max(0, Math.min(1, alpha));

        // Mouse hover interaction: brighten and widen nearby lines
        let hoverBoost = 0;
        if (state.isHovering) {
          const dx = state.hoverX - projXFront;
          const dy = state.hoverY - projYFront;
          const distSq = dx * dx + dy * dy;
          const hoverRadius = 150;
          if (distSq < hoverRadius * hoverRadius) {
            hoverBoost = (hoverRadius - Math.sqrt(distSq)) / hoverRadius;
          }
        }

        const finalWidth = s.width * (1.0 + hoverBoost * 2.0);
        // Dimmer base streak brightness (0.15 instead of 0.35) for better text readability
        const finalAlpha = Math.min(1.0, alpha * 0.15 + hoverBoost * 0.7);

        // Render line
        if (
          (projXFront >= 0 && projXFront <= width && projYFront >= 0 && projYFront <= height) ||
          (projXBack >= 0 && projXBack <= width && projYBack >= 0 && projYBack <= height)
        ) {
          ctx.save();
          ctx.globalAlpha = finalAlpha;

          // Pass 1: Neon Glow Outline
          ctx.beginPath();
          ctx.moveTo(projXBack, projYBack);
          ctx.lineTo(projXFront, projYFront);
          ctx.strokeStyle = s.colorObj.glow;
          ctx.lineWidth = finalWidth * 3.5;
          ctx.lineCap = "round";
          ctx.stroke();

          // Pass 2: High Contrast Core
          ctx.beginPath();
          ctx.moveTo(projXBack, projYBack);
          ctx.lineTo(projXFront, projYFront);
          ctx.strokeStyle = s.colorObj.core;
          ctx.lineWidth = finalWidth;
          ctx.lineCap = "round";
          ctx.stroke();

          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    lastTime = Date.now();
    animationFrameId = requestAnimationFrame(loop);

    // Cleanups
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hyperspeed-canvas" />;
}
