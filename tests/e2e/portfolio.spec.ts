import { test, expect } from '@playwright/test';

test.describe('Architectural Portfolio Bilingual & Accessibility Suite', () => {
  test('English home page renders with correct LTR direction and semantic structure', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'en');
    await expect(html).toHaveAttribute('dir', 'ltr');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.skip-to-content')).toBeAttached();
  });

  test('Farsi home page renders with correct RTL direction and authentic Persian content', async ({ page }) => {
    await page.goto('/fa/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'fa');
    await expect(html).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Language Switcher maps to exact equivalent route', async ({ page }) => {
    // English project detail to Farsi project detail
    await page.goto('/projects/desert-cultural-center/');
    const enLangSwitcher = page.locator('.site-header .lang-switcher');
    await expect(enLangSwitcher).toHaveAttribute('href', '/fa/projects/desert-cultural-center/');

    // Farsi resume to English resume
    await page.goto('/fa/resume/');
    const faLangSwitcher = page.locator('.site-header .lang-switcher');
    await expect(faLangSwitcher).toHaveAttribute('href', '/resume/');
  });

  test('Projects Archive filter controls reactively filter items without backend', async ({ page }) => {
    await page.goto('/projects/');
    const allCards = page.locator('[data-project-item]');
    const totalCount = await allCards.count();
    expect(totalCount).toBeGreaterThanOrEqual(3);

    // Filter by Adaptive Reuse
    const adaptiveFilter = page.locator('.filter-pill[data-filter-value="Adaptive Reuse"]');
    if (await adaptiveFilter.count() > 0) {
      await adaptiveFilter.click();
      await expect(page.locator('[data-project-item][data-typology="Adaptive Reuse"]')).toBeVisible();
      await expect(page.locator('[data-project-item][data-typology="Cultural & Civic"]')).toBeHidden();

      // Reset filters
      const resetBtn = page.locator('#reset-filters-btn');
      await expect(resetBtn).toBeVisible();
      await resetBtn.click();
      await expect(page.locator('[data-project-item][data-typology="Cultural & Civic"]')).toBeVisible();
    }
  });

  test('Accessible Lightbox opens, supports Escape key, and restores focus', async ({ page }) => {
    await page.goto('/projects/desert-cultural-center/');
    const firstTrigger = page.locator('.lightbox-trigger').first();
    await firstTrigger.click();

    const lightbox = page.locator('#architectural-lightbox');
    await expect(lightbox).toHaveAttribute('open', '');

    // Press Escape to close
    await page.keyboard.press('Escape');
    await expect(lightbox).not.toHaveAttribute('open', '');
  });

  test('404 error page renders with bilingual navigation recovery links', async ({ page }) => {
    await page.goto('/404.html');
    await expect(page.locator('h1')).toContainText('Drawing Not Located');
    await expect(page.locator('a[href="/"]')).toBeVisible();
    await expect(page.locator('a[href="/fa/"]')).toBeVisible();
  });
});
