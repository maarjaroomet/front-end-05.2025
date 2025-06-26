import {Link, Route, Routes} from "react-router-dom"
import Avaleht from "./pages/Avaleht"
import LisaJook from "./pages/LisaJook"
import HaldaJooke from "./pages/HaldaJooke"
import Jook from "./pages/Jook"

function App() {

  return (
    <>
      <Link to="/">
          <button>Avaleht</button>
      </Link>
      <Link to="/lisa">
          <button>Lisa jook</button>
      </Link>
      <Link to="/halda">
          <button>Halda jooke</button>
      </Link>

      <Routes>
        <Route path='/' element={ <Avaleht /> } />
        <Route path='/lisa' element={ <LisaJook /> } />
        <Route path='/halda' element={ <HaldaJooke /> } />
        <Route path='/jook/:number' element={ <Jook /> } />
      </Routes>
    </>
  )
}

export default App
