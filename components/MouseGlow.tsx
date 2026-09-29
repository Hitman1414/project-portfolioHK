'use client';

import { useEffect, useRef } from 'react';

export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number>();

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMove);

    const animate = () => {
      // Ease toward the cursor rather than snapping — smoother, less jarring near edges
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.background = `
          radial-gradient(700px circle at ${current.current.x}px ${current.current.y}px, var(--accent-glow), transparent 60%),
          radial-gradient(260px circle at ${current.current.x}px ${current.current.y}px, var(--accent-glow), transparent 70%)
        `;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-80"
      aria-hidden="true"
    />
  );
}
