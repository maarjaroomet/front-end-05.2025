import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';

function AddDestination() {
  const [destination, setDestination] = useState({});
  const [countries, setCountries] = useState([]);
  const url = "https://maarja-travelagency-default-rtdb.europe-west1.firebasedatabase.app/countries.json";
  const [dbDestinations, setDbDestinations] = useState([]);
  const destinationsUrl = "https://maarja-travelagency-default-rtdb.europe-west1.firebasedatabase.app/destinations.json";
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
          setDbDestinations(json || []);
          setLoading(false);
        })
  }, []);

  const calculateLength = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start) || isNaN(end)) return 0;
    const diffInMs = end - start;
    return Math.max(1, Math.ceil(diffInMs / (1000 * 60 * 60 * 24)) + 1);
  }

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}.${month}.${year}`;
  };

  const reverseFormatDate = (formattedDate) => {
    if (!formattedDate) return "";
    const [day, month, year] = formattedDate.split(".");
    return `${year}-${month}-${day}`;
  };

  const add = () => {

    const maxId = dbDestinations.reduce((max, d) => d.id > max ? d.id : max, 0);
    const newDestination = { ...destination, id: maxId + 1 };

    if (newDestination.destination === undefined || newDestination.destination === "") {
      toast.error("Sihtkoht puudu!");
      return; 
    }

    if (newDestination.hotel === undefined || newDestination.hotel === "") {
      toast.error("Hotell puudu!");
      return;
    }

    if (newDestination.description === undefined || newDestination.description === "") {
      toast.error("Kirjeldus puudu!");
      return;
    }

    if (newDestination.length === undefined || newDestination.length === "") {
      toast.error("Puhkuse pikkus puudu!");
      return; 
    }

    if (newDestination.startDate === undefined || newDestination.startDate === "") {
      toast.error("Puhkuse alguse kuupäev puudu!");
      return;
    }

    if (newDestination.endDate === undefined || newDestination.endDate === "") {
      toast.error("Puhkuse lõpu kuupäev puudu!");
      return;
    }

    if (newDestination.startDate && newDestination.endDate) {
      const start = reverseFormatDate(newDestination.startDate);
      const end = reverseFormatDate(newDestination.endDate);
      if (end < start) {
        toast.error("Lõppkuupäev ei saa olla enne alguskuupäeva!");
        return;
      }
    }

    if (newDestination.persons === undefined || newDestination.persons === "") {
      toast.error("Inimeste arv puudu!");
      return;
    }

    if (newDestination.price === undefined || newDestination.price === "") {
      toast.error("Hind puudu!");
      return;
    }

    if (newDestination.rating.rate === undefined || newDestination.rating.rate === "") {
      toast.error("Hinnang puudu!");
      return;
    }

    if (newDestination.rating.count === undefined || newDestination.rating.count === "") {
      toast.error("Hinnangu andjate arv puudu!");
      return;
    }

    if (newDestination.image === undefined || newDestination.image === "") {
      toast.error("Pilt puudu!");
      return;
    }
  
    dbDestinations.push(newDestination);
    fetch(destinationsUrl, {method: "PUT", body: JSON.stringify(dbDestinations)})
      .then(res => res.json())
      .then(() => {
        toast.success("Pakkumine lisatud: " + newDestination.hotel);
      })
  }

  if(loading) {
    return <div>Laeb..</div>
  }

  return (
    <div className="add-destination-form">
      <h2>Lisa uus sihtkoht</h2>
      <form>
        <label>Sihtkoht</label>
        <select onChange={e => setDestination({ ...destination, destination: e.target.value })} defaultValue={""} type="text" >
          <option disabled value="">Vali</option>
            {countries.map(country => 
            <option key={country.name}>
              {country.name}
            </option>)}
          </select>

        <label>Hotell</label>
        <input onChange={(e) => setDestination({ ...destination, hotel: e.target.value })} type="text" />

        <label>Kirjeldus</label>
        <textarea onChange={(e) => setDestination({ ...destination, description: e.target.value })} rows={3}></textarea>

        <label>Alguskuupäev</label>
        <input
          type="date"
          onChange={(e) => {
            const formattedDate = formatDate(e.target.value);
            const end = destination.endDate;
            const newLength = calculateLength(e.target.value, reverseFormatDate(end));
            setDestination({ ...destination, startDate: formattedDate, length: newLength });
          }}
        />

        <label>Lõppkuupäev</label>
        <input
          type="date"
          onChange={(e) => {
            const formattedDate = formatDate(e.target.value);
            const start = destination.startDate;
            const newLength = calculateLength(reverseFormatDate(start), e.target.value);
            setDestination({ ...destination, endDate: formattedDate, length: newLength });
          }}
        />

        <label>Puhkuse pikkus (päevades)</label>
        <input value={destination.length || ""} type="number" disabled />

        <label>Inimeste arv</label>
        <input min="1" max="10"  onChange={(e) => setDestination({ ...destination, persons: Number(e.target.value) })} type="number" />

        <label>Hind (€)</label>
        <input min="1" onChange={(e) => setDestination({ ...destination, price: Number(e.target.value) })} type="number" />

        <label>Hinnang (1-5)</label>
        <input min="1" max="5" onChange={(e) => setDestination({ ...destination, rating: { ...destination.rating, rate: Number(e.target.value) } })} type="number" step="0.1" />

        <label>Hinnangute arv</label>
        <input min="1" onChange={(e) => setDestination({ ...destination, rating: { ...destination.rating, count: Number(e.target.value) } })} type="number" />

        <label>Pildi URL</label>
        <input onChange={(e) => setDestination({ ...destination, image: e.target.value })} type="text" />

        <button type="button" onClick={add}>Lisa sihtkoht</button>
      </form>

      <ToastContainer 
        position="bottom-right"
        autoClose={4000}
        theme="dark"
      />
    </div>
  )
}

export default AddDestination