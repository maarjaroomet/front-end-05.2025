import { useEffect, useState } from "react";
import { Product } from "../models/Product";

function useFetchProducts() {
  const [items, setProducts] = useState<Product[]>([]);
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const productsUrl = import.meta.env.VITE_PRODUCTS_DB_URL;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        fetch(productsUrl)
          .then(res => res.json())
          .then(json =>{ 
            setProducts(json || []);
            setDbProducts(json || []);
            setLoading(false);
          })
      }, [productsUrl]);

  return {items, dbProducts, loading};
}

export default useFetchProducts