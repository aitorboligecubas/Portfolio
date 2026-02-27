'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const [text, setText] = useState('')

    useEffect(() => {
        const cursor = cursorRef.current
        if (!cursor) return

        let mouseX = 0
        let mouseY = 0
        let cursorX = 0
        let cursorY = 0

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        const onMouseOver = (e: MouseEvent) => {
            const el = e.target as HTMLElement
            // General hover
            if (el.closest('a, button, .interactive, .pill')) {
                cursor.classList.add('hover')
            } else {
                cursor.classList.remove('hover')
            }

            // Specific "Scroll" hover for projects
            if (el.closest('.project-hover-target')) {
                cursor.classList.add('hover-scroll')
                setText('- SCROLL')
            } else {
                cursor.classList.remove('hover-scroll')
                setText('')
            }
        }

        window.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseover', onMouseOver)

        let rafId: number
        const render = () => {
            cursorX += (mouseX - cursorX) * 0.19 // ~0.08s lag for e-t.studio feel
            cursorY += (mouseY - cursorY) * 0.19
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`
            rafId = requestAnimationFrame(render)
        }
        rafId = requestAnimationFrame(render)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseover', onMouseOver)
            cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <div ref={cursorRef} className="custom-cursor hidden md:flex">
            {text}
        </div>
    )
}
