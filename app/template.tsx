'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Ochi Design Signature Bottom-to-Top Wipe Curtain (Teal Accent) */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '-100%' }}
        transition={{
          duration: 0.75,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="fixed inset-0 z-[100] bg-accent pointer-events-none"
      />

      {/* Secondary Trail Curtain */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '-100%' }}
        transition={{
          duration: 0.75,
          delay: 0.04,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="fixed inset-0 z-[99] bg-muted pointer-events-none"
      />

      {/* Incoming Page Content Rise & Fade */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          delay: 0.2,
          ease: [0.215, 0.61, 0.355, 1],
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
