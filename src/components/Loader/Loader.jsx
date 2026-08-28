import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";
import "./Loader.css";

// Check if WebGL is supported by the client browser
function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// Generate the 2D canvas texture for the front/back face of the coin
function createCoinFaceCanvas(isFront) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Conic metallic gold radial gradient base
  const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  grad.addColorStop(0, "#ffe898");
  grad.addColorStop(0.3, "#ffd700");
  grad.addColorStop(0.7, "#d4af37");
  grad.addColorStop(1, "#9a7b1c");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Outer double rim borders
  ctx.strokeStyle = "#b3922e";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(256, 256, 240, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(256, 256, 225, 0, Math.PI * 2);
  ctx.stroke();

  // Dotted inner ring design
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 3;
  ctx.setLineDash([4, 10]);
  ctx.beginPath();
  ctx.arc(256, 256, 210, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]); // Reset dash

  // Central Emblem raised dark gold color
  ctx.fillStyle = "#5a4209";
  ctx.save();
  ctx.translate(256, 175); // center-upper
  ctx.scale(2.5, 2.5);
  ctx.translate(-32, -32); // offset bounding box center

  if (isFront) {
    // Anvil Icon path
    const p1 = new Path2D(
      "M12 16h40c2 0 4 2 4 4v6c0 2-2 4-4 4h-6.2c-2.4 0-4.5 1.6-5.1 4L38 46H26l-2.7-12c-.6-2.4-2.7-4-5.1-4H12c-2 0-4-2-4-4v-6c0-2 2-4 4-4z"
    );
    const p2 = new Path2D("M18 46h28v6H18z");
    const p3 = new Path2D("M32 10l-4 6h8z");
    ctx.fill(p1);
    ctx.fill(p2);
    ctx.fillStyle = "#b3922e";
    ctx.fill(p3);
  } else {
    // Hammer Icon path (rotated 45deg)
    ctx.translate(32, 32);
    ctx.rotate((45 * Math.PI) / 180);
    ctx.translate(-32, -32);
    const p1 = new Path2D(
      "M22 28.5L34.5 16c.8-.8.8-2 0-2.8l-5.7-5.7c-.8-.8-2-.8-2.8 0L13.5 20c-.8.8-.8 2 0 2.8l5.7 5.7c.8.8 2 .8 2.8 0z"
    );
    const p2 = new Path2D(
      "M28 42L47 23c.8-.8 2-.8 2.8 0l5.7 5.7c.8.8.8 2 0 2.8L36.5 50.5c-.8.8-2.8 1.8-3.8 1l-5.7-5.7c-1-1 0-3 1-3.8z"
    );
    ctx.fill(p1);
    ctx.fill(p2);
    ctx.strokeStyle = "#5a4209";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(15, 48.5);
    ctx.lineTo(44.5, 19);
    ctx.stroke();
  }
  ctx.restore();

  // Draw typography with raised relief offset drop shadow effects
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (isFront) {
    // TNPS FORGE Text
    ctx.font = "900 32px Montserrat, Segoe UI, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillText("TNPS FORGE", 256 - 1, 335 - 1);
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillText("TNPS FORGE", 256 + 1.5, 335 + 2);
    ctx.fillStyle = "#ffe082";
    ctx.fillText("TNPS FORGE", 256, 335);

    // ESTD 2026
    ctx.font = "800 16px SFMono-Regular, Consolas, monospace";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillText("ESTD 2026", 256 - 0.5, 385 - 0.5);
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillText("ESTD 2026", 256 + 1, 385 + 1);
    ctx.fillStyle = "#ffe082";
    ctx.fillText("ESTD 2026", 256, 385);
  } else {
    // APEX CODING CLUB Text
    ctx.font = "900 24px Montserrat, Segoe UI, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillText("APEX CODING CLUB", 256 - 1, 340 - 1);
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillText("APEX CODING CLUB", 256 + 1.5, 340 + 2);
    ctx.fillStyle = "#ffe082";
    ctx.fillText("APEX CODING CLUB", 256, 340);
  }

  return canvas;
}

// Generate the 2D heightmap canvas for the bump/normal map
function createCoinBumpCanvas(isFront) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Mid-gray background (recessed level)
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, 512, 512);

  // Rims in bright white (maximum elevation)
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(256, 256, 240, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(256, 256, 225, 0, Math.PI * 2);
  ctx.stroke();

  // Dotted inner ring in light gray (slightly raised)
  ctx.strokeStyle = "#a0a0a0";
  ctx.lineWidth = 3;
  ctx.setLineDash([4, 10]);
  ctx.beginPath();
  ctx.arc(256, 256, 210, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Draw emblems in bright white
  ctx.fillStyle = "#ffffff";
  ctx.save();
  ctx.translate(256, 175);
  ctx.scale(2.5, 2.5);
  ctx.translate(-32, -32);

  if (isFront) {
    const p1 = new Path2D(
      "M12 16h40c2 0 4 2 4 4v6c0 2-2 4-4 4h-6.2c-2.4 0-4.5 1.6-5.1 4L38 46H26l-2.7-12c-.6-2.4-2.7-4-5.1-4H12c-2 0-4-2-4-4v-6c0-2 2-4 4-4z"
    );
    const p2 = new Path2D("M18 46h28v6H18z");
    const p3 = new Path2D("M32 10l-4 6h8z");
    ctx.fill(p1);
    ctx.fill(p2);
    ctx.fill(p3);
  } else {
    ctx.translate(32, 32);
    ctx.rotate((45 * Math.PI) / 180);
    ctx.translate(-32, -32);
    const p1 = new Path2D(
      "M22 28.5L34.5 16c.8-.8.8-2 0-2.8l-5.7-5.7c-.8-.8-2-.8-2.8 0L13.5 20c-.8.8-.8 2 0 2.8l5.7 5.7c.8.8 2 .8 2.8 0z"
    );
    const p2 = new Path2D(
      "M28 42L47 23c.8-.8 2-.8 2.8 0l5.7 5.7c.8.8.8 2 0 2.8L36.5 50.5c-.8.8-2.8 1.8-3.8 1l-5.7-5.7c-1-1 0-3 1-3.8z"
    );
    ctx.fill(p1);
    ctx.fill(p2);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(15, 48.5);
    ctx.lineTo(44.5, 19);
    ctx.stroke();
  }
  ctx.restore();

  // Typography in white
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";

  if (isFront) {
    ctx.font = "900 32px Montserrat, Segoe UI, sans-serif";
    ctx.fillText("TNPS FORGE", 256, 335);

    ctx.font = "800 16px SFMono-Regular, Consolas, monospace";
    ctx.fillText("ESTD 2026", 256, 385);
  } else {
    ctx.font = "900 24px Montserrat, Segoe UI, sans-serif";
    ctx.fillText("APEX CODING CLUB", 256, 340);
  }

  return canvas;
}

// Generate the 2D reeded edge color stripes
function createCoinEdgeCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#b3922e";
  ctx.fillRect(0, 0, 64, 512);

  for (let y = 0; y < 512; y += 4) {
    ctx.fillStyle = y % 8 === 0 ? "#644e0e" : "#ffd700";
    ctx.fillRect(0, y, 64, 2);
  }
  return canvas;
}

// Generate the 2D reeded edge bump texture
function createCoinEdgeBumpCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, 64, 512);

  for (let y = 0; y < 512; y += 8) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, y, 64, 4);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, y + 4, 64, 4);
  }
  return canvas;
}

// Play synthesized coin clink sound using Web Audio API
const playCoinSound = (volume = 0.08) => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc1 = audioCtx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = 850;

    const osc2 = audioCtx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = 1075;

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(audioCtx.currentTime + 0.35);
    osc2.stop(audioCtx.currentTime + 0.35);
  } catch (e) {
    console.warn("Audio Context blocked or unsupported:", e);
  }
};

export default function Loader({ onFinished }) {
  const containerRef = useRef(null);
  const skipRef = useRef(null);
  const mountRef = useRef(null);
  const [useWebGL] = useState(() => {
    if (typeof window === "undefined") return false;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    return !prefersReducedMotion && isWebGLAvailable();
  });

  const handleSkip = () => {
    sessionStorage.setItem("tnps_forge_loaded", "true");
    if (onFinished) onFinished();
  };

  useEffect(() => {
    const startTime = performance.now();
    // Instant skip on re-visits
    if (sessionStorage.getItem("tnps_forge_loaded") === "true") {
      if (onFinished) onFinished();
      return;
    }

    if (!useWebGL) {
      // Fallback simple GSAP fade reveal
      const fallbackTl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("tnps_forge_loaded", "true");
          if (onFinished) onFinished();
        }
      });
      fallbackTl.to(containerRef.current, {
        opacity: 0,
        duration: 1.0,
        delay: 1.5,
        ease: "power2.out"
      });
      return;
    }

    // Set initial text and visual states
    gsap.set([".coin-brand-name", ".coin-date"], {
      opacity: 0,
      y: 12
    });

    const ctn = mountRef.current;
    if (!ctn) return;

    // 1. Create Three.js Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      ctn.clientWidth / ctn.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(ctn.clientWidth, ctn.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    ctn.appendChild(renderer.domElement);

    // 2. Add lighting (Key light + Rim light + Ambient)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff3d1, 2.8);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
    rimLight.position.set(-5, 5, -4);
    scene.add(rimLight);

    // 3. Create textures and materials
    const frontCanvas = createCoinFaceCanvas(true);
    const frontBumpCanvas = createCoinBumpCanvas(true);
    const backCanvas = createCoinFaceCanvas(false);
    const backBumpCanvas = createCoinBumpCanvas(false);
    const edgeCanvas = createCoinEdgeCanvas();
    const edgeBumpCanvas = createCoinEdgeBumpCanvas();

    const frontTexture = new THREE.CanvasTexture(frontCanvas);
    const frontBumpTexture = new THREE.CanvasTexture(frontBumpCanvas);
    const backTexture = new THREE.CanvasTexture(backCanvas);
    const backBumpTexture = new THREE.CanvasTexture(backBumpCanvas);
    const edgeTexture = new THREE.CanvasTexture(edgeCanvas);
    const edgeBumpTexture = new THREE.CanvasTexture(edgeBumpCanvas);

    // standard materials mapping
    const sideMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.3,
      map: edgeTexture,
      bumpMap: edgeBumpTexture,
      bumpScale: 0.04
    });

    const frontMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.9,
      roughness: 0.2,
      map: frontTexture,
      bumpMap: frontBumpTexture,
      bumpScale: 0.05
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.9,
      roughness: 0.2,
      map: backTexture,
      bumpMap: backBumpTexture,
      bumpScale: 0.05
    });

    // materials array: index 0: side, index 1: top cap (front), index 2: bottom cap (back)
    const materials = [sideMaterial, frontMaterial, backMaterial];

    // 4. Create Coin Mesh
    const coinGeo = new THREE.CylinderGeometry(2.0, 2.0, 0.22, 64);
    const coinMesh = new THREE.Mesh(coinGeo, materials);
    scene.add(coinMesh);

    // Rotate so cap faces camera initially
    coinMesh.rotation.set(Math.PI / 2, 0, 0);

    // 5. Create dynamic shadow plane
    const shadowGeo = new THREE.PlaneGeometry(3.2, 3.2);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d");
    const sGrad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    sGrad.addColorStop(0, "rgba(0, 0, 0, 0.65)");
    sGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.25)");
    sGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 128, 128);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0, 0, -0.15); // just behind the resting coin
    scene.add(shadowMesh);

    // 6. Build the animation timeline using GSAP
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("tnps_forge_loaded", "true");
        if (onFinished) onFinished();
      }
    });

    // Initial toss settings
    coinMesh.position.set(-2.5, 5.5, -2.0);
    coinMesh.rotation.set(0, 0, 0);

    // Parabolic Arc Toss (0.0s - 1.0s)
    tl.to(coinMesh.position, { x: 0, duration: 1.0, ease: "power1.out" }, 0);
    tl.to(coinMesh.position, { y: 1.8, duration: 0.45, ease: "power2.out" }, 0);
    tl.to(
      coinMesh.position,
      { y: 0.0, duration: 0.55, ease: "power2.in" },
      0.45
    );

    // Fast multi-axis spin during toss
    tl.to(
      coinMesh.rotation,
      {
        x: 6.5 * Math.PI,
        y: 8 * Math.PI,
        z: Math.PI / 3,
        duration: 1.0,
        ease: "none"
      },
      0
    );

    // ===========================================
    // Bounce 1 (1.0s - 1.45s)
    // ===========================================
    tl.call(() => playCoinSound(0.08), null, 1.0);
    // squash impact
    tl.to(
      coinMesh.scale,
      { x: 1.15, y: 1.15, z: 0.75, duration: 0.07, ease: "power1.out" },
      1.0
    );
    tl.to(
      coinMesh.scale,
      { x: 1.0, y: 1.0, z: 1.0, duration: 0.12, ease: "power1.inOut" },
      1.07
    );
    // rebound
    tl.to(
      coinMesh.position,
      { y: 0.75, duration: 0.22, ease: "power1.out" },
      1.07
    );
    tl.to(
      coinMesh.position,
      { y: 0.0, duration: 0.22, ease: "power1.in" },
      1.29
    );
    // rotation during first bounce
    tl.to(
      coinMesh.rotation,
      {
        x: 8.5 * Math.PI,
        y: 9.5 * Math.PI,
        z: Math.PI / 4,
        duration: 0.44,
        ease: "power1.out"
      },
      1.01
    );

    // ===========================================
    // Bounce 2 (1.45s - 1.8s)
    // ===========================================
    tl.call(() => playCoinSound(0.04), null, 1.51);
    // rebound
    tl.to(
      coinMesh.position,
      { y: 0.25, duration: 0.16, ease: "power1.out" },
      1.51
    );
    tl.to(
      coinMesh.position,
      { y: 0.0, duration: 0.16, ease: "power1.in" },
      1.67
    );

    // ===========================================
    // Damped rocking settle clatter (1.8s+)
    // ===========================================
    tl.call(() => playCoinSound(0.015), null, 1.83);

    // Zoom-in camera parallax
    tl.to(
      camera.position,
      { z: 7.2, duration: 1.25, ease: "power2.out" },
      1.83
    );

    // Dynamic glow flare
    tl.fromTo(
      ".coin-glow-effect",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1.25, duration: 0.35, ease: "power2.out" },
      1.0
    );
    tl.to(
      ".coin-glow-effect",
      { opacity: 0.3, scale: 1.0, duration: 0.65, ease: "power2.out" },
      1.35
    );

    // Dynamic ripples on impact
    tl.fromTo(
      ".coin-shockwave-1",
      { scale: 0.5, opacity: 0 },
      { scale: 2.1, opacity: 1, duration: 0.85, ease: "power2.out" },
      1.0
    );
    tl.to(".coin-shockwave-1", { opacity: 0, duration: 0.4 }, 1.45);

    // Reveal text branding elements
    tl.to(
      ".coin-brand-name",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      },
      2.1
    );

    tl.to(
      ".coin-date",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      },
      2.3
    );

    // Final exit transition overlay fadeout
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.65,
        ease: "power2.inOut"
      },
      4.2
    );

    // 7. Core Render Loop
    let active = true;
    const animate = () => {
      if (!active) return;
      requestAnimationFrame(animate);

      const elapsed = (performance.now() - startTime) * 0.001;

      // Mathematical rocking clatter settle after the second bounce lands (at t = 1.83s)
      if (elapsed >= 1.83) {
        if (elapsed < 3.25) {
          const clatterTime = elapsed - 1.83;
          const decay = 3.6; // Exponential rate of decay
          const freq = 24.0;  // Precession frequency
          const amp = 0.38;   // Maximum tilt amplitude

          const tilt = amp * Math.exp(-decay * clatterTime);
          
          // Precess around the Z/X plane
          coinMesh.rotation.x = Math.PI / 2 + tilt * Math.cos(freq * clatterTime);
          coinMesh.rotation.z = tilt * Math.sin(freq * clatterTime);
          coinMesh.rotation.y = 0;
        } else {
          // Perfectly flat final resting position facing the camera
          coinMesh.rotation.set(Math.PI / 2, 0, 0);
        }
      }

      // Scale shadow based on Y height
      const heightFactor = Math.max(0, 1 - Math.abs(coinMesh.position.y) / 5.5);
      shadowMesh.scale.setScalar(0.45 + heightFactor * 0.55);
      shadowMesh.material.opacity = heightFactor * 0.75;
      shadowMesh.position.x = coinMesh.position.x;

      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize observer setup
    const handleResize = () => {
      if (!ctn) return;
      camera.aspect = ctn.clientWidth / ctn.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(ctn.clientWidth, ctn.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      active = false;
      tl.kill();
      window.removeEventListener("resize", handleResize);
      if (ctn && renderer.domElement.parentNode === ctn) {
        ctn.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onFinished, useWebGL]);

  return (
    <div ref={containerRef} className="loader-container">
      <div className="coin-3d-stage">
        {/* Glow flare on impact */}
        <div className="coin-glow-effect"></div>
        {/* Shockwave ripples */}
        <div className="coin-shockwave coin-shockwave-1"></div>
        
        {/* WebGL Mount Container */}
        {useWebGL ? (
          <div ref={mountRef} className="coin-webgl-container"></div>
        ) : (
          /* Fallback static content for low end devices or reduced motion */
          <div className="coin-fallback">
            <div className="coin-fallback-face">
              <svg viewBox="0 0 64 64" className="coin-svg-icon anvil-icon">
                <path
                  d="M12 16h40c2 0 4 2 4 4v6c0 2-2 4-4 4h-6.2c-2.4 0-4.5 1.6-5.1 4L38 46H26l-2.7-12c-.6-2.4-2.7-4-5.1-4H12c-2 0-4-2-4-4v-6c0-2 2-4 4-4z"
                  fill="#ffe082"
                />
                <path d="M18 46h28v6H18z" fill="#ffe082" />
                <path d="M32 10l-4 6h8z" fill="#ffe082" />
              </svg>
              <h2 className="coin-brand-name" style={{ opacity: 1, transform: "none" }}>
                TNPS Forge
              </h2>
              <span className="coin-date" style={{ opacity: 1, transform: "none" }}>
                ESTD 2026
              </span>
            </div>
          </div>
        )}

        {/* Text descriptions overlaid under the canvas */}
        <div className="coin-brand-wrapper">
          <h2 className="coin-brand-name">TNPS Forge</h2>
          <span className="coin-date">ESTD 2026</span>
        </div>
      </div>

      {/* Skip Controls */}
      <button ref={skipRef} onClick={handleSkip} className="skip-intro-btn">
        Skip Intro
      </button>
    </div>
  );
}
