import { useState } from "react"
import tootedFailist from "../data/tooted.json"
import { Link} from "react-router-dom"

function Tooted() {
    const [tooted, setTooted] = useState(tootedFailist.slice());

    const reset = () => {
        setTooted(tootedFailist.slice());
    }
    const sorteeriAZ = () => {
        // const sortedTooted = tooted.toSorted((a,b) => a.localeCompare(b));
        // setTooted(sortedTooted);

        // tooted.sort((a,b) => a.localeCompare(b));
        // setTooted([...tooted]);

        tooted.sort((a,b) => a.localeCompare(b));
        setTooted(tooted.slice());
    }

    const sorteeriZA = () => {
        tooted.sort((a,b) => b.localeCompare(a));
        setTooted(tooted.slice());
    }

    const sorteeriTahedKasv = () => {
        tooted.sort((a,b) => a.length - b.length);
        setTooted(tooted.slice());
    }

    const sorteeriTahedKah = () => {
        tooted.sort((a,b) => b.length - a.length);
        setTooted(tooted.slice());
    }

    const sorteeriKolmasTahtAZ = () => {
        tooted.sort((a,b) => a[2].localeCompare(b[2]));
        setTooted(tooted.slice());
    }

    const filtreeriIgaLoppevad = () => {
        const vastus = tootedFailist.filter(toode => toode.endsWith("i"));
        setTooted(vastus);
    }

    const filtreeri5Tahelised = () => {
        const vastus = tootedFailist.filter(toode => toode.length === 5);
        setTooted(vastus);
    }

    const filtreeriVahemKui4 = () => {
        const vastus = tootedFailist.filter(toode => toode.length <= 4);
        setTooted(vastus);
    }

    const filtreeriKllelLyhendES = () => {
        const vastus = tootedFailist.filter(toode => toode.includes("es"));
        setTooted(vastus);
    }

    const filtreeriKellelTeineTahtA = () => {
        const vastus = tootedFailist.filter(toode => toode[1] === "a");
        setTooted(vastus);
    }

    const lisaOstukorvi = (toode) => {
        const ostukorvLS = JSON.parse(localStorage.getItem("ostukorv")) || [];
        ostukorvLS.push(toode);
        localStorage.setItem("ostukorv", JSON.stringify(ostukorvLS));
    }

    //localStorage-sse lisamiseks:
    // 1. võtan localStorage-st viimase seisu (localStorage.getItem)
    // 1b. kui on tühi, siis annan tühja array
    // 2. võtan jutumärgid maha (JSON.parse)
    // 3. lisan ühe toote juurde (.push())
    // 4. panen localStorage-sse tagasi (localStorage.setItem)
    // 5. panen jutumärgid tagasi peale (JSON.stringify())

  return (
    <div>
        <button onClick={reset}>Reset</button>
        <br />
        <button onClick={sorteeriAZ}>Sorteeri A-Z</button>
        <button onClick={sorteeriZA}>Sorteeri Z-A</button>
        <button onClick={sorteeriTahedKasv}>Sorteeri tähemärgid kasvavalt</button>
        <button onClick={sorteeriTahedKah}>Sorteeri tähemärgid kahanevalt</button>
        <button onClick={sorteeriKolmasTahtAZ}>Sorteeri A-Z kolmas täht</button>
        <br /><br />
        <button onClick={filtreeriIgaLoppevad}>Jäta alles i-ga lõppevad</button>
        <button onClick={filtreeri5Tahelised}>Jäta alles 5 tähelised autod</button>
        <button onClick={filtreeriVahemKui4}>Jäta 4 või vähem tähelised autod</button>
        <button onClick={filtreeriKllelLyhendES}>Jäta alles kellel lühend ES</button>
        <button onClick={filtreeriKellelTeineTahtA}>Jäta alles kellel teine täht A</button>


        {tooted.map(toode =>
            <div key={toode.nimi}>
                <div>{toode.nimi}</div>
                <div>{toode.hind}</div>
                <div>Toode on {toode.aktiivne ? "aktiivne" : "mitteaktiivne"}</div>
                <img className="pilt" src={toode.pilt} alt="" />
                <button disabled={!toode.aktiivne} onClick={() => lisaOstukorvi(toode)}>Lisa ostukorvi</button>
                <Link to={"/toode/" + toode.nimi.toLowerCase().replaceAll(" ", "-")}>
                    <button>Vt lähemalt</button>
                </Link>
            </div>)}
    </div>
  )
}

export default Tooted