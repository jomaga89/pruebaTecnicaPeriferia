import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css' // Si no lo tienes, crea un archivo vacío o bórralo

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)