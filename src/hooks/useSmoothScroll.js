import { useEffect } from 'react'
import Lenis from 'lenis'
import { setSmoothScroller } from '../lib/sectionNavigation.js'

function useSmoothScroll() {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
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
      if (lenis || reducedMotionQuery.matches) {
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

    const handleMotionPreferenceChange = () => {
      if (reducedMotionQuery.matches) {
        stopLenis()
        return
      }

      startLenis()
    }

    startLenis()
    reducedMotionQuery.addEventListener('change', handleMotionPreferenceChange)

    return () => {
      reducedMotionQuery.removeEventListener('change', handleMotionPreferenceChange)
      stopLenis()
    }
  }, [])
}

export default useSmoothScroll
