import { useEffect, useRef } from "react";
import "./HyperSpeedBackground.css";

export default function HyperSpeedBackground() {
  const canvasRef = useRef(null);
  
  // Ref for animation state
  const stateRef = useRef({
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    isTabActive: true,
    time: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;

    // Canvas size configuration
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Define 6 layered silk/vector waves (Orange/Gold/Amber/White) matching the user's mockup
    const waves = [
      // 1. Bottom deep thick orange silk wave
      {
        yOffset: 0.58,
        amplitude: 65,
        frequency: 0.0012,
        speed: 0.25,
        phase: 0,
        lineWidth: 55,
        color: "rgba(234, 88, 12, 0.08)", // translucent dark orange
        isThin: false
      },
      // 2. Middle thick golden silk wave
      {
        yOffset: 0.48,
        amplitude: 55,
        frequency: 0.0016,
        speed: -0.2,
        phase: Math.PI / 3,
        lineWidth: 45,
        color: "rgba(245, 158, 11, 0.09)", // translucent gold
        isThin: false
      },
      // 3. Thin glowing vector gold thread
      {
        yOffset: 0.46,
        amplitude: 70,
        frequency: 0.0018,
        speed: 0.45,
        phase: Math.PI / 1.5,
        lineWidth: 3.5,
        color: "#fbbf24", // bright gold
        isThin: true,
        glowColor: "rgba(251, 191, 36, 0.45)"
      },
      // 4. Thin glowing vector orange thread
      {
        yOffset: 0.52,
        amplitude: 45,
        frequency: 0.0022,
        speed: -0.35,
        phase: Math.PI * 1.2,
        lineWidth: 2.8,
        color: "#f97316", // bright orange
        isThin: true,
        glowColor: "rgba(249, 115, 22, 0.4)"
      },
      // 5. Very thin high-contrast white/gold accent thread
      {
        yOffset: 0.5,
        amplitude: 80,
        frequency: 0.001,
        speed: 0.2,
        phase: Math.PI * 0.5,
        lineWidth: 1.8,
        color: "#ffedd5", // bright cream/white-gold
        isThin: true,
        glowColor: "rgba(255, 237, 213, 0.3)"
      },
      // 6. Lower thick amber silk wave
      {
        yOffset: 0.54,
        amplitude: 75,
        frequency: 0.0014,
        speed: 0.3,
        phase: Math.PI * 0.8,
        lineWidth: 35,
        color: "rgba(249, 115, 22, 0.07)", // translucent orange
        isThin: false
      }
    ];

    // Event listeners
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const w = window.innerWidth;
      const h = window.innerHeight;
      stateRef.current.targetMouseX = (clientX / w) - 0.5;
      stateRef.current.targetMouseY = (clientY / h) - 0.5;
    };

    const handleVisibilityChange = () => {
      stateRef.current.isTabActive = document.visibilityState === "visible";
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation loop
    let lastTime = Date.now();

    const loop = () => {
      if (!stateRef.current.isTabActive) {
        lastTime = Date.now();
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      const now = Date.now();
      const deltaTime = (now - lastTime) / 1000;
      lastTime = now;

      const state = stateRef.current;
      state.time += deltaTime;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Ensure canvas maintains full viewport dimension bounds
      if (canvas.width !== w * (window.devicePixelRatio || 1) || canvas.height !== h * (window.devicePixelRatio || 1)) {
        resizeCanvas();
      }

      // 1. Dark Base Background
      ctx.fillStyle = "#060606";
      ctx.fillRect(0, 0, w, h);

      // Interpolate mouse coordinates smoothly for interaction parallax
      state.mouseX += (state.targetMouseX - state.mouseX) * 0.05;
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.05;

      // 2. Draw thick silk waves first (translucent blending depth layers)
      ctx.globalCompositeOperation = "source-over";
      waves.forEach((wave) => {
        if (wave.isThin) return; // Draw thin threads on top
        
        ctx.beginPath();
        ctx.lineWidth = wave.lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const centerY = h * wave.yOffset;

        for (let x = 0; x <= w + 20; x += 15) {
          const waveFactor1 = Math.sin(x * wave.frequency + state.time * wave.speed + wave.phase);
          const waveFactor2 = Math.cos(x * 0.0025 - state.time * 0.2 + wave.phase);
          
          // Mouse hover parallax bend on ribbons
          const mouseParallax = state.mouseY * 85 * Math.sin(x * 0.001);

          const y = centerY + 
            waveFactor1 * wave.amplitude + 
            waveFactor2 * (wave.amplitude * 0.35) + 
            mouseParallax;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = wave.color;
        ctx.stroke();
      });

      // 3. Draw thin glowing vector threads on top with composite glow
      ctx.globalCompositeOperation = "lighter";
      waves.forEach((wave) => {
        if (!wave.isThin) return;
        
        // Pass 1: Neon outer blur glow outline
        ctx.beginPath();
        ctx.lineWidth = wave.lineWidth * 3.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const centerY = h * wave.yOffset;

        for (let x = 0; x <= w + 20; x += 10) {
          const waveFactor1 = Math.sin(x * wave.frequency + state.time * wave.speed + wave.phase);
          const waveFactor2 = Math.cos(x * 0.0025 - state.time * 0.2 + wave.phase);
          const mouseParallax = state.mouseY * 85 * Math.sin(x * 0.001);

          const y = centerY + 
            waveFactor1 * wave.amplitude + 
            waveFactor2 * (wave.amplitude * 0.35) + 
            mouseParallax;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = wave.glowColor;
        ctx.stroke();

        // Pass 2: High contrast white/gold core line
        ctx.beginPath();
        ctx.lineWidth = wave.lineWidth;
        for (let x = 0; x <= w + 20; x += 10) {
          const waveFactor1 = Math.sin(x * wave.frequency + state.time * wave.speed + wave.phase);
          const waveFactor2 = Math.cos(x * 0.0025 - state.time * 0.2 + wave.phase);
          const mouseParallax = state.mouseY * 85 * Math.sin(x * 0.001);

          const y = centerY + 
            waveFactor1 * wave.amplitude + 
            waveFactor2 * (wave.amplitude * 0.35) + 
            mouseParallax;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = wave.color;
        ctx.stroke();
      });
      
      ctx.globalCompositeOperation = "source-over";

      // 4. Radial dark vignette overlay for readability of elements on top
      const vignette = ctx.createRadialGradient(
        w / 2, h / 2, w * 0.15,
        w / 2, h / 2, Math.max(w, h) * 0.82
      );
      vignette.addColorStop(0, "rgba(6, 6, 6, 0.4)");
      vignette.addColorStop(0.65, "rgba(6, 6, 6, 0.7)");
      vignette.addColorStop(1, "rgba(6, 6, 6, 0.94)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    // Cleanups
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hyperspeed-canvas" />;
}
