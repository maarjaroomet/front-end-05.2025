import { useEffect } from "react";
import { useState } from "react"
import type { ParcelMachine } from "../models/ParcelMachine";

function ParcelMachines() {
    const [parcelMachines, setParcelMachines] = useState<ParcelMachine[]>([]);
    const [dbParcelMachines, setDbParcelMachines] = useState<ParcelMachine[]>([]);
    const [country, setCountry] = useState("EE");

  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
        .then(res => res.json())
        .then(json => {
            setDbParcelMachines(json);
            setParcelMachines(json);
        })
  }, []);

  const searchFromPMs = (inputValue: string) => {
    const result = dbParcelMachines.filter(pm => pm.NAME.toLowerCase().includes(inputValue.toLowerCase()));
    setParcelMachines(result);
  }

  return (
    <div>
        <label>Otsi</label>
        <input onChange={(e) => searchFromPMs(e.target.value)} type="text" /> <br />
        <button onClick={() => setCountry("EE")}>Eesti</button>
        <button onClick={() => setCountry("LV")}>Läti</button>
        <button onClick={() => setCountry("LT")}>Leedu</button>
        <select>
            {parcelMachines
            .filter(pm => pm.A0_NAME === country)
            .map(pm => <option>{pm.NAME}</option>)}
        </select>
    </div>
  )
}

export default ParcelMachines