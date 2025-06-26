import './App.css'
import {Link, Route, Routes} from "react-router-dom" 
import Tagasiside from './pages/Tagasiside'
import TagasisideAndjad from './pages/TagasisideAndjad'
import Tegevused from './pages/Tegevused'
import Kasutajad from './pages/Kasutajad'

function App() {

  return (
    <>
      <Link to="/">
        <button>Avaleht</button>
      </Link>
      <Link to="/tagasiside">
        <button>Tagasiside</button>
      </Link>
      <Link to="/tagasisideAndjad">
        <button>Tagasiside andjad</button>
      </Link>
      <Link to="/tegevused">
        <button>Tegevused</button>
      </Link>
      <Link to="/kasutajad">
        <button>Kasutajad</button>
      </Link>

      <Routes>
        <Route path="" element={<div>Tere</div>}/>
        <Route path="tagasiside" element={ <Tagasiside /> }/>
        <Route path="tagasisideAndjad" element={ <TagasisideAndjad /> }/>
        <Route path="tegevused" element={ <Tegevused /> }/>
        <Route path="kasutajad" element={ <Kasutajad /> }/>
      </Routes>
    </>
  )
}

export default App
