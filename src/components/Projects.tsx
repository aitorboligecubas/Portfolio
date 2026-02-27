'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function ProjectRow({ title, subtitle, problem, solution, result, link, index }: any) {
    const rowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!rowRef.current) return
        gsap.fromTo(rowRef.current,
            { y: 80, autoAlpha: 0 },
            {
                y: 0, autoAlpha: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: rowRef.current,
                    start: 'top 85%',
                }
            }
        )
    }, [])

    return (
        <div
            ref={rowRef}
            className="project-hover-target interactive project-row"
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1fr', // Asymmetric grid
                gap: '32px',
                padding: '64px 32px',
                borderTop: index === 0 ? '1px solid var(--color-ink-12)' : 'none',
                borderBottom: '1px solid var(--color-ink-12)',
                alignItems: 'center',
                cursor: 'none' // The custom cursor takes over
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="font-body" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 }}>
                    {subtitle}
                </span>
                <h3 className="font-serif project-title" style={{ fontSize: '32px', margin: 0, lineHeight: 1.15 }}>
                    {title}
                </h3>
            </div>

            <div style={{ paddingRight: '10%' }}>
                <p className="font-body project-desc" style={{ fontSize: '18px', lineHeight: 1.6, margin: 0, opacity: 0.8, fontWeight: 400 }}>
                    {solution}
                </p>
            </div>

            <div className="project-link" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
                <a href={link} target="_blank" rel="noopener noreferrer" className="font-body interactive" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-ink)', textDecoration: 'none' }}>
                    View Case ↗
                </a>
            </div>
        </div>
    )
}

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null)
    const bgTextRef = useRef<HTMLDivElement>(null)

    const projects = [
        {
            title: 'Bicing Air Quality Notifier',
            subtitle: 'UPF, 2026',
            solution: 'Real-time system connecting six external services to deliver live bike availability and air quality — deployed on AWS.',
            link: 'https://github.com/pau12arbues/Project-AT',
        },
        {
            title: 'AI Financial News Curator',
            subtitle: 'Hackathon SBS × N26, 2026',
            solution: 'Architected a decoupled serverless application using Next.js and API, delivering custom macroeconomic narratives for retail users.',
            link: 'https://github.com/arnau-sala/startBCN',
        },
    ]

    useEffect(() => {
        const bgText = bgTextRef.current
        const section = sectionRef.current
        if (!bgText || !section) return

        // Inverse parallax for the decorative text (moves up faster than scroll)
        const ctx = gsap.context(() => {
            gsap.fromTo(bgText,
                { y: 200 },
                {
                    y: -400,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 0.2
                    }
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} id="projects" style={{ position: 'relative', overflow: 'hidden', padding: '128px 0', zIndex: 1 }}>

            {/* Background Parallax Typography (STUDIO -> BOLIGE) */}
            <div
                ref={bgTextRef}
                className="font-body"
                style={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '30vw',
                    fontWeight: 500,
                    lineHeight: 0.8,
                    color: 'var(--color-ink)',
                    opacity: 0.03, // Barely visible decorative backdrop
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    zIndex: -1
                }}
            >
                BOLIGE
            </div>

            <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '64px', fontWeight: 600, padding: '0 32px' }}>
                Works
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {projects.map((p, i) => (
                    <ProjectRow key={p.title} {...p} index={i} />
                ))}
            </div>
        </section>
    )
}
