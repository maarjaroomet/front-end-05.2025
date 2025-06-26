import { useState } from "react";

function Avaleht() {
//   const tegelased = [
//     {eesnimi: "Mickey", perenimi: "Mouse", elukoht: "Disneyland", vanus: 25},
//     {eesnimi: "Minnie", perenimi: "Mouse", elukoht: "Disneyland", vanus: 25},
//     {eesnimi: "Winnie", perenimi: "Pooh", elukoht: "Hundred Acre Wood", vanus: 20},
//     {eesnimi: "Roo", perenimi: "Kangaroo", elukoht: "Hundred Acre Wood", vanus: 30},
//     {eesnimi: "Scooby", perenimi: "Doo", elukoht: "Crystal Cove", vanus: 7},
//     ];
  const tegelased = JSON.parse(localStorage.getItem("tegelased")) || [];
  const [klikitudNimi, uuendaKlikitudNimi] = useState("");

  const kuvaNimi = (tegelane) => {
    uuendaKlikitudNimi(tegelane.eesinimi);
  } 

  const valiTegelane = (klikitudTegelane) => {
    const valitud = JSON.parse(localStorage.getItem("valitudTegelased")) || [];
    valitud.push(klikitudTegelane);
    localStorage.setItem("valitudTegelased", JSON.stringify(valitud));
  }



  return (
    <div>
        {klikitudNimi !== "" && <div>Klikkisid tegelase {klikitudNimi} peal</div>}
        {tegelased.map(tegelane => 
        <div>
            <div> {tegelane.eesnimi} </div>
            <div> {tegelane.perenimi} </div>
            <div> {tegelane.elukoht} </div>
            <div> {tegelane.vanus} </div>
            <button onClick={()=> valiTegelane(tegelane)}>Vali</button>
            <button onClick={()=> kuvaNimi(tegelane)}>Kuva nimi</button>
        </div>)}

        {/* <div>
            <div>Mickey</div>
            <div>Mouse</div>
            <div>Disneyland</div>
        </div>
        <div>
            <div>Minnie</div>
            <div>Mouse</div>
            <div>Disneyland</div>
        </div>
        <div>
            <div>Winnie</div>
            <div>Pooh</div>
            <div>Hundred Acre Wood</div>
        </div>
        <div>
            <div>Roo</div>
            <div>Kangaroo</div>
            <div>Hundred Acre Wood</div>
        </div>
        <div>
            <div>Scooby</div>
            <div>Doo</div>
            <div>Crystal Cove</div>
        </div> */}
    </div>
  )
}

export default Avaleht