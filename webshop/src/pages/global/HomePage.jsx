import { useState } from "react"
import productsFromFile from "../../data/products.json"
import {Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function HomePage() {
  const [products, setProducts] = useState(productsFromFile);

  const addToCart = (product) => {
        const cartLS = JSON.parse(localStorage.getItem("cart")) || [];
        cartLS.push(product);
        localStorage.setItem("cart", JSON.stringify(cartLS));
        toast.success(product.title + " lisatud ostukorvi");
    }

  const reset = () => {
          setProducts(productsFromFile.slice());
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


  return (
    <div>
      <button onClick={reset}>Reset</button>
        <br />
        <button onClick={sortAZ}>Sorteeri A-Z</button>
        <button onClick={sortZA}>Sorteeri Z-A</button>
        <button onClick={sortPriceHigher}>Sorteeri hinna järgi kasvavalt</button>
        <button onClick={sortPriceLower}>Sorteeri hinna järgi kahanevalt</button>
        <button onClick={sortRatingHigher}>Sorteeri hinnangu järgi kasvavalt</button>
        <button onClick={sortRatingLower}>Sorteeri hinnangu järgi kahanevalt</button>

      {products.map(product =>
        <div key={product.id}>
            <img style={{width: "100px"}} src={product.image} alt="" />
            <div>{product.title}</div>
            <div>{product.price}</div>
            <button onClick={() => addToCart(product)}>Lisa ostukorvi</button>
            <Link to={"/product/" + product.id}>
              <button>Vt lähemalt</button>
            </Link>
        </div>
      )}

      <ToastContainer 
        position="bottom-right"
        autoClose={4000}
        theme="dark"
      />
    </div>
  )
}

export default HomePage