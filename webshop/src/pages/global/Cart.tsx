import { useContext, useState } from "react";
import ParcelMachines from "../../components/ParcelMachines";
import Payment from "../../components/Payment";
import { CartSumContext } from "../../context/CartSumContext.tsx";
import { useDispatch } from "react-redux";
import { decrement, empty } from "../../redux/counterSlice";
import type { Product } from "../../models/Product";

function Cart() {
  const [products, setProducts] = useState<Product[]>(JSON.parse(localStorage.getItem("cart") || "[]"));
  const cartSumCtx = useContext(CartSumContext);
  const totalPrice = products.reduce((sum: number, product) => sum + Number(product.price || 0), 0);
  const dispatch = useDispatch();

  const emptyCart = () => {
    cartSumCtx.empty();
    dispatch(empty());
    setProducts([])
    localStorage.setItem("cart", "[]");   
  }

  const deleteProduct = (index: number) => {
    cartSumCtx.minus(products[index].price);
    dispatch(decrement());
    products.splice(index, 1); //splice kustutamine, sulgudes mitmendat kustutad, mitu tk kustutad (kui paned nr 2, siis kustub see ja temast järgmine)
    setProducts(products.slice());
    localStorage.setItem("cart", JSON.stringify(products));
  }

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
          <button onClick={() => deleteProduct(index)}>x</button>
        </div>)}
      </div>

      {products.length === 0 && <div>Ostukorv on tühi</div>}

      {products.length > 0 &&
        <div>
          <ParcelMachines />
          <br />
          <Payment sum={totalPrice} />
        </div>}

    </div>
  )
}

export default Cart