import { useState } from "react"

function Kontakt() {
    const [aadress, setAadress] = useState("Tallinn");
    const [telefon, setTelefon] = useState("5512345");
    const [email, setEmail] = useState("bla@baa.com");
    const [ingliseKeelne, setIngliseKeelne] = useState(false);

    const setBla= () =>{
        setAadress("Tartu");
        setTelefon("53548245");
        setEmail("blabla@blaa.com");
        setIngliseKeelne(true);
    }

  return (
    <div>
        <div>{aadress}</div>
        <div>{telefon}</div>
        <div>{email}</div>
        <button onClick={setBla}>Muuda inglise keelseks</button>
        {ingliseKeelne && <div>Leht on inglise keelne</div>}
    </div>
  )
}

export default Kontakt