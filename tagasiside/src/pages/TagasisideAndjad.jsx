import { useState } from "react";
import nimedFailist from "../data/nimed.json"
import { useRef } from "react";

function TagasisideAndjad() {
    const [nimed, setNimed] = useState(nimedFailist.slice());
    const nimiRef = useRef();

    const reset = () => {
        setNimed(nimedFailist.slice());
    }

    const FiltreeriMTahega = () => {
        const vastus = nimed.filter(nimi => nimi.startsWith("M"))
        setNimed(vastus.slice());
    }

    const Filtreeri6Tahega = () => {
        const vastus = nimed.filter(nimi => nimi.length === 6)
        setNimed(vastus.slice());
    }

    const FiltreeriYLoppevad = () => {
        const vastus = nimed.filter(nimi => nimi.endsWith("y"))
        setNimed(vastus.slice());
    }

    const SorteeriAZ = () => {
        nimed.sort((a,b) => a.localeCompare(b))
        setNimed(nimed.slice());
    }

    const ESTIgaNimeEtte = () => {
        const vastus = nimed.map(nimi => "EST-" + nimi);
        setNimed(vastus);
    }

    const kustuta = (index) => {
        nimed.splice(index,1);
        setNimed(nimed.slice());
    }

    const lisa = () => {
        nimed.push(nimiRef.current.value);
        setNimed(nimed.slice());
    }

  return (
    <div>
        <div>Kokku on {nimed.length} nime</div>
        <button onClick={reset}>Reset</button>
        <br />
        <button onClick={FiltreeriMTahega}>M tähega nimed</button>
        <button onClick={Filtreeri6Tahega}>6-kohalised nimed</button>
        <button onClick={FiltreeriYLoppevad}>Y lõppevad nimed</button>
        <button onClick={SorteeriAZ}>Sorteeri A-Z</button>
        <button onClick={ESTIgaNimeEtte}>EST iga nime ette</button>
        {nimed.map((element, index) =>
            <div key={element}>
                {element} <button onClick={() => kustuta(index)}>X</button>
            </div>)}
        <label>Uus nimi</label>
        <input ref={nimiRef} type="text" />
        <button onClick={lisa}>Lisa</button>
        {/* <div>{nimed}</div> */}

    </div>
  )
}

export default TagasisideAndjad