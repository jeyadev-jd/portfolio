'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import Navbar                from '@/components/ui/Navbar'
import VideoIntro            from '@/components/sections/VideoIntro'
import HeroSection           from '@/components/sections/HeroSection'
import AboutSection          from '@/components/sections/AboutSection'
import ProjectsSection       from '@/components/sections/ProjectsSection'
import WorkExperienceSection from '@/components/sections/WorkExperienceSection'
import PublicationsFooterSection from '@/components/sections/PublicationsFooterSection'
import ScreenLoader from '@/components/sections/ScreenLoader'

// Screens: video, hero, about, projects (one per project on desktop, one carousel on phones), work-exp, publications, footer

export default function Home() {
  const mainRef        = useRef(null)
  const idxRef         = useRef(0)
  const busyRef        = useRef(false)
  const tweenRef       = useRef(null)
  const loopOverlayRef = useRef(null)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const el = mainRef.current
    if (!el) return

    // Screen count: Projects is one screen per project on desktop, one on phones.
    const total = () => Math.round(el.scrollHeight / window.innerHeight)

    function fadeLoop(targetScrollTop, targetIdx) {
      busyRef.current = true
      tweenRef.current?.kill()
      gsap.to(loopOverlayRef.current, {
        opacity: 1,
        duration: 0.55,
        ease: 'power2.in',
        onComplete: () => {
          el.scrollTop    = targetScrollTop
          idxRef.current  = targetIdx
          gsap.to(loopOverlayRef.current, {
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
            delay: 0.05,
            onComplete: () => {
              setTimeout(() => { busyRef.current = false }, 300)
            },
          })
        },
      })
    }

    // `touch` uses a shorter tween and cooldown: phones have no trackpad inertia to absorb.
    function goTo(idx, touch = false) {
      // Wrap-around
      const TOTAL = total()
      if (idx >= TOTAL) idx = 0
      if (idx < 0)      idx = TOTAL - 1

      // Touch swipes may interrupt a running step, so fast flicks chain sections.
      if (idx === idxRef.current || (busyRef.current && !touch)) return

      // Footer → top: fade-cut instead of scrolling back through all sections
      if (idxRef.current === TOTAL - 1 && idx === 0) {
        fadeLoop(0, 0)
        return
      }

      // Top → footer: fade-cut instead of scrolling forward through all sections
      if (idxRef.current === 0 && idx === TOTAL - 1) {
        fadeLoop((TOTAL - 1) * window.innerHeight, TOTAL - 1)
        return
      }

      idxRef.current = idx
      busyRef.current = true
      tweenRef.current?.kill()
      tweenRef.current = gsap.to(el, {
        scrollTop: idx * window.innerHeight,
        duration: touch ? 0.35 : 1.0,
        ease: 'power3.inOut',
        onComplete: () => { setTimeout(() => { busyRef.current = false }, touch ? 80 : 600) },
      })
    }

    function onWheel(e) {
      e.preventDefault()
      if (busyRef.current) return
      goTo(idxRef.current + (e.deltaY > 0 ? 1 : -1))
    }

    // One swipe = one section on every touch device. Phones used native momentum
    // scrolling, which flung past several sections in one swipe.
    // Inner scroll areas (e.g. Work Experience on phones) scroll normally until their edge.
    // Found once per touch, not on every move: walking styles on each touchmove lagged.
    function innerScroller(target) {
      for (let n = target; n && n !== el; n = n.parentElement) {
        const oy = getComputedStyle(n).overflowY
        if ((oy === 'auto' || oy === 'scroll') && n.scrollHeight > n.clientHeight + 1) return n
      }
      return null
    }
    function canScroll(n, dy) {
      if (!n) return false
      if (dy > 0) return n.scrollTop + n.clientHeight < n.scrollHeight - 1
      return n.scrollTop > 0
    }

    // Projects is one screen per project. On touch it scrolls natively with momentum
    // (data-scroll-zone), so a flick moves through several projects.
    function inZone(dy) {
      const z = el.querySelector('[data-scroll-zone]')
      if (!z) return false
      const t = el.scrollTop, top = z.offsetTop, last = top + z.offsetHeight - window.innerHeight
      return dy > 0 ? t >= top - 2 && t < last - 2 : t > top + 2 && t <= last + 2
    }

    // After native scrolling stops, settle on the nearest screen.
    let settleTimer = 0
    function settle() {
      if (busyRef.current) return
      const h = window.innerHeight
      const idx = Math.round(el.scrollTop / h)
      if (Math.abs(el.scrollTop - idx * h) < 2) { idxRef.current = idx; return }
      busyRef.current = true
      tweenRef.current?.kill()
      tweenRef.current = gsap.to(el, {
        scrollTop: idx * h, duration: 0.25, ease: 'power2.out',
        onComplete: () => { idxRef.current = idx; busyRef.current = false },
      })
    }

    let touchY = 0
    let touchX = 0
    let horiz = false
    let scroller = null
    let freeScroll = false
    // Overlay layers can sit above an inner scroll area (Work Experience on phones),
    // so also look for a scrollable element under the finger. The list is built once.
    let scrollables = null
    function scrollerAt(x, y) {
      if (!scrollables) {
        scrollables = [...el.querySelectorAll('*')].filter(n => {
          const oy = getComputedStyle(n).overflowY
          return oy === 'auto' || oy === 'scroll'
        })
      }
      return scrollables.find(n => {
        if (n.scrollHeight <= n.clientHeight + 1) return false
        const r = n.getBoundingClientRect()
        return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom
      }) || null
    }
    function onTouchStart(e) {
      const t = e.touches[0]
      touchY = t.clientY
      touchX = t.clientX
      horiz = false
      scroller = innerScroller(e.target) || scrollerAt(t.clientX, t.clientY)
    }
    function onTouchMove(e) {
      const dy = touchY - e.touches[0].clientY
      // Sideways swipe on the phone project carousel: let it scroll natively.
      if (!horiz && Math.abs(touchX - e.touches[0].clientX) > Math.abs(dy) && e.target.closest('[data-hscroll]')) horiz = true
      if (horiz) return
      freeScroll = inZone(dy)
      if (!freeScroll && !canScroll(scroller, dy)) e.preventDefault()
    }
    function onTouchEnd(e) {
      const dy = touchY - e.changedTouches[0].clientY
      if (horiz || Math.abs(dy) < 25 || freeScroll || canScroll(scroller, dy)) return
      goTo(idxRef.current + (dy > 0 ? 1 : -1), true)
    }

    function onScroll() {
      // Mid-animation positions are not a section; keep the step's target.
      if (!busyRef.current) idxRef.current = Math.round(el.scrollTop / window.innerHeight)
      clearTimeout(settleTimer)
      settleTimer = setTimeout(settle, 140)
    }

    // Footer video ends → same fade-cut loop back to top
    function onFooterLoop() {
      if (busyRef.current) return
      fadeLoop(0, 0)
    }


    el.addEventListener('wheel',  onWheel,  { passive: false })
    el.addEventListener('scroll', onScroll, { passive: true  })

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove',  onTouchMove,  { passive: false })
    el.addEventListener('touchend',   onTouchEnd,   { passive: true })
    window.addEventListener('footer-loop-back', onFooterLoop)

    return () => {
      el.removeEventListener('wheel',  onWheel)
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove',  onTouchMove)
      el.removeEventListener('touchend',   onTouchEnd)
      window.removeEventListener('footer-loop-back', onFooterLoop)
      tweenRef.current?.kill()
      clearTimeout(settleTimer)
    }
  }, [])

  return (
    <>
      {showLoader && (
        <ScreenLoader onDismiss={() => setShowLoader(false)} />
      )}

      {/* Full-screen fade overlay for seamless footer → top loop */}
      <div
        ref={loopOverlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          zIndex: 9999,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      <Navbar />
      <main ref={mainRef} style={{ height: '100vh', overflowY: 'scroll', overscrollBehavior: 'none' }}>
        <div>
          <VideoIntro/>
          <HeroSection/>
          <AboutSection/>
          <ProjectsSection/>
          <WorkExperienceSection/>
          <PublicationsFooterSection/>
        </div>
      </main>
    </>
  )
}
