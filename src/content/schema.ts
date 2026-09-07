import { z } from 'astro/zod';

export const galleryItemSchema = z.object({
  src: z.string().min(1, 'Image src is required'),
  alt: z.string().min(1, 'Image alt text is required for accessibility'),
  caption: z.string().optional(),
  width: z.number().optional().default(1920),
  height: z.number().optional().default(1080),
  aspectRatio: z.string().optional(),
});

export const storyBlockSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('fullBleed'),
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal('twoUp'),
    left: z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    }),
    right: z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    }),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal('imageText'),
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
    heading: z.string().optional(),
    text: z.string(),
    imagePosition: z.enum(['start', 'end']).optional().default('start'),
  }),
  z.object({
    type: z.literal('drawingPlate'),
    src: z.string(),
    alt: z.string(),
    title: z.string().optional(),
    scale: z.string().optional(),
    drawingType: z.string().optional(),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal('gallery'),
    items: z.array(galleryItemSchema),
    columns: z.number().optional().default(3),
  }),
  z.object({
    type: z.literal('quote'),
    quote: z.string(),
    attribution: z.string().optional(),
  }),
]);

export const localizedProjectContentSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  premise: z.string().min(1),
  metadataLabels: z.record(z.string()).optional(),
  gallery: z.array(galleryItemSchema).default([]),
  storyBlocks: z.array(storyBlockSchema).default([]),
});

export const projectSchema = z.object({
  featured: z.boolean().default(false),
  order: z.number().default(99),
  cover: z.string().min(1),
  year: z.number(),
  location: z.string(),
  typology: z.string(),
  scale: z.string(),
  status: z.string(),
  tools: z.array(z.string()).default([]),
  collaborators: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  en: localizedProjectContentSchema,
  fa: localizedProjectContentSchema,
});

export type ProjectData = z.infer<typeof projectSchema>;
export type LocalizedProjectContent = z.infer<typeof localizedProjectContentSchema>;
export type StoryBlock = z.infer<typeof storyBlockSchema>;
export type GalleryItem = z.infer<typeof galleryItemSchema>;
