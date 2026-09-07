import { defineCollection } from 'astro:content';
import { projectSchema } from './schema';

const projectsCollection = defineCollection({
  type: 'content',
  schema: projectSchema,
});

export const collections = {
  projects: projectsCollection,
};
