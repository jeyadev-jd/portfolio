import { SITE_URL } from '@/lib/siteConfig'

// Search and AI crawlers are named explicitly so the intent is unambiguous.
const AI_AND_SEARCH_BOTS = [
  'Googlebot',
  'Bingbot',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
]

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
