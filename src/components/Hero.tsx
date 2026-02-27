'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null)
    const topTextRef = useRef<HTMLDivElement>(null)
    const bottomTextRef = useRef<HTMLDivElement>(null)

    // Scroll progress for the hero section (0 at top, 1 when scrolled past)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    })

    // Descriptive text: starts invisible, fades in between 5%-25% scroll
    const descOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1])
    const descY = useTransform(scrollYProgress, [0.05, 0.25], [25, 0])

    useEffect(() => {
        const section = sectionRef.current
        const topText = topTextRef.current
        const bottomText = bottomTextRef.current
        if (!section || !topText || !bottomText) return

        const ctx = gsap.context(() => {
            gsap.to(topText, {
                y: -150,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5
                }
            })

            gsap.to(bottomText, {
                y: -300,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5
                }
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="hero"
            style={{
                height: '100vh',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'var(--color-bg)',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>

                {/* Massive Typography - Top Line (AITOR serif) */}
                <motion.div
                    ref={topTextRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif"
                    style={{
                        position: 'absolute',
                        top: '25%',
                        left: '-2vw',
                        fontSize: '32vw',
                        lineHeight: 0.8,
                        letterSpacing: '-0.02em',
                        color: 'var(--color-ink)',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none'
                    }}
                >
                    AITOR
                </motion.div>

                {/* Massive Typography - Bottom Line (BOLIGE sans) */}
                <motion.div
                    ref={bottomTextRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="font-body"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '10vw',
                        fontSize: '28vw',
                        lineHeight: 0.8,
                        letterSpacing: '-0.04em',
                        fontWeight: 300,
                        color: 'var(--color-ink)',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none'
                    }}
                >
                    BOLIGE
                </motion.div>

                {/* Centred conceptual subtitle (Alex Becher style) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="font-body hero-subtitle"
                    style={{
                        position: 'absolute',
                        bottom: '15vh',
                        left: 0,
                        right: 0,
                        textAlign: 'center',
                        fontSize: '16px',
                        fontWeight: 300,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--color-ink)',
                        opacity: 0.7,
                        pointerEvents: 'none'
                    }}
                >
                    POLYMATH &middot; STRATEGIST &middot; BUILDER
                </motion.div>

                {/* Scroll-triggered descriptive line */}
                <motion.p
                    className="font-serif hero-desc"
                    style={{
                        position: 'absolute',
                        bottom: '6vh',
                        left: 0,
                        right: 0,
                        textAlign: 'center',
                        fontSize: 'clamp(0.75rem, 1.8vw, 1rem)',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        lineHeight: 1.6,
                        letterSpacing: '0.04em',
                        color: 'rgba(41, 40, 40, 0.88)',
                        margin: '0 auto',
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                        opacity: descOpacity,
                        y: descY,
                    }}
                >
                    Third-year engineering. Learning fast. Building real systems.
                </motion.p>

            </div>
        </section>
    )
}
