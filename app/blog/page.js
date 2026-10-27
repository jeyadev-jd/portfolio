import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/siteConfig'
import profile from '@/data/profile.json'
import { articles } from '@/lib/articles'
import { posts, postUrl, PROFILE_URL } from '@/lib/linkedin'
import { videos, CHANNEL_URL } from '@/lib/videos'
import { getProject } from '@/lib/projects'
import PageShell, { JsonLd, breadcrumbSchema } from '@/components/pages/PageShell'
import { YouTubeEmbed, LinkedInEmbed } from '@/components/pages/Embeds'
import styles from '@/styles/pages/Content.module.css'

const fullName = profile.name.full
const title = 'Blog: AI Engineering Articles, LinkedIn Posts and Project Videos'
const description = `The blog of ${fullName}, an AI engineer and full-stack developer in ${profile.location.based}: technical articles on RAG, NLP and machine learning, LinkedIn updates on launches and hackathons, and YouTube project demos.`

export const metadata = {
  title,
  description,
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: '/blog',
    siteName: fullName,
    title: `${title} | ${fullName}`,
    description,
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: `Blog by ${fullName}` }],
  },
}

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
]

const latestPosts = posts.slice(0, 6)
const latestVideos = videos.slice(0, 4)

export default function BlogPage() {
  return (
    <PageShell breadcrumbs={crumbs}>
      <JsonLd data={breadcrumbSchema(crumbs, SITE_URL)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: title,
          description,
          url: `${SITE_URL}/blog`,
          author: { '@id': `${SITE_URL}/#person` },
          blogPost: articles.map((a) => ({
            '@type': 'BlogPosting',
            headline: a.title,
            description: a.description,
            datePublished: a.date,
            url: `${SITE_URL}/writing/${a.slug}`,
            author: { '@id': `${SITE_URL}/#person` },
          })),
          hasPart: [
            ...latestPosts.map((p) => ({
              '@type': 'SocialMediaPosting',
              headline: p.title,
              text: p.summary,
              datePublished: p.date,
              url: postUrl(p.urn),
              author: { '@id': `${SITE_URL}/#person` },
            })),
            ...latestVideos.map((v) => ({
              '@type': 'VideoObject',
              name: v.title,
              description: v.about,
              thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
              embedUrl: `https://www.youtube.com/embed/${v.id}`,
              url: `https://www.youtube.com/watch?v=${v.id}`,
            })),
          ],
        }}
      />

      <header className={styles.blogHero}>
        <h1 className={styles.h1}>Blog</h1>
        <p className={styles.lead}>My articles, LinkedIn posts and YouTube videos.</p>
        <div className={styles.stats}>
          <span className={styles.stat}>{articles.length} articles</span>
          <span className={styles.stat}>{posts.length} LinkedIn posts</span>
          <span className={styles.stat}>{videos.length} videos</span>
        </div>
      </header>

      <div className={styles.sectionHead}>
        <h2 className={styles.h2}>Articles</h2>
        <Link href="/writing" className={styles.seeAll}>All articles →</Link>
      </div>
      <ul className={styles.grid}>
        {articles.map((a) => {
          const project = a.project && getProject(a.project)
          return (
            <li key={a.slug}>
              <Link href={`/writing/${a.slug}`} className={styles.card}>
                {project && (
                  <div className={styles.cardImg}>
                    <Image src={`${project.image}?v=${project.imgVersion ?? 1}`} alt={project.title} fill sizes="(max-width: 767px) 100vw, 33vw" quality={75} />
                  </div>
                )}
                <div className={styles.cardBody}>
                  <span className={styles.eyebrow}>{a.date} · {a.tags.slice(0, 2).join(' · ')}</span>
                  <h3 className={styles.cardTitle}>{a.title}</h3>
                  <p className={styles.cardSub}>{a.description}</p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>

      <div className={styles.sectionHead}>
        <h2 className={styles.h2}>From LinkedIn</h2>
        <Link href="/linkedin" className={styles.seeAll}>All {posts.length} posts →</Link>
      </div>
      <ul className={styles.grid}>
        {latestPosts.map((p) => (
          <li key={p.urn} className={styles.postCard}>
            <h3><a href={postUrl(p.urn)} target="_blank" rel="noopener noreferrer">{p.title}</a></h3>
            <p className={styles.timelineMeta}>{p.date}</p>
            <LinkedInEmbed urn={p.urn} title={p.title} />
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <a href={PROFILE_URL} target="_blank" rel="me noopener noreferrer" className={`${styles.btn} ${styles.btnGhost}`}>Follow on LinkedIn ↗</a>
      </div>

      <div className={styles.sectionHead}>
        <h2 className={styles.h2}>Videos</h2>
        <Link href="/videos" className={styles.seeAll}>All {videos.length} videos →</Link>
      </div>
      <ul className={styles.grid}>
        {latestVideos.map((v) => (
          <li key={v.id}>
            <div className={styles.card}>
              <YouTubeEmbed id={v.id} title={v.title} />
              <div className={styles.cardBody}>
                <span className={styles.eyebrow}>{v.length}</span>
                <h3 className={styles.cardTitle}>{v.title}</h3>
                <p className={styles.cardSub}>{v.about}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <a href={CHANNEL_URL} target="_blank" rel="me noopener noreferrer" className={`${styles.btn} ${styles.btnGhost}`}>Subscribe on YouTube ↗</a>
      </div>
    </PageShell>
  )
}
