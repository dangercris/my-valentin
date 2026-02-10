import React, { useState, useCallback } from 'react'
import { CONFIG } from '../config'
import Card from './Card'
import Progress from './Progress'

const RESPUESTAS = CONFIG.respuestas

export default function SecretGame({ onCompleto, onRepetir }) {
  const [pista1, setPista1] = useState('')
  const [pista2, setPista2] = useState('')
  const [pista3, setPista3] = useState('')
  const [pista4, setPista4] = useState('')
  const [pista5, setPista5] = useState('')
  const [pista6, setPista6] = useState('')
  const [errores, setErrores] = useState({ p1: false, p2: false, p3: false, p4: false, p5: false, p6: false })

  const p1Resp = Array.isArray(RESPUESTAS.pista1) ? RESPUESTAS.pista1 : [RESPUESTAS.pista1]
  const ok1 = p1Resp.includes(pista1.trim().toLowerCase())
  const ok2 = pista2.trim().toLowerCase() === RESPUESTAS.pista2
  const ok3 = pista3.trim().toLowerCase() === RESPUESTAS.pista3
  const ok4 = pista4.trim().toLowerCase() === RESPUESTAS.pista4
  const ok5 = pista5.trim().toLowerCase() === RESPUESTAS.pista5
  const ok6 = pista6.trim().toLowerCase() === RESPUESTAS.pista6
  const completados = [ok1, ok2, ok3, ok4, ok5, ok6].filter(Boolean).length
  const todoOk = ok1 && ok2 && ok3 && ok4 && ok5 && ok6

  const handleDesbloquear = useCallback(() => {
    setErrores({
      p1: !ok1,
      p2: !ok2,
      p3: !ok3,
      p4: !ok4,
      p5: !ok5,
      p6: !ok6,
    })
    if (todoOk) onCompleto()
  }, [ok1, ok2, ok3, ok4, ok5, ok6, todoOk, onCompleto])

  return (
    <section className="pantalla juego-pantalla" aria-labelledby="juego-title">
      <div className="nomos-decor">🧙‍♂️✨🧙‍♀️</div>
      <h2 id="juego-title">Código secreto</h2>
      <Progress total={6} completados={completados} />

      <Card className="card-compact">
        {/* Pista 1: ciudad */}
        <div className="pista-card">
          <label className="pista-label" htmlFor="pista1">
            1. La ciudad donde viven los nomos del amor 💕
          </label>
          <input
            id="pista1"
            type="text"
            className="pista-input"
            placeholder="Escribe la ciudad..."
            value={pista1}
            onChange={(e) => setPista1(e.target.value)}
            autoComplete="off"
            aria-invalid={errores.p1}
          />
          {errores.p1 && <p className="pista-error" role="alert">Pista 1 incorrecta</p>}
          {ok1 && !errores.p1 && <p className="pista-ok">✓ Correcto</p>}
        </div>

        {/* Pista 2: artista */}
        <div className="pista-card">
          <label className="pista-label" htmlFor="pista2">
            2. ¿Quién nos pone a cantar como locos?
          </label>
          <select
            id="pista2"
            className="pista-select"
            value={pista2}
            onChange={(e) => setPista2(e.target.value)}
            aria-invalid={errores.p2}
          >
            <option value="">Elige uno...</option>
            {CONFIG.artistas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          {errores.p2 && <p className="pista-error" role="alert">Pista 2 incorrecta</p>}
          {ok2 && !errores.p2 && <p className="pista-ok">✓ Correcto</p>}
        </div>

        {/* Pista 3: acertijo letras (ordenar AMOR) */}
        <div className="pista-card">
          <label className="pista-label">
            3. Ordena las letras: M, R, O, A (lo que sentimos tú y yo)
          </label>
          <input
            type="text"
            className="pista-input"
            placeholder="Cuatro letras..."
            value={pista3}
            onChange={(e) => setPista3(e.target.value.slice(0, 4))}
            maxLength={4}
            autoComplete="off"
            aria-invalid={errores.p3}
          />
          {errores.p3 && <p className="pista-error" role="alert">Pista 3 incorrecta</p>}
          {ok3 && !errores.p3 && <p className="pista-ok">✓ Correcto</p>}
        </div>

        {/* Pista 4: Chilly Willy */}
        <div className="pista-card">
          <label className="pista-label" htmlFor="pista4">
            4. ¿Cuál es el verdadero nombre de la casa de Chilly Willy?
          </label>
          <input
            id="pista4"
            type="text"
            className="pista-input"
            placeholder="Una palabra..."
            value={pista4}
            onChange={(e) => setPista4(e.target.value)}
            autoComplete="off"
            aria-invalid={errores.p4}
          />
          {errores.p4 && <p className="pista-error" role="alert">Pista 4 incorrecta</p>}
          {ok4 && !errores.p4 && <p className="pista-ok">✓ Correcto</p>}
        </div>

        {/* Pista 5: La república de... */}
        <div className="pista-card">
          <label className="pista-label" htmlFor="pista5">
            5. La república de...
          </label>
          <input
            id="pista5"
            type="text"
            className="pista-input"
            placeholder="Completa la frase..."
            value={pista5}
            onChange={(e) => setPista5(e.target.value)}
            autoComplete="off"
            aria-invalid={errores.p5}
          />
          {errores.p5 && <p className="pista-error" role="alert">Pista 5 incorrecta</p>}
          {ok5 && !errores.p5 && <p className="pista-ok">✓ Correcto</p>}
        </div>

        {/* Pista 6: Datos no... */}
        <div className="pista-card">
          <label className="pista-label" htmlFor="pista6">
            6. Datos no...
          </label>
          <input
            id="pista6"
            type="text"
            className="pista-input"
            placeholder="Completa la frase..."
            value={pista6}
            onChange={(e) => setPista6(e.target.value)}
            autoComplete="off"
            aria-invalid={errores.p6}
          />
          {errores.p6 && <p className="pista-error" role="alert">Pista 6 incorrecta</p>}
          {ok6 && !errores.p6 && <p className="pista-ok">✓ Correcto</p>}
        </div>

        <button
          type="button"
          className="btn btn-primario btn-desbloqueado"
          onClick={handleDesbloquear}
        >
          Desbloquear mensaje secreto
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
