import { SITE_URL } from '@/lib/siteConfig'
import { projects } from '@/lib/projects'

// Hand-written so image entries come after the core <url> elements, as the
// sitemap 0.9 schema requires (Next's built-in sitemap puts them first).
export const dynamic = 'force-static'

// Fixed date, bumped when content changes. A lastmod that changes on every
// request teaches Google to ignore it.
const LASTMOD = '2026-10-10'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const pages = [
  { path: '', changefreq: 'monthly', priority: '1.0', images: ['/jeyadev-r.jpg', '/opengraph-image.png'] },
  { path: '/about', changefreq: 'monthly', priority: '0.9', images: ['/jeyadev-r.jpg'] },
  { path: '/projects', changefreq: 'monthly', priority: '0.9', images: [] },
  ...projects.map((p) => ({
    path: `/projects/${p.slug}`,
    changefreq: 'yearly',
    priority: '0.7',
    images: [p.image],
  })),
]

export function GET() {
  const urls = pages.map(({ path, changefreq, priority, images }) => [
    '  <url>',
    `    <loc>${esc(SITE_URL + path)}</loc>`,
    `    <lastmod>${LASTMOD}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    ...images.map((img) => `    <image:image><image:loc>${esc(SITE_URL + img)}</image:loc></image:image>`),
    '  </url>',
  ].join('\n'))

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
