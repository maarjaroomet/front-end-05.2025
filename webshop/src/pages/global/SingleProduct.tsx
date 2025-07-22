import { useParams } from "react-router-dom";
// import productsFromFile from "../../data/products.json";
import { useEffect, useState } from "react";
import { Product } from "../../models/Product";

function SingleProduct() {
  const {id} = useParams();
  //const foundProduct = productsFromFile[index]; 
  const productsUrl = import.meta.env.VITE_PRODUCTS_DB_URL;;
  //const [dbProducts, setDbProducts] = useState<Product[]>([]);
  //const foundProduct = dbProducts.find(product => product.id === Number(id));
  const [foundProduct, setFoundProduct] = useState<Product>(new Product());
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetch(productsUrl + "/" + id)
      .then(res => res.json())
      .then(json =>{ 
        //setDbProducts(json || []);
        setFoundProduct(json);
        setLoading(false);
      })
  }, [productsUrl]);

  if(foundProduct === undefined) {
    return <div>Toodet ei leitud</div>
  }

  if(loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div>{foundProduct.title}</div>
      <div>{foundProduct.price}</div>
      <div>{foundProduct.description} </div>
      <div>{foundProduct.category.name} </div>
      <div>{foundProduct.rating.rate} </div>
      <div>{foundProduct.rating.count} </div>
      <img src={foundProduct.image} alt="" />
    </div>
  )
}

export default SingleProduct