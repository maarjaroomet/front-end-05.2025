import { useState } from 'react'
import './App.css'
import { Route, Routes} from "react-router-dom"
import Avaleht from './pages/Avaleht'
import Ostukorv from './pages/Ostukorv'
import LisaToode from './pages/LisaToode'
import Kinkekaardid from './pages/Kinkekaardid'
import Esindused from './pages/Esindused'
import Seaded from './pages/Seaded'
import Kalkulaator from './pages/Kalkulaator'
import NotFound from './pages/NotFound'
import Menu from './components/Menu'
import HaldaTooteid from './pages/HaldaTooteid'
import YksToode from './pages/YksToode'
import MuudaToode from './pages/MuudaToode'

function App() {
  const [isDark, setIsDark] = useState(localStorage.getItem("darkMode") === "true");

  const updateDarkMode = (darkMode) => {
    setIsDark(darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }

  return (
    <div className={isDark ? "dark-mode" : "light-mode"}>
        <Menu />
        <button onClick={() => updateDarkMode(false)}> Light mode</button>
        <button onClick={() => updateDarkMode(true)}>Dark mode</button>

        <Routes>
          <Route path='/' element={ <Avaleht /> } />
          <Route path='/ostukorv' element={ <Ostukorv /> } />
          <Route path='/lisa-toode' element={ <LisaToode /> } />
          <Route path='/osta-kinkekaart' element={ <Kinkekaardid /> } />
          <Route path='/esindused' element={ <Esindused /> } />
          <Route path='/seaded' element={ <Seaded /> } />
          <Route path='/kalkulaator' element={ <Kalkulaator /> } />
          <Route path='/halda-tooteid' element={ <HaldaTooteid /> } />
          <Route path='/toode/:nimi' element={ <YksToode /> } />
          <Route path='/muuda-toode/:index' element={ <MuudaToode /> } />
          <Route path='/*' element={ <NotFound /> } />
        </Routes>

    </div>
  )
}

export default App
