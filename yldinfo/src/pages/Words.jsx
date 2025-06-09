import { useState } from "react";

function Words() {
    const [words, setWords] = useState(['spray', 'elite', 'exuberant', 'destruction', 'present']);

  return (
    <div>
        {words.length > 0 && <button onClick={() => setWords([])}>Tühjenda</button>}
        {words.length === 0 && <div>Sõnu pole</div>}
        {words.length > 0 &&<div>Sõnu on {words.length}</div>}
        <div>
            {words.map(element => <div>{element}</div>)}
        </div>
    </div>
  )
}

export default Words