import React from 'react'

/**
 * Tarjeta reutilizable con sombra y borde redondeado.
 * @param {React.ReactNode} children - Contenido
 * @param {string} [className] - Clases adicionales (ej: "intro-card", "card-compact")
 */
export default function Card({ children, className = '' }) {
  return (
    <div className={`card ${className}`.trim()}>
      {children}
    </div>
  )
}
