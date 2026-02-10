import React, { useState, useCallback } from 'react'
import { CONFIG } from './config'
import Card from './components/Card'
import Progress from './components/Progress'
import SecretGame from './components/SecretGame'
import FinalAsk from './components/FinalAsk'

export default function App() {
  const [pantalla, setPantalla] = useState('intro') // intro | juego | final
  const [juegoCompleto, setJuegoCompleto] = useState(false)

  const handleEmpezar = useCallback(() => setPantalla('juego'), [])
  const handleJuegoCompleto = useCallback(() => {
    setJuegoCompleto(true)
    setPantalla('final')
  }, [])
  const handleRepetir = useCallback(() => {
    setPantalla('intro')
    setJuegoCompleto(false)
  }, [])

  return (
    <div className="app">
      <div className="app-bg" aria-hidden="true" />
      <main className="app-main">
        {pantalla === 'intro' && (
          <Intro onEmpezar={handleEmpezar} />
        )}
        {pantalla === 'juego' && (
          <SecretGame
            onCompleto={handleJuegoCompleto}
            onRepetir={handleRepetir}
          />
        )}
        {pantalla === 'final' && (
          <FinalAsk onRepetir={handleRepetir} />
        )}
      </main>
    </div>
  )
}

// ========== Pantalla de intro ==========
function Intro({ onEmpezar }) {
  const numPistas = Object.keys(CONFIG.respuestas || {}).length
  const textoPistas = numPistas === 1 ? 'Una pista' : `${numPistas} pistas`
  return (
    <section className="pantalla intro-pantalla" aria-labelledby="intro-title">
      <div className="nomos-decor">💃 💕 🕺🏻</div>
      <h1 id="intro-title" className="titulo-intro">
        Hola, {CONFIG.apodo} 💘
      </h1>
      <p className="subtitulo-intro">
        Quieres ser mi San Valentín?
      </p>
      <div className="mapita" aria-hidden="true">
        <span className="ciudad">Cuenca</span>
        <span className="corazon-ruta">💕</span>
        <span className="ciudad">Quito</span>
      </div>
      <Card className="intro-card">
        <p className="intro-texto">
          Te preparé un mini juego de código secreto. {textoPistas}, solo tú sabes las respuestas.
        </p>
        <button
          type="button"
          className="btn btn-primario"
          onClick={onEmpezar}
          autoFocus
        >
          Empezar el juego
        </button>
      </Card>
    </section>
  )
}
