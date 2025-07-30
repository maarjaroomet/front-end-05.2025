import { useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";

function SingleDestination() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [dbDestinations, setDbDestinations] = useState([]);
  const foundDestination = dbDestinations.find(des => des.id === Number(id));
  const destinationsUrl = "https://maarja-travelagency-default-rtdb.europe-west1.firebasedatabase.app/destinations.json";
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(destinationsUrl)
        .then(res => res.json())
        .then(json => {
          setDbDestinations(json || []);
          setLoading(false);
        })
  }, []);

  if(foundDestination === undefined) {
    return <div>Sihtkohta ei leitud</div>
  }

  const addToCart = () => {
    const cartLS = JSON.parse(localStorage.getItem("travelCart")) || [];
    cartLS.push(foundDestination);
    toast.success("Ostukorvi lisatud: " + foundDestination.hotel);
    localStorage.setItem("travelCart", JSON.stringify(cartLS));
  }
  const backToDestinations = () => {
    navigate("/destinations");
  }

  if(loading) {
    return <div>Laeb..</div>
  }

  return (
    <div>
      <div className="single-destination">
        <img src={foundDestination.image} alt={foundDestination.hotel} />
        <h2>{foundDestination.destination}</h2>
        <div className="info"><strong>Hotell:</strong> {foundDestination.hotel}</div>
        <div className="info">{foundDestination.description}</div>
        <div className="info"><strong>Periood:</strong> {foundDestination.startDate} - {foundDestination.endDate}</div>
        <div className="info"><strong>Puhkuse pikkus:</strong> {foundDestination.length} päeva</div>
        <div className="info"><strong>Inimeste arv paketis:</strong> {foundDestination.persons}</div>
        <div className="info"><strong>Hind:</strong> {foundDestination.price} €</div>
        <div className="info"><strong>Hinnang:</strong> {foundDestination.rating.rate} ★</div>
        <div className="info"><strong>Hinnanguid kokku:</strong> {foundDestination.rating.count}</div>
        <div className="button-row">
          <button onClick={addToCart}>Lisa ostukorvi</button>
          <button onClick={backToDestinations}>Tagasi</button>
        </div>
      </div>

      <ToastContainer 
        position="bottom-right"
        autoClose={4000}
        theme="dark"
      />
    </div>
  )
}

export default SingleDestination