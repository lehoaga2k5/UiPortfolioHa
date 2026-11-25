import { useEffect } from 'react';
import type { RouteMeta } from '../types/portfolio';

const origin = 'https://lehoanganh.id.vn';
const name = 'Lê Hoàng Anh';
const siteTitle = `${name} — UI/UX Designer Portfolio`;
const portrait = '/assets/figma/99709.png';

const entries: [path: string, label: string, description: string, section: RouteMeta['navSection'], type?: RouteMeta['ogType']][] = [
  ['/', siteTitle, 'Fresher UI/UX Designer in Hanoi, Vietnam. Designing data-dense dashboards, calm mobile flows, and reusable Glass UI component systems.', 'home'],
  ['/work', 'Selected Work', 'Explore Kite Dispatch Console, Budget Overview, Reminder Flow, and component state studies by Lê Hoàng Anh.', 'work'],
  ['/work/kite', 'Kite Dispatch Console', 'A logistics dashboard case study with an interactive dispatch console, reroute workflow, and vehicle telematics.', 'work', 'article'],
  ['/work/budget-overview', 'Budget Overview', 'A cash overview case study with runway metrics, billing scenarios, and a responsive transaction ledger.', 'work', 'article'],
  ['/work/reminder-flow', 'Reminder Flow', 'A mobile design case study that follows a medication reminder from the scheduled dose to its history entry.', 'work', 'article'],
  ['/about', 'About', 'Meet Lê Hoàng Anh, a fresher UI/UX designer in Hanoi, and learn how he approaches design, feedback, and collaboration.', 'about'],
  ['/journal', 'Journal', 'Practice notes from Lê Hoàng Anh on spacing, hierarchy, accessibility, and interactive component design.', 'journal'],
  ['/journal/spacing-and-hierarchy', 'Spacing and Hierarchy', 'A design practice note on using an 8-point spacing rhythm to clarify visual hierarchy.', 'journal', 'article'],
  ['/journal/component-states', 'Component States', 'Explore accessible glass button states, keyboard focus, and error recovery in an interactive component sandbox.', 'journal', 'article'],
  ['/contact', 'Contact', 'Get in touch with Lê Hoàng Anh about UI/UX design opportunities and collaborations.', 'contact'],
  ['/privacy', 'Privacy', 'Read the privacy notice for Lê Hoàng Anh’s UI/UX design portfolio.', 'none'],
  ['/terms', 'Terms', 'Read the terms of use for Lê Hoàng Anh’s UI/UX design portfolio.', 'none'],
  ['/404', 'Page Not Found', 'This portfolio page could not be found. Return home or explore selected design work.', 'none'],
];

export const ROUTE_META: Readonly<Record<string, RouteMeta>> = Object.fromEntries(
  entries.map(([path, label, description, navSection, ogType = 'website']) => [
    path,
    { path, title: path === '/' ? label : `${label} — ${name}`, description, navSection, ogType },
  ]),
);

const images: Record<string, string> = {
  '/work': '/assets/figma/cover-kite-work.png',
  '/work/kite': '/assets/figma/cover-kite-work.png',
  '/work/reminder-flow': '/assets/figma/8a95c.png',
};

export function getRouteMeta(pathname: string) {
  const path = pathname.split(/[?#]/, 1)[0].replace(/\/+$/, '').toLowerCase() || '/';
  const route = Object.hasOwn(ROUTE_META, path) ? ROUTE_META[path] : ROUTE_META['/404'];
  const canonical = origin + route.path;
  const image = origin + (images[route.path] ?? portrait);
  const author = { '@type': 'Person', name, url: origin + '/' };
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': route.path === '/' ? 'WebSite' : route.ogType === 'article' ? 'Article' : 'WebPage',
    name: route.title,
    ...(route.ogType === 'article' ? { headline: route.title, author } : { creator: author }),
    url: canonical,
    description: route.description,
    inLanguage: 'en',
    image,
  };
  return { ...route, canonical, image, jsonLd };
}

export function usePageMeta(pathname = '/') {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const meta = getRouteMeta(pathname);
    document.title = meta.title;

    const tags = [
      ['name', 'description', meta.description],
      ['property', 'og:title', meta.title],
      ['property', 'og:description', meta.description],
      ['property', 'og:url', meta.canonical],
      ['property', 'og:type', meta.ogType ?? 'website'],
      ['property', 'og:image', meta.image],
    ] as const;

    for (const [attribute, key, content] of tags) {
      const node = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`) ?? document.createElement('meta');
      node.setAttribute(attribute, key);
      node.content = content;
      if (!node.isConnected) document.head.append(node);
    }

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]') ?? document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = meta.canonical;
    if (!canonical.isConnected) document.head.append(canonical);

    const structuredData = document.head.querySelector<HTMLScriptElement>('script[id="portfolio-json-ld"]') ?? document.createElement('script');
    structuredData.id = 'portfolio-json-ld';
    structuredData.type = 'application/ld+json';
    structuredData.textContent = JSON.stringify(meta.jsonLd);
    if (!structuredData.isConnected) document.head.append(structuredData);

    const existingRobots = document.head.querySelector<HTMLMetaElement>('meta[data-portfolio-robots]');
    if (meta.path === '/404') {
      const robots = existingRobots ?? document.createElement('meta');
      robots.name = 'robots';
      robots.content = 'noindex';
      robots.setAttribute('data-portfolio-robots', '');
      if (!robots.isConnected) document.head.append(robots);
    } else {
      existingRobots?.remove();
    }
  }, [pathname]);
}
