import { ImageResponse } from 'next/og'
import { articles, getArticle } from '@/lib/articles'
import profile from '@/data/profile.json'

export const alt = 'Article by Jeyadev R'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export default async function Image({ params }) {
  const { slug } = await params
  const a = getArticle(slug)
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#0b0d12',
          color: '#f4f4f5',
        }}
      >
        <div style={{ fontSize: 28, color: '#8b93a7', display: 'flex' }}>{a.tags.slice(0, 3).join('  ·  ')}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.15, display: 'flex' }}>{a.title}</div>
          <div style={{ fontSize: 32, color: '#aab1c3', marginTop: 24, display: 'flex' }}>{a.subtitle}</div>
        </div>
        <div style={{ fontSize: 30, display: 'flex' }}>{profile.name.full} · jeyadev.dev</div>
      </div>
    ),
    size,
  )
}
