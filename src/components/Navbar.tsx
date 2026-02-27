'use client'

import { motion } from 'framer-motion'

export default function Navbar() {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
            style={{
                position: 'fixed',
                top: 0, left: 0, right: 0,
                padding: '32px 32px',
                display: 'flex',
                justifyContent: 'space-between',
                zIndex: 9000,
                pointerEvents: 'none', // Allow clicking through empty space
                mixBlendMode: 'difference', // Ensure it's visible over anything
                color: '#E9E8E1'
            }}
        >
            <div style={{ flex: 1, pointerEvents: 'auto' }}>
                <a href="#projects" className="font-body interactive" style={{ fontSize: '14px', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: 'inherit' }}>
                    Work
                </a>
            </div>
            <div style={{ flex: 1, textAlign: 'center', pointerEvents: 'auto' }}>
                <a href="#about" className="font-body interactive" style={{ fontSize: '14px', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: 'inherit' }}>
                    About
                </a>
            </div>
            <div style={{ flex: 1, textAlign: 'right', pointerEvents: 'auto' }}>
                <a href="#contact" className="font-body interactive" style={{ fontSize: '14px', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: 'inherit' }}>
                    Contact
                </a>
            </div>
        </motion.nav>
    )
}
