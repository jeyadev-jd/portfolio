import Link from 'next/link'
import { SITE_URL } from '@/lib/siteConfig'
import profile from '@/data/profile.json'
import { videos, CHANNEL_URL } from '@/lib/videos'
import { getProject } from '@/lib/projects'
import PageShell, { JsonLd, breadcrumbSchema } from '@/components/pages/PageShell'
import styles from '@/styles/pages/Content.module.css'

const fullName = profile.name.full
const title = 'Videos: Project Demos and Tutorials'
const description = `Project demos and tutorials by ${fullName}: air quality dashboards, an Arduino calculator, Linux Mint and MongoDB. Watch on YouTube.`

export const metadata = {
  title,
  description,
  alternates: { canonical: '/videos' },
  openGraph: {
    type: 'website',
    url: '/videos',
    siteName: fullName,
    title: `${title} | ${fullName}`,
    description,
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: `Videos by ${fullName}` }],
  },
}

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Videos', href: '/videos' },
]

export default function VideosPage() {
  return (
    <PageShell breadcrumbs={crumbs}>
      <JsonLd data={breadcrumbSchema(crumbs, SITE_URL)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: title,
          url: `${SITE_URL}/videos`,
          author: { '@id': `${SITE_URL}/#person` },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: videos.map((v, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `https://www.youtube.com/watch?v=${v.id}`,
              name: v.title,
            })),
          },
        }}
      />
      <h1 className={styles.h1}>Videos</h1>
      <p className={styles.lead}>Project demos and tutorials from my YouTube channel.</p>
      <div className={styles.actions}>
        <a href={CHANNEL_URL} target="_blank" rel="me noopener noreferrer" className={styles.btn}>Visit the YouTube channel ↗</a>
      </div>

      <ul className={styles.grid}>
        {videos.map((v) => {
          const project = v.project && getProject(v.project)
          return (
            <li key={v.id}>
              <div className={styles.card}>
                <div className={styles.cardBody}>
                  <span className={styles.eyebrow}>{v.length}</span>
                  <h2 className={styles.cardTitle}>
                    <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer">{v.title}</a>
                  </h2>
                  <p className={styles.cardSub}>{v.about}</p>
                  {project && <p className={styles.cardSub}><Link href={`/projects/${project.slug}`}>Read about {project.title}</Link></p>}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </PageShell>
  )
}
