'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { num: '01', label: 'RESEARCH', href: '/research' },
    { num: '02', label: 'PUBLICATIONS', href: '/publications' },
    { num: '03', label: 'TEACHING', href: '/teaching' },
    { num: '04', label: 'ACADEMIC JOURNEY', href: '/experience' },
    { num: '05', label: 'INNOVATION', href: '/patents' },
    { num: '06', label: 'ABOUT', href: '/about' },
    { num: '07', label: 'CV', href: '/cv' },
    { num: '08', label: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-border/50 transition-colors duration-300">
        {/* Reading Scroll Progress Line */}
        <div
          className="h-[2.5px] bg-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center space-x-3 text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center font-mono text-xs text-accent font-semibold group-hover:scale-105 transition-transform">
              HK
            </div>
            <div>
              <span className="font-serif text-lg md:text-xl font-medium tracking-tight text-foreground group-hover:text-accent transition-colors block leading-none">
                DR. HARSHITA KAUSHIK
              </span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:block mt-0.5">
                Assistant Professor · Srinivas University
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full border border-border hover:border-accent text-foreground/80 hover:text-accent transition-all focus:outline-none"
                aria-label="Toggle visual theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>
            )}

            {/* Menu Open Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-foreground text-background hover:bg-accent hover:text-accent-foreground font-mono text-xs tracking-wider transition-all focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <span>{isOpen ? 'CLOSE' : 'MENU'}</span>
              {isOpen ? <X className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Overlay Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col justify-between pt-28 pb-12 px-8 sm:px-16"
          >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 my-auto">
              <nav aria-label="Main Navigation">
                <ul className="space-y-3 sm:space-y-4">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group flex items-baseline space-x-4 focus:outline-none"
                        >
                          <span className="font-mono text-xs sm:text-sm text-accent/70 font-semibold group-hover:text-accent transition-colors">
                            {link.num}
                          </span>
                          <span
                            className={`font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight transition-all duration-300 ${
                              isActive
                                ? 'text-accent font-normal italic translate-x-2'
                                : 'text-foreground group-hover:text-accent group-hover:translate-x-2'
                            }`}
                          >
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-border/60 pt-8 md:pt-0 md:pl-12 space-y-8">
                <div>
                  <h4 className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-3">
                    Academic Identity
                  </h4>
                  <p className="font-serif text-lg sm:text-xl text-foreground/90 leading-relaxed">
                    Assistant Professor in Management at Srinivas University, exploring Artificial Intelligence, Conversational Commerce, and Consumer Engagement.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="font-mono text-xs text-muted-foreground uppercase">Affiliation</h5>
                    <p className="text-sm text-foreground">Srinivas University · Mangaluru, Karnataka</p>
                  </div>
                  <div>
                    <h5 className="font-mono text-xs text-muted-foreground uppercase">Doctoral Thesis</h5>
                    <p className="text-xs text-foreground/80 italic font-serif">
                      Tumkur University (February 2026)
                    </p>
                  </div>
                  <div>
                    <h5 className="font-mono text-xs text-muted-foreground uppercase">Contact</h5>
                    <a
                      href="mailto:harshitakaushik2409@gmail.com"
                      className="text-sm font-mono text-accent hover:underline"
                    >
                      harshitakaushik2409@gmail.com
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                  <span>© 2026 DR. HARSHITA KAUSHIK</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
