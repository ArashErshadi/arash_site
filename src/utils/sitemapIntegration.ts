import type { AstroIntegration } from 'astro';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { getEquivalentRoute, getHreflangLinks, normalizePath } from './i18n';

interface SitemapOptions {
  siteUrl?: string;
}

export default function customSitemapIntegration(options: SitemapOptions = {}): AstroIntegration {
  return {
    name: 'custom-bilingual-sitemap',
    hooks: {
      'astro:build:done': async ({ dir, pages, logger }) => {
        const siteUrl = options.siteUrl || 'https://mg.github.io';
        const outDir = fileURLToPath(dir);

        // Filter out 404 and non-html pages
        const validPages = pages
          .map((p) => p.pathname)
          .filter((p) => !p.includes('404') && !p.includes('.') && p !== '404.html');

        logger.info(`Generating bilingual sitemap for ${validPages.length} routes...`);

        const urlEntries: string[] = [];

        for (const pagePath of validPages) {
          const normalized = normalizePath(pagePath);
          const fullUrl = new URL(normalized, siteUrl).href;
          const hreflang = getHreflangLinks(normalized, siteUrl);

          urlEntries.push(`  <url>
    <loc>${fullUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${hreflang.en}"/>
    <xhtml:link rel="alternate" hreflang="fa" href="${hreflang.fa}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${hreflang.xDefault}"/>
    <changefreq>weekly</changefreq>
    <priority>${normalized === '/' || normalized === '/fa/' ? '1.0' : '0.8'}</priority>
  </url>`);
        }

        const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>
`;

        const sitemapPath = path.join(outDir, 'sitemap.xml');
        fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');
        logger.info(`Created sitemap.xml at ${sitemapPath}`);

        // Generate robots.txt
        const robotsTxt = `# robots.txt for Arash Ershadi Portfolio
User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', siteUrl).href}
`;
        const robotsPath = path.join(outDir, 'robots.txt');
        fs.writeFileSync(robotsPath, robotsTxt, 'utf-8');
        logger.info(`Created robots.txt at ${robotsPath}`);
      },
    },
  };
}
