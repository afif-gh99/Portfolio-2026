import { useEffect } from 'react'
import Lenis from 'lenis'
import { setSmoothScroller } from '../lib/sectionNavigation.js'

function useSmoothScroll() {
  useEffect(() => {
    let lenis = null
    let animationFrameId = null

    const stopLenis = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }

      if (lenis) {
        lenis.destroy()
        lenis = null
        setSmoothScroller(null)
      }
    }

    const startLenis = () => {
      if (lenis) {
        return
      }

      lenis = new Lenis({
        lerp: 0.08,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      })
      setSmoothScroller(lenis)

      const raf = (time) => {
        lenis?.raf(time)
        animationFrameId = requestAnimationFrame(raf)
      }

      animationFrameId = requestAnimationFrame(raf)
    }

    startLenis()

    return () => {
      stopLenis()
    }
  }, [])
}

export default useSmoothScroll
