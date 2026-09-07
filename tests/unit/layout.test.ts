import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Layout Shell & Base Components Structure', () => {
  const baseLayoutPath = path.resolve(__dirname, '../../src/layouts/BaseLayout.astro');
  const headerPath = path.resolve(__dirname, '../../src/components/Header.astro');
  const footerPath = path.resolve(__dirname, '../../src/components/Footer.astro');
  const langSwitcherPath = path.resolve(__dirname, '../../src/components/LanguageSwitcher.astro');

  it('verifies that BaseLayout.astro exists and includes critical semantic elements', () => {
    expect(fs.existsSync(baseLayoutPath)).toBe(true);
    const content = fs.readFileSync(baseLayoutPath, 'utf-8');
    expect(content).toContain('skip-to-content');
    expect(content).toContain('lang=');
    expect(content).toContain('dir=');
    expect(content).toContain('<main id="main-content"');
    expect(content).toContain('canonical');
    expect(content).toContain('hreflang');
  });

  it('verifies that Header.astro exists and includes accessible navigation', () => {
    expect(fs.existsSync(headerPath)).toBe(true);
    const content = fs.readFileSync(headerPath, 'utf-8');
    expect(content).toContain('<header');
    expect(content).toContain('<nav');
    expect(content).toContain('LanguageSwitcher');
  });

  it('verifies that Footer.astro exists and includes privacy and copyright', () => {
    expect(fs.existsSync(footerPath)).toBe(true);
    const content = fs.readFileSync(footerPath, 'utf-8');
    expect(content).toContain('<footer');
    expect(content).toContain('privacy');
  });

  it('verifies that LanguageSwitcher.astro exists and supports route translation', () => {
    expect(fs.existsSync(langSwitcherPath)).toBe(true);
    const content = fs.readFileSync(langSwitcherPath, 'utf-8');
    expect(content).toContain('targetLang');
  });
});
