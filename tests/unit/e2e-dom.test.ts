import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Built Static HTML DOM QA & Route Equivalence', () => {
  const distDir = path.resolve(__dirname, '../../dist');

  const expectedRoutes = [
    { file: 'index.html', lang: 'en', dir: 'ltr', title: 'Arash Ershadi | Architectural Designer' },
    { file: 'fa/index.html', lang: 'fa', dir: 'rtl', title: 'آرش ارشادی | طراح معمار' },
    { file: 'projects/index.html', lang: 'en', dir: 'ltr', title: 'Project Archive' },
    { file: 'fa/projects/index.html', lang: 'fa', dir: 'rtl', title: 'آرشیو پروژه‌ها' },
    { file: 'projects/desert-cultural-center/index.html', lang: 'en', dir: 'ltr', title: 'Desert Cultural Center' },
    { file: 'fa/projects/desert-cultural-center/index.html', lang: 'fa', dir: 'rtl', title: 'مرکز فرهنگی کویر' },
    { file: 'projects/industrial-arts-center/index.html', lang: 'en', dir: 'ltr', title: 'Silk Mill Adaptive Reuse' },
    { file: 'fa/projects/industrial-arts-center/index.html', lang: 'fa', dir: 'rtl', title: 'بازآفرینی کارخانه ابریشم' },
    { file: 'projects/riverfront-linear-park/index.html', lang: 'en', dir: 'ltr', title: 'Riverfront Linear Park' },
    { file: 'fa/projects/riverfront-linear-park/index.html', lang: 'fa', dir: 'rtl', title: 'پارک خطی ساحلی' },
    { file: 'resume/index.html', lang: 'en', dir: 'ltr', title: 'Curriculum Vitae' },
    { file: 'fa/resume/index.html', lang: 'fa', dir: 'rtl', title: 'رزومه' },
    { file: 'about/index.html', lang: 'en', dir: 'ltr', title: 'Practice' },
    { file: 'fa/about/index.html', lang: 'fa', dir: 'rtl', title: 'رویکرد' },
    { file: 'contact/index.html', lang: 'en', dir: 'ltr', title: 'Contact' },
    { file: 'fa/contact/index.html', lang: 'fa', dir: 'rtl', title: 'تماس' },
    { file: 'privacy/index.html', lang: 'en', dir: 'ltr', title: 'Privacy Policy' },
    { file: 'fa/privacy/index.html', lang: 'fa', dir: 'rtl', title: 'حریم خصوصی' },
    { file: 'thank-you/index.html', lang: 'en', dir: 'ltr', title: 'Inquiry Received' },
    { file: 'fa/thank-you/index.html', lang: 'fa', dir: 'rtl', title: 'پیام دریافت شد' },
    { file: '404.html', lang: 'en', dir: 'ltr', title: '404' },
  ];

  it.each(expectedRoutes)('verifies generated route $file has lang="$lang" and dir="$dir"', ({ file, lang, dir, title }) => {
    const filePath = path.join(distDir, file);
    expect(fs.existsSync(filePath)).toBe(true);
    const html = fs.readFileSync(filePath, 'utf-8');
    expect(html).toContain(`lang="${lang}"`);
    expect(html).toContain(`dir="${dir}"`);
    expect(html).toContain('<main id="main-content"');
    expect(html).toContain('skip-to-content');
    expect(html).toContain(title);
  });

  it('verifies language switcher maps equivalent paths in built HTML', () => {
    const enProjHtml = fs.readFileSync(path.join(distDir, 'projects/desert-cultural-center/index.html'), 'utf-8');
    expect(enProjHtml).toContain('href="/fa/projects/desert-cultural-center/"');

    const faProjHtml = fs.readFileSync(path.join(distDir, 'fa/projects/desert-cultural-center/index.html'), 'utf-8');
    expect(faProjHtml).toContain('href="/projects/desert-cultural-center/"');
  });

  it('verifies resume PDF placeholder download links exist and are valid', () => {
    expect(fs.existsSync(path.join(distDir, 'resume-en.pdf'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'resume-fa.pdf'))).toBe(true);
  });
});
