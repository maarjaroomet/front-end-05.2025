import './App.css'
import {Link, Route, Routes} from "react-router-dom"
import Avaleht from './pages/Avaleht'
import Meist from './pages/Meist'
import Kontakt from './pages/Kontakt'
import Seaded from './pages/Seaded'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Months from './pages/Months'
import Animals from './pages/Animals'
import Words from './pages/Words'
import Logimine from './pages/Logimine'
import Books from './pages/Books'
import Numbers from './pages/Numbers'

function App() {
  const [sisselogitud, setSisselogitud] = useState("ei");
  const [sonum, setSonum] = useState("");
  const kasutajanimiRef = useRef();
  const paroolRef = useRef();

  const logiSisse= () => {
    if(paroolRef.current.value === "123"){
      setSonum(kasutajanimiRef.current.value + ", oled sisselogitud");
      setSisselogitud("jah");
      toast.success("Oled sisselogitud")
      return;
    } 
    if(paroolRef.current.value.length < 8){
      toast.error("parool peab olema vähemalt 8 tähemärki")
      setSonum("Vale parool");
      return;
    }
    if(paroolRef.current.value === paroolRef.current.value.toLowerCase()){
      toast.error("parool peab sisaldama vähemalt ühte suurt tähte")
      setSonum("Vale parool");
      return;
    }
    if(paroolRef.current.value === paroolRef.current.value.toUpperCase()){
      toast.error("parool peab sisaldama vähemalt ühte väikest tähte")
      setSonum("Vale parool");
      return;
    }
    if(paroolRef.current.value.includes("%") === false){
      toast.error("parool peab sisaldama % märki")
      setSonum("Vale parool");
      return;
    }

    toast.error("Vale parool")
    setSonum("Vale parool");
    
  }

  const logiValja= () => {
    setSisselogitud("ei");
    setSonum("");
  }

  return (
    <>
      <div className="App">
        <div>{sonum}</div>
        { sisselogitud === "ei" && <div>
          <label>Kasutajanimi</label> <br />
          <input ref={kasutajanimiRef} type="text" /> <br />
          <label>Parool</label> <br />
          <input ref={paroolRef} type="password" /> <br />
        </div> }
        
        { sisselogitud === "ei" && <button onClick={logiSisse}>Logi sisse</button> }
        { sisselogitud === "jah" && <button onClick={logiValja}>Logi välja</button> }
      </div>
      <br />
      <Link to="/">
        <button>Avaleht</button>
      </Link>
      <Link to="/meist">
        <button>Meist</button>
      </Link>
      <Link to="/kontakt">
        <button>Kontakt</button>
      </Link>
      <Link to="/seaded">
        <button>Seaded</button>
      </Link>
      <Link to="/kuud">
        <button>Kuud</button>
      </Link>
      <Link to="/loomad">
        <button>Loomad</button>
      </Link>
      <Link to="/sõnad">
        <button>Sõnad</button>
      </Link>
      <Link to="/logimine">
        <button>Logimine</button>
      </Link>
      <Link to="/raamatud">
        <button>Raamatud</button>
      </Link>
      <Link to="/numbrid">
        <button>Numbrid</button>
      </Link>

      <Routes>
        <Route path="" element={ <Avaleht /> }></Route>
        <Route path="meist" element={ <Meist /> }></Route>
        <Route path="kontakt" element={ <Kontakt /> }></Route>
        <Route path="seaded" element={ <Seaded /> }></Route>
        <Route path="kuud" element={ <Months /> }></Route>
        <Route path="loomad" element={ <Animals /> }></Route>
        <Route path="sõnad" element={ <Words /> }></Route>
        <Route path="logimine" element={ <Logimine /> }></Route>
        <Route path="raamatud" element={ <Books /> }></Route>
        <Route path="numbrid" element={ <Numbers /> }></Route>
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
