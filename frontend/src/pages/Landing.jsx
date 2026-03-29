import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Wallet } from "lucide-react";

export default function Landing() {
  const containerRef = useRef(null);
  
  // Track scroll progress across a 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fade out hero text quickly
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Tablet scale gets bigger as you scroll
  const tabletScale = useTransform(scrollYProgress, [0, 0.8, 1], [0.9, 1.3, 1.3]);
  
  // Opacities inside the screen
  const screen1Opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const screen2Opacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <div style={{ backgroundColor: "var(--bg-color)" }}>

      <nav className="landing-nav">
        <Link to="#">Benefits</Link>
        <Link to="#">Specifications</Link>
        <Link to="#">How-to</Link>
        <Link to="#">Contact Us</Link>
        <Link to="/auth" style={{ marginLeft: "2rem", color: "var(--accent-sage)", borderBottom: "1px solid var(--accent-sage)" }}>Sign In / Register</Link>
      </nav>

      <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
        
        {/* Sticky container that stays fixed while you scroll */}
        <div style={{ position: "sticky", top: "0", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", overflow: "hidden" }}>
          
          {/* Header Section */}
          <motion.div style={{ opacity: heroOpacity, textAlign: "center", position: "absolute", top: "15vh", zIndex: 10, width: "100%", pointerEvents: "none" }}>
            <h1 style={{ fontSize: "clamp(4.5rem, 10vw, 8rem)", margin: "0", lineHeight: 0.9, color: "var(--text-main)", letterSpacing: "-0.04em", pointerEvents: "auto" }}>
              Browse everything.
            </h1>
          </motion.div>

          {/* Sage Green Background Block Behind Tablet */}
          <div style={{ 
            position: "absolute", 
            bottom: "0", 
            width: "90%", 
            maxWidth: "1100px", 
            height: "45vh", 
            background: "var(--accent-sage)", 
            borderRadius: "40px 40px 0 0",
            zIndex: 1
          }}></div>

          <motion.div 
            className="tablet-mockup"
            style={{
              scale: tabletScale,
              transformOrigin: "bottom center",
              zIndex: 20,
              marginBottom: "-20px" // Overlap bottom edge slightly like the image
            }}
          >
            <div className="tablet-screen">
              
              {/* Screen 1: The UI (Dashboard Simulation mimicking the image) */}
              <motion.div style={{ opacity: screen1Opacity, position: "absolute", inset: 0, padding: "3rem", background: "linear-gradient(to bottom, #7BA3B5, #4A7056)" }}>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", marginBottom: "2rem" }}>Reports > Overview</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "1rem", marginBottom: "2rem" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
                        <h2 style={{ fontSize: "5rem", color: "white", margin: 0, lineHeight: 1 }}>78%</h2>
                        <h3 style={{ fontSize: "2rem", color: "white", margin: 0, fontWeight: 400, fontFamily: "'Inter', sans-serif" }}>Efficiency Improvements</h3>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.2)", padding: "0.5rem 1rem", borderRadius: "20px", color: "white", fontSize: "0.85rem" }}>All Regions (33) ▾</div>
                </div>
                {/* Scatter Plot Simulation Dots */}
                <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "80%", height: "40%" }}>
                    <div style={{ width: "8px", height: "8px", background: "white", borderRadius: "50%", position: "absolute", bottom: "10%", left: "10%", boxShadow: "0 0 10px rgba(255,255,255,0.8)" }}></div>
                    <div style={{ width: "8px", height: "8px", background: "white", borderRadius: "50%", position: "absolute", bottom: "35%", left: "30%", boxShadow: "0 0 10px rgba(255,255,255,0.8)" }}></div>
                    <div style={{ width: "8px", height: "8px", background: "white", borderRadius: "50%", position: "absolute", bottom: "25%", left: "50%", boxShadow: "0 0 10px rgba(255,255,255,0.8)" }}></div>
                    <div style={{ width: "8px", height: "8px", background: "white", borderRadius: "50%", position: "absolute", bottom: "60%", left: "70%", boxShadow: "0 0 10px rgba(255,255,255,0.8)" }}></div>
                    <div style={{ width: "8px", height: "8px", background: "white", borderRadius: "50%", position: "absolute", bottom: "90%", left: "90%", boxShadow: "0 0 10px rgba(255,255,255,0.8)" }}></div>
                </div>
              </motion.div>

              {/* Screen 2: Navjyot End Credit */}
              <motion.div style={{ opacity: screen2Opacity, position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#FFFFFF", color: "var(--text-main)", textAlign: "center" }}>
                  <Wallet size={80} style={{ marginBottom: "2rem", color: "var(--accent-sage)" }} strokeWidth={1.5} />
                  <h1 style={{ fontSize: "4.5rem", marginBottom: "1rem" }}>Created by Navjyot</h1>
                  <h2 style={{ fontSize: "2rem", color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>Wallet Simulation UI</h2>
                  <div style={{ marginTop: "3rem", padding: "1.5rem", background: "var(--bg-color)", border: "1px solid var(--border-color)", borderRadius: "16px", color: "var(--text-main)", maxWidth: "500px", fontSize: "1.1rem" }}>
                    A full-stack fintech project designed to showcase beautiful UI, seamless animations, and robust backend functionality!
                  </div>
              </motion.div>
              
            </div>
          </motion.div>
        </div>
      </div>
      
      <footer style={{ background: "var(--bg-color)", color: "var(--text-muted)", padding: "4rem", textAlign: "center", borderTop: "1px solid var(--border-color)" }}>
          <p>© 2026 Navjyot Wallet Simulation. All rights reserved.</p>
      </footer>
    </div>
  );
}
