import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/siteConfig'
import profile from '@/data/profile.json'
import { projects, getProject, category, snippet, isGithub } from '@/lib/projects'
import { extras } from '@/lib/projectExtras'
import { getArticle } from '@/lib/articles'
import { videos as allVideos } from '@/lib/videos'
import PageShell, { JsonLd, breadcrumbSchema } from '@/components/pages/PageShell'
import styles from '@/styles/pages/Content.module.css'

const fullName = profile.name.full

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) return {}
  const title = `${p.title}: ${p.subtitle}`
  const description = snippet(p.desc)
  return {
    title,
    description,
    keywords: [p.title, ...p.tech, category(p.type), fullName],
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      type: 'article',
      url: `/projects/${p.slug}`,
      siteName: fullName,
      title: `${title} | ${fullName}`,
      description,
      images: [{ url: p.image, alt: `${p.title} screenshot` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${fullName}`,
      description,
      images: [p.image],
    },
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) notFound()

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: p.title, href: `/projects/${p.slug}` },
  ]
  const github = isGithub(p.link)
  const extra = extras[p.slug] ?? {}
  const relatedArticles = (extra.articles ?? []).map(getArticle).filter(Boolean)
  const relatedVideos = (extra.videos ?? []).map((id) => allVideos.find((v) => v.id === id)).filter(Boolean)
  const related = projects
    .filter((o) => o.id !== p.id && category(o.type) === category(p.type))
    .slice(0, 3)

  return (
    <PageShell breadcrumbs={crumbs}>
      <JsonLd data={breadcrumbSchema(crumbs, SITE_URL)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': github ? 'SoftwareSourceCode' : 'CreativeWork',
          name: p.title,
          alternativeHeadline: p.subtitle,
          description: p.desc,
          url: `${SITE_URL}/projects/${p.slug}`,
          image: `${SITE_URL}${p.image}`,
          genre: p.type,
          keywords: p.tech.join(', '),
          ...(github
            ? { codeRepository: p.link, programmingLanguage: p.tech }
            : { sameAs: p.link }),
          author: { '@id': `${SITE_URL}/#person`, '@type': 'Person', name: fullName, url: SITE_URL },
        }}
      />

      <article>
        <p className={styles.eyebrow}>{p.type}</p>
        <h1 className={styles.h1}>{p.title}</h1>
        <p className={styles.lead}>{p.subtitle}</p>

        <div className={styles.actions}>
          <a href={p.link} target="_blank" rel="noopener noreferrer" className={styles.btn}>
            {github ? 'View source on GitHub' : 'View live project'} ↗
          </a>
          <Link href="/projects" className={`${styles.btn} ${styles.btnGhost}`}>All projects</Link>
        </div>

        <div className={styles.hero}>
          <Image
            src={`${p.image}?v=${p.imgVersion ?? 1}`}
            alt={`${p.title}: ${p.subtitle}`}
            fill
            priority
            sizes="(min-width: 1152px) 1104px, 100vw"
          />
        </div>

        <h2 className={styles.h2}>About this project</h2>
        <div className={styles.prose}><p>{p.desc}</p></div>

        {extra.problem && (
          <>
            <h2 className={styles.h2}>The problem</h2>
            <div className={styles.prose}><p>{extra.problem}</p></div>
            <h2 className={styles.h2}>Approach</h2>
            <div className={styles.prose}><p>{extra.approach}</p></div>
            <h2 className={styles.h2}>Results</h2>
            <div className={styles.prose}><p>{extra.results}</p></div>
          </>
        )}

        {(relatedArticles.length > 0 || relatedVideos.length > 0) && (
          <>
            <h2 className={styles.h2}>Related</h2>
            <ul className={styles.prose}>
              {relatedArticles.map((a) => (
                <li key={a.slug}>Read: <Link href={`/writing/${a.slug}`}>{a.title}</Link></li>
              ))}
              {relatedVideos.map((v) => (
                <li key={v.id}>Watch: <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer">{v.title}</a></li>
              ))}
            </ul>
          </>
        )}

        <dl className={styles.facts}>
          <div className={styles.fact}><dt>Category</dt><dd>{p.type}</dd></div>
          <div className={styles.fact}><dt>Built by</dt><dd><Link href="/about">{fullName}</Link></dd></div>
          <div className={styles.fact}>
            <dt>{github ? 'Source code' : 'Link'}</dt>
            <dd><a href={p.link} target="_blank" rel="noopener noreferrer">{p.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a></dd>
          </div>
        </dl>

        <h2 className={styles.h2}>Tech stack</h2>
        <ul className={styles.tags}>
          {p.tech.map((t) => <li key={t} className={styles.tag}>{t}</li>)}
        </ul>
      </article>

      {related.length > 0 && (
        <section>
          <h2 className={styles.h2}>More {category(p.type)} projects</h2>
          <ul className={styles.grid}>
            {related.map((o) => (
              <li key={o.id}>
                <Link href={`/projects/${o.slug}`} className={styles.card}>
                  <div className={styles.cardImg}>
                    <Image src={`${o.image}?v=${o.imgVersion ?? 1}`} alt={`${o.title} screenshot`} fill sizes="(min-width: 700px) 33vw, 100vw" />
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{o.title}</h3>
                    <p className={styles.cardSub}>{o.subtitle}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  )
}
