import { SITE_URL } from '@/lib/siteConfig'
import profile from '@/data/profile.json'
import { projects } from '@/lib/projects'

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
