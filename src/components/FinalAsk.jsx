import React, { useState, useCallback, useEffect, useRef } from 'react'
import { CONFIG } from '../config'
import Card from './Card'
import Confetti from './Confetti'

const YT_PLAYER_ID = 'final-yt-player'

export default function FinalAsk({ onRepetir }) {
  const [dijoSi, setDijoSi] = useState(false)
  const [mostrarConfetti, setMostrarConfetti] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const lyricsRef = useRef(null)
  const activeLineRef = useRef(null)

  const handleSi = useCallback(() => {
    setDijoSi(true)
    setMostrarConfetti(true)
  }, [])

  const lyrics = CONFIG.letraSeráQueEsAmor || []

  // Cargar YouTube IFrame API y crear reproductor; sincronizar tiempo para la letra
  useEffect(() => {
    if (!dijoSi || !CONFIG.youtubeVideoId) return

    let player = null
    let interval = null

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return
      if (!document.getElementById(YT_PLAYER_ID)) {
        setTimeout(initPlayer, 100)
        return
      }
      const start = CONFIG.youtubeStartSeconds ?? 0
      player = new window.YT.Player(YT_PLAYER_ID, {
        videoId: CONFIG.youtubeVideoId,
        playerVars: { autoplay: 1, rel: 0, start },
        events: {
          onReady: (e) => {
            interval = setInterval(() => {
              try {
                const t = e.target.getCurrentTime?.()
                if (typeof t === 'number') setCurrentTime(t)
              } catch (_) {}
            }, 300)
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      initPlayer()
    } else {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev()
        initPlayer()
      }
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(script)
    }

    return () => {
      clearInterval(interval)
      if (player && player.destroy) player.destroy()
    }
  }, [dijoSi])

  // Scroll para mantener la línea actual visible
  useEffect(() => {
    if (activeLineRef.current && lyricsRef.current) {
      activeLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [currentTime])

  const activeIndex = lyrics.length === 0 ? -1 : lyrics.reduce((last, line, i) => (line.from <= currentTime ? i : last), -1)

  return (
    <section className="pantalla final-pantalla" aria-labelledby="final-title">
      {mostrarConfetti && <Confetti onEnd={() => setMostrarConfetti(false)} />}

      {!dijoSi ? (
        <>
          <div className="nomos-decor">💃💘🕺🏻</div>
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
          {CONFIG.youtubeVideoId && (
            <>
              <div className="final-video-wrap">
                <div id={YT_PLAYER_ID} className="final-video" />
              </div>
              {lyrics.length > 0 && (
                <div className="final-letra-wrap" ref={lyricsRef}>
                  <p className="final-letra-titulo">Radio Reflejo — Será que es amor</p>
                  <ul className="final-letra-lista" aria-label="Letra de la canción">
                    {lyrics.map((line, i) => {
                      const isActive = i === activeIndex
                      const isPast = i < activeIndex
                      return (
                        <li
                          key={`${line.from}-${i}`}
                          ref={isActive ? activeLineRef : undefined}
                          className={`final-letra-linea ${isActive ? 'activa' : ''} ${isPast ? 'pasada' : ''}`}
                        >
                          {line.text}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </>
          )}
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
