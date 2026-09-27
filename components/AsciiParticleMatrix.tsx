'use client';

import { useRef, useEffect } from 'react';

interface AsciiMatrixProps {
  className?: string;
}

export function AsciiParticleMatrix({ className = '' }: AsciiMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Mouse coordinates with smooth spring target
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false };

    const symbols = ['+', '•', '◦', ':', '::', '1', '0', '*', '✦', '·', 'x'];

    // Matrix Grid configuration
    const cols = 48;
    const rows = 28;
    let grid: {
      x: number;
      y: number;
      char: string;
      baseOpacity: number;
      currentOpacity: number;
      speed: number;
      offset: number;
      color: string;
    }[] = [];

    const initGrid = () => {
      const parent = canvas.parentElement;
      width = canvas.width = parent?.clientWidth || window.innerWidth;
      height = canvas.height = parent?.clientHeight || 600;

      grid = [];
      const cellW = width / cols;
      const cellH = height / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          grid.push({
            x: c * cellW + cellW / 2,
            y: r * cellH + cellH / 2,
            char: symbols[Math.floor(Math.random() * symbols.length)],
            baseOpacity: 0.03 + Math.random() * 0.07,
            currentOpacity: 0.04,
            speed: 0.015 + Math.random() * 0.025,
            offset: Math.random() * Math.PI * 2,
            color: Math.random() > 0.35 ? '#14b8a6' : '#eab308',
          });
        }
      }
    };

    const handleResize = () => {
      initGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }
    window.addEventListener('resize', handleResize);

    initGrid();

    let time = 0;
    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse spring interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < grid.length; i++) {
        const pt = grid[i];

        // Random idle pulse motion when mouse is static (stateofaidesign shimmer)
        const idlePulse = Math.sin(time * pt.speed * 2.5 + pt.offset) * 0.04;
        let targetOp = Math.max(0.02, pt.baseOpacity + idlePulse);

        // Interactive mouse proximity illumination
        if (mouse.active) {
          const dx = mouse.x - pt.x;
          const dy = mouse.y - pt.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 240;

          if (dist < radius) {
            const factor = Math.pow(1 - dist / radius, 2.2);
            targetOp = Math.min(0.88, targetOp + factor * 0.82);
          }
        }

        pt.currentOpacity += (targetOp - pt.currentOpacity) * 0.1;

        if (pt.currentOpacity > 0.015) {
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = pt.currentOpacity;
          ctx.fillText(pt.char, pt.x, pt.y);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}
