import { SITE_URL } from '@/lib/siteConfig'
import { projects } from '@/lib/projects'

export default function sitemap() {
  const lastModified = new Date()
  return [
    { url: SITE_URL, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/projects`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
      images: [`${SITE_URL}${p.image}`],
    })),
  ]
}
