'use client'

import { useState } from 'react'
import styles from '@/styles/pages/Content.module.css'

// Embeds load only on tap: a YouTube or LinkedIn iframe pulls about 500 KB-1 MB
// of third-party script, so a page of them would be slow on phones.

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

export function LinkedInEmbed({ urn, title }) {
  const [on, setOn] = useState(false)
  if (on) {
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
  return (
    <button type="button" className={styles.embedOpen} onClick={() => setOn(true)}>
      <span className={styles.liBadge} aria-hidden>in</span> Show the LinkedIn post here
    </button>
  )
}
