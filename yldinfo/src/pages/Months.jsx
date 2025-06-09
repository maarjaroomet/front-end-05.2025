import { useState } from "react";

function Months() {
    const [months, setMonths] = useState(["March", "Jan", "Feb", "Dec"]);
  return (
    <div>
        {months.length > 0 && <button onClick={() => setMonths([])}>Tühjenda</button>}
        {months.length === 0 && <div>Kuid pole</div>}
        {months.length > 0 && <div>Kuid on {months.length}</div>}
        <div>
            {months.map(element => <div>{element}</div>)}
        </div>
    </div>
  )
}

export default Months