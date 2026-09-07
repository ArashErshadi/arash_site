import { describe, it, expect } from 'vitest';
import { getEquivalentRoute, getLocaleFromPath, getHreflangLinks, normalizePath } from '../../src/utils/i18n';

describe('i18n Routing and URL Translation Helpers', () => {
  it('normalizes path strings to include consistent leading and trailing slashes', () => {
    expect(normalizePath('')).toBe('/');
    expect(normalizePath('projects')).toBe('/projects/');
    expect(normalizePath('/projects/')).toBe('/projects/');
    expect(normalizePath('/fa/projects')).toBe('/fa/projects/');
  });

  it('identifies locale from pathname correctly', () => {
    expect(getLocaleFromPath('/')).toBe('en');
    expect(getLocaleFromPath('/projects/')).toBe('en');
    expect(getLocaleFromPath('/fa/')).toBe('fa');
    expect(getLocaleFromPath('/fa/projects/')).toBe('fa');
    expect(getLocaleFromPath('/fa/resume/')).toBe('fa');
  });

  it('translates English routes to corresponding Farsi routes', () => {
    expect(getEquivalentRoute('/', 'fa')).toBe('/fa/');
    expect(getEquivalentRoute('/projects/', 'fa')).toBe('/fa/projects/');
    expect(getEquivalentRoute('/projects/desert-cultural-center/', 'fa')).toBe('/fa/projects/desert-cultural-center/');
    expect(getEquivalentRoute('/resume/', 'fa')).toBe('/fa/resume/');
    expect(getEquivalentRoute('/about/', 'fa')).toBe('/fa/about/');
    expect(getEquivalentRoute('/contact/', 'fa')).toBe('/fa/contact/');
    expect(getEquivalentRoute('/privacy/', 'fa')).toBe('/fa/privacy/');
    expect(getEquivalentRoute('/thank-you/', 'fa')).toBe('/fa/thank-you/');
  });

  it('translates Farsi routes to corresponding English routes', () => {
    expect(getEquivalentRoute('/fa/', 'en')).toBe('/');
    expect(getEquivalentRoute('/fa/projects/', 'en')).toBe('/projects/');
    expect(getEquivalentRoute('/fa/projects/desert-cultural-center/', 'en')).toBe('/projects/desert-cultural-center/');
    expect(getEquivalentRoute('/fa/resume/', 'en')).toBe('/resume/');
    expect(getEquivalentRoute('/fa/about/', 'en')).toBe('/about/');
    expect(getEquivalentRoute('/fa/contact/', 'en')).toBe('/contact/');
    expect(getEquivalentRoute('/fa/privacy/', 'en')).toBe('/privacy/');
    expect(getEquivalentRoute('/fa/thank-you/', 'en')).toBe('/thank-you/');
  });

  it('returns same path if target locale matches current locale', () => {
    expect(getEquivalentRoute('/projects/', 'en')).toBe('/projects/');
    expect(getEquivalentRoute('/fa/projects/', 'fa')).toBe('/fa/projects/');
  });

  it('generates valid hreflang alternate links', () => {
    const siteUrl = 'https://example.com';
    const links = getHreflangLinks('/projects/desert-cultural-center/', siteUrl);
    expect(links.en).toBe('https://example.com/projects/desert-cultural-center/');
    expect(links.fa).toBe('https://example.com/fa/projects/desert-cultural-center/');
    expect(links.xDefault).toBe('https://example.com/projects/desert-cultural-center/');
  });
});
