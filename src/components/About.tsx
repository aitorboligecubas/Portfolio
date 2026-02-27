'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function About() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return

        gsap.fromTo(el.querySelectorAll('.fade-up'),
            { autoAlpha: 0, y: 40 },
            {
                autoAlpha: 1, y: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                }
            }
        )
    }, [])

    const metrics = [
        { value: '1', label: 'End-to-end System' },
        { value: '2', label: 'Hackathon MVPs' },
        { value: '6+', label: 'Core Technologies' }
    ]

    return (
        <section ref={sectionRef} id="about" className="about-section" style={{ padding: '128px 32px' }}>
            <div className="about-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '96px',
                alignItems: 'start'
            }}>
                {/* Left: Narrative Philosophy */}
                <div className="fade-up" style={{ maxWidth: '600px' }}>
                    <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '48px', fontWeight: 600 }}>
                        HOW I BUILD
                    </h2>

                    <p className="font-serif about-serif" style={{ fontSize: '32px', lineHeight: 1.3, margin: '0 0 40px 0', letterSpacing: '-0.02em' }}>
                        In my third year of Telecommunications Engineering at UPF — building real systems, learning how networks scale, and discovering that the most interesting problems live at the intersection of technology and business.
                    </p>

                    <div className="font-body about-body" style={{ fontSize: '16px', lineHeight: 1.7, opacity: 0.8, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <p style={{ margin: 0 }}>
                            Every project taught me something beyond the syntax. Integrating APIs, deploying systems, connecting services, shipping something that actually runs — each one pushed me to ask a question I didn&apos;t expect: why does this exist? Who is it for? What problem does it solve?
                        </p>
                        <p style={{ margin: 0 }}>
                            I realized the hard part isn&apos;t the code. It&apos;s understanding what it&apos;s for. It&apos;s seeing the system behind the system — the business logic, the user need, the decision that made someone build it in the first place.
                        </p>
                        <p style={{ margin: 0 }}>
                            That&apos;s the engineer I&apos;m becoming. Someone who builds with precision but thinks with purpose. Engineering got me here. Business is where I&apos;m going.
                        </p>
                    </div>
                </div>

                {/* Right: Micro-metrics visual */}
                <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '64px', paddingTop: '64px' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        {metrics.map((m, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '24px' }}>
                                <span className="font-serif" style={{ fontSize: '64px', lineHeight: 1, color: 'var(--color-ink)', letterSpacing: '-0.04em' }}>
                                    {m.value}
                                </span>
                                <span className="font-body" style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7, fontWeight: 500 }}>
                                    {m.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span className="font-body" style={{ fontSize: '14px', opacity: 0.5, letterSpacing: '0.05em' }}>STATUS</span>
                        <span className="font-body" style={{ fontSize: '18px' }}>Open to internships (Mar 2026)</span>
                    </div>

                </div>
            </div>
        </section>
    )
}
