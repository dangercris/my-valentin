import React from 'react'

/**
 * Barra de progreso con N pasos (ej: 3 pistas).
 * @param {number} total - Total de pasos
 * @param {number} completados - Cuántos están completos (0-based index del actual = completados)
 */
export default function Progress({ total, completados }) {
  return (
    <div className="progress-wrap" role="progressbar" aria-valuenow={completados} aria-valuemin={0} aria-valuemax={total} aria-label={`Progreso: ${completados} de ${total} pistas`}>
      <div className="progress-steps">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`progress-step ${i < completados ? 'completo' : i === completados ? 'activo' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
