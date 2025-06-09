import { useState } from "react"

function Meist() {
  const [kontakt, setKontakt] = useState("");
  const [valitud, setValitud] = useState("");
  const tootajad = [
    {nimi:"Arvo Pärt", ala:"Uudisklippide taustamuusika", telefon:"+313132312"},
    {nimi:"Kelly Sildaru", ala:"Püstolreporter", telefon:"+3131231231"},
    {nimi:"Edward von Lõngus", ala:"Uudiste kujundamine", telefon:"3131231231"},
    {nimi:"Kerli Kõiv", ala:"Välisturgude spetsialist", telefon:"312312312"}
  ]

  const v6taYhendust = (tootaja) => {
    setKontakt(tootaja.telefon);
    setValitud(tootaja.nimi);
  }

  return (<div>
    <div>See on meist leht, nähtav localhost:5173/meist aadressil</div>
    <div>Meie töötajad:</div>
    VALITUD INIMENE: {valitud}
    <br />
    <div>{tootajad.map(tootaja =>
      <div className={tootaja.nimi === valitud ? "valitud" : undefined}>
        <div>{tootaja.nimi}</div>
        <div>{tootaja.ala}</div>
        <button onClick={() => v6taYhendust(tootaja)}>Võta ühendust</button>
        <br /><br />
      </div>
    )}

    </div>
    {/* <div>Arvo Pärt</div>
    <div>Uudisklippide taustamuusika</div>
    <button onClick={() => setKontakt('+313132312')}>Võta ühendust</button>
    <br /><br />
    <div>Kelly Sildaru</div>
    <div>Püstolreporter</div>
    <button onClick={() => setKontakt('+313124123')}>Võta ühendust</button>
    <br /><br />
    <div>Edward von Lõngus</div>
    <div>Uudiste kujundamine</div>
    <button onClick={() => setKontakt('+3131231231')}>Võta ühendust</button>
    <br /><br />
    <div>Kerli Kõiv</div>
    <div>Välisturgude spetsialist</div>
    <button onClick={() => setKontakt('+312312312')}>Võta ühendust</button>
    <br /><br /> */}
    { kontakt !== "" && <div>Tema kontakt: {kontakt}</div>}
  </div>)
}

export default Meist