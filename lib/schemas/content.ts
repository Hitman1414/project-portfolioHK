import { z } from 'zod';

export const ProfileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  department: z.string().min(1),
  institution: z.string().min(1),
  location: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  linkedin: z.string().url(),
  phd: z.object({
    degree: z.string(),
    institution: z.string(),
    location: z.string(),
    year: z.number(),
    month: z.string(),
    topic: z.string(),
  }),
  qualifications: z.array(z.string()),
  languages: z.array(
    z.object({
      name: z.string(),
      proficiency: z.string(),
    })
  ),
  heroStatement: z.string().min(1),
  summary: z.string().min(1),
  photo: z.object({ src: z.string(), alt: z.string() }).optional(),
});

export const ResearchNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  level: z.number(),
});

export const ResearchTopicSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  summary: z.string(),
  description: z.string(),
  themes: z.array(z.string()),
  relatedPublications: z.array(z.string()),
  featured: z.boolean(),
  nodes: z.array(ResearchNodeSchema).optional(),
});

export const ResearchListSchema = z.array(ResearchTopicSchema);

export const PublicationSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  authors: z.array(z.string()),
  year: z.number().optional(),
  venue: z.string().optional(),
  abstract: z.string().optional(),
  keywords: z.array(z.string()),
  researchAreas: z.array(z.string()),
  featured: z.boolean(),
  doi: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  pdf: z.string().nullable().optional(),
});

export const PublicationListSchema = z.array(PublicationSchema);

export const ExperienceSchema = z.object({
  id: z.string(),
  role: z.string(),
  organization: z.string(),
  department: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  current: z.boolean(),
  highlights: z.array(z.string()),
});

export const ExperienceListSchema = z.array(ExperienceSchema);

export const EducationSchema = z.object({
  id: z.string(),
  degree: z.string(),
  field: z.string(),
  institution: z.string(),
  location: z.string(),
  year: z.number(),
  month: z.string().optional(),
  gpa: z.string().optional(),
  details: z.string(),
});

export const EducationListSchema = z.array(EducationSchema);

export const TeachingSchema = z.object({
  id: z.string(),
  code: z.string().optional(),
  title: z.string(),
  category: z.string(),
  level: z.string(),
  description: z.string(),
});

export const TeachingListSchema = z.array(TeachingSchema);

export const PatentSchema = z.object({
  id: z.string(),
  title: z.string(),
  inventors: z.array(z.string()).optional(),
  category: z.string().optional(),
  abstract: z.string().optional(),
  status: z.string().optional(),
  year: z.number().optional(),
  highlights: z.array(z.string()).optional(),
});

export const PatentListSchema = z.array(PatentSchema);

export const ProjectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  details: z.string(),
  status: z.string(),
  link: z.string().optional(),
});

export const ProjectListSchema = z.array(ProjectSchema);
