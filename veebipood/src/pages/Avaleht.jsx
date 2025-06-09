//import React from 'react'
// rfce --> snippets

import { useState } from "react";
import laigitud from "../assets/laigitud.svg";
import mittelaigitud from "../assets/mittelaigitud.svg";
import Tooted from "../components/Tooted";

function Avaleht() {
    const [kogus, setKogus] = useState(0);
    const [sonum, setSonum] = useState("Muuda kogust!");
    const [like, setLike] = useState(false);

    function nulli(){
        setKogus(0);
        setSonum("Kogus nullitud!");
    }

    function vahenda(){
        setKogus(kogus - 1);
        setSonum("Kogus vähendatud!");
    }

    function suurenda(){
        setKogus(kogus + 1);
        setSonum("Kogus suurendatud!");
    }

    return(
        <div>
            {like === true && <img onClick={() => setLike(false)} src={laigitud} alt="" />}
            {like === false && <img onClick={() => setLike(true)} src={mittelaigitud} alt="" />}

            <div>{sonum}</div>
            {kogus > 0 && <button onClick={nulli}>Tagasi nulli</button>}<br />
            <button disabled={kogus === 0} onClick={vahenda}>-</button>
            <span>{kogus}</span>
            <button onClick={() => suurenda()}>+</button>

            <Tooted />
        </div>
    )
}

export default Avaleht