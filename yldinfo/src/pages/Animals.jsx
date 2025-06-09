import { useState } from "react";

function Animals() {
    const [animals, setAnimals] = useState(["pigs", "goats", "sheep"]);
  return (
    <div>
        {animals.length > 0 && <button onClick={() => setAnimals([])}>Tühjenda</button>}
        {animals.length === 0 && <div>Loomi pole</div>}
        {animals.length > 0 && <div>Loomi on {animals.length}</div>}
        <div>
            {animals.map(element => <div>{element}</div>)}
        </div>
    </div>
  )
}

export default Animals