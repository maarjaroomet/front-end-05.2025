import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

function EditDestination() {
  const {id} = useParams(); 
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const url = "https://maarja-travelagency-default-rtdb.europe-west1.firebasedatabase.app/countries.json";
  const destinationsUrl = "https://maarja-travelagency-default-rtdb.europe-west1.firebasedatabase.app/destinations.json";
  const [dbDestinations, setDbDestinations] = useState([]);
  const [destination, setDestination] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
        .then(res => res.json())
        .then(json => {
          setCountries(json || []);
        })
  }, []);

  useEffect(() => {
  fetch(destinationsUrl)
      .then(res => res.json())
      .then(json => {
        const foundDestination = json.find(des => des.id === Number(id));
        setDestination(foundDestination);
        setDbDestinations(json || []);
        setLoading(false);
      })
  }, [id]);

  const reverseFormatDate = (formattedDate) => {
    if (!formattedDate) return "";
    const [day, month, year] = formattedDate.split(".");
    return `${year}-${month}-${day}`;
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}.${month}.${year}`;
  };

  const calculateLength = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start) || isNaN(end)) return 0;
    const diffInMs = end - start;
    return Math.max(1, Math.ceil(diffInMs / (1000 * 60 * 60 * 24)) + 1);
  };

  const changeDestination = () => {
    if (destination.destination === undefined || destination.destination === "") {
      toast.error("Sihtkoht puudu!");
      return; 
    }

    if (destination.hotel === undefined || destination.hotel === "") {
      toast.error("Hotell puudu!");
      return;
    }

    if (destination.description === undefined || destination.description === "") {
      toast.error("Kirjeldus puudu!");
      return;
    }

    if (destination.length === undefined || destination.length === "") {
      toast.error("Puhkuse pikkus puudu!");
      return; 
    }

    if (destination.startDate === undefined || destination.startDate === "") {
      toast.error("Puhkuse alguse kuupäev puudu!");
      return;
    }

    if (destination.endDate === undefined || destination.endDate === "") {
      toast.error("Puhkuse lõpu kuupäev puudu!");
      return;
    }

    const start = reverseFormatDate(destination.startDate);
    const end = reverseFormatDate(destination.endDate);
    if (end < start) return toast.error("Lõppkuupäev ei saa olla enne alguskuupäeva!");  

    if (destination.persons === undefined || destination.persons === "") {
      toast.error("Inimeste arv puudu!");
      return;
    }

    if (!destination.persons || destination.persons < 1 || destination.persons > 10)
      return toast.error("Inimeste arv peab olema vahemikus 1-10!");

    if (destination.price === undefined || destination.price === "") {
      toast.error("Hind puudu!");
      return;
    }

    if (destination.rating.rate === undefined || destination.rating.rate === "") {
      toast.error("Hinnang puudu!");
      return;
    }

    if (destination.rating.count === undefined || destination.rating.count === "") {
      toast.error("Hinnangu andjate arv puudu!");
      return;
    }

    if (destination.image === undefined || destination.image === "") {
      toast.error("Pilt puudu!");
      return;
    }

    const index = dbDestinations.findIndex(des => des.id === destination.id);
    dbDestinations[index] = destination;
    fetch(destinationsUrl, {method: "PUT", body: JSON.stringify(dbDestinations)})
      .then(res => res.json())
      .then(() => {
        toast.success("Pakkumine uuendatud: " + destination.hotel);
        navigate("/admin/maintain-destinations");
      })
    
  }

  if(loading) {
    return <div>Laeb..</div>
  }

  if(destination === undefined) {
    return <div>Sihtkohta ei leitud</div>
  }

  return (
    <div>
      <div className="add-destination-form">
        <h2>Muuda sihtkohta</h2>
        <form>
          <label>Sihtkoht</label>
          <select onChange={e => setDestination({ ...destination, destination: e.target.value })} value={destination.destination} type="text" >
            {countries.map(country => 
            <option key={country.name}>
              {country.name}
            </option>)}
          </select>

          <label>Hotell</label>
          <input value={destination.hotel} type="text" onChange={e => setDestination({ ...destination, hotel: e.target.value })} />

          <label>Kirjeldus</label>
          <textarea rows={3} value={destination.description} onChange={e => setDestination({ ...destination, description: e.target.value })}></textarea>

          <label>Alguskuupäev</label>
          <input
            type="date"
            value={reverseFormatDate(destination.startDate)}
            onChange={(e) => {
              const formatted = formatDate(e.target.value);
              const end = destination.endDate;
              const newLength = calculateLength(e.target.value, reverseFormatDate(end));
              setDestination({ ...destination, startDate: formatted, length: newLength });
            }}
          />

          <label>Lõppkuupäev</label>
          <input
            type="date"
            value={reverseFormatDate(destination.endDate)}
            onChange={(e) => {
              const formatted = formatDate(e.target.value);
              const start = destination.startDate;
              const newLength = calculateLength(reverseFormatDate(start), e.target.value);
              setDestination({ ...destination, endDate: formatted, length: newLength });
            }}
          />

          <label>Puhkuse pikkus (päevades)</label>
          <input value={destination.length || ""} type="number" disabled />

          <label>Inimeste arv</label>
          <input type="number" min="1" max="10" value={destination.persons} onChange={(e) => setDestination({ ...destination, persons: Number(e.target.value) })} />

          <label>Hind (€)</label>
          <input type="number" min="1" value={destination.price} onChange={(e) => setDestination({ ...destination, price: Number(e.target.value) })} />

          <label>Hinnang (1-5)</label>
          <input type="number" step="0.1" min="1" max="5" value={destination.rating?.rate} onChange={(e) => setDestination({ ...destination, rating: { ...destination.rating, rate: Number(e.target.value) } })} />

          <label>Hinnangute arv</label>
          <input type="number" min="1" value={destination.rating?.count} onChange={(e) => setDestination({ ...destination, rating: { ...destination.rating, count: Number(e.target.value) } })} />

          <label>Pildi URL</label>
          <input value={destination.image} type="text" onChange={(e) => setDestination({ ...destination, image: e.target.value })} />

          <button type="button" onClick={changeDestination}>Uuenda sihtkoht</button>
        </form>

        <ToastContainer 
          position="bottom-right" 
          autoClose={4000} 
          theme="dark" 
        />
      </div>
    </div>
  )
}

export default EditDestination