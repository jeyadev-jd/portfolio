import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/siteConfig'
import profile from '@/data/profile.json'
import { articles, getArticle } from '@/lib/articles'
import { getProject } from '@/lib/projects'
import PageShell, { JsonLd, breadcrumbSchema } from '@/components/pages/PageShell'
import { videos } from '@/lib/videos'
import { posts, postUrl } from '@/lib/linkedin'
import { YouTubeEmbed, LinkedInEmbed } from '@/components/pages/Embeds'
import styles from '@/styles/pages/Content.module.css'

const fullName = profile.name.full

export const dynamicParams = false

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const a = getArticle(slug)
  if (!a) return {}
  return {
    title: a.title,
    description: a.description,
    keywords: [...a.tags, fullName],
    alternates: { canonical: `/writing/${a.slug}` },
    openGraph: {
      type: 'article',
      url: `/writing/${a.slug}`,
      siteName: fullName,
      title: `${a.title} | ${fullName}`,
      description: a.description,
      publishedTime: a.date,
      authors: [fullName],
    },
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const a = getArticle(slug)
  if (!a) notFound()
  const project = getProject(a.project)
  const video = videos.find((v) => v.project === a.project)
  const post = project && posts.find((p) => p.title.toLowerCase().includes(project.title.toLowerCase()))
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3)

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Writing', href: '/writing' },
    { name: a.title, href: `/writing/${a.slug}` },
  ]

  return (
    <PageShell breadcrumbs={crumbs}>
      <JsonLd data={breadcrumbSchema(crumbs, SITE_URL)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: a.title,
          alternativeHeadline: a.subtitle,
          description: a.description,
          url: `${SITE_URL}/writing/${a.slug}`,
          mainEntityOfPage: `${SITE_URL}/writing/${a.slug}`,
          datePublished: a.date,
          dateModified: a.date,
          keywords: a.tags.join(', '),
          image: `${SITE_URL}/opengraph-image.png`,
          author: { '@id': `${SITE_URL}/#person` },
          about: project ? { '@type': 'CreativeWork', name: project.title, url: `${SITE_URL}/projects/${project.slug}` } : undefined,
          isPartOf: { '@id': `${SITE_URL}/#website` },
        }}
      />
      <article>
        <p className={styles.eyebrow}>{a.tags.slice(0, 3).join(' · ')}</p>
        <h1 className={styles.h1}>{a.title}</h1>
        <p className={styles.lead}>{a.subtitle}</p>
        <p className={styles.timelineMeta}>
          By <Link href="/about">{fullName}</Link> · {a.date}
        </p>

        {a.sections.map((s) => (
          <section key={s.h}>
            <h2 className={styles.h2}>{s.h}</h2>
            <div className={styles.prose}>
              {(s.p || []).map((t, i) => <p key={i}>{t}</p>)}
              {s.list && <ul>{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
              {s.after && <p>{s.after}</p>}
            </div>
          </section>
        ))}

        {project && (
          <div className={styles.actions}>
            <Link href={`/projects/${project.slug}`} className={styles.btn}>See the {project.title} project</Link>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnGhost}`}>Source on GitHub ↗</a>
          </div>
        )}

        {video && (
          <section>
            <h2 className={styles.h2}>Watch the demo</h2>
            <JsonLd data={{
              '@context': 'https://schema.org',
              '@type': 'VideoObject',
              name: video.title,
              description: video.about,
              thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
              embedUrl: `https://www.youtube.com/embed/${video.id}`,
              url: `https://www.youtube.com/watch?v=${video.id}`,
            }} />
            <div className={styles.card}><YouTubeEmbed id={video.id} title={video.title} /></div>
          </section>
        )}

        {post && (
          <section className={styles.postCard}>
            <h2 className={styles.h2}>Discussed on LinkedIn</h2>
            <h3><a href={postUrl(post.urn)} target="_blank" rel="noopener noreferrer">{post.title}</a></h3>
            <p className={styles.cardSub}>{post.summary}</p>
            <LinkedInEmbed urn={post.urn} title={post.title} />
          </section>
        )}

        <section>
          <h2 className={styles.h2}>More from the blog</h2>
          <ul className={styles.prose}>
            {more.map((x) => <li key={x.slug}><Link href={`/writing/${x.slug}`}>{x.title}</Link></li>)}
            <li><Link href="/blog">Everything on the blog: articles, LinkedIn posts and videos</Link></li>
          </ul>
        </section>
      </article>
    </PageShell>
  )
}
