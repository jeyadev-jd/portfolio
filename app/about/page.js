import { withSeo } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'
import { SITE_URL } from '@/lib/siteConfig'
import profile from '@/data/profile.json'
import { projects } from '@/lib/projects'
import { highlights } from '@/lib/highlights'
import PageShell, { JsonLd, breadcrumbSchema } from '@/components/pages/PageShell'
import styles from '@/styles/pages/Content.module.css'

const fullName = profile.name.full
const title = `About ${fullName}: ${profile.roles.short} in ${profile.location.based.split(',')[0]}`
const description = `${fullName} is an ${profile.roles.short} and full-stack developer from ${profile.location.based}, studying ${profile.education.degree} at ${profile.education.institution}. Experience, skills and education.`

export const metadata = withSeo('/about', {
  title,
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    url: '/about',
    siteName: fullName,
    title: `${title} | ${fullName}`,
    description,
    images: [{ url: '/jeyadev-r.jpg', width: 800, height: 800, alt: `${fullName}, ${profile.roles.short}` }],
  },
})

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
]

const featured = projects.slice(0, 6)

export default function AboutPage() {
  return (
    <PageShell breadcrumbs={crumbs}>
      <JsonLd data={breadcrumbSchema(crumbs, SITE_URL)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: title,
          url: `${SITE_URL}/about`,
          description,
          mainEntity: { '@id': `${SITE_URL}/#person` },
        }}
      />

      <div className={styles.intro}>
        <div className={styles.portrait}>
          <Image src="/jeyadev-r.jpg" alt={`${fullName}, ${profile.roles.short} from ${profile.location.based}`} fill priority sizes="176px" />
        </div>
        <div>
          <p className={styles.eyebrow}>{profile.roles.detailed}</p>
          <h1 className={styles.h1}>About {fullName}</h1>
          <p className={styles.lead}>{profile.tagline}</p>
        </div>
      </div>

      <h2 className={styles.h2}>Who I am</h2>
      <div className={styles.prose}><p>{profile.bio}</p></div>

      <dl className={styles.facts}>
        <div className={styles.fact}><dt>Also written as</dt><dd>R Jeyadev, Jayadev R</dd></div>
        <div className={styles.fact}><dt>Based in</dt><dd>{profile.location.based}</dd></div>
        <div className={styles.fact}><dt>Work mode</dt><dd>{profile.location.availability}</dd></div>
        <div className={styles.fact}><dt>Education</dt><dd>{profile.education.degree}, {profile.education.institution} ({profile.education.period})</dd></div>
        <div className={styles.fact}><dt>Contact</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd></div>
      </dl>

      <h2 className={styles.h2} id="experience">Experience</h2>
      <ol className={styles.timeline}>
        {profile.experience.map((e) => (
          <li key={e.id} className={styles.timelineItem}>
            <h3>{e.role}, {e.company}</h3>
            <p className={styles.timelineMeta}>{e.type} · {e.location} · {e.period} to {e.periodEnd}</p>
            <p className={styles.prose}>{e.desc}</p>
            <ul className={styles.tags}>
              {e.tech?.map((t) => <li key={t} className={styles.tag}>{t}</li>)}
            </ul>
          </li>
        ))}
      </ol>

      <h2 className={styles.h2} id="shipped">Live sites I built</h2>
      <ul className={styles.prose}>
        <li><a href="https://aspcv.com" target="_blank" rel="noopener noreferrer">aspcv.com</a>: corporate website for Aspiration Cleantech Ventures, built on WordPress with a custom Astra child theme.</li>
        <li><a href="https://aspcvacademy.com" target="_blank" rel="noopener noreferrer">aspcvacademy.com</a>: Aspiration Cleantech Academy training platform, built with React and deployed live.</li>
        <li>A full-stack CRM and ERP system for Aspiration Cleantech, covering leads, projects, HR, payroll, inventory and invoicing.</li>
      </ul>

      <h2 className={styles.h2} id="highlights">Highlights and community</h2>
      <ul className={styles.prose}>
        {highlights.map((h) => (
          <li key={h.title}><strong>{h.title}.</strong> {h.detail}</li>
        ))}
      </ul>

      <h2 className={styles.h2}>Skills</h2>
      <ul className={styles.tags}>
        {profile.skills.map((s) => <li key={s} className={styles.tag}>{s}</li>)}
      </ul>

      <h2 className={styles.h2}>Selected projects</h2>
      <ul className={styles.grid}>
        {featured.map((p) => (
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

      <div className={styles.actions} id="contact">
        <Link href="/projects" className={styles.btn}>See all {projects.length} projects</Link>
        <a href={`mailto:${profile.email}`} className={`${styles.btn} ${styles.btnGhost}`}>Email me</a>
      </div>
    </PageShell>
  )
}
