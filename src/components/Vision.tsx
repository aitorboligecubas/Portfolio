'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Vision() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.quote-text',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '#vision', start: 'top 75%' }
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} id="vision" style={{
            padding: '160px 32px',
            borderTop: '1px solid var(--color-ink-12)',
            borderBottom: '1px solid var(--color-ink-12)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                <h2 className="quote-text font-serif" style={{
                    fontSize: 'clamp(32px, 5vw, 64px)',
                    lineHeight: 1.1,
                    color: 'var(--color-ink)',
                    margin: 0,
                    letterSpacing: '-0.02em',
                }}>
                    &quot;I want to work with purpose, build things that matter, and grow in places I&apos;ve never been.&quot;
                </h2>
                <p className="quote-text font-body" style={{ marginTop: '48px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5 }}>
                    The Objective
                </p>
            </div>
        </section>
    )
}
