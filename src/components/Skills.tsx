'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

/* ── Terminal content lines ── */
const lines = [
    { type: 'cmd', text: '> skills --technical' },
    { type: 'out', text: '→ Python · AWS · REST APIs · Next.js · Java · C · SQL · React' },
    { type: 'empty', text: ' ' },
    { type: 'rule', text: '' },
    { type: 'empty', text: ' ' },
    { type: 'cmd', text: '> skills --human' },
    { type: 'out', text: '→ Curious · Strategic · Fast learner · Business-oriented · Calm under pressure' },
]

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null)
    const terminalRef = useRef<HTMLDivElement>(null)
    const scanRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const cursorRef = useRef<HTMLSpanElement>(null)
    const [visibleLines, setVisibleLines] = useState<{ text: string; type: string }[]>([])
    const [currentChar, setCurrentChar] = useState(0)
    const [currentLine, setCurrentLine] = useState(0)
    const [isTyping, setIsTyping] = useState(false)
    const [showCursor, setShowCursor] = useState(false)
    const hasStarted = useRef(false)

    const startTypewriter = useCallback(() => {
        if (hasStarted.current) return
        hasStarted.current = true
        setIsTyping(true)
        setCurrentLine(0)
        setCurrentChar(0)
        setVisibleLines([{ text: '', type: lines[0].type }])
    }, [])

    // Typewriter effect
    useEffect(() => {
        if (!isTyping) return

        const line = lines[currentLine]
        if (!line) {
            // All lines done — show cursor
            setIsTyping(false)
            setShowCursor(true)
            return
        }

        if (line.type === 'empty' || line.type === 'rule') {
            // Empty/rule lines appear instantly
            const timer = setTimeout(() => {
                setVisibleLines(prev => [...prev, { text: line.type === 'rule' ? '' : ' ', type: line.type }])
                const nextLine = currentLine + 1
                if (nextLine < lines.length) {
                    setCurrentLine(nextLine)
                    setCurrentChar(0)
                    setVisibleLines(prev => [...prev, { text: '', type: lines[nextLine].type }])
                } else {
                    setIsTyping(false)
                    setShowCursor(true)
                }
            }, 100)
            return () => clearTimeout(timer)
        }

        if (line.type === 'out') {
            // Output lines: reveal word by word
            const words = line.text.split(' ')
            if (currentChar >= words.length) {
                // Line done, move to next
                const timer = setTimeout(() => {
                    const nextLine = currentLine + 1
                    if (nextLine < lines.length) {
                        setCurrentLine(nextLine)
                        setCurrentChar(0)
                        setVisibleLines(prev => [...prev, { text: '', type: lines[nextLine].type }])
                    } else {
                        setIsTyping(false)
                        setShowCursor(true)
                    }
                }, 200)
                return () => clearTimeout(timer)
            }

            const timer = setTimeout(() => {
                const revealed = words.slice(0, currentChar + 1).join(' ')
                setVisibleLines(prev => {
                    const updated = [...prev]
                    updated[updated.length - 1] = { text: revealed, type: 'out' }
                    return updated
                })
                setCurrentChar(c => c + 1)
            }, 80)
            return () => clearTimeout(timer)
        }

        // Command lines: typewriter char by char
        if (currentChar >= line.text.length) {
            // Line done, pause then move to next
            const timer = setTimeout(() => {
                const nextLine = currentLine + 1
                if (nextLine < lines.length) {
                    setCurrentLine(nextLine)
                    setCurrentChar(0)
                    setVisibleLines(prev => [...prev, { text: '', type: lines[nextLine].type }])
                } else {
                    setIsTyping(false)
                    setShowCursor(true)
                }
            }, 300)
            return () => clearTimeout(timer)
        }

        const timer = setTimeout(() => {
            const typed = line.text.slice(0, currentChar + 1)
            setVisibleLines(prev => {
                const updated = [...prev]
                updated[updated.length - 1] = { text: typed, type: 'cmd' }
                return updated
            })
            setCurrentChar(c => c + 1)
        }, 28)
        return () => clearTimeout(timer)
    }, [isTyping, currentLine, currentChar])

    // GSAP entrance
    useEffect(() => {
        const terminal = terminalRef.current
        const scan = scanRef.current
        const section = sectionRef.current
        if (!terminal || !scan || !section) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    once: true,
                }
            })

            // Step 1: Container scales in
            tl.fromTo(terminal,
                { scale: 0.96, autoAlpha: 0 },
                { scale: 1, autoAlpha: 1, duration: 1.2, ease: 'expo.out' }
            )

                // Step 2: Scan line
                .fromTo(scan,
                    { scaleY: 0 },
                    {
                        scaleY: 1, duration: 0.6, ease: 'power2.inOut', onComplete: () => {
                            gsap.to(scan, { autoAlpha: 0, duration: 0.3 })
                        }
                    },
                    '+=0.2'
                )

                // Step 3: Start typewriter
                .call(() => startTypewriter(), [], '+=0.2')
        }, sectionRef)

        return () => ctx.revert()
    }, [startTypewriter])

    return (
        <section ref={sectionRef} id="skills" style={{ padding: '128px 32px' }}>
            <h2 style={{
                fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em',
                color: '#292828', opacity: 0.4, fontWeight: 600,
                maxWidth: '760px', margin: '0 auto 24px',
            }}>
                Skills
            </h2>
            <div
                ref={terminalRef}
                className="terminal-box"
                style={{
                    maxWidth: '760px',
                    margin: '0 auto',
                    background: '#E2E0D8',
                    border: '1px solid rgba(41, 40, 40, 0.15)',
                    borderRadius: '6px',
                    padding: '0',
                    boxShadow: '0 2px 40px rgba(41, 40, 40, 0.06)',
                    position: 'relative',
                    overflow: 'hidden',
                    opacity: 0,
                    transition: 'box-shadow 0.4s ease, transform 0.4s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 60px rgba(41, 40, 40, 0.10)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 40px rgba(41, 40, 40, 0.06)'
                    e.currentTarget.style.transform = 'translateY(0)'
                }}
            >
                {/* Scan line overlay */}
                <div
                    ref={scanRef}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(41,40,40,0.03), rgba(41,40,40,0.01))',
                        transformOrigin: 'top',
                        zIndex: 2,
                        pointerEvents: 'none',
                    }}
                />

                {/* Header bar with 3 monochrome dots */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(41, 40, 40, 0.10)',
                }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(41, 40, 40, 0.20)' }} />
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(41, 40, 40, 0.35)' }} />
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(41, 40, 40, 0.50)' }} />
                </div>

                {/* Terminal content */}
                <div ref={contentRef} className="terminal-content" style={{
                    padding: '56px 52px 48px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    lineHeight: 2,
                    minHeight: '200px',
                }}>
                    {visibleLines.map((line, i) => {
                        if (line.type === 'rule') {
                            return (
                                <div key={i} style={{
                                    borderBottom: '1px solid rgba(41, 40, 40, 0.08)',
                                    margin: '4px 0',
                                }} />
                            )
                        }
                        return (
                            <div key={i} style={{
                                color: '#292828',
                                opacity: line.type === 'cmd' ? 0.5 : line.type === 'out' ? 0.9 : 0,
                                fontSize: '13px',
                                whiteSpace: 'pre-wrap',
                                minHeight: line.type === 'empty' ? '1.5em' : 'auto',
                            }}>
                                {line.text}
                            </div>
                        )
                    })}

                    {/* Blinking cursor */}
                    {showCursor && (
                        <span
                            ref={cursorRef}
                            style={{
                                color: '#292828',
                                animation: 'cursor-blink 1.2s step-end infinite',
                                fontSize: '15px',
                            }}
                        >
                            █
                        </span>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes cursor-blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `}</style>
        </section>
    )
}
