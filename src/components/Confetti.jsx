import React, { useEffect, useState } from 'react'

const EMOJIS = ['💕', '💘', '💗', '❤️', '💖', '✨', '⭐']
const COLORES = ['#e91e63', '#c2185b', '#f48fb1', '#ce93d8', '#ba68c8']

/**
 * Confetti con CSS puro: partículas con colores y emojis que caen.
 * Sin librerías externas.
 */
export default function Confetti({ onEnd }) {
  const [particulas, setParticulas] = useState([])

  useEffect(() => {
    const cantidad = 35
    const items = []
    for (let i = 0; i < cantidad; i++) {
      const esEmoji = i % 3 === 0
      items.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2.2 + Math.random() * 1,
        emoji: esEmoji ? EMOJIS[i % EMOJIS.length] : null,
        color: COLORES[i % COLORES.length],
      })
    }
    setParticulas(items)

    const t = setTimeout(() => {
      onEnd?.()
    }, 4000)
    return () => clearTimeout(t)
  }, [onEnd])

  return (
    <div className="confetti-wrap" aria-hidden="true">
      {particulas.map((p) => (
        <div
          key={p.id}
          className={`confetti ${p.emoji ? 'corazon' : ''}`}
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            background: p.emoji ? 'none' : p.color,
          }}
        >
          {p.emoji || ''}
        </div>
      ))}
    </div>
  )
}
