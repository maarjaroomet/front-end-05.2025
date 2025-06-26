import { useEffect, useRef, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';

function MaintainShops() {
  const [shops, setShops] = useState([]);
  const url = import.meta.env.VITE_SHOPS_DB_URL;
  const shopRef = useRef();
  const longitudeRef = useRef();
  const latitudeRef = useRef();
  const openTimeRef = useRef();

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => setShops(json || []))
  }, [url]);

  const add = () => {
    const newShop = {
      name: shopRef.current.value,
      longitude: longitudeRef.current.value,
      latitude: latitudeRef.current.value,
      openTime: openTimeRef.current.value
    }
    shops.push(newShop);
    fetch(url, {method: "PUT", body: JSON.stringify(shops)})
      .then(res => res.json())
      .then(json => {
        setShops(json || []);
        shopRef.current.value = "";
        longitudeRef.current.value = "";
        latitudeRef.current.value = "";
        openTimeRef.current.value = "";
      })
  }

  const deleteShop = (index) => {
    shops.splice(index, 1);
    fetch(url, {method: "PUT", body: JSON.stringify(shops)})
      .then(res => res.json())
      .then(json => {
        setShops(json || []);
        toast.success("Pood kustutatud");
      })
  }

  return (
    <div>
      <label>Poe keskus</label> <br />
      <input ref={shopRef} type="text" /> <br />
      <label>Poe longitude</label> <br />
      <input ref={longitudeRef} type="text" /> <br />
      <label>Poe latitude</label> <br />
      <input ref={latitudeRef} type="text" /> <br />
      <label>Poe lahtiolekuaeg</label> <br />
      <input ref={openTimeRef} type="text" /> <br />
      <button onClick={add}>Sisesta</button> <br />
      {shops.map((shop, index) => 
        <div key={shop.name}>
          <div>{shop.name}</div>
          <div>{shop.longitude}</div>
          <div>{shop.latitude}</div>
          <div>{shop.openTime}</div>
          <button onClick={() => deleteShop(index)}>x</button>
        </div>)}

        <ToastContainer 
          position="bottom-right"
          autoClose={4000}
          theme="dark"
        />
    </div>

  )
}

export default MaintainShops