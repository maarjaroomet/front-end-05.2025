import './App.css'
import { Link, Route, Routes} from "react-router-dom"
import Avaleht from './pages/Avaleht'
import Uudised from './pages/Uudised'
import Kontakt from './pages/Kontakt'
import Meist from './pages/Meist'
import YksUudis from './pages/YksUudis'

function App() {

  return (
    <>
      <Link to="/">
        <button>Avalehele</button>
      </Link>
      <Link to="/uudised">
        <button>Uudiste lehele</button>
      </Link>
      <Link to="/kontakt">
        <button>Võta meiega ühendust</button>
      </Link>
      <Link to="/meist">
        <button>Info meist</button>
      </Link>

      <Routes>
        <Route path='' element={ <Avaleht /> }></Route>
        <Route path='uudised' element={ <Uudised /> }></Route>
        <Route path='kontakt' element={ <Kontakt/> }></Route>
        <Route path='meist' element={ <Meist/> }></Route>
        <Route path='uudis/:index' element={ <YksUudis/> }></Route>
      </Routes>
    </>
  )
}

export default App
