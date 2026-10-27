import { withSeo } from '@/lib/seo'
import { SITE_URL } from '@/lib/siteConfig'
import profile from '@/data/profile.json'
import { posts, certifications, postUrl, PROFILE_URL, ACTIVITY_URL } from '@/lib/linkedin'
import PageShell, { JsonLd, breadcrumbSchema } from '@/components/pages/PageShell'
import { LinkedInEmbed } from '@/components/pages/Embeds'
import styles from '@/styles/pages/Content.module.css'

const fullName = profile.name.full
const title = 'LinkedIn Posts, Hackathons and Certifications'
const description = `Posts, hackathon results, community sessions and certifications from ${fullName}, an AI engineer in ${profile.location.based}, with links to the original LinkedIn posts.`

export const metadata = withSeo('/linkedin', {
  title,
  description,
  alternates: { canonical: '/linkedin' },
  openGraph: {
    type: 'website',
    url: '/linkedin',
    siteName: fullName,
    title: `${title} | ${fullName}`,
    description,
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: `${fullName} on LinkedIn` }],
  },
})

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'LinkedIn', href: '/linkedin' },
]

export default function LinkedInPage() {
  return (
    <PageShell breadcrumbs={crumbs}>
      <JsonLd data={breadcrumbSchema(crumbs, SITE_URL)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: title,
          url: `${SITE_URL}/linkedin`,
          about: { '@id': `${SITE_URL}/#person` },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: posts.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'SocialMediaPosting',
                headline: p.title,
                text: p.summary,
                datePublished: p.date,
                url: postUrl(p.urn),
                author: { '@id': `${SITE_URL}/#person` },
              },
            })),
          },
        }}
      />
      <h1 className={styles.h1}>LinkedIn</h1>
      <p className={styles.lead}>Project launches, hackathons, community sessions and certifications, each linked to the original post.</p>
      <div className={styles.actions}>
        <a href={PROFILE_URL} target="_blank" rel="me noopener noreferrer" className={styles.btn}>Profile on LinkedIn ↗</a>
        <a href={ACTIVITY_URL} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnGhost}`}>All activity ↗</a>
      </div>

      <h2 className={styles.h2}>Posts</h2>
      <ol className={styles.timeline}>
        {posts.map((p) => (
          <li key={p.urn} className={styles.timelineItem}>
            <h3><a href={postUrl(p.urn)} target="_blank" rel="noopener noreferrer">{p.title}</a></h3>
            <p className={styles.timelineMeta}>{p.date}</p>
            <LinkedInEmbed urn={p.urn} title={p.title} h={p.h} />
          </li>
        ))}
      </ol>

      <h2 className={styles.h2} id="certifications">Certifications and badges</h2>
      <ul className={styles.prose}>
        {certifications.map((c) => (
          <li key={c.urn}>
            <a href={postUrl(c.urn)} target="_blank" rel="noopener noreferrer">{c.name}</a>, {c.issuer} ({c.date.slice(0, 7)})
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
