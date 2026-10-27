import { SITE_URL } from '@/lib/siteConfig'
import profile from '@/data/profile.json'
import { projects } from '@/lib/projects'
import { articles } from '@/lib/articles'
import { videos, CHANNEL_URL } from '@/lib/videos'
import { highlights } from '@/lib/highlights'
import { posts, certifications, postUrl } from '@/lib/linkedin'

// Plain-text summary for AI assistants and LLM crawlers (llmstxt.org).
// Built from profile.json so it never drifts from the site.
export const dynamic = 'force-static'

export function GET() {
  const lines = [
    `# ${profile.name.full}`,
    '',
    `> ${profile.description}`,
    '',
    `${profile.roles.detailed}. Based in ${profile.location.based}; available ${profile.location.availability}.`,
    `Education: ${profile.education.degree}, ${profile.education.institution} (${profile.education.period}).`,
    `Contact: ${profile.email}`,
    '',
    '## About',
    '',
    profile.bio,
    '',
    '## Skills',
    '',
    profile.skills.join(', '),
    '',
    '## Experience',
    '',
    ...profile.experience.map(
      (e) => `- ${e.role}, ${e.company} (${e.period} to ${e.periodEnd}): ${e.desc}`
    ),
    '',
    '## Projects',
    '',
    ...projects.map(
      (p) => `- [${p.title}](${SITE_URL}/projects/${p.slug}): ${p.subtitle}. ${p.desc} Stack: ${p.tech.join(', ')}. Source: ${p.link}`
    ),
    '',
    '## Writing',
    '',
    `- [Blog](${SITE_URL}/blog): articles, LinkedIn posts and project videos in one place`,
    ...articles.map((a) => `- [${a.title}](${SITE_URL}/writing/${a.slug}): ${a.description}`),
    '',
    '## Highlights',
    '',
    ...highlights.map((h) => `- ${h.title}: ${h.detail}`),
    '',
    '## Videos',
    '',
    ...videos.map((v) => `- [${v.title}](https://www.youtube.com/watch?v=${v.id}): ${v.about}`),
    `- [YouTube channel](${CHANNEL_URL})`,
    '',
    '## LinkedIn posts',
    '',
    ...posts.map((p) => `- [${p.title}](${postUrl(p.urn)}) (${p.date}): ${p.summary}`),
    '',
    '## Certifications',
    '',
    ...certifications.map((c) => `- ${c.name}, ${c.issuer} (${c.date.slice(0, 7)})`),
    '',
    '## Full text',
    '',
    `- [llms-full.txt](${SITE_URL}/llms-full.txt)`,
    '',
    '## Links',
    '',
    `- [Portfolio](${SITE_URL})`,
    `- [About](${SITE_URL}/about)`,
    `- [Hire ${profile.name.full}](${SITE_URL}/hire)`,
    `- [All projects](${SITE_URL}/projects)`,
    ...profile.socials.map((s) => `- [${s.label}](${s.href})`),
    '',
  ]

  return new Response(lines.join('\n').replace(/ /g, ' '), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
