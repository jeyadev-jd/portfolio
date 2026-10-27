'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import profile from '@/data/profile.json'
import { slugify } from '@/lib/projects'
import styles from '@/styles/sections/ProjectsSection.module.css'

const PROJECTS = profile.projects
const pad = (n) => String(n).padStart(2, '0')

export default function ProjectsSection() {
  const sectionRef  = useRef(null)
  const trackRef    = useRef(null)
  const bgRefs      = useRef([])
  const counterRef  = useRef(null)
  const progressRef = useRef(null)
  const [slideIdx, setSlideIdx] = useState(0)
  // Phones get one screen with a native horizontal card carousel: the pinned
  // 34-screen slider was too heavy to scroll smoothly on touch.
  const [isPhone, setIsPhone] = useState(false)

  useEffect(() => {
    setIsPhone(window.matchMedia('(max-width: 767px)').matches)
  }, [])

  useEffect(() => {
    if (isPhone) return
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    const scroller = document.querySelector('main')
    if (!scroller) return
    const n = PROJECTS.length
    bgRefs.current = bgRefs.current.slice(0, n)

    const tl = gsap.timeline({ paused: true })

    // Horizontal slide - xPercent is viewport-independent. Only the background
    // images live on this track now; title/desc are a separate fixed panel
    // (rendered once, outside the track) that swaps content by index instead
    // of physically traveling with the slide.
    tl.to(track, {
      xPercent: -((n - 1) / n * 100),
      ease: 'none',
      duration: n - 1,
    }, 0)

    for (let i = 0; i < n - 1; i++) {
      const nextBg = bgRefs.current[i + 1]

      if (nextBg) {
        tl.fromTo(nextBg,
          { scale: 1.04 },
          { scale: 1.0, duration: 1.0, ease: 'power2.out' },
          i
        )
      }
    }

    const st = ScrollTrigger.create({
      trigger:  section,
      scroller,
      start:    'top top',
      end:      () => `+=${(n - 1) * window.innerHeight}`,
      onUpdate: (self) => {
        tl.progress(self.progress)

        const activeIdx = Math.round(self.progress * (n - 1))
        setSlideIdx(prev => prev !== activeIdx ? activeIdx : prev)

        if (progressRef.current) {
          gsap.set(progressRef.current, {
            scaleX: self.progress, transformOrigin: 'left center', overwrite: true,
          })
        }

        if (counterRef.current) counterRef.current.textContent = pad(activeIdx + 1)
      },
    })

    return () => st.kill()
  }, [isPhone])

  if (isPhone) return <MobileProjects />

  return (
    <div data-scroll-zone style={{ height: `${PROJECTS.length * 100}vh` }}>
      <section ref={sectionRef} className={styles.section}>

        {/* Top bar */}
        <div className={styles.topBar}>
          <span className={styles.sectionLabel}>Projects</span>
          <div className={styles.counter}>
            <span ref={counterRef} className={styles.cCur}>01</span>
            <span className={styles.cSep}> / </span>
            <span className={styles.cTot}>{pad(PROJECTS.length)}</span>
          </div>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className={styles.track}
          style={{ width: `${PROJECTS.length * 100}vw` }}
        >
          {PROJECTS.map((proj, i) => (
            <div key={proj.id} className={styles.slide}>

              <div
                ref={el => { bgRefs.current[i] = el }}
                className={styles.slideBg}
              >
                <Image
                  src={`${proj.image}?v=${proj.imgVersion ?? 1}`}
                  alt={proj.title}
                  fill
                  quality={80}
                  sizes="100vw"
                  className={styles.slideImg}
                  priority={i === 0}
                />
                <div className={styles.slideOverlayLeft}   aria-hidden />
                <div className={styles.slideOverlayBottom} aria-hidden />
                <div className={styles.slideVignette}      aria-hidden />
              </div>

              <span className={styles.slideNum} aria-hidden>{pad(i + 1)}</span>

            </div>
          ))}
        </div>

        {/* Text panel — fixed, never travels with the sliding track. Only the
            background image slides; the title/desc swap in place via a key-based
            remount + CSS fade, so nothing visibly moves left/right. */}
        <div key={slideIdx} className={styles.slideContent}>
          <div className={styles.slideLeft}>
            <div className={styles.meta}>
              <span className={styles.typeTag}>{PROJECTS[slideIdx].type}</span>
            </div>
            <h2 className={styles.title}>{PROJECTS[slideIdx].title}</h2>
            <p  className={styles.subtitle}>{PROJECTS[slideIdx].subtitle}</p>
            <a
              href={PROJECTS[slideIdx].link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.liveBtn}
            >
              <span>Live Demo</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className={styles.slideRight}>
            <p className={styles.desc}>{PROJECTS[slideIdx].desc}</p>
            <div className={styles.stack}>
              {PROJECTS[slideIdx].tech.map(t => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Full project list for search engines and screen readers. The slider
            only renders the active slide's text, so this keeps every project's
            title, description, stack and link in the HTML. Same content as the
            slides, just not visually repeated. */}
        <div className="sr-only">
          <h2>Projects</h2>
          <Link href="/projects">All projects</Link>
          <ul>
            {PROJECTS.map((proj) => (
              <li key={proj.id}>
                <h3>{proj.title}: {proj.subtitle}</h3>
                <p>{proj.type}</p>
                <p>{proj.desc}</p>
                <p>Tech stack: {proj.tech.join(', ')}</p>
                <Link href={`/projects/${slugify(proj.title)}`}>{proj.title} project details</Link>
                <a href={proj.link}>{proj.title} source</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Progress bar */}
        <div className={styles.bottomUI}>
          <div className={styles.progressTrack}>
            <div ref={progressRef} className={styles.progressBar} />
          </div>
        </div>

      </section>
    </div>
  )
}

function MobileProjects() {
  return (
    <section className={styles.mSection}>
      <div className={styles.topBar}>
        <h2 className={styles.sectionLabel}>Projects</h2>
        <Link href="/projects" className={styles.mAll}>All {PROJECTS.length} →</Link>
      </div>
      <ul className={styles.mTrack} data-hscroll>
        {PROJECTS.map((proj, i) => (
          <li key={proj.id} className={styles.mCard}>
            <Link href={`/projects/${slugify(proj.title)}`} className={styles.mImgWrap}>
              <Image
                src={`${proj.image}?v=${proj.imgVersion ?? 1}`}
                alt={proj.title}
                fill
                quality={70}
                sizes="85vw"
                className={styles.slideImg}
                loading={i < 2 ? 'eager' : 'lazy'}
              />
              <span className={styles.mNum} aria-hidden>{pad(i + 1)}</span>
            </Link>
            <div className={styles.mBody}>
              <span className={styles.typeTag}>{proj.type}</span>
              <h3 className={styles.mTitle}>{proj.title}</h3>
              <p className={styles.mDesc}>{proj.subtitle}</p>
              <div className={styles.stack}>
                {proj.tech.slice(0, 4).map(t => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
              <div className={styles.mLinks}>
                <Link href={`/projects/${slugify(proj.title)}`} className={styles.liveBtn}>Details</Link>
                <a href={proj.link} target="_blank" rel="noopener noreferrer" className={styles.mSrc}>Live ↗</a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
