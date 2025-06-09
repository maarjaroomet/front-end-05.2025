import { useState } from "react"
import KinkekaardiEmail from "../components/KinkekaardiEmail";

function Kinkekaardid() {
  const [summa, setSumma] = useState(20);
  const [kogus, setKogus] = useState(1);
  
  return (
    <div>
      <button className={summa === 20 ? "aktiivne" : undefined} onClick={() => setSumma(20)}>20€</button>
      <button className={summa === 50 ? "aktiivne" : undefined} onClick={() => setSumma(50)}>50€</button>
      <button className={summa === 100 ? "aktiivne" : undefined} onClick={() => setSumma(100)}>100€</button>
      <div>Kinkekaart {summa} €</div>

      <br /> <br />

      <button disabled={kogus === 1} onClick={() => setKogus(kogus - 1)}>-</button>
      <span>{kogus}</span>
      <button onClick={() => setKogus(kogus + 1)}>+</button>

      <br /> <br />

      <div>{summa * kogus}€</div>
      <br /><br />

      <KinkekaardiEmail />
    </div>
  )
}

export default Kinkekaardid