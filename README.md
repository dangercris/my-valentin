# Vendy — San Valentín 💘

Mini-app romántica tipo juego de código secreto para San Valentín. Hecha con **React + Vite**, solo estática, lista para desplegar en **Cloudflare Pages**.

## Requisitos

- Node.js 18+ y npm

## Instalación y desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

## Build para producción

```bash
npm run build
```

La carpeta de salida es **`dist`**.

## Despliegue en Cloudflare Pages

1. En el dashboard de Cloudflare: **Pages** → **Create a project** → **Connect to Git** (o sube la carpeta).
2. Configuración del build:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. Variables de entorno: no son necesarias para este proyecto.
4. Deploy.

## Estructura del proyecto

```
my-valentin/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    └── components/
        ├── Card.jsx
        ├── Progress.jsx
        ├── SecretGame.jsx
        ├── FinalAsk.jsx
        └── Confetti.jsx
```

## Personalización

En **`src/App.jsx`** hay un objeto **`CONFIG`** al inicio del archivo. Ahí puedes cambiar:

- `nombre`, `apodo`, `ciudades`, `chisteNomos`, `artistas`
- `respuestas.pista1`, `respuestas.pista2`, `respuestas.pista3` (respuestas correctas del juego)
- `mensajeFinal`, `mensajeSi`

Solo React y React DOM como dependencias; sin Tailwind ni otras librerías externas.
