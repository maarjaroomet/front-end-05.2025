import { useState } from "react"

function Telefon() {
    const [varv, setVarv] = useState("Vali värv!");
  return (
    <div>
        <br />
        {varv === "Vali värv!" && <div>Telefoni värv on valimata!</div>}
        <div>Telefoni värvus: {varv}</div>
        <button onClick={() => setVarv("must")}>Must</button>
        <button onClick={() => setVarv("kuldne")}>Kuldne</button>
        <button onClick={() => setVarv("sinine")}>Sinine</button>
        <button onClick={() => setVarv("punane")}>Punane</button>
        <button onClick={() => setVarv("lilla")}>Lilla</button>

        {varv === "must" && <div className="must-ring"></div>}
        {varv === "kuldne" && <div className="kuldne-ring"></div>}
        {varv === "sinine" && <div className="sinine-ring"></div>}
        {varv === "punane" && <div className="punane-ring"></div>}
        {varv === "lilla" && <div className="lilla-ring"></div>}
    </div>
  )
}

export default Telefon