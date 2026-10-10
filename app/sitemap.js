import { SITE_URL } from '@/lib/siteConfig'
import { projects } from '@/lib/projects'

// Fixed date, bumped when content changes. A lastmod that changes on every
// request teaches Google to ignore it.
const lastModified = '2026-10-10'

export default function sitemap() {
  return [
    { url: SITE_URL, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/projects`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    })),
  ]
}
