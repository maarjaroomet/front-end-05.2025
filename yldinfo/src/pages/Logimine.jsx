import { useState } from "react";
import { useRef } from "react"

function Logimine() {
    const kasutajaNimiRef = useRef();
    const paroolRef = useRef();
    const [paroolKorrektne, setParoolKorrektne] = useState(true);

    const kontrolliParooli = () => {
        if (paroolRef.current.value.length < 8 ||
           paroolRef.current.value.ToLowerCase() === paroolRef.current.value ||
           paroolRef.current.value.ToUpperCase() === paroolRef.current.value ||
           paroolRef.current.value.Includes("%") === false) {
            setParoolKorrektne(false);
           } else {
            setParoolKorrektne(true);
           }
        
    }
  return (
    <div>
        <label>Kasutajanimi</label> <br />
        <input ref={kasutajaNimiRef} type="text" /> <br />
        <label>Parool</label> <br />
        <input ref={paroolRef} onChange={kontrolliParooli} type="password" /> <br />
        <button onClick={kontrolliParooli}>Logi sisse</button>
        {paroolKorrektne === false && <div>Parool pole korrektne</div>}
    </div>
  )
}

export default Logimine