'use client'

import { useEffect, useState } from "react"

export default function WorldLoader() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const hide = () => setVisible(false)
    window.addEventListener('world-loaded', hide)
    return () => window.removeEventListener('world-loaded', hide)
  }, [])

  if (!visible) return null
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        color: '#fff',
        fontFamily: 'sans-serif',
        flexDirection: 'column',
      }}
    >
      <div style={{ fontSize: 18, marginBottom: 12 }}>
        Loading City...
      </div>

      <div
        style={{
          width: 180,
          height: 6,
          background: '#222',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          className="loader-bar"
          style={{
            width: '100%',
            height: '100%',
            background: '#4ade80',
            animation: 'loading 1.5s infinite',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
