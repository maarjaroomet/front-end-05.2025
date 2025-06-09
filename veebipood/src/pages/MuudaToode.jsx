import { useNavigate, useParams } from "react-router-dom"
import tootedFailist from "../data/tooted.json"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

// Reacti Hookid (Reacti erikood)
// 1. tuleb importida
// 2. peab algama use- eesliidesega
// 3. peavad olema funktsionaalsed (sulud lõpus)
// 4. nad ei tohi olla tingimuslikud (if-ga neid luua)
// 5. neid ei tohi luua funktsiooni sees

function MuudaToode() {
  const {index} = useParams();
  const leitud = tootedFailist[index];
  const [toode, setToode] = useState(leitud);
  const navigate = useNavigate();

  const muuda = () => {
    if (toode.nimi === undefined || toode.nimi === "") {
      toast.error("Nimi puudu!");
      return; //lõpetab funktsiooni
    }
    
    if (toode.hind === undefined || toode.hind === "") {
      toast.error("Hind puudu!");
      return; //lõpetab funktsiooni
    }
    
    if (toode.pilt === undefined || toode.pilt === "") {
      toast.error("Pilt puudu!");
      return; //lõpetab funktsiooni
    }

    tootedFailist[index] = toode;
    navigate("/halda-tooteid");
  }

  // URLi vahetamine (suunamine):
  // HTML: <Link to="/" --> Reacti rakenduse sisene URLi vahetamine
  // HTML: <a href="htp://err.ee" --> väline URL
  // JS: useNavigate() --> Reacti siseseks vahetuseks
  // JS: window.location.href = "http://err.ee" --> väline URL

  if(leitud === undefined) {
    return <div>Toodet ei leitud</div>
  }

  return (
    <div>
      <div>{JSON.stringify(toode)}</div>
      <label>Nimi</label> <br />
      <input onChange={(e) => setToode({...toode, "nimi": e.target.value})} defaultValue={leitud.nimi} type="text" /> <br />
      <label>Hind</label> <br />
      <input onChange={(e) => setToode({...toode, "hind": e.target.value})} defaultValue={leitud.hind} type="number" /> <br />
      <label>Pilt</label> <br />
      <input onChange={(e) => setToode({...toode, "pilt": e.target.value})} defaultValue={leitud.pilt} type="text" /> <br />
      <label>Aktiivne</label> <br />
      <input onChange={(e) => setToode({...toode, "aktiivne": e.target.checked})} defaultChecked={leitud.aktiivne} type="checkbox" /> <br />
      <button onClick={muuda}>Muuda</button>

      <ToastContainer 
        position="bottom-right"
        autoClose={4000}
        theme="dark"
      />

    </div>
  )
}

export default MuudaToode