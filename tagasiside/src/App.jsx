import './App.css'
import {Link, Route, Routes} from "react-router-dom" 
import Tagasiside from './pages/Tagasiside'
import TagasisideAndjad from './pages/TagasisideAndjad'

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

      <Routes>
        <Route path="" element={<div>Tere</div>}/>
        <Route path="tagasiside" element={ <Tagasiside /> }/>
        <Route path="tagasisideAndjad" element={ <TagasisideAndjad /> }/>
      </Routes>
    </>
  )
}

export default App
