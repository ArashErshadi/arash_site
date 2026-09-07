import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('SEO, Structured Data & Metadata Verification', () => {
  const distDir = path.resolve(__dirname, '../../dist');

  it('verifies sitemap.xml exists and contains valid XML structure', () => {
    const sitemapPath = path.join(distDir, 'sitemap.xml');
    expect(fs.existsSync(sitemapPath)).toBe(true);
    const xml = fs.readFileSync(sitemapPath, 'utf-8');
    expect(xml).toContain('<urlset');
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="en"');
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="fa"');
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="x-default"');
    expect(xml).not.toContain('/404/');
  });

  it('verifies robots.txt exists and references sitemap.xml', () => {
    const robotsPath = path.join(distDir, 'robots.txt');
    expect(fs.existsSync(robotsPath)).toBe(true);
    const txt = fs.readFileSync(robotsPath, 'utf-8');
    expect(txt).toContain('User-agent: *');
    expect(txt).toContain('Sitemap:');
    expect(txt).toContain('sitemap.xml');
  });

  it('verifies English and Farsi homepage HTML contains canonical and hreflang tags', () => {
    const enHtmlPath = path.join(distDir, 'index.html');
    const faHtmlPath = path.join(distDir, 'fa/index.html');
    expect(fs.existsSync(enHtmlPath)).toBe(true);
    expect(fs.existsSync(faHtmlPath)).toBe(true);

    const enHtml = fs.readFileSync(enHtmlPath, 'utf-8');
    expect(enHtml).toContain('<link rel="canonical"');
    expect(enHtml).toContain('hreflang="en"');
    expect(enHtml).toContain('hreflang="fa"');
    expect(enHtml).toContain('og:title');
    expect(enHtml).toContain('application/ld+json');

    const faHtml = fs.readFileSync(faHtmlPath, 'utf-8');
    expect(faHtml).toContain('dir="rtl"');
    expect(faHtml).toContain('lang="fa"');
    expect(faHtml).toContain('<link rel="canonical"');
    expect(faHtml).toContain('hreflang="en"');
    expect(faHtml).toContain('hreflang="fa"');
  });

  it('verifies project detail page contains JSON-LD BreadcrumbList and CreativeWork schema', () => {
    const projHtmlPath = path.join(distDir, 'projects/desert-cultural-center/index.html');
    expect(fs.existsSync(projHtmlPath)).toBe(true);
    const html = fs.readFileSync(projHtmlPath, 'utf-8');
    expect(html).toContain('BreadcrumbList');
    expect(html).toContain('CreativeWork');
  });
});
