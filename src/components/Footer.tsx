'use client'

export default function Footer() {
    return (
        <footer style={{
            padding: '32px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--color-ink-12)'
        }}>
            <p className="font-body" style={{ fontSize: '12px', opacity: 0.5, margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                © 2026
            </p>
            <p className="font-body" style={{ fontSize: '14px', margin: 0 }}>
                Built with purpose.
            </p>
        </footer>
    )
}
