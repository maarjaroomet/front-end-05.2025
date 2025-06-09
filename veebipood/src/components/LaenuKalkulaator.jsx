import { useRef, useState } from "react"

function LaenuKalkulaator() {
    const[kuumakse, setKuumakse] = useState(351.61);
    const[kuumakseKorgem, setKuumakseKorgem] = useState(498.98);
    const[intress, setIntress] = useState(3.85);
    const[protsent, setProtsent] = useState(0);
    const[laenusumma, setLaenusumma] = useState(75000);
    const ostuhindRef = useRef();
    const marginaalRef = useRef();
    const euriborRef = useRef();
    const sisseMakseRef = useRef();
    const perioodRef = useRef();

    const arvutaKuumakse = () => {
        setKuumakse((ostuhindRef.current.value -sisseMakseRef.current.value) / perioodRef.current.value / 12 * 
            (Number(marginaalRef.current.value) + Number(euriborRef.current.value)) / 2.3);

    }

    const arvutaIntress = () => {
        setIntress(Number(marginaalRef.current.value) + Number(euriborRef.current.value));
        arvutaKuumakse();
    }

    const arvutaProtsent = () => {
        setProtsent(sisseMakseRef.current.value / ostuhindRef.current.value * 100);
        setLaenusumma(ostuhindRef.current.value - sisseMakseRef.current.value);
        arvutaKuumakse();
        setKuumakseKorgem((ostuhindRef.current.value -sisseMakseRef.current.value) / perioodRef.current.value / 12 * 7 / 2.3);
    }

  return (
    <div>
        <label>Kinnisvara ostuhind</label>
        <input ref={ostuhindRef} defaultValue={75000} onChange={arvutaProtsent} type="text"/><br/>
        <label>Sissemakse</label>
        <input ref={sisseMakseRef} defaultValue={0} onChange={arvutaProtsent} type="text"/><br/>
        <label>Protsent</label>
        <input disabled value={protsent.toFixed(2)} type="text"/><br/>
        <label>Laenusumma</label>
        <input disabled value={laenusumma.toFixed(2)} type="text"/><br/>
        <label>Periood</label>
        <select ref={perioodRef} defaultValue={30} onChange={arvutaKuumakse}>
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>25</option>
            <option>30</option>
        </select>
        <label>Marginaal</label>
        <input ref={marginaalRef} defaultValue={1.7} onChange={arvutaIntress} type="number"/><br/>
        <label>Euribor</label>
        <input ref={euriborRef} defaultValue={2.15} onChange={arvutaIntress} type="number"/><br/>
        <label>Intress kokku</label>
        <input disabled value={intress.toFixed(2)} type="text"/><br/>
        <div>Kui laenu intress peaks tõusma 7%-ni, on laenumakse {kuumakseKorgem}€</div>
        <div>Kuumakse {kuumakse.toFixed(2)} €</div>
    </div>
  )
}

export default LaenuKalkulaator