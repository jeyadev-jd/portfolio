import { SITE_URL } from '@/lib/siteConfig'
import profile from '@/data/profile.json'
import { projects } from '@/lib/projects'
import { articles } from '@/lib/articles'
import { highlights } from '@/lib/highlights'
import { videos, CHANNEL_URL } from '@/lib/videos'
import { posts, postUrl } from '@/lib/linkedin'

// Full-text companion to /llms.txt for LLM crawlers and retrieval tools.
export const dynamic = 'force-static'

const articleText = (a) => [
  `### ${a.title}`,
  `URL: ${SITE_URL}/writing/${a.slug}`,
  a.subtitle,
  '',
  ...a.sections.flatMap((s) => [
    `#### ${s.h}`,
    ...(s.p ?? []),
    ...(s.list ? s.list.map((li) => `- ${li}`) : []),
    ...(s.after ? [s.after] : []),
    '',
  ]),
]

export function GET() {
  const lines = [
    `# ${profile.name.full}`,
    '',
    `> ${profile.description}`,
    '',
    `${profile.roles.detailed}. Based in ${profile.location.based}. Education: ${profile.education.degree}, ${profile.education.institution}.`,
    `Contact: ${profile.email}`,
    `Website: ${SITE_URL}`,
    '',
    '## Highlights',
    '',
    ...highlights.map((h) => `- ${h.title}: ${h.detail}`),
    '',
    '## Projects',
    '',
    ...projects.flatMap((p) => [
      `### ${p.title}: ${p.subtitle}`,
      `URL: ${SITE_URL}/projects/${p.slug}`,
      `Type: ${p.type}. Stack: ${p.tech.join(', ')}. Source: ${p.link}`,
      p.desc,
      '',
    ]),
    '## Articles',
    '',
    ...articles.flatMap(articleText),
    '## Videos',
    '',
    ...videos.map((v) => `- [${v.title}](https://www.youtube.com/watch?v=${v.id}): ${v.about}`),
    `- [YouTube channel](${CHANNEL_URL})`,
    '',
    '## LinkedIn posts',
    '',
    ...posts.map((p) => `- [${p.title}](${postUrl(p.urn)}) (${p.date}): ${p.summary}`),
    '',
  ]
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
