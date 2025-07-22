import styles from "../../css/HomePage.module.css";
import { Button } from "@mui/material";
import {Link} from "react-router-dom";
import type { CartProduct } from "../../models/CartProduct";
import { increment } from "../../redux/counterSlice";
import { CartSumContext } from "../../context/CartSumContext";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import type { Product as ProductModel } from "../../models/Product";
import { toast } from 'react-toastify';

interface ProductInterface {
    product: ProductModel
}

function Product({product}: ProductInterface) {
  const {add} = useContext(CartSumContext);
  const dispatch = useDispatch();

  const addToCart = (product: ProductModel) => {
    const cartLS: CartProduct[] = JSON.parse(localStorage.getItem("cart") || "[]") ;
    const index = cartLS.findIndex(cp => cp.product.id === product.id)
    if(index >= 0) {
      cartLS[index].quantity++;
    } else {
      cartLS.push({"product": product, "quantity": 1});
    }
    
    localStorage.setItem("cart", JSON.stringify(cartLS));
    toast.success(product.title + " lisatud ostukorvi");
    add(product.price);
    dispatch(increment());
  }

  return (
    <div className={styles.product}>
          <img className={styles.image} src={product.image} alt="" />
          <div className={styles.title}>{product.title}</div>
          <div className={styles.price}>{product.price}</div>
          <Button variant="contained" onClick={() => addToCart(product)}>Lisa ostukorvi</Button>
          <Link to={"/product/" + product.id}>
            <Button variant="outlined">Vt lähemalt</Button>
          </Link>
    </div>
  )
}

export default Product