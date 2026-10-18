import Link from 'next/link'
import profile from '@/data/profile.json'
import styles from '@/styles/pages/Content.module.css'

// Shared frame for the crawlable sub-pages (/about, /projects, /projects/[slug]).
// html/body are overflow:hidden for the cinematic home page, so this <main>
// is the scroll container here.
export default function PageShell({ children, breadcrumbs = [] }) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>{profile.name.full}</Link>
        <nav aria-label="Main" className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/hire">Hire</Link>
          <a href={`mailto:${profile.email}`}>Contact</a>
        </nav>
      </header>

      {breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <ol>
            {breadcrumbs.map(({ name, href }, i) => (
              <li key={href}>
                {i < breadcrumbs.length - 1 ? <Link href={href}>{name}</Link> : <span aria-current="page">{name}</span>}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className={styles.content}>{children}</div>

      <footer className={styles.footer}>
        <p>
          {profile.name.full} · {profile.roles.detailed} · {profile.location.based}
        </p>
        <p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="me noopener noreferrer">{s.label}</a>
          ))}
        </p>
      </footer>
    </main>
  )
}

export function breadcrumbSchema(items, siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, href }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${siteUrl}${href === '/' ? '' : href}`,
    })),
  }
}

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
