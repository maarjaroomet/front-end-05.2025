import { useContext, useState } from "react";
import ParcelMachines from "../../components/cart/ParcelMachines";
import Payment from "../../components/cart/Payment.tsx";
import { CartSumContext } from "../../context/CartSumContext.tsx";
import { useDispatch } from "react-redux";
import { decrement, decrementByAmount, empty, increment } from "../../redux/counterSlice.ts";
import type { CartProduct } from "../../models/CartProduct.ts";
import minus from "../../assets/minus.png";
import plus from "../../assets/plus.png";
import remove from "../../assets/remove.png";
import styles from "../../css/Cart.module.css";
import { calculateCartSum } from "../../utils/calculations.ts";

function Cart() {
  const [products, setProducts] = useState<CartProduct[]>(JSON.parse(localStorage.getItem("cart") || "[]"));
  const cartSumCtx = useContext(CartSumContext);
  
  const dispatch = useDispatch();

  const emptyCart = () => {
    cartSumCtx.empty();
    dispatch(empty());
    setProducts([])
    localStorage.setItem("cart", "[]");   
  }

  const decreaseQuantity = (index: number) => {
    products[index].quantity--;
    cartSumCtx.minus(products[index].product.price); //muudab Navbaris summat
    dispatch(decrement()); //muudab Navbaris kogust
    if(products[index].quantity === 0) {
      products.splice(index, 1);
    }
    setProducts(products.slice()); //uuendab HTML-i
    localStorage.setItem("cart", JSON.stringify(products)); //uuendab localStorage-t
  }

  const increaseQuantity = (index: number) => {
    products[index].quantity++;
    cartSumCtx.add(products[index].product.price); //muudab Navbaris summat
    dispatch(increment()); //muudab Navbaris kogust
    setProducts(products.slice()); //uuendab HTML-i
    localStorage.setItem("cart", JSON.stringify(products)); //uuendab localStorage-t
  }

  const deleteProduct = (index: number) => {
    cartSumCtx.minus(products[index].product.price * products[index].quantity);
    dispatch(decrementByAmount(products[index].quantity));
    products.splice(index, 1); //splice kustutamine, sulgudes mitmendat kustutad, mitu tk kustutad (kui paned nr 2, siis kustub see ja temast järgmine)
    setProducts(products.slice());
    localStorage.setItem("cart", JSON.stringify(products));
  }

  return (
    <div>
      {products.length > 0 && 
        <>
          <button onClick={emptyCart}>Tühjenda</button>
          <div>Ostukorvis on {products.length} erinevat toodet summas {calculateCartSum(products).toFixed(2)} €</div>
        </>
      }
      

      <div>{products.map((cp, index) => 
        <div className={styles.product} key={index}>
          <img className={styles.image} src={cp.product.image} alt="" />
          <div className={styles.title}>{cp.product.title} </div>
          <div className={styles.price}>{cp.product.price.toFixed(2)} €</div>
          <div className={styles.quantity}>
            <img className={styles.button} onClick={() => decreaseQuantity(index)} src={minus} alt="" />
            <div>{cp.quantity} tk</div>
            <img className={styles.button} onClick={() => increaseQuantity(index)} src={plus} alt="" />
          </div>
          <div className={styles.total}>{(cp.product.price * cp.quantity).toFixed(2)} €</div>   
          <img className={styles.button} src={remove} onClick={() => deleteProduct(index)} alt="" />
        </div>)}
      </div>

      {products.length === 0 && <div>Ostukorv on tühi</div>}

      {products.length > 0 &&
        <div>
          <ParcelMachines />
          <br />
          <Payment sum={calculateCartSum(products)} />
        </div>}

    </div>
  )
}

export default Cart