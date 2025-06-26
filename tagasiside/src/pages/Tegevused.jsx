import { useState } from "react";
import tegevusteFail from "../data/tegevused.json"

function Tegevused() {
  const [tegevused, uuendaTegevused] = useState(tegevusteFail);

  const n2itaKasutajaYks = () => {
    const vastus = tegevused.filter(element => element.userId ===1);
    uuendaTegevused(vastus);
  }

  const n2itaK6iki = () => {
    uuendaTegevused(tegevusteFail);
  }

  return (
    <div>
        <button onClick={() => n2itaKasutajaYks()}>Kuva kõik kasutaja ID 1 tegevused</button>
        <button onClick={() => n2itaK6iki()}>Kuva kõik tegevused</button>
        {tegevused.map(element =>
          <div>
            <div>{element.userId}</div>
            <div>{element.Id}</div>
            <div>{element.title}</div>
            <div>{element.completed}</div>
          </div>)}
    </div>
  )
}

export default Tegevused