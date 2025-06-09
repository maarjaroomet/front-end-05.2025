import './App.css'
import { Link, Route, Routes} from "react-router-dom"
import Avaleht from './pages/Avaleht'
import VaataArvuteid from './pages/VaataArvuteid'
import LisaArvuti from './pages/LisaArvuti'

function App() {

  return (
    <>
      <Link to="">
        <button>Avalehele</button>
      </Link>
      <Link to="/all">
      <button>Vaata sülearvuteid</button>
      </Link>
      <Link to="/add">
        <button>Lisa sülearvuti</button>
      </Link>
      <Routes>
        <Route path="" exact element={ <Avaleht /> } />
        <Route path="all" exact element={ <VaataArvuteid /> } />
        <Route path="add" exact element={ <LisaArvuti />} />
      </Routes>
    </>
  )
}

export default App
