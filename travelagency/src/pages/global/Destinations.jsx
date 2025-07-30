import { useEffect, useState } from "react"
import { Link} from "react-router-dom"

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [dbDestinations, setDbDestinations] = useState([]);
  const [filterCountry, setFilterCountry] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [countries, setCountries] = useState([]);
  const countriesUrl = "https://maarja-travelagency-default-rtdb.europe-west1.firebasedatabase.app/countries.json";
  const destinationsUrl = "https://maarja-travelagency-default-rtdb.europe-west1.firebasedatabase.app/destinations.json";
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(countriesUrl)
        .then(res => res.json())
        .then(json => {
          setCountries(json || []);
        })
  }, []);

  useEffect(() => {
    fetch(destinationsUrl)
        .then(res => res.json())
        .then(json => {
          setDestinations(json || []);
          setDbDestinations(json || []);
          setLoading(false);
        })
  }, []);

  const reset = () => {
    setDestinations(dbDestinations.slice());
    setFilterCountry("");
    setSortOrder("");
  }

  const filter = (country) => {
    setFilterCountry(country);
    const filtered = dbDestinations.filter(d => d.destination === country);
    setDestinations(filtered);
  }

  const sort = (order) => {
    setSortOrder(order);
    const sorted = [...destinations].sort((a, b) =>
      order === "price-asc" ? a.price - b.price :
      order === "price-desc" ? b.price - a.price :
      0
    );
    setDestinations(sorted);
  }

  if(loading) {
    return <div>Laeb..</div>
  }

  return (
    <div>
      <div className="controls">
        <button onClick={reset}>Reset</button>

        <label>Filtreeri riigi järgi:</label>
        <select value={filterCountry} onChange={(e) => filter(e.target.value)}>
          <option disabled value="">Vali sihtriik</option>
          {countries.map((country, index) => (
            <option key={index} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>

        <label>Sorteeri hinna järgi:</label>
        <select value={sortOrder} onChange={(e) => sort(e.target.value)}>
          <option disabled value="">Vali</option>
          <option value="price-asc">Hind: kasvavalt</option>
          <option value="price-desc">Hind: kahanevalt</option>
        </select>
      </div>

      <div className="grid">
        {destinations.map((des) => (
          <div key={des.id} className="card">
            <img className="card-img" src={des.image} alt={des.hotel} />
            <h3>{des.hotel}</h3>
            <p><strong>{des.price}€</strong></p>
            <p><strong>{des.destination}</strong></p>
            <p>{des.description.substring(0, 150)}...</p>
            <Link to={"/destination/" + des.id}>
              <button>Vaata</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Destinations