import { useState } from "react"

function Seaded() {
  const [kujundus, muudaKujundus] = useState(localStorage.getItem("veebilehe_kujundus"));

  const tumeLeht = () => {
    localStorage.setItem("veebilehe_kujundus", "dark_mode")
    muudaKujundus("dark_mode");
  }

  const heleLeht = () => {
    localStorage.setItem("veebilehe_kujundus", "light_mode")
    muudaKujundus("light_mode");
  }

  return (
    <div>
      <button onClick={tumeLeht}>Tume leht</button>
      <button onClick={heleLeht}>Hele leht</button>
      { kujundus==="dark_mode" && <div>Tume leht</div>}
      { kujundus==="light_mode" && <div>Hele leht</div>}
    </div>
  )
}

export default Seaded