import { useState } from "react";

function Ostukorv() {
  const [tooted, setTooted] = useState(JSON.parse(localStorage.getItem("ostukorv")) || []);

  const tyhjenda = () => {
    setTooted([])
    localStorage.setItem("ostukorv", "[]");
  }

  const kustuta = (index) => {
    tooted.splice(index, 1); //splice kustutamine, sulgudes mitmendat kustutad, mitu tk kustutad (kui paned nr 2, siis kustub see ja temast järgmine)
    setTooted(tooted.slice());
    localStorage.setItem("ostukorv", JSON.stringify(tooted));
  }

  return (
    <div>
      {tooted.length > 0 && 
        <>
          <button onClick={tyhjenda}>Tühjenda</button>
          <div>Ostukorvis on {tooted.length} toodet</div>
        </>
      }
      

      <div>{tooted.map((toode, index) => 
        <div key={index}>
          {toode.nimi}
          <button onClick={() => kustuta(index)}>x</button>
        </div>)}
      </div>

      {tooted.length === 0 && <div>Ostukorv on tühi</div>}
    </div>
  )
}

export default Ostukorv