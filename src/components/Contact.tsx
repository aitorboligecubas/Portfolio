'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Contact() {
    const containerRef = useRef<HTMLElement>(null)
    const EMAIL = 'aitorboligecubas@gmail.com'

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.contact-anim',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '#contact',
                        start: 'top 85%'
                    }
                }
            )
        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} id="contact" style={{ padding: '160px 32px', borderTop: '1px solid var(--color-ink-12)' }}>
            <div className="contact-layout" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <div className="contact-anim" style={{ maxWidth: '500px' }}>
                    <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '48px', fontWeight: 600 }}>
                        Let's Talk
                    </h2>
                    <p className="font-serif" style={{ fontSize: '32px', lineHeight: 1.3, letterSpacing: '-0.02em', margin: 0 }}>
                        Open to internships from March 2026. Product, strategy, or tech — wherever the impact is.
                    </p>

                    <a
                        href={`mailto:${EMAIL}`}
                        className="interactive font-serif"
                        style={{
                            display: 'inline-block',
                            fontSize: 'clamp(36px, 10vw, 64px)',
                            color: 'var(--color-ink)',
                            textDecoration: 'none',
                            marginTop: '48px',
                            letterSpacing: '-0.04em',
                            transition: 'opacity 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.5'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        Say hello
                    </a>
                    <a
                        href={`mailto:${EMAIL}`}
                        className="interactive font-body"
                        style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: 300,
                            color: 'var(--color-ink)',
                            opacity: 0.6,
                            textDecoration: 'none',
                            marginTop: '8px',
                            transition: 'opacity 0.3s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; e.currentTarget.style.opacity = '0.9' }}
                        onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; e.currentTarget.style.opacity = '0.6' }}
                    >
                        {EMAIL}
                    </a>
                </div>

                <div className="contact-anim contact-right" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'right' }}>
                    <a href="https://linkedin.com/in/aitorboligecubas" target="_blank" rel="noopener noreferrer" className="interactive font-body" style={{ fontSize: '16px', opacity: 0.6, textDecoration: 'none', color: 'inherit' }}>LinkedIn</a>
                    <a href="https://github.com/aitorboligecubas" target="_blank" rel="noopener noreferrer" className="interactive font-body" style={{ fontSize: '16px', opacity: 0.6, textDecoration: 'none', color: 'inherit' }}>GitHub</a>
                    <a href="/Resume-AitorBC.pdf" download className="interactive font-body" style={{ fontSize: '16px', opacity: 0.6, textDecoration: 'none', color: 'inherit' }}>Download Resume</a>
                </div>

            </div>
        </section>
    )
}
