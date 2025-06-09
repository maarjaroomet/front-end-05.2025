import { useState } from "react"

function Meist() {
    const [sonum, setSonum] = useState("Vali mõni tegevus");
  return (
    <div>
        <div>{sonum}</div>
        <button onClick={() => setSonum("Selleks saada meile e-mail jobs@html-css.com")}>Kandideeri tööle</button>
        <button onClick={() => setSonum("Meil on 10 töötajat, kelle info ilmub veebilehele lähiajal")}>Vaata meie töötajaid</button>
        <button onClick={() => setSonum("Ühenduse võtmiseks mine lehele Kontakt")}>Võta meiega ühendust</button>
    </div>
  )
}

export default Meist