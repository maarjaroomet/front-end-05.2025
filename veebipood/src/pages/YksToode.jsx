import { useParams } from "react-router-dom"
import tootedFailist from "../data/tooted.json"

function YksToode() {
  const {nimi} = useParams();
  const leitud = tootedFailist.find(toode => toode.nimi.toLowerCase().replaceAll(" ", "-") === nimi)

  if(leitud === undefined) {
    return <div>Toodet ei leitud</div>
  }

  return (
    <div>
      <div>{leitud.nimi}</div>
      <div>{leitud.hind}</div>
      <div>{leitud.aktiivne ? <button>Lisa ostukorvi</button> : <i>Toode on mitteaktiivne</i>}</div>
      <img src={leitud.pilt} alt="" />
    </div>
  )
}

export default YksToode