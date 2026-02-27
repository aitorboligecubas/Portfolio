'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const hideTimer = setTimeout(() => {
            setIsVisible(false)
        }, 1800)

        return () => clearTimeout(hideTimer)
    }, [])

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: '#F7F6F2',
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.8, ease: 'easeOut' }}
                        style={{
                            fontFamily: 'var(--font-playfair-display)',
                            fontWeight: 400,
                            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                            letterSpacing: '-0.05em',
                            color: '#292828',
                            userSelect: 'none',
                        }}
                    >
                        Aitor Bolige Cubas
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
