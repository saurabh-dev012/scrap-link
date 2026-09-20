import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
  depth?: number;
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  className = '',
  glareColor = 'rgba(52, 211, 153, 0.12)',
  depth = 15,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position in relative coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for natural inertia
  const springConfig = { damping: 20, stiffness: 260, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [depth, -depth]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-depth, depth]), springConfig);

  // Spotlight position for glare effect
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div style={{ perspective: '1100px' }} className="w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative transition-shadow duration-300 ${className}`}
      >
        {/* Child content rendered inside 3D space */}
        <div style={{ transform: 'translateZ(18px)' }}>
          {children}
        </div>

        {/* Dynamic Specular Glare Follower */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-inherit pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 240px at ${glareX.get()}% ${glareY.get()}%, ${glareColor}, transparent 80%)`,
              borderRadius: 'inherit',
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

