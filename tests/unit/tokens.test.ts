import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Design System Tokens & Global CSS', () => {
  const cssPath = path.resolve(__dirname, '../../src/styles/global.css');

  it('verifies that global.css exists', () => {
    expect(fs.existsSync(cssPath)).toBe(true);
  });

  it('defines required color palette custom properties', () => {
    const css = fs.readFileSync(cssPath, 'utf-8');
    expect(css).toContain('--color-bg');
    expect(css).toContain('--color-text');
    expect(css).toContain('--color-text-muted');
    expect(css).toContain('--color-accent');
    expect(css).toContain('--color-border');
    expect(css).toContain('--color-border-hairline');
  });

  it('defines typography font stacks and scale', () => {
    const css = fs.readFileSync(cssPath, 'utf-8');
    expect(css).toContain('--font-sans');
    expect(css).toContain('--font-serif');
    expect(css).toContain('--font-farsi');
    expect(css).toContain('--font-mono');
  });

  it('includes accessibility and motion safeguards', () => {
    const css = fs.readFileSync(cssPath, 'utf-8');
    expect(css).toContain('prefers-reduced-motion');
    expect(css).toContain(':focus-visible');
    expect(css).toContain('.skip-to-content');
  });

  it('includes dedicated print media styles for resume and layout', () => {
    const css = fs.readFileSync(cssPath, 'utf-8');
    expect(css).toContain('@media print');
  });

  it('configures RTL logical spacing and directional typography rules', () => {
    const css = fs.readFileSync(cssPath, 'utf-8');
    expect(css).toContain('[dir="rtl"]');
  });
});
