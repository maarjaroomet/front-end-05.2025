import { useEffect, useRef, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import type { Shop } from "../../models/Shop";

function MaintainShops() {
  const [shops, setShops] = useState<Shop[]>([]);
  const url = import.meta.env.VITE_SHOPS_DB_URL;
  const shopRef = useRef<HTMLInputElement>(null);
  const longitudeRef = useRef<HTMLInputElement>(null);
  const latitudeRef = useRef<HTMLInputElement>(null);
  const openTimeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => setShops(json || []))
  }, [url]);

  
  const add = () => {
    if(shopRef.current === null ||
       longitudeRef.current === null ||
       latitudeRef.current === null ||
       openTimeRef.current === null
    ){
      return;
    }

    const newShop = {
      name: shopRef.current.value,
      longitude: Number(longitudeRef.current.value),
      latitude: Number(latitudeRef.current.value),
      openTime: openTimeRef.current.value
    }
    shops.push(newShop);
    fetch(url, {method: "PUT", body: JSON.stringify(shops)})
      .then(res => res.json())
      .then(json => {
        setShops(json || []);
        if(shopRef.current === null ||
          longitudeRef.current === null ||
          latitudeRef.current === null ||
          openTimeRef.current === null
        ){
          return;
        }
        shopRef.current.value = "";
        longitudeRef.current.value = "";
        latitudeRef.current.value = "";
        openTimeRef.current.value = "";
      })
  }

  const deleteShop = (index: number) => {
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