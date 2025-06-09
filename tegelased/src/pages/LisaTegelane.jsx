import { useRef } from "react";
import { useState } from "react"

function LisaTegelane() {
  const [sonum, setSonum] = useState("");
  const nimiRef = useRef();

  const lisaUusTegelane = () => {
    if(nimiRef.current.value == "") {
      setSonum("Tühja nimega ei saa sisestada")
    } else {
      setSonum("Tegelane lisatud")
    }
  }
  return (
    <div>
      <div>{sonum}</div>
      <label>Tegelase nimi</label><br />
      <input ref={nimiRef} type="text" /><br />
      <button onClick={lisaUusTegelane}>Lisa uus</button><br />
    </div>
  )
}

export default LisaTegelane