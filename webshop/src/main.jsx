import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import './i18n';
import { CartSumContextProvider } from './context/CartSumContextProvider.jsx';
import { AuthContextProvider } from './context/AuthContextProvider.jsx';
import { Provider } from 'react-redux'
import store from './redux/store.js';

// { StrictMode } --> võtab tüki sealt moodulist (loogelised sulud)
// App            --> võtab terve selle faili (ilma sulgudeta)

// "react"        --> võab node_module-st (ilma .)
// "./index.css"  --> minu enda fail (./)

// import bla from "bla"  --> import kehtib vaid siin failis
// import "bla"           --> globaalne import, kehtib igas failis

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartSumContextProvider>
        <AuthContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthContextProvider>
      </CartSumContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
