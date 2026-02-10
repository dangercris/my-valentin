import React, { useState, useCallback } from 'react'
import { CONFIG } from '../config'
import Card from './Card'
import Progress from './Progress'

const RESPUESTAS = CONFIG.respuestas
const TOTAL = 7

function checkOk(respuesta, key) {
  const r = RESPUESTAS[key]
  const v = respuesta.trim().toLowerCase()
  if (Array.isArray(r)) return r.includes(v)
  return v === r
}

export default function SecretGame({ onCompleto, onRepetir }) {
  const [pasoActual, setPasoActual] = useState(0)
  const [mostrarFelicitacion, setMostrarFelicitacion] = useState(false)
  const [errorPaso, setErrorPaso] = useState(false)
  const [pista1, setPista1] = useState('')
  const [pista2, setPista2] = useState('')
  const [pista3, setPista3] = useState('')
  const [pista4, setPista4] = useState('')
  const [pista5, setPista5] = useState('')
  const [pista6, setPista6] = useState('')
  const [pista7, setPista7] = useState('')

  const valores = [pista1, pista2, pista3, pista4, pista5, pista6, pista7]
  const sets = [setPista1, setPista2, setPista3, setPista4, setPista5, setPista6, setPista7]
  const okActual = checkOk(valores[pasoActual], `pista${pasoActual + 1}`)
  const completados = pasoActual + (mostrarFelicitacion ? 1 : 0)

  const handleComprobar = useCallback(() => {
    if (okActual) {
      setErrorPaso(false)
      setMostrarFelicitacion(true)
    } else {
      setErrorPaso(true)
    }
  }, [okActual])

  const handleSiguiente = useCallback(() => {
    if (pasoActual < TOTAL - 1) {
      setPasoActual(pasoActual + 1)
      setMostrarFelicitacion(false)
      setErrorPaso(false)
    } else {
      onCompleto()
    }
  }, [pasoActual, onCompleto])

  // Pantalla: felicitación por acertar
  if (mostrarFelicitacion) {
    const esUltima = pasoActual === TOTAL - 1
    const frase = CONFIG.felicitaciones?.[pasoActual] ?? '¡Muy bien! 💕'
    return (
      <section className="pantalla juego-pantalla juego-felicitacion" aria-live="polite">
        <div className="nomos-decor">💕✨💘</div>
        <Progress total={TOTAL} completados={completados} />
        <Card className="card-felicitacion">
          <p className="felicitacion-texto">{frase}</p>
          <button
            type="button"
            className="btn btn-primario"
            onClick={handleSiguiente}
            autoFocus
          >
            {esUltima ? 'Ver mensaje secreto 💘' : 'Siguiente pista 💕'}
          </button>
        </Card>
        <div className="repetir-wrap">
          <button type="button" className="btn btn-secundario" onClick={onRepetir}>
            Volver al inicio
          </button>
        </div>
      </section>
    )
  }

  // Una sola pregunta según pasoActual
  const numPista = pasoActual + 1
  const valor = valores[pasoActual]
  const setValor = sets[pasoActual]

  return (
    <section className="pantalla juego-pantalla" aria-labelledby="juego-title">
      <div className="nomos-decor">💃💕🕺🏻</div>
      <h2 id="juego-title">Pista {numPista} de {TOTAL}</h2>
      <Progress total={TOTAL} completados={pasoActual} />

      <Card className="card-compact card-pregunta">
        {pasoActual === 0 && (
          <>
            <label className="pista-label" htmlFor="pista-actual">
              La ciudad donde viven los nomos del amor 💕
            </label>
            <input
              id="pista-actual"
              type="text"
              className="pista-input"
              placeholder="Escribe la ciudad..."
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              autoComplete="off"
              aria-invalid={errorPaso}
              autoFocus
            />
          </>
        )}
        {pasoActual === 1 && (
          <>
            <label className="pista-label" htmlFor="pista-actual">
              ¿Quién nos pone a cantar como locos?
            </label>
            <select
              id="pista-actual"
              className="pista-select"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              aria-invalid={errorPaso}
              autoFocus
            >
              <option value="">Elige uno...</option>
              {CONFIG.artistas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </>
        )}
        {pasoActual === 2 && (
          <>
            <label className="pista-label" htmlFor="pista-actual">
              Ordena las letras: M, R, O, A (lo que sentimos tú y yo)
            </label>
            <input
              id="pista-actual"
              type="text"
              className="pista-input"
              placeholder="Cuatro letras..."
              value={valor}
              onChange={(e) => setValor(e.target.value.slice(0, 4))}
              maxLength={4}
              autoComplete="off"
              aria-invalid={errorPaso}
              autoFocus
            />
          </>
        )}
        {pasoActual === 3 && (
          <>
            <label className="pista-label" htmlFor="pista-actual">
              ¿Cuál es el verdadero nombre de la casa de Chilly Willy?
            </label>
            <input
              id="pista-actual"
              type="text"
              className="pista-input"
              placeholder="Una palabra..."
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              autoComplete="off"
              aria-invalid={errorPaso}
              autoFocus
            />
          </>
        )}
        {pasoActual === 4 && (
          <>
            <label className="pista-label" htmlFor="pista-actual">
              La república de...
            </label>
            <input
              id="pista-actual"
              type="text"
              className="pista-input"
              placeholder="Completa la frase..."
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              autoComplete="off"
              aria-invalid={errorPaso}
              autoFocus
            />
          </>
        )}
        {pasoActual === 5 && (
          <>
            <label className="pista-label" htmlFor="pista-actual">
              Datos no...
            </label>
            <input
              id="pista-actual"
              type="text"
              className="pista-input"
              placeholder="Completa la frase..."
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              autoComplete="off"
              aria-invalid={errorPaso}
              autoFocus
            />
          </>
        )}
        {pasoActual === 6 && (
          <>
            <label className="pista-label" htmlFor="pista-actual">
              El amor se hace. No se ______
            </label>
            <input
              id="pista-actual"
              type="text"
              className="pista-input"
              placeholder="Una palabra..."
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              autoComplete="off"
              aria-invalid={errorPaso}
              autoFocus
            />
          </>
        )}

        {errorPaso && (
          <p className="pista-error" role="alert">
            Casi, mi amor. Prueba otra vez 💕
          </p>
        )}

        <button
          type="button"
          className="btn btn-primario btn-comprobar"
          onClick={handleComprobar}
        >
          Comprobar
        </button>
      </Card>

      <div className="repetir-wrap">
        <button type="button" className="btn btn-secundario" onClick={onRepetir}>
          Volver al inicio
        </button>
      </div>
    </section>
  )
}
