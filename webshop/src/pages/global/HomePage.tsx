import {useEffect, useState } from "react"
// import productsFromFile from "../../data/products.json"
import { ToastContainer } from 'react-toastify';
import CarouselGallery from "../../components/home/CarouselGallery";
import type { Product as ProductModel } from "../../models/Product";
import styles from "../../css/HomePage.module.css";
import SortButtons from "../../components/home/SortButtons";
import FilterButtons from "../../components/home/FilterButtons";
import Product from "../../components/home/Product";
import useFetchProducts from "../../hooks/useFetchProducts";

function HomePage() {
  const [products, setProducts] = useState<ProductModel[]>([]);
  // const [dbProducts, setDbProducts] = useState<ProductModel[]>([]);
  // const productsUrl = import.meta.env.VITE_PRODUCTS_DB_URL;
  // const [loading, setLoading] = useState(true);
  const {items, dbProducts, loading} = useFetchProducts();

  useEffect(() => {
    setProducts(items)
  }, [items]);
  // useEffect(() => {
  //   fetch(productsUrl)
  //     .then(res => res.json())
  //     .then(json =>{ 
  //       setProducts(json || []);
  //       setDbProducts(json || []);
  //       setLoading(false);
  //     })
  // }, [productsUrl]);

  const reset = () => {
      setProducts(dbProducts.slice());
  }

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <CarouselGallery />
      <button onClick={reset}>Reset</button>
      <br />
      <SortButtons products={products} setProducts={setProducts} />
      <br />
      <FilterButtons databaseProducts={dbProducts} setProducts={setProducts}/>
      
      <div className= {styles.products}>
        {products.map(product =>
          <Product key={product.id} product={product} />
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