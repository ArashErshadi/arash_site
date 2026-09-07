/**
 * i18n routing, locale helpers, and bilingual dictionary
 */

export type Locale = 'en' | 'fa';
export type Direction = 'ltr' | 'rtl';

export const LOCALES: Locale[] = ['en', 'fa'];
export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Normalizes a URL path to have leading and trailing slashes
 */
export function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  const clean = path.trim().replace(/^\/+/, '').replace(/\/+$/, '');
  return `/${clean}/`;
}

/**
 * Extracts locale ('en' | 'fa') from a URL pathname
 */
export function getLocaleFromPath(pathname: string): Locale {
  const normalized = normalizePath(pathname);
  if (normalized.startsWith('/fa/') || normalized === '/fa/') {
    return 'fa';
  }
  return 'en';
}

/**
 * Returns the direction ('ltr' | 'rtl') for a given locale
 */
export function getDirection(locale: Locale): Direction {
  return locale === 'fa' ? 'rtl' : 'ltr';
}

/**
 * Translates a pathname from its current language to the target language
 */
export function getEquivalentRoute(pathname: string, targetLocale: Locale): string {
  const currentLocale = getLocaleFromPath(pathname);
  if (currentLocale === targetLocale) {
    return normalizePath(pathname);
  }

  const normalized = normalizePath(pathname);

  if (targetLocale === 'fa') {
    // English -> Farsi: prefix with /fa
    if (normalized === '/') {
      return '/fa/';
    }
    return `/fa${normalized}`;
  } else {
    // Farsi -> English: remove /fa prefix
    const stripped = normalized.replace(/^\/fa(\/|$)/, '/');
    return normalizePath(stripped);
  }
}

/**
 * Generates absolute canonical and hreflang alternate links for a route
 */
export function getHreflangLinks(pathname: string, siteUrl = 'https://mg.github.io') {
  const cleanBase = siteUrl.replace(/\/+$/, '');
  const enRoute = getEquivalentRoute(pathname, 'en');
  const faRoute = getEquivalentRoute(pathname, 'fa');

  return {
    en: `${cleanBase}${enRoute}`,
    fa: `${cleanBase}${faRoute}`,
    xDefault: `${cleanBase}${enRoute}`,
  };
}

/**
 * UI translations dictionary
 */
export const UI_STRINGS = {
  en: {
    siteTitle: 'Arash Ershadi',
    siteRole: 'Architectural Designer',
    navWork: 'Work',
    navPractice: 'Practice',
    navResume: 'Resume',
    navContact: 'Contact',
    navPrivacy: 'Privacy Policy',
    selectedWork: 'Selected Works',
    allProjects: 'All Projects',
    filterAll: 'All',
    filterTypology: 'Typology',
    filterScale: 'Scale',
    filterYear: 'Year',
    filterStatus: 'Status',
    filterReset: 'Reset Filters',
    noProjectsFound: 'No projects match the selected criteria.',
    viewProject: 'View Project',
    projectPremise: 'Premise & Context',
    projectGallery: 'Drawings & Photographs',
    projectDetails: 'Project Details',
    metaYear: 'Year',
    metaLocation: 'Location',
    metaTypology: 'Typology',
    metaScale: 'Scale',
    metaStatus: 'Status',
    metaTools: 'Tools & Media',
    metaCollaborators: 'Collaborators',
    prevProject: 'Previous Project',
    nextProject: 'Next Project',
    relatedProjects: 'Related Inquiries',
    discussProject: 'Discuss a Project',
    downloadResumePdf: 'Download Résumé (PDF)',
    downloadResumePlaceholderNote: 'Note: PDF link will download the curriculum vitae monograph.',
    profileOverview: 'Profile & Practice',
    experienceTimeline: 'Professional Experience',
    education: 'Education',
    skillsDesign: 'Spatial & Conceptual Skills',
    skillsTechnical: 'Software & Technical Tools',
    languages: 'Languages',
    awards: 'Honors & Exhibitions',
    printResume: 'Print Monograph / PDF',
    contactTitle: 'Direct Inquiries',
    contactSubtitle: 'Available for architectural design, spatial research, and editorial collaboration.',
    emailPrompt: 'Send an email directly:',
    messageSentSuccess: 'Thank you. Your message has been received.',
    notFoundTitle: 'Page Not Found (404)',
    notFoundSubtitle: 'The requested architectural drawing or page could not be located.',
    returnHome: 'Return to Homepage',
    browseArchive: 'Browse Project Archive',
  },
  fa: {
    siteTitle: 'آرش ارشادی',
    siteRole: 'طراح معمار',
    navWork: 'پروژه‌ها',
    navPractice: 'رویکرد و استودیو',
    navResume: 'رزومه',
    navContact: 'تماس',
    navPrivacy: 'سیاست حریم خصوصی',
    selectedWork: 'پروژه‌های برگزیده',
    allProjects: 'آرشیو جامع پروژه‌ها',
    filterAll: 'همه',
    filterTypology: 'گونه‌شناسی (گونه طرح)',
    filterScale: 'مقیاس',
    filterYear: 'سال',
    filterStatus: 'وضعیت',
    filterReset: 'پاک‌کردن فیلترها',
    noProjectsFound: 'موردی با معیارهای انتخابی یافت نشد.',
    viewProject: 'مشاهده پروژه',
    projectPremise: 'مبانی و بستر طرح',
    projectGallery: 'مدارک فنی و تصاویر',
    projectDetails: 'مشخصات پروژه',
    metaYear: 'سال اجرا',
    metaLocation: 'موقعیت',
    metaTypology: 'گونه‌شناسی',
    metaScale: 'مقیاس / زیربنا',
    metaStatus: 'وضعیت طرح',
    metaTools: 'ابزارها و رسانه‌ها',
    metaCollaborators: 'همکاران و استودیو',
    prevProject: 'پروژه قبلی',
    nextProject: 'پروژه بعدی',
    relatedProjects: 'پژوهش‌های مرتبط',
    discussProject: 'گفتگو پیرامون پروژه',
    downloadResumePdf: 'دریافت فایل رزومه (PDF)',
    downloadResumePlaceholderNote: 'یادداشت: فایل PDF رزومه و کتابچه سوابق قابل دریافت است.',
    profileOverview: 'معرفی و رویکرد حرفه‌ای',
    experienceTimeline: 'سوابق حرفه‌ای و طراحی',
    education: 'تحصیلات آکادمیک',
    skillsDesign: 'مهارت‌های فضایی و مفهومی',
    skillsTechnical: 'ابزارهای فنی و نرم‌افزارها',
    languages: 'زبان‌ها',
    awards: 'جوایز و نمایشگاه‌ها',
    printResume: 'نسخه چاپی رزومه',
    contactTitle: 'ارتباط مستقیم و همکاری',
    contactSubtitle: 'آماده همکاری در پروژه‌های طراحی معماری، پژوهش‌های فضایی و فعالیت‌های آکادمیک.',
    emailPrompt: 'ارسال مستقیم ایمیل:',
    messageSentSuccess: 'پیام شما دریافت شد. با سپاس.',
    notFoundTitle: 'صفحه مورد نظر یافت نشد (خطای ۴۰۴)',
    notFoundSubtitle: 'مدرک یا صفحه درخواستی در این نشانی قرار ندارد.',
    returnHome: 'بازگشت به صفحه اصلی',
    browseArchive: 'مشاهده آرشیو پروژه‌ها',
  },
} as const;

export function t(key: keyof typeof UI_STRINGS['en'], locale: Locale = 'en'): string {
  const dict = UI_STRINGS[locale] || UI_STRINGS['en'];
  return dict[key] || UI_STRINGS['en'][key] || String(key);
}
