import { useRef } from "react";
import { useState } from "react"

function Tagasiside() {
    const [tagasisided, setTagasisided] = useState(["Oli hea", "Huvitav", "Teistsugune", "Põnev"]);
    const tagasisideRef = useRef();

    function kustuta(index){
      tagasisided.splice(index,1);
      setTagasisided(tagasisided.slice())
    }

    function lisaUusTagasiside(){
      tagasisided.push(tagasisideRef.current.value);
      setTagasisided(tagasisided.slice());
    }


  return (
    <div>
        <div>Tagasisided:
            {tagasisided.map((element, index) =>
               <div>
                <span>{element}</span>
                <button onClick={() => kustuta(index)}>x</button>
              </div>)}
        <br />
        <label>Lisa uus tagasiside:</label>
        <input ref={tagasisideRef} type="text" />
        <button onClick={() => lisaUusTagasiside()}>Sisesta</button>
        </div>
    </div>
  )
}

export default Tagasiside