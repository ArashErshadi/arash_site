import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';
import type { ProjectData, LocalizedProjectContent } from '../content/schema';

export interface FormattedProject {
  id: string;
  slug: string;
  featured: boolean;
  order: number;
  cover: string;
  year: number;
  location: string;
  typology: string;
  scale: string;
  status: string;
  tools: string[];
  collaborators: string[];
  tags: string[];
  content: LocalizedProjectContent;
  rawEntry: CollectionEntry<'projects'>;
}

export function formatProjectForLocale(entry: CollectionEntry<'projects'>, locale: Locale = 'en'): FormattedProject {
  const data = entry.data as ProjectData;
  const localizedContent = locale === 'fa' ? data.fa : data.en;

  // Derive slug from entry.slug or directory
  const slug = entry.slug.replace(/\/index$/, '');

  return {
    id: entry.id,
    slug,
    featured: data.featured,
    order: data.order,
    cover: data.cover,
    year: data.year,
    location: data.location,
    typology: data.typology,
    scale: data.scale,
    status: data.status,
    tools: data.tools,
    collaborators: data.collaborators,
    tags: data.tags,
    content: localizedContent,
    rawEntry: entry,
  };
}

export async function getProjects(locale: Locale = 'en'): Promise<FormattedProject[]> {
  const entries = await getCollection('projects');
  // Exclude _template from public lists
  return entries
    .filter((e) => !e.slug.startsWith('_template') && !e.id.startsWith('_template'))
    .map((e) => formatProjectForLocale(e, locale))
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return b.year - a.year;
    });
}

export async function getFeaturedProjects(locale: Locale = 'en'): Promise<FormattedProject[]> {
  const all = await getProjects(locale);
  return all.filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string, locale: Locale = 'en'): Promise<FormattedProject | undefined> {
  const all = await getProjects(locale);
  return all.find((p) => p.slug === slug);
}

export async function getAdjacentProjects(currentSlug: string, locale: Locale = 'en') {
  const all = await getProjects(locale);
  const index = all.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return { prev: null, next: null };

  const prev = index > 0 ? all[index - 1] : null;
  const next = index < all.length - 1 ? all[index + 1] : null;

  return { prev, next };
}

export async function getRelatedProjects(currentSlug: string, locale: Locale = 'en', limit = 2): Promise<FormattedProject[]> {
  const all = await getProjects(locale);
  const current = all.find((p) => p.slug === currentSlug);
  if (!current) return [];

  return all
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      const aTypology = a.typology === current.typology ? 2 : 0;
      const bTypology = b.typology === current.typology ? 2 : 0;
      const aSharedTags = a.tags.filter((t) => current.tags.includes(t)).length;
      const bSharedTags = b.tags.filter((t) => current.tags.includes(t)).length;
      return (bTypology + bSharedTags) - (aTypology + aSharedTags);
    })
    .slice(0, limit);
}

export function extractFilterFacets(projects: FormattedProject[]) {
  const typologies = Array.from(new Set(projects.map((p) => p.typology))).filter(Boolean);
  const scales = Array.from(new Set(projects.map((p) => p.scale))).filter(Boolean);
  const years = Array.from(new Set(projects.map((p) => p.year))).sort((a, b) => b - a);
  const statuses = Array.from(new Set(projects.map((p) => p.status))).filter(Boolean);

  return {
    typologies,
    scales,
    years,
    statuses,
  };
}
