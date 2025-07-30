import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

function MaintainCountries() {
  const [countries, setCountries] = useState([]);
  const url = "https://maarja-travelagency-default-rtdb.europe-west1.firebasedatabase.app/countries.json";
  const countryRef = useRef();

  useEffect(() => {
    fetch(url)
        .then(res => res.json())
        .then(json => setCountries(json || []))
  }, []);

  const add = () => {
    countries.push({name:countryRef.current.value});
    fetch(url, {method: "PUT", body: JSON.stringify(countries)})
        .then(res => res.json())
        .then(json => {
            setCountries(json || []);
            countryRef.current.value = "";
        })
  }

  const deleteCountry = (index) => {
    countries.splice(index, 1);
    fetch(url, {method: "PUT", body: JSON.stringify(countries)})
        .then(res => res.json())
        .then(json => {
            setCountries(json || []);
            toast.success("Sihtriik kustutatud")
        })
  }

  return (
    <div>
        <div className="maintain-countries-form">
            <h2>Halda sihtriike</h2>

            <label>Lisa uus sihtriik</label>
            <input ref={countryRef} type="text" />
            <button onClick={add}>Sisesta</button>

            <ul className="country-list">
                {countries.map((country, index) => (
                <li key={country.name}>
                    <span>{country.name}</span>
                    <button className="delete-btn" onClick={() => deleteCountry(index)}>
                    ×
                    </button>
                </li>
                ))}
            </ul>
        </div>

        <ToastContainer 
            position="bottom-right" 
            autoClose={4000} 
            theme="dark" 
        />

    </div>
  )
}

export default MaintainCountries