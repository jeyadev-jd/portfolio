'use client'

import { useState } from 'react'
import styles from '@/styles/pages/Content.module.css'

// The YouTube player loads only on tap: each one pulls about 1 MB of script.

export function YouTubeEmbed({ id, title }) {
  const [on, setOn] = useState(false)
  return (
    <div className={styles.embed16x9}>
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" className={styles.embedFacade} onClick={() => setOn(true)} aria-label={`Play video: ${title}`}>
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
          <span className={styles.playBtn} aria-hidden>▶</span>
        </button>
      )}
    </div>
  )
}

// The full post, with its pictures. loading="lazy" keeps it from downloading until
// it is scrolled near, so a page of posts stays fast.
export function LinkedInEmbed({ urn, title }) {
  return (
    <div className={styles.embedPost}>
      <iframe
        src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${urn}`}
        title={`LinkedIn post: ${title}`}
        loading="lazy"
      />
    </div>
  )
}
