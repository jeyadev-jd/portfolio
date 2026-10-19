import Link from 'next/link'
import PageShell from '@/components/pages/PageShell'
import styles from '@/styles/pages/Content.module.css'

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <PageShell>
      <h1 className={styles.h1}>Page not found</h1>
      <p className={styles.lead}>That page does not exist. These are good places to start:</p>
      <div className={styles.actions}>
        <Link href="/projects" className={styles.btn}>Projects</Link>
        <Link href="/writing" className={`${styles.btn} ${styles.btnGhost}`}>Writing</Link>
        <Link href="/about" className={`${styles.btn} ${styles.btnGhost}`}>About</Link>
        <Link href="/" className={`${styles.btn} ${styles.btnGhost}`}>Home</Link>
      </div>
    </PageShell>
  )
}
