import profile from '@/data/profile.json'

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const projects = profile.projects.map((p) => ({ ...p, slug: slugify(p.title) }))

export const getProject = (slug) => projects.find((p) => p.slug === slug)

// Trim to a search-snippet length, ending on a full sentence when one fits.
export const snippet = (text, max = 160) => {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const sentenceEnd = cut.lastIndexOf('. ')
  if (sentenceEnd >= 80) return cut.slice(0, sentenceEnd + 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.;:(]$/, '')}…`
}

// "AI / Healthcare" -> "AI"
export const category = (type) => type.split('/')[0].trim()

export const isGithub = (link) => link.startsWith('https://github.com/')
