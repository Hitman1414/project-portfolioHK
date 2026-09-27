'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, Award, CheckCircle2 } from 'lucide-react';

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  type: 'education' | 'experience' | 'qualification';
  location: string;
  details: string;
  current?: boolean;
}

interface AcademicTimelineProps {
  education: any[];
  experience: any[];
}

export function AcademicTimeline({ education, experience }: AcademicTimelineProps) {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'EDUCATION' | 'EXPERIENCE'>('ALL');

  // Merge & sort timeline chronologically based on verified source data
  const combinedTimeline: TimelineItem[] = [
    {
      id: 't-2026-curr',
      year: 'AUG 2026 – PRESENT',
      title: 'Assistant Professor (MBA)',
      organization: 'Srinivas University',
      type: 'experience',
      location: 'Mangaluru, Karnataka',
      details: 'Delivering post-graduate MBA instruction in Marketing, Consumer Behaviour, and Strategic Management.',
      current: true,
    },
    {
      id: 't-2026-phd',
      year: 'FEB 2026',
      title: 'Ph.D. in Management',
      organization: 'Tumkur University',
      type: 'education',
      location: 'Tumkur, Karnataka',
      details: 'Dissertation: "Impact of Artificial Intelligence and Conversational Interfaces on E-Commerce companies- An evaluation of customer’s engagement in Bengaluru city".',
    },
    {
      id: 't-2022-2026',
      year: 'JUN 2022 – JUL 2026',
      title: 'Assistant Professor (MBA)',
      organization: 'Acharya Institute of Technology',
      type: 'experience',
      location: 'Bengaluru, Karnataka',
      details: 'Built student rapport, evaluated comprehensive assessments, and inspired critical thinking in management pedagogy.',
    },
    {
      id: 't-2021-2022',
      year: 'MAY 2021 – JUN 2022',
      title: 'Assistant Professor & E-Cell Coordinator',
      organization: 'BMS College of Commerce and Management',
      type: 'experience',
      location: 'Bengaluru, Karnataka',
      details: 'Faculty Coordinator of Entrepreneurship Cell (E-Cell) and member of curriculum development committee.',
    },
    {
      id: 't-2020-net',
      year: '2020',
      title: 'UGC NET & KSET Qualified (Management)',
      organization: 'National & Karnataka State Eligibility Tests',
      type: 'qualification',
      location: 'India',
      details: 'Qualified National Eligibility Test (NET) and Karnataka State Eligibility Test (KSET) for Assistant Professorship.',
    },
    {
      id: 't-2020-2021',
      year: 'SEP 2020 – APR 2021',
      title: 'Assistant Professor',
      organization: 'Aditya Institute of Management and Research (AIMSR)',
      type: 'experience',
      location: 'Bengaluru, Karnataka',
      details: 'Created interactive course materials and mentored MBA students on internship readiness.',
    },
    {
      id: 't-2019',
      year: 'JAN 2019 – DEC 2019',
      title: 'Assistant Professor',
      organization: 'Sri Krishnan P G College',
      type: 'experience',
      location: 'Uttar Pradesh, India',
      details: 'Undergraduate business administration lectures and curriculum planning.',
    },
    {
      id: 't-2018-2019',
      year: 'JUN 2018 – JAN 2019',
      title: 'Techno Functional Analyst / Business Analyst',
      organization: 'IDFC FIRST Bank',
      type: 'experience',
      location: 'Mumbai, Maharashtra',
      details: 'Client requirement mapping, solution architecture design, and banking product competitor analysis.',
    },
    {
      id: 't-2018-mba',
      year: 'MAY 2016 – MAY 2018',
      title: 'Master of Business Administration (MBA, Marketing)',
      organization: 'Institute of Management Studies, BHU',
      type: 'education',
      location: 'Varanasi, Uttar Pradesh',
      details: 'Specialization in Marketing Management & Consumer Behavior (CGPA 8.3).',
    },
    {
      id: 't-2016-bsc',
      year: 'MAY 2012 – MAY 2016',
      title: 'Bachelor of Science (B.Sc., Botany)',
      organization: 'Institute of Science, BHU',
      type: 'education',
      location: 'Varanasi, Uttar Pradesh',
      details: 'Foundational scientific research methods and analytical reasoning (CGPA 7.3).',
    },
  ];

  const filteredItems = combinedTimeline.filter((item) => {
    if (activeFilter === 'EDUCATION') return item.type === 'education' || item.type === 'qualification';
    if (activeFilter === 'EXPERIENCE') return item.type === 'experience';
    return true;
  });

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border/60 pb-8 gap-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 font-mono text-xs text-accent uppercase tracking-widest font-semibold">
            <GraduationCap className="w-4 h-4" />
            <span>Academic & Professional Progression</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
            Academic Journey
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            Verified timeline spanning Banaras Hindu University, IDFC FIRST Bank, doctoral studies at Tumkur University, and current professorship at Srinivas University.
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center space-x-2 bg-muted/60 p-1.5 rounded-full border border-border/60 font-mono text-xs self-start md:self-auto">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeFilter === 'ALL'
                ? 'bg-accent text-accent-foreground font-semibold shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            ALL JOURNEY
          </button>
          <button
            onClick={() => setActiveFilter('EDUCATION')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeFilter === 'EDUCATION'
                ? 'bg-accent text-accent-foreground font-semibold shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            EDUCATION & QUALS
          </button>
          <button
            onClick={() => setActiveFilter('EXPERIENCE')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeFilter === 'EXPERIENCE'
                ? 'bg-accent text-accent-foreground font-semibold shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            APPOINTMENTS
          </button>
        </div>
      </div>

      {/* Editorial Vertical Timeline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="relative pl-6 sm:pl-10 border-l border-border/80 space-y-12 my-8"
        >
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              whileHover={{ y: -3 }}
              className="relative group"
            >
            {/* Timeline Circle Bullet */}
            <div
              className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-all group-hover:scale-125 ${
                item.current
                  ? 'bg-accent border-accent shadow-md shadow-accent/40 animate-pulse'
                  : 'bg-background border-accent'
              }`}
            />

            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-border/80 space-y-4 hover:border-accent/40 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4 font-mono text-xs">
                <span className="text-accent font-semibold flex items-center space-x-2">
                  {item.type === 'education' ? (
                    <GraduationCap className="w-3.5 h-3.5" />
                  ) : item.type === 'qualification' ? (
                    <Award className="w-3.5 h-3.5" />
                  ) : (
                    <Briefcase className="w-3.5 h-3.5" />
                  )}
                  <span>{item.year}</span>
                </span>
                <span className="text-muted-foreground uppercase">{item.location}</span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-normal text-foreground group-hover:text-accent transition-colors flex items-center space-x-3">
                  <span>{item.title}</span>
                  {item.current && (
                    <span className="font-mono text-[10px] text-accent bg-accent/10 border border-accent/30 px-2 py-0.5 rounded uppercase tracking-wider">
                      Current Profile
                    </span>
                  )}
                </h3>
                <p className="font-sans text-sm text-foreground/80 font-medium mt-1">
                  {item.organization}
                </p>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                {item.details}
              </p>
            </div>
          </motion.div>
        ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
