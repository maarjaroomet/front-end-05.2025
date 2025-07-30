import { useState, useEffect } from "react";
import Payment from "../../components/Payment";

function Cart() {
  const [destinations, setDestinations] = useState(JSON.parse(localStorage.getItem("travelCart")) || []);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const sum = destinations.reduce((acc, des) => acc + Number(des.price), 0);
    setTotalPrice(sum);
  }, [destinations]);

  const reset = () => {
    setDestinations([]);
    localStorage.setItem("travelCart", "[]");
    setTotalPrice(0);
  };

  const deleteDestination = (id) => {
    const updated = destinations.filter(des => des.id !== id);
    setDestinations(updated);
    localStorage.setItem("travelCart", JSON.stringify(updated));
  };

  return (
    <div className="cart-page">
      <h2>Ostukorv</h2>

      {destinations.length === 0 && <div className="empty-cart">Ostukorv on tühi</div>}

      {destinations.length > 0 && (
        <>
          <div className="cart-list">
            {destinations.map((des) => (
              <div key={des.id} className="cart-item">
                <img src={des.image} alt={des.hotel} className="cart-img" />
                <div className="cart-info">
                  <h3>{des.hotel}</h3>
                  <p><strong>Sihtkoht:</strong> {des.destination}</p>
                  <p><strong>Kuupäevad:</strong> {des.startDate} – {des.endDate}</p>
                  <p><strong>Hind:</strong> {Number(des.price).toFixed(2)} €</p>
                </div>
                <button className="delete-btn" onClick={() => deleteDestination(des.id)}>Eemalda</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">Kogusumma: <strong>{totalPrice.toFixed(2)} €</strong></div>
            <button className="clear-btn" onClick={reset}>Tühjenda ostukorv</button>
            <Payment sum={totalPrice.toFixed(2)} />
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
