import { useState } from "react";

function Cart() {
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  const emptyCart = () => {
    setProducts([])
    localStorage.setItem("cart", "[]");
  }

  const deleteProducts = (index) => {
    products.splice(index, 1); //splice kustutamine, sulgudes mitmendat kustutad, mitu tk kustutad (kui paned nr 2, siis kustub see ja temast järgmine)
    setProducts(products.slice());
    localStorage.setItem("cart", JSON.stringify(products));
  }

  const totalPrice = products.reduce((sum, product) => sum + Number(product.price || 0), 0);

  return (
    <div>
      {products.length > 0 && 
        <>
          <button onClick={emptyCart}>Tühjenda</button>
          <div>Ostukorvis on {products.length} toodet summas {totalPrice.toFixed(2)} €</div>
        </>
      }
      

      <div>{products.map((product, index) => 
        <div key={index}>
          {product.title}  
          {product.price} €
          <button onClick={() => deleteProducts(index)}>x</button>
        </div>)}
      </div>

      {products.length === 0 && <div>Ostukorv on tühi</div>}
    </div>
  )
}

export default Cart