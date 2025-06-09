import { useState } from "react"
import LaenuKalkulaator from "../components/LaenuKalkulaator"
import TavaKalkulaator from "../components/TavaKalkulaator"

function Kalkulaator() {
  const [vaade, setVaade] = useState("laenu");
  return (
    <div>
      <button onClick={() => setVaade("tava")}>Tavakalkulaator</button>
      <button onClick={() => setVaade("laenu")}>Laenukalkulaator</button>
      {vaade === "tava" && <TavaKalkulaator />}
      {vaade === "laenu" && <LaenuKalkulaator />}
    </div>
  )
}

export default Kalkulaator