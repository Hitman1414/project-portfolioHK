import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

export function getProfile() {
  const file = path.join(contentDir, 'profile.json');
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
}

export function getResearch() {
  const file = path.join(contentDir, 'research.json');
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
}

export function getResearchBySlug(slug: string) {
  const items = getResearch();
  return items.find((item: any) => item.slug === slug) || null;
}

export function getPublications() {
  const file = path.join(contentDir, 'publications.json');
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
}

export function getPublicationBySlug(slug: string) {
  const items = getPublications();
  return items.find((item: any) => item.slug === slug) || null;
}

export function getExperience() {
  const file = path.join(contentDir, 'experience.json');
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
}

export function getEducation() {
  const file = path.join(contentDir, 'education.json');
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
}

export function getTeaching() {
  const file = path.join(contentDir, 'teaching.json');
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
}

export function getPatents() {
  const file = path.join(contentDir, 'patents.json');
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
}

export function getProjects() {
  const file = path.join(contentDir, 'projects.json');
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
}

export function getSiteConfig() {
  const file = path.join(contentDir, 'site.json');
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
}
