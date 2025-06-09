import { useState } from "react"

function Kontakt() {
  const [naitaTelKristiine, setNaitaTelKristiine] = useState(false);
  const [naitaTelYlemiste, setNaitaTelYlemiste] = useState(false);
  const [naitaTelTasku, setNaitaTelTasku] = useState(false);

  return (<div>
    <div>See on kontaktide leht, nähtav localhost:5173/kontakt aadressil</div>
    <div>Võta meiega ühendust:</div>
    <br />
    <div className={naitaTelKristiine === true ? "valitud" : undefined} onClick={() => setNaitaTelKristiine(!naitaTelKristiine)}>Kristiine keskus</div>
    {naitaTelKristiine && <div className="valitud">+351231231</div>}
    <div>Endla 45</div>
    <br />
    <div className={naitaTelYlemiste === true ? "valitud" : undefined} onClick={() => setNaitaTelYlemiste(!naitaTelYlemiste)}>Ülemiste keskus</div>
    {naitaTelYlemiste && <div className="valitud">+34151231</div>}
    <div>Suur-Sõjamäe 4</div>
    <br />
    <div className={naitaTelTasku === true ? "valitud" : undefined} onClick={() => setNaitaTelTasku(!naitaTelTasku)}>Tasku keskus</div>
    {naitaTelTasku && <div className="valitud">+39312323</div>}
    <div>Turu 2</div>
  </div>)
}

export default Kontakt