'use client'

import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { initGSAP } from '@/lib/gsap-config'
import LoadingScreen from '@/components/LoadingScreen'
import CustomCursor from '@/components/CustomCursor'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Vision from '@/components/Vision'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// Initialize GSAP plugins globally
initGSAP()

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Initialize Lenis smooth scrolling (Studio Freight recommended)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like ease
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    } as any)

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <LoadingScreen onComplete={() => {
        window.scrollTo(0, 0)
        setIsLoaded(true)
      }} />

      {/* Main content mounts after loading so Hero animations play fresh */}
      {isLoaded && (
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Vision />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  )
}
