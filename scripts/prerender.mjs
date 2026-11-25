import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTE_META, getRouteMeta, renderRoute } from '../dist-ssr/entry-prerender.js';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const template = await readFile(join(dist, 'index.html'), 'utf8');
const appMarker = /<!--app-html-->/;
const headMarker = /^[ \t]*<\/head\s*>/im;
const managedHead = /^[ \t]*<!--portfolio-head-->[\s\S]*?<!--\/portfolio-head-->[ \t]*\r?\n/m;

if (!appMarker.test(template) || !headMarker.test(template)) {
  throw new Error('dist/index.html must contain the app HTML placeholder and a closing head tag.');
}

const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => entities[char]);

function renderHead(meta) {
  const structuredData = JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c');
  return [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    `<link rel="canonical" href="${escape(meta.canonical)}" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:url" content="${escape(meta.canonical)}" />`,
    `<meta property="og:type" content="${escape(meta.ogType ?? 'website')}" />`,
    `<meta property="og:image" content="${escape(meta.image)}" />`,
    ...(meta.path === '/404' ? ['<meta name="robots" content="noindex" data-portfolio-robots />'] : []),
    `<script id="portfolio-json-ld" type="application/ld+json">${structuredData}</script>`,
  ].join('\n    ');
}

const source = template.replace(/<head\b[^>]*>[\s\S]*?<\/head\s*>/i, (head) =>
  head
    .replace(managedHead, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title\s*>/gi, '')
    .replace(/<(?:meta|link)\b(?=[^>]*\b(?:name\s*=\s*["']description["']|property\s*=\s*["']og:(?:title|description|url|type|image)["']|rel\s*=\s*["']canonical["']|data-portfolio-robots\b))[^>]*>/gi, '')
    .replace(/<script\b(?=[^>]*\bid\s*=\s*["']portfolio-json-ld["'])[^>]*>[\s\S]*?<\/script\s*>/gi, ''),
);

await rm(join(dist, '404'), { recursive: true, force: true });

const writes = [];
let routeCount = 0;

for (const { path } of Object.values(ROUTE_META)) {
  const app = await renderRoute(path);
  if (typeof app !== 'string' || !app.trim()) throw new Error(`No HTML rendered for ${path}.`);
  const html = source
    .replace(headMarker, () => `    <!--portfolio-head-->\n    ${renderHead(getRouteMeta(path))}\n    <!--/portfolio-head-->\n  </head>`)
    .replace(appMarker, () => app);

  routeCount += 1;
  if (path === '/') {
    writes.push({ file: join(dist, 'index.html'), html });
  } else if (path === '/404') {
    writes.push({ file: join(dist, '404.html'), html });
  } else {
    const cleanRel = path.slice(1);
    writes.push({ file: join(dist, `${cleanRel}.html`), html });
    writes.push({ file: join(dist, cleanRel, 'index.html'), html });
  }
}

await Promise.all(
  writes.map(async ({ file, html }) => {
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html, 'utf8');
  }),
);

console.log(`Prerendered ${routeCount} portfolio routes (${writes.length} HTML files, including 404.html).`);
