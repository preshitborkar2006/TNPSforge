import { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "./CircularGallery.css";

// GalleryCard handles mouse hover 3D tilt tracking for each card
function GalleryCard({ item, isActive, onClick }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 12; // horizontal tilt degree
    const rotateX = -(y / (rect.height / 2)) * 12; // vertical tilt degree
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  return (
    <div
      ref={cardRef}
      className={`circular-gallery-card glass-card ${isActive ? "is-active" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="card-image-container">
        <img src={item.image} alt={item.title} loading="lazy" />
        <div className="card-shimmer" />
      </div>
      <div className="card-info">
        <span className="card-category">{item.category}</span>
        <h4 className="card-title">{item.title}</h4>
      </div>
      {isActive && <div className="card-active-glow" />}
    </div>
  );
}

export default function CircularGallery({ items }) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const [backgroundParticles] = useState(() => {
    return Array.from({ length: 12 }).map((_, idx) => ({
      id: idx,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 8 + Math.random() * 10,
      size: 2 + Math.random() * 3
    }));
  });

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const inertiaRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastXRef = useRef(0);
  const isHoveredRef = useRef(false);
  const activeIndexRef = useRef(0);
  const targetRotationRef = useRef(0);

  // Compute positions inside requestAnimationFrame loop to bypass React re-renders at 60fps
  const updatePositions = useCallback(() => {
    if (!items || items.length === 0) return;
    const width = window.innerWidth;
    
    // Calculate radius metrics responsively (enlarged for better UI presence)
    let rX = 520;
    let rY = 90;
    if (width < 480) { rX = 145; rY = 30; }
    else if (width < 768) { rX = 250; rY = 45; }
    else if (width < 1024) { rX = 390; rY = 70; }
    
    const N = items.length;
    const currentRotation = rotationRef.current;
    
    let localActiveIndex = -1;
    let maxCos = -Infinity;
    
    items.forEach((item, idx) => {
      const angle = (idx * (2 * Math.PI) / N) + currentRotation;
      const cosVal = Math.cos(angle);
      if (cosVal > maxCos) {
        maxCos = cosVal;
        localActiveIndex = idx;
      }
      
      const el = itemRefs.current[idx];
      if (el) {
        const x = Math.sin(angle) * rX;
        const y = Math.cos(angle) * rY;
        
        // zNorm ranges [0, 1] representing [back, front] depth placement
        const zNorm = (cosVal + 1) / 2;
        
        const scale = 0.55 + 0.55 * zNorm; // scales from 0.55 to 1.10
        const opacity = 0.2 + 0.8 * zNorm;
        const blur = (1 - zNorm) * 6;
        const zIndex = Math.round(10 + 90 * zNorm);
        const brightness = 35 + 65 * zNorm;
        
        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        el.style.zIndex = zIndex;
        el.style.opacity = opacity;
        el.style.filter = `blur(${blur}px) brightness(${brightness}%)`;
      }
    });
    
    if (localActiveIndex !== -1 && localActiveIndex !== activeIndexRef.current) {
      activeIndexRef.current = localActiveIndex;
      setActiveIndex(localActiveIndex);
    }
  }, [items]);

  useEffect(() => {
    let animationId;
    
    const animate = () => {
      if (isDraggingRef.current) {
        // Keep target rotation in sync while dragging
        targetRotationRef.current = rotationRef.current;
      } else {
        // If there is significant velocity inertia, apply it
        if (Math.abs(inertiaRef.current) > 0.0001) {
          rotationRef.current += inertiaRef.current;
          inertiaRef.current *= 0.92;
          targetRotationRef.current = rotationRef.current;
        } else {
          // Smoothly ease towards targetRotationRef (clicked card or auto-rotating angle)
          const diff = targetRotationRef.current - rotationRef.current;
          rotationRef.current += diff * 0.08; // smooth spring constant
          
          // Continuous slow drift if not hovered and not dragging
          if (!isHoveredRef.current) {
            targetRotationRef.current += 0.0015;
          }
        }
      }
      
      updatePositions();
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [items, updatePositions]);

  // Touch listener passive setup to bypass swipe locks on mobile viewports
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchMove = (e) => {
      if (isDraggingRef.current && e.touches.length > 0) {
        e.preventDefault();
        const clientX = e.touches[0].clientX;
        
        const dx = clientX - startXRef.current;
        const width = window.innerWidth;
        let rX = 480;
        if (width < 480) rX = 130;
        else if (width < 768) rX = 220;
        else if (width < 1024) rX = 350;
        
        const angleChange = (dx / rX) * 1.5;
        rotationRef.current = startAngleRef.current + angleChange;

        // Velocity tracking
        const now = Date.now();
        const dt = now - lastTimeRef.current;
        if (dt > 0) {
          const deltaX = clientX - lastXRef.current;
          velocityRef.current = deltaX / dt;
        }
        lastTimeRef.current = now;
        lastXRef.current = clientX;
      }
    };

    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const handleDragStart = (clientX) => {
    isDraggingRef.current = true;
    startXRef.current = clientX;
    startAngleRef.current = rotationRef.current;
    velocityRef.current = 0;
    inertiaRef.current = 0;
    lastTimeRef.current = Date.now();
    lastXRef.current = clientX;
  };

  const handleDragMove = (clientX) => {
    if (!isDraggingRef.current) return;
    const dx = clientX - startXRef.current;
    const width = window.innerWidth;
    let rX = 480;
    if (width < 480) rX = 130;
    else if (width < 768) rX = 220;
    else if (width < 1024) rX = 350;
    
    const angleChange = (dx / rX) * 1.5;
    rotationRef.current = startAngleRef.current + angleChange;
    
    const now = Date.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      const deltaX = clientX - lastXRef.current;
      velocityRef.current = deltaX / dt;
    }
    lastTimeRef.current = now;
    lastXRef.current = clientX;
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    // Cap inertia momentum limits
    const maxVelocity = 0.5;
    const vel = Math.max(-maxVelocity, Math.min(maxVelocity, velocityRef.current));
    inertiaRef.current = vel * 12;
  };

  const handleSpotlightMove = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    container.style.setProperty("--mouse-x", `${x}px`);
    container.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseDown = (e) => {
    if (e.target.tagName === "IMG") e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    handleSpotlightMove(e);
    if (isDraggingRef.current) {
      handleDragMove(e.clientX);
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches.length > 0) {
      handleDragStart(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const N = items.length;
    if (N === 0) return;
    const nextIdx = (activeIndex + 1) % N;
    const targetAngle = -nextIdx * (2 * Math.PI) / N;
    let diff = targetAngle - rotationRef.current;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    targetRotationRef.current = rotationRef.current + diff;
    inertiaRef.current = 0;
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const N = items.length;
    if (N === 0) return;
    const prevIdx = (activeIndex - 1 + N) % N;
    const targetAngle = -prevIdx * (2 * Math.PI) / N;
    let diff = targetAngle - rotationRef.current;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    targetRotationRef.current = rotationRef.current + diff;
    inertiaRef.current = 0;
  };

  return (
    <div className="circular-gallery-wrapper">
      <div
        ref={containerRef}
        className="circular-gallery-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={() => {
          handleDragEnd();
          isHoveredRef.current = false;
        }}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Control Buttons */}
        {items && items.length > 1 && (
          <>
            <button className="gallery-nav-btn prev" onClick={handlePrev} aria-label="Previous image">
              <ChevronLeft size={22} />
            </button>
            <button className="gallery-nav-btn next" onClick={handleNext} aria-label="Next image">
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Gallery Background Orbs & Spotlight */}
        <div className="gallery-bg-glow">
          <div className="bg-orb-1" />
          <div className="bg-orb-2" />
        </div>
        <div className="gallery-spotlight" />
        <div className="gallery-particles">
          {backgroundParticles.map((p) => (
            <div
              key={p.id}
              className="gallery-particle"
              style={{
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                width: `${p.size}px`,
                height: `${p.size}px`
              }}
            />
          ))}
        </div>

        {/* Carousel Stage */}
        <div className="circular-gallery-stage">
          {items.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => (itemRefs.current[idx] = el)}
              className="circular-item-wrapper"
            >
              <GalleryCard
                item={item}
                isActive={idx === activeIndex}
                onClick={() => {
                  if (idx === activeIndex) {
                    setSelectedImage(item);
                  } else {
                    // Smoothly pull item to the front using shortest-path trigonometry
                    const N = items.length;
                    const targetAngle = -idx * (2 * Math.PI) / N;
                    // Find difference and normalize to [-PI, PI]
                    let diff = targetAngle - rotationRef.current;
                    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
                    // Set new target rotation
                    targetRotationRef.current = rotationRef.current + diff;
                    inertiaRef.current = 0; // stop any ongoing momentum
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Active Card descriptions rendered below */}
      {items[activeIndex] && (
        <div className="active-item-details">
          <h3 className="active-title-header">{items[activeIndex].title}</h3>
          <p className="active-meta-desc">
            {items[activeIndex].category} // {items[activeIndex].date}
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
          <button className="modal-close" onClick={() => setSelectedImage(null)}>
            <X size={24} />
          </button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.image} alt={selectedImage.title} />
            <div className="modal-caption">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.category} // {selectedImage.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
