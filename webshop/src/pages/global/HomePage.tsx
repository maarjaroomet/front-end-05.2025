import { useContext, useEffect, useState } from "react"
// import productsFromFile from "../../data/products.json"
import {Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import CarouselGallery from "../../components/CarouselGallery";
import { Button } from "@mui/material";
import { CartSumContext } from "../../context/CartSumContext";
import { useDispatch } from "react-redux";
import { increment } from "../../redux/counterSlice";
import type { Product } from "../../models/Product";
import type { Category } from "../../models/Category";
import type { CartProduct } from "../../models/CartProduct";
import styles from "../../css/HomePage.module.css";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const categoriesUrl = import.meta.env.VITE_CATEGORIES_DB_URL;
  const productsUrl = import.meta.env.VITE_PRODUCTS_DB_URL;;
  const [loading, setLoading] = useState(true);
  const {add} = useContext(CartSumContext);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(categoriesUrl)
      .then(res => res.json())
      .then(json => setCategories(json || []))
  }, [categoriesUrl]);

  useEffect(() => {
    fetch(productsUrl)
      .then(res => res.json())
      .then(json =>{ 
        setProducts(json || []);
        setDbProducts(json || []);
        setLoading(false);
      })
  }, [productsUrl]);

  const addToCart = (product: Product) => {
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

  const reset = () => {
      setProducts(dbProducts.slice());
  }
  const sortAZ = () => {
    products.sort((a,b) => a.title.localeCompare(b.title));
    setProducts(products.slice());
  }
  
  const sortZA = () => {
    products.sort((a,b) => b.title.localeCompare(a.title));
    setProducts(products.slice());
  }

  const sortPriceHigher = () => {
    products.sort((a,b) => a.price - b.price);
    setProducts(products.slice());
  }

  const sortPriceLower = () => {
    products.sort((a,b) => b.price - a.price);
    setProducts(products.slice());
  }

  const sortRatingHigher = () => {
    products.sort((a,b) => a.rating.rate - b.rating.rate);
    setProducts(products.slice());
  }

  const sortRatingLower = () => {
    products.sort((a,b) => b.rating.rate - a.rating.rate);
    setProducts(products.slice());
  }

  const filterByCategory = (categoryClicked: string) => {
    const result = dbProducts.filter(product => product.category === categoryClicked);
    setProducts(result);
  }

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <CarouselGallery />
      <button onClick={reset}>Reset</button>
      <br />
      <button onClick={sortAZ}>Sorteeri A-Z</button>
      <button onClick={sortZA}>Sorteeri Z-A</button>
      <button onClick={sortPriceHigher}>Sorteeri hinna järgi kasvavalt</button>
      <button onClick={sortPriceLower}>Sorteeri hinna järgi kahanevalt</button>
      <button onClick={sortRatingHigher}>Sorteeri hinnangu järgi kasvavalt</button>
      <button onClick={sortRatingLower}>Sorteeri hinnangu järgi kahanevalt</button>
      <br />
      {categories
       .map(category => 
       <button key={category.name} onClick={() => filterByCategory(category.name)}>
        {category.name}
      </button>) }
      
      <div className= {styles.products}>
        {products.map(product =>
        <div key={product.id} className={styles.product}>
          <img className={styles.image} src={product.image} alt="" />
          <div className={styles.title}>{product.title}</div>
          <div className={styles.price}>{product.price}</div>
          <Button variant="contained" onClick={() => addToCart(product)}>Lisa ostukorvi</Button>
          <Link to={"/product/" + product.id}>
            <Button variant="outlined">Vt lähemalt</Button>
          </Link>
        </div>
      )}
      </div>
      

      <ToastContainer 
        position="bottom-right"
        autoClose={4000}
        theme="dark"
      />
    </div>
  )
}

export default HomePage