import React, { useState, useCallback } from 'react'
import { CONFIG } from '../config'
import Card from './Card'
import Confetti from './Confetti'

export default function FinalAsk({ onRepetir }) {
  const [dijoSi, setDijoSi] = useState(false)
  const [mostrarConfetti, setMostrarConfetti] = useState(false)

  const handleSi = useCallback(() => {
    setDijoSi(true)
    setMostrarConfetti(true)
  }, [])

  return (
    <section className="pantalla final-pantalla" aria-labelledby="final-title">
      {mostrarConfetti && <Confetti onEnd={() => setMostrarConfetti(false)} />}

      {!dijoSi ? (
        <>
          <div className="nomos-decor">🧙‍♂️💘🧙‍♀️</div>
          <h2 id="final-title">Código desbloqueado</h2>
          <Card>
            <p className="final-mensaje">{CONFIG.mensajeFinal}</p>
            <p className="final-pregunta">¿Quieres ser mi San Valentín?</p>
            <div className="final-buttons btn-group">
              <button type="button" className="btn btn-primario" onClick={handleSi}>
                Sí
              </button>
              <button type="button" className="btn btn-primario" onClick={handleSi}>
                Obvio que sí
              </button>
            </div>
          </Card>
        </>
      ) : (
        <div className="final-celebracion">
          <p className="mensaje-si">{CONFIG.mensajeSi}</p>
          <Card className="card-compact">
            <div className="btn-group">
              <button type="button" className="btn btn-secundario" onClick={onRepetir}>
                Repetir
              </button>
            </div>
          </Card>
        </div>
      )}

      {!dijoSi && (
        <div className="repetir-wrap">
          <button type="button" className="btn btn-secundario" onClick={onRepetir}>
            Volver al inicio
          </button>
        </div>
      )}
    </section>
  )
}
