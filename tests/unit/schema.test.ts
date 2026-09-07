import { describe, it, expect } from 'vitest';
import { projectSchema } from '../../src/content/schema';

describe('Project Content Collection Schema (Zod)', () => {
  const sampleValidProject = {
    featured: true,
    order: 1,
    cover: '/projects/desert-cultural-center/cover.svg',
    year: 2025,
    location: 'Yazd, Iran',
    typology: 'Cultural & Civic',
    scale: '12,500 m²',
    status: 'Concept / Research',
    tools: ['Rhino', 'Grasshopper', 'Enscape', 'AutoCAD'],
    collaborators: ['Studio Context', 'A. ershadi'],
    tags: ['cultural', 'climate-responsive', 'earth-architecture'],
    en: {
      title: 'Desert Cultural Center & Water Pavilion',
      excerpt: 'Passive cooling, wind towers, and qanat-inspired subterranean galleries in an arid plateau.',
      premise: 'The project investigates historical vernacular thermal strategies integrated with contemporary computational masonry.',
      gallery: [
        {
          src: '/projects/desert-cultural-center/gallery/01.svg',
          alt: 'Axonometric projection of windcatchers and shading lattice',
          caption: 'Axonometric structural breakdown showing rammed-earth core and secondary timber lattice.',
          width: 1920,
          height: 1080
        }
      ],
      storyBlocks: [
        {
          type: 'fullBleed',
          src: '/projects/desert-cultural-center/gallery/01.svg',
          alt: 'Full view of desert landscape',
          caption: 'Integration into the horizon.'
        }
      ]
    },
    fa: {
      title: 'مرکز فرهنگی کویر و پاویون آب',
      excerpt: 'سرمایش غیرفعال، بادگیرهای نوین و گالری‌های زیرزمینی الهام‌گرفته از قنات در فلات مرکزی.',
      premise: 'این پروژه راهکارهای بومی مدیریت اقلیم را با تکنیک‌های معاصر ساخت تلفیق می‌کند.',
      gallery: [
        {
          src: '/projects/desert-cultural-center/gallery/01.svg',
          alt: 'دیاگرام آگزونومتریک بادگیرها و شبکه سایه‌انداز',
          caption: 'تحلیل ساختاری آگزونومتریک هسته خشتی و شبکه چوبی.',
          width: 1920,
          height: 1080
        }
      ],
      storyBlocks: [
        {
          type: 'fullBleed',
          src: '/projects/desert-cultural-center/gallery/01.svg',
          alt: 'نمای کامل در بستر کویر',
          caption: 'هماهنگی با خط افق و بستر طبیعی.'
        }
      ]
    }
  };

  it('validates a complete bilingual project object successfully', () => {
    const result = projectSchema.safeParse(sampleValidProject);
    expect(result.success).toBe(true);
  });

  it('fails if required bilingual fields are missing', () => {
    const invalid = { ...sampleValidProject, fa: undefined };
    const result = projectSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('fails if gallery item is missing required alt text or image src', () => {
    const invalid = {
      ...sampleValidProject,
      en: {
        ...sampleValidProject.en,
        gallery: [{ src: '', alt: '', caption: 'Test' }]
      }
    };
    const result = projectSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});
