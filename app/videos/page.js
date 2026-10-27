import { withSeo } from '@/lib/seo'
import Link from 'next/link'
import { SITE_URL } from '@/lib/siteConfig'
import profile from '@/data/profile.json'
import { videos, CHANNEL_URL } from '@/lib/videos'
import { getProject } from '@/lib/projects'
import PageShell, { JsonLd, breadcrumbSchema } from '@/components/pages/PageShell'
import { YouTubeEmbed } from '@/components/pages/Embeds'
import styles from '@/styles/pages/Content.module.css'

const fullName = profile.name.full
const title = 'Videos: Project Demos and Tutorials'
const description = `Project demos and tutorials by ${fullName}: air quality dashboards, an Arduino calculator, Linux Mint and MongoDB. Watch on YouTube.`

export const metadata = withSeo('/videos', {
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
})

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
              item: {
                '@type': 'VideoObject',
                name: v.title,
                description: v.about,
                thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
                embedUrl: `https://www.youtube.com/embed/${v.id}`,
                url: `https://www.youtube.com/watch?v=${v.id}`,
              },
            })),
          },
        }}
      />
      <h1 className={styles.h1}>Videos</h1>
      <p className={styles.lead}>Project demos and tutorials from my YouTube channel.</p>
      <div className={styles.actions}>
        <a href={CHANNEL_URL} target="_blank" rel="me noopener noreferrer" className={styles.btn}>Visit the YouTube channel ↗</a>
      </div>

      <section className={styles.prose}>
        <p>
          The channel has two kinds of video. Project demos walk through things I built: Pollumap V3, an AI air quality
          dashboard for Chennai with 24-hour forecasts and healthy routing; Pollumap V2, my Smart India Hackathon 2025
          demo for Delhi-NCR; and an Arduino calculator that teaches Von Neumann architecture through a Web Serial UI.
          Tutorials cover practical setup: a full Linux Mint installation, and MongoDB from creating databases and
          collections to CRUD operations on a sample books collection.
        </p>
        <p>
          Each video plays here without leaving the page. Where a video belongs to a project, the card links to the
          project page with the source code, architecture and results.
        </p>
      </section>

      <h2 className={styles.h2}>Project demos</h2>
      <VideoGrid list={videos.filter((v) => v.kind === 'demo')} />
      <h2 className={styles.h2}>Tutorials</h2>
      <VideoGrid list={videos.filter((v) => v.kind === 'tutorial')} />
    </PageShell>
  )
}

function VideoGrid({ list }) {
  return (
      <ul className={styles.grid}>
        {list.map((v) => {
          const project = v.project && getProject(v.project)
          return (
            <li key={v.id}>
              <div className={styles.card}>
                <YouTubeEmbed id={v.id} title={v.title} />
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
  )
}
