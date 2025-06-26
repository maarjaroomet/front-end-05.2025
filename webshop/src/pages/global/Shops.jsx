import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

function Shops() {
  const [shops, setShops] = useState([]);
  const url = import.meta.env.VITE_SHOPS_DB_URL;;

  useEffect(() => {
      fetch(url)
        .then(res => res.json())
        .then(json => setShops(json || []))
    }, [url]);

  return (
    <div>
      <MapContainer className="map" center={[59.435, 24.751]} zoom={12} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {shops.map(shop =>
        <Marker position={[shop.longitude, shop.latitude]}>
          <Popup>
            {shop.name} <br /> {shop.openTime}
          </Popup>
        </Marker>
      )}
    </MapContainer>
    </div>
  )
}

export default Shops