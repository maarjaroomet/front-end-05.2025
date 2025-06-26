import { useParams } from "react-router-dom"
import joogidFailist from "../joogid.json"

function Jook() {
  const { number } = useParams();
  const leitud = joogidFailist[number];

  return (
    <div>
        {leitud}
        {leitud === undefined && <div>Jooki ei leitud</div>}
    </div>
  )
}

export default Jook