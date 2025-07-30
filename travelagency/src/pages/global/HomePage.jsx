import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import circle7 from "../../assets/circle-7.png"
import customer from "../../assets/costumer.png"
import freelance from "../../assets/freelance.png"
import pin from "../../assets/pin.png"

function HomePage() {
  const destinationsUrl = "https://maarja-travelagency-default-rtdb.europe-west1.firebasedatabase.app/destinations.json";
  const feedBacksUrl = "https://maarja-travelagency-default-rtdb.europe-west1.firebasedatabase.app/feedbacks.json";
  const [randomDestinations, setRandomDestinations] = useState([]);
  const [randomFeedbacks, setRandomFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(feedBacksUrl)
      .then(res => res.json())
      .then(json => {
        const data = json || [];
        setRandomFeedbacks(data.sort(() => 0.5 - Math.random()).slice(0, 4));
      });
  }, []);

  useEffect(() => {
    fetch(destinationsUrl)
      .then(res => res.json())
      .then(json => {
        const data = json || [];
        setRandomDestinations(data.sort(() => 0.5 - Math.random()).slice(0, 4));
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Laeb...</div>;

  return (
    <div>
      <div className="section-header">
        <h2>Pakkumised:</h2>
        <Link to="/destinations">
          <button>Vaata kõiki</button>
        </Link>
      </div>
      <div className="grid">
        {randomDestinations.map((des) => (
          <div key={des.id} className="card">
            <img className="card-img" src={des.image} alt={des.hotel} />
            <h3>{des.hotel}</h3>
            <p><strong>{des.price}€</strong></p>
            <p><strong>{des.destination}</strong></p>
            <p>{des.description.substring(0, 150)}...</p>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h2>Klientide tagasiside:</h2>
        <Link to="/feedbacks">
          <button>Vaata kõiki</button>
        </Link>
      </div>
      <div className="grid">
        {randomFeedbacks.map((feedback) => (
          <div key={feedback.id} className="card">
            <h3>{feedback.rate}⭐</h3>
            <p><strong>{feedback.name}</strong></p>
            <p>{feedback.comment}</p>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h2>Ettevõttest:</h2>
      </div>
      <div className="about-grid">
        <div className="about-item">
          <img src={circle7} alt="" className="about-icon" />
          <div>7 aastat edukat reisikorraldust</div>
        </div>
        <div className="about-item">
          <img src={customer} alt="" className="about-icon" />
          <div>200+ rahulolevat klienti</div>
        </div>
        <div className="about-item">
          <img src={pin} alt="" className="about-icon" />
          <div>Valikus mitmed sihtkohad</div>
        </div>
        <div className="about-item">
          <img src={freelance} alt="" className="about-icon" />
          <div>Töötajate keskmine tööstaaž 5+ aastat</div>
        </div>
      </div>
    </div>
  )
}

export default HomePage