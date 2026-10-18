import Link from 'next/link'
import { SITE_URL } from '@/lib/siteConfig'
import profile from '@/data/profile.json'
import { projects, category, snippet } from '@/lib/projects'
import PageShell, { JsonLd, breadcrumbSchema } from '@/components/pages/PageShell'
import styles from '@/styles/pages/Content.module.css'

const fullName = profile.name.full
const city = profile.location.based.split(',')[0]
const title = `Hire ${fullName}: ${profile.roles.short} & Full-Stack Developer in ${city}`
const description = `${fullName} is an ${profile.roles.short} and full-stack developer in ${profile.location.based}, open to internships and roles (${profile.location.availability}). Machine learning, RAG, computer vision, Next.js and MERN projects with source code.`

export const metadata = {
  title,
  description,
  alternates: { canonical: '/hire' },
  openGraph: {
    type: 'website',
    url: '/hire',
    siteName: fullName,
    title: `${title} | ${fullName}`,
    description,
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: `Hire ${fullName}` }],
  },
}

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Hire', href: '/hire' },
]

const aiProjects = projects.filter((p) => category(p.type) === 'AI').slice(0, 4)
const fullStackProjects = projects.filter((p) => category(p.type) === 'Full-Stack').slice(0, 3)

const faqs = [
  {
    q: `Where is ${fullName} based?`,
    a: `${profile.location.based}. Open to ${profile.location.availability} work.`,
  },
  {
    q: 'What kind of work is he looking for?',
    a: `Internships and early-career roles in machine learning, applied AI and full-stack development. ${fullName} is studying ${profile.education.degree} at ${profile.education.institution} (${profile.education.period}).`,
  },
  {
    q: 'What does he work with?',
    a: `${profile.skills.join(', ')}.`,
  },
  {
    q: 'How can I see his work?',
    a: `Every project has its own page with the problem, stack and source code link, listed on the projects page.`,
  },
]

export default function HirePage() {
  return (
    <PageShell breadcrumbs={crumbs}>
      <JsonLd data={breadcrumbSchema(crumbs, SITE_URL)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          url: `${SITE_URL}/hire`,
          description,
          about: { '@id': `${SITE_URL}/#person` },
          isPartOf: { '@id': `${SITE_URL}/#website` },
        }}
      />

      <p className={styles.eyebrow}>{profile.roles.detailed}</p>
      <h1 className={styles.h1}>Hire {fullName}: {profile.roles.short} and full-stack developer in {city}</h1>
      <p className={styles.lead}>
        {profile.tagline} Based in {profile.location.based}, open to {profile.location.availability} roles and internships.
      </p>

      <div className={styles.actions}>
        <a href={`mailto:${profile.email}?subject=Opportunity%20for%20${encodeURIComponent(fullName)}`} className={styles.btn}>Email {profile.name.first}</a>
        {profile.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="me noopener noreferrer" className={`${styles.btn} ${styles.btnGhost}`}>{s.label}</a>
        ))}
      </div>

      <h2 className={styles.h2}>What I can build for your team</h2>
      <div className={styles.prose}>
        <p><strong>Applied machine learning.</strong> Forecasting and risk models, computer vision, NLP and retrieval-augmented generation, taken from notebook to a working service.</p>
        <p><strong>Full-stack products.</strong> Production MERN and Next.js apps end to end: UI, auth, database and deployment.</p>
      </div>

      <h2 className={styles.h2}>AI and machine learning work</h2>
      <ul className={styles.grid}>
        {aiProjects.map((p) => (
          <li key={p.id}>
            <Link href={`/projects/${p.slug}`} className={styles.card}>
              <div className={styles.cardBody}>
                <span className={styles.eyebrow}>{p.type}</span>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardSub}>{p.subtitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className={styles.h2}>Full-stack work</h2>
      <ul className={styles.grid}>
        {fullStackProjects.map((p) => (
          <li key={p.id}>
            <Link href={`/projects/${p.slug}`} className={styles.card}>
              <div className={styles.cardBody}>
                <span className={styles.eyebrow}>{p.type}</span>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardSub}>{snippet(p.desc, 90)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className={styles.h2}>Stack</h2>
      <ul className={styles.tags}>
        {profile.skills.map((s) => <li key={s} className={styles.tag}>{s}</li>)}
      </ul>

      <h2 className={styles.h2}>Quick answers</h2>
      <dl className={styles.facts}>
        {faqs.map(({ q, a }) => (
          <div key={q} className={styles.fact}><dt>{q}</dt><dd>{a}</dd></div>
        ))}
      </dl>

      <div className={styles.actions}>
        <Link href="/projects" className={styles.btn}>All {projects.length} projects</Link>
        <Link href="/about" className={`${styles.btn} ${styles.btnGhost}`}>About {profile.name.first}</Link>
      </div>
    </PageShell>
  )
}
