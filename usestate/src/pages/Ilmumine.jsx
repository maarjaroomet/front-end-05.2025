import { useState } from "react"

function Ilmumine() {
    const [n2itaLisainfot, setN2itaLisainfot] = useState(false);
  return (
    <div>
        <div onClick={() => setN2itaLisainfot(!n2itaLisainfot)}>
            Sooduskoodi lisamine ja makse arvutuskäik
            {n2itaLisainfot === true && <span>A</span>}
            {n2itaLisainfot === false && <span>V</span>}
        </div>
        {n2itaLisainfot === true && <div> Tellitavad tooted ja teenused
            Lisatud teenused
            Family pakett
            
            Soodustus kuni 29.06.2025
            0,00 €/kuu

            39,00 €/kuu

            Videolaenutus

            Sisaldub paketis
            FOX NOW

            Sisaldub paketis
            HBO

            Sisaldub paketis
            National Geographic keskkond

            Sisaldub paketis
            GO3 Film / Paramount+

            Sisaldub paketis
            Lastenurk

            Sisaldub paketis
            Setanta Sportsi äpp

            Sisaldub paketis
            5 ekraani

            Sisaldub paketis
            Inspira +

            Sisaldub paketis
            Salvestamine

            Sisaldub paketis
            </div>}
    </div>
  )
}

export default Ilmumine