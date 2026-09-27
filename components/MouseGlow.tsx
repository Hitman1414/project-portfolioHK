'use client';

import { useRef, useState, useEffect } from 'react';

interface MouseGlowProps {
  className?: string;
}

export function MouseGlow({ className = '' }: MouseGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y });
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-500 ease-out ${className}`}
      style={{
        opacity,
        background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, rgba(20, 184, 166, 0.16) 0%, rgba(234, 179, 8, 0.09) 40%, transparent 80%)`,
      }}
    />
  );
}
