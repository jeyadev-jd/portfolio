// Runs `step` on each animation frame only while `el` is on screen and the tab is visible.
// Stops cleanly when hidden, so off-screen 3D scenes stop using the main thread.
// Returns a cleanup function.
export function createPausableLoop(el, step) {
  let raf = 0
  let onScreen = false

  const frame = (t) => {
    raf = requestAnimationFrame(frame)
    step(t)
  }
  const start = () => {
    if (!raf && onScreen && !document.hidden) raf = requestAnimationFrame(frame)
  }
  const stop = () => {
    if (raf) { cancelAnimationFrame(raf); raf = 0 }
  }

  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting
    if (onScreen) start(); else stop()
  })
  io.observe(el)

  const onVisibility = () => { if (document.hidden) stop(); else start() }
  document.addEventListener('visibilitychange', onVisibility)

  return () => {
    stop()
    io.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
  }
}
