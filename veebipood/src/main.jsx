import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n';
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"

// Navigeerimiseks / Route-miseks / URL muutmiseks ja HTML vahetamiseks
// 1.vnpm i react-router-dom (node.js kaudu paneb navigeerimiseks vajalikud failid node_modules kausta)
// 2.bimport { BrowserRouter } (võtab sealt node_modules kaustast BrowserRouteri)
// 3. ümbritseme <App /> elemendi BrowserRouteriga (App.jsx saab võimekuse navigeerida)
// 4. App.jsx failis teeme URL ja HTMLi seoseid

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
