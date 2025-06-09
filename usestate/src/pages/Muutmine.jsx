import { useState } from "react"

function Muutmine() {
    const [hind, setHind] = useState(39);
  return (
    <div>
        <span className={hind === 39 ? "pakett-aktiivne" : "pakett"} onClick={() => setHind(39)}>Family</span><br />
        <span className={hind === 17 ? "pakett-aktiivne" : "pakett"} onClick={() => setHind(17)}>Standard</span><br />
        <span className={hind === 7 ? "pakett-aktiivne" : "pakett"} onClick={() => setHind(7)}>Mini</span>
        <div>Kuumakse: 0€</div>
        <div>Tavahind: {hind}€</div>
    </div>
  )
}

export default Muutmine