import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function MaintainDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [dbDestinations, setDbDestinations] = useState([]);
  const destinationsUrl = "https://maarja-travelagency-default-rtdb.europe-west1.firebasedatabase.app/destinations.json";
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  
  useEffect(() => {
    fetch(destinationsUrl)
        .then(res => res.json())
        .then(json => {
          setDestinations(json || []);
          setDbDestinations(json || []);
          setLoading(false);
        })
  }, []);

  const deleteDestination = (id) => {
  const index = dbDestinations.findIndex(des => des.id === id);
  dbDestinations.splice(index, 1);

  fetch(destinationsUrl, {method: "PUT", body: JSON.stringify(dbDestinations)})
    .then(res => res.json())
    .then(() => {
      setDestinations(dbDestinations.slice());
      toast.success("Toode kustutatud");
    })
  }

  const toggleDescription = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if(loading) {
    return <div>Laeb..</div>
  }

  return (
    <div>
      <table>
          <thead>
              <tr>
                  <th>Sihtkoht</th>
                  <th>Hotell</th>
                  <th>Kirjeldus</th>
                  <th>Puhkuse pikkus</th>
                  <th>Puhkuse algus</th>
                  <th>Puhkuse lõpp</th>
                  <th>Inimeste arv</th>
                  <th>Hind</th>
                  <th>Hinnang</th>
                  <th>Hinnangu andjate arv</th>
                  <th>Pilt</th>
                  <th>Kustuta</th>
                  <th>Muuda</th>
              </tr>
          </thead>
          <tbody>
              {destinations.map(des => 
              <tr key={des.id} >
                  <td>{des.destination}</td>
                  <td>{des.hotel}</td>
                  <td>
                    {expanded[des.id] || des.description.length <= 100
                      ? des.description
                      : des.description.slice(0, 100) + "..."}
                    {des.description.length > 100 && (
                      <button
                        style={{ marginLeft: "8px", background: "none", color: "#0077cc", border: "none", cursor: "pointer", padding: 0 }}
                        onClick={() => toggleDescription(des.id)}>
                        {expanded[des.id] ? "Näita vähem" : "Näita rohkem"}
                      </button>
                    )}
                  </td>
                  <td>{des.length}</td>
                  <td>{des.startDate}</td>
                  <td>{des.endDate}</td>
                  <td>{des.persons}</td>
                  <td>{des.price}</td>
                  <td>{des.rating.rate}</td>
                  <td>{des.rating.count}</td>
                  <td><img style={{width: "50px"}} src={des.image} alt="" /></td>
                  <td><button onClick={() => deleteDestination(des.id)}>x</button></td>
                  <td><Link to={"/admin/edit-destination/" + des.id}><button>Muuda</button></Link></td>
              </tr>)}
          </tbody>
      </table>
      
      <ToastContainer 
        position="bottom-right"
        autoClose={4000}
        theme="dark"
      />
    </div>

    
  )
}

export default MaintainDestinations