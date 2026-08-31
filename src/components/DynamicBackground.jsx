import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function DynamicBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Generate particles once on client side
    setParticles(Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    })));
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate parallax offsets
  const xOffset = (mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.05;
  const yOffset = (mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * 0.05;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] bg-gray-950 dark:bg-black transition-colors">
      {/* Parallax Container */}
      <motion.div
        animate={{ x: xOffset, y: yOffset }}
        transition={{ type: "spring", stiffness: 40, damping: 30 }}
        className="absolute inset-0 w-full h-full"
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-bl from-brand-600/30 via-purple-600/20 to-transparent rounded-full blur-[100px] mix-blend-screen"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -left-1/4 w-[700px] h-[700px] bg-gradient-to-tr from-teal-500/30 via-brand-500/20 to-transparent rounded-full blur-[100px] mix-blend-screen"
        />
        
        {/* Floating Particles */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
            className="absolute bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.initialX}%`,
              top: `${p.initialY}%`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
