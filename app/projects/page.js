import Image from 'next/image'
import Link from 'next/link'
import { SITE_URL } from '@/lib/siteConfig'
import profile from '@/data/profile.json'
import { projects, category, snippet } from '@/lib/projects'
import PageShell, { JsonLd, breadcrumbSchema } from '@/components/pages/PageShell'
import styles from '@/styles/pages/Content.module.css'

const fullName = profile.name.full
const title = 'Projects: AI, Machine Learning & Full-Stack'
const description = `${projects.length} projects by ${fullName}, an AI/ML engineer in ${profile.location.based}: machine learning, computer vision, NLP and RAG systems, trading bots, and production full-stack apps, with source code.`

export const metadata = {
  title,
  description,
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    url: '/projects',
    siteName: fullName,
    title: `${title} | ${fullName}`,
    description,
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: `Projects by ${fullName}` }],
  },
}

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
]

const categories = [...new Set(projects.map((p) => category(p.type)))]

export default function ProjectsPage() {
  return (
    <PageShell breadcrumbs={crumbs}>
      <JsonLd data={breadcrumbSchema(crumbs, SITE_URL)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${title} | ${fullName}`,
          url: `${SITE_URL}/projects`,
          description,
          author: { '@id': `${SITE_URL}/#person` },
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: projects.length,
            itemListElement: projects.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${SITE_URL}/projects/${p.slug}`,
              name: p.title,
            })),
          },
        }}
      />

      <p className={styles.eyebrow}>Portfolio</p>
      <h1 className={styles.h1}>Projects by {fullName}</h1>
      <p className={styles.lead}>
        {projects.length} AI, machine learning and full-stack projects, from research prototypes to apps
        running in production. Each page covers what the project does, how it works and the stack behind it.
      </p>

      <ul className={styles.filters} aria-label="Categories">
        {categories.map((c) => (
          <li key={c}><a href={`#${c.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{c}</a></li>
        ))}
      </ul>

      {categories.map((c) => (
        <section key={c} id={c.toLowerCase().replace(/[^a-z]+/g, '-')}>
          <h2 className={styles.h2}>{c} projects</h2>
          <ul className={styles.grid}>
            {projects.filter((p) => category(p.type) === c).map((p) => (
              <li key={p.id}>
                <Link href={`/projects/${p.slug}`} className={styles.card}>
                  <div className={styles.cardImg}>
                    <Image
                      src={`${p.image}?v=${p.imgVersion ?? 1}`}
                      alt={`${p.title} screenshot`}
                      fill
                      sizes="(min-width: 1152px) 360px, (min-width: 700px) 45vw, 100vw"
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.eyebrow}>{p.type}</span>
                    <h3 className={styles.cardTitle}>{p.title}</h3>
                    <p className={styles.cardSub}>{p.subtitle}</p>
                    <p className={styles.cardDesc}>{snippet(p.desc, 140)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </PageShell>
  )
}
