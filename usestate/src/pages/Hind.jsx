import { useState } from "react"

function Hind() {
    const [hind, setHind] = useState(0);

  return (
    <div>
        {hind === 0 && <div>Mälukaart on valimata!</div>}
        <div>Valitud mälukaardiga telefoni hind: {hind}</div>
        <button className={hind === 30 ? "aktiivne" : ""} onClick={() => setHind(30)}>Mälukaart 16GB</button>
        <button className={hind === 50 ? "aktiivne" : ""} onClick={() => setHind(50)}>Mälukaart 32GB</button>
        <button className={hind === 80 ? "aktiivne" : ""} onClick={() => setHind(80)}>Mälukaart 64GB</button>
        <button className={hind === 100 ? "aktiivne" : ""} onClick={() => setHind(100)}>Mälukaart 128GB</button>
        <button className={hind === 130 ? "aktiivne" : ""} onClick={() => setHind(130)}>Mälukaart 256GB</button>
        <button className={hind === 150 ? "aktiivne" : ""} onClick={() => setHind(150)}>Mälukaart 512GB</button>
    </div>
  )
}

export default Hind