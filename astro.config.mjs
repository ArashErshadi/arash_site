import { defineConfig } from 'astro/config';
import customSitemap from './src/utils/sitemapIntegration';

const site = process.env.PUBLIC_SITE_URL || 'https://mg.github.io';
const base = process.env.PUBLIC_BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fa'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    customSitemap({ siteUrl: site }),
  ],
});
