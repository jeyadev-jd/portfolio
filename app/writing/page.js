import Link from 'next/link'
import { SITE_URL } from '@/lib/siteConfig'
import profile from '@/data/profile.json'
import { articles } from '@/lib/articles'
import PageShell, { JsonLd, breadcrumbSchema } from '@/components/pages/PageShell'
import styles from '@/styles/pages/Content.module.css'

const fullName = profile.name.full
const title = 'Writing: AI, RAG, NLP and Machine Learning Projects'
const description = `Technical write-ups by ${fullName}, an AI engineer in ${profile.location.based}: offline RAG, scam SMS detection, air quality forecasting and more, with numbers from the source repositories.`

export const metadata = {
  title,
  description,
  alternates: { canonical: '/writing' },
  openGraph: {
    type: 'website',
    url: '/writing',
    siteName: fullName,
    title: `${title} | ${fullName}`,
    description,
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: `Writing by ${fullName}` }],
  },
}

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Writing', href: '/writing' },
]

export default function WritingPage() {
  return (
    <PageShell breadcrumbs={crumbs}>
      <JsonLd data={breadcrumbSchema(crumbs, SITE_URL)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: title,
          url: `${SITE_URL}/writing`,
          author: { '@id': `${SITE_URL}/#person` },
          blogPost: articles.map((a) => ({ '@type': 'BlogPosting', headline: a.title, url: `${SITE_URL}/writing/${a.slug}` })),
        }}
      />
      <h1 className={styles.h1}>Writing</h1>
      <p className={styles.lead}>How my projects work, what I measured, and what I would do differently.</p>
      <ul className={styles.grid}>
        {articles.map((a) => (
          <li key={a.slug}>
            <Link href={`/writing/${a.slug}`} className={styles.card}>
              <div className={styles.cardBody}>
                <span className={styles.eyebrow}>{a.tags.slice(0, 3).join(' · ')}</span>
                <h2 className={styles.cardTitle}>{a.title}</h2>
                <p className={styles.cardSub}>{a.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
