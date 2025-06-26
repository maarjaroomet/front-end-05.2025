import { useState } from "react"
import joogidFailist from "../joogid.json"
import { Link } from "react-router-dom"

function Avaleht() {
  const [joogid, uuendaJoogid] = useState(joogidFailist);

  return (
    <div>
        Joogid:
        {joogid.map((element, index) =>
        <div>
            <Link to={"/jook/" + index}>
                <span>{element}</span>
            </Link>
        </div>)}
    </div>
  )
}

export default Avaleht