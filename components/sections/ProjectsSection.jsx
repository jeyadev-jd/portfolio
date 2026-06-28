'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import profile from '@/data/profile.json'
import styles from '@/styles/sections/ProjectsSection.module.css'

const PROJECTS = profile.projects

export default function ProjectsSection() {
  const sectionRef  = useRef(null)
  const trackRef    = useRef(null)
  const bgRefs      = useRef([])
  const counterRef  = useRef(null)
  const progressRef = useRef(null)
  const [slideIdx, setSlideIdx] = useState(0)

  useEffect(() => {
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

        if (counterRef.current) counterRef.current.textContent = `0${activeIdx + 1}`
      },
    })

    return () => st.kill()
  }, [])

  return (
    <div style={{ height: `${PROJECTS.length * 100}vh` }}>
      <section ref={sectionRef} className={styles.section}>

        {/* Top bar */}
        <div className={styles.topBar}>
          <span className={styles.sectionLabel}>Projects</span>
          <div className={styles.counter}>
            <span ref={counterRef} className={styles.cCur}>01</span>
            <span className={styles.cSep}> / </span>
            <span className={styles.cTot}>0{PROJECTS.length}</span>
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
                  quality={100}
                  sizes="100vw"
                  className={styles.slideImg}
                  priority={i === 0}
                />
                <div className={styles.slideOverlayLeft}   aria-hidden />
                <div className={styles.slideOverlayBottom} aria-hidden />
                <div className={styles.slideVignette}      aria-hidden />
              </div>

              <span className={styles.slideNum} aria-hidden>0{i + 1}</span>

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
