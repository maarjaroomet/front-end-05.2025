
import { useNavigate } from "react-router-dom"
// import productsFromFile from "../../data/products.json"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import type { Category } from "../../models/Category";
import { Product } from "../../models/Product";

interface ProductFormInterface {
  id: number
}

function ProductForm(props: ProductFormInterface) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const url = import.meta.env.VITE_CATEGORIES_DB_URL;
  const [loading, setLoading] = useState(true);
  const productsUrl = import.meta.env.VITE_PRODUCTS_DB_URL;;
  //const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>(new Product());
  const [productNotFound, setProductNotFound] = useState(false);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setCategories(json || []);
      })
  }, [url]);

  useEffect(() => {
    if(props.id === -1) {
      return;
    }
    fetch(productsUrl + "/" + props.id)
      .then(res => res.json())
      .then(json =>{ 
        // if(props.id !== -1) {
        //   const foundProduct : Product | undefined = json.find(product => product.id === props.id);
        //   if(foundProduct === undefined) {
        //     setProductNotFound(true);           
        //   } else {
        //     setProduct(foundProduct);
        //   }
        // }
        setLoading(false);
        if(json.timestamp && json.status && json.error) {
            setProductNotFound(true);
            toast.error(json.error);
        } else {
            setProduct(json);
        }
      })
  }, [productsUrl, props.id]);

  const submit = () => {
    if (product.title === undefined || product.title === "") {
      toast.error("Nimi puudu!");
      return;
    }

    if (product.price === undefined || product.price === 0) {
      toast.error("Hind puudu!");
      return;
    }

    if (product.image === undefined || product.image === "") {
      toast.error("Pilt puudu!");
      return;
    }

    if (product.description === undefined || product.description === "") {
      toast.error("Kirjeldus puudu!");
      return;
    }

    if (product.category === undefined || product.category.id === 0) {
      toast.error("Kategooria puudu!");
      return;
    }

    if (product.rating.rate === undefined || product.rating.rate === 0) {
      toast.error("Hinnang puudu");
      return;
    }

    if (product.rating.count === undefined || product.rating.count === 0) {
      toast.error("Hinnangu andjate arv puudu");
      return;
    }


      
    fetch("http://localhost:8090/products", {
        method: props.id === -1 ? "POST" : "PUT", 
        body: JSON.stringify(product),
        headers: {"Content-Type": "application/json"}
      })
      .then(res => res.json())
      .then(json => {
          if(json.timestamp && json.status && json.error) {
            toast.error(json.error);
            return;
          }
          if(props.id === -1) {
            toast.success("Toode lisatud: " + product.title);
            setProduct(new Product());
          } else {
            navigate("/admin/maintain-products");
          }
        })
      }
    //if(props.id === -1)
    //  dbProducts.push(product);
    // } else {
    //   // const index = dbProducts.findIndex(p => p.id === product.id);
    //   // dbProducts[index] = product;
    // } 
  

  if(props.id !== -1 && loading) {
    return <div>Loading...</div>
  }

  if(productNotFound) {
    return <div>Toodet ei leitud</div>
  }

  return (
    <div>
      <div>{JSON.stringify(product)}</div>
      <label>Nimi</label> <br />
      <input onChange={(e) => setProduct({...product, "title": e.target.value})} value={product.title} type="text" /> <br />
      <label>Hind</label> <br />
      <input onChange={(e) => setProduct({...product, "price": Number(e.target.value)})} value={product.price === 0 ? "" : product.price} type="number" /> <br />
      <label>Kirjeldus</label> <br />
      <input onChange={(e) => setProduct({...product, "description": e.target.value})} value={product.description} type="text" /> <br />
      <label>Kategooria</label> <br />
      {/* <input onChange={(e) => setProduct({...product, "category": e.target.value})} defaultValue={foundProduct.category} type="text" /> <br /> */}
      <select onChange={(e) => setProduct({...product, "category": {id: Number(e.target.value)}})} value={product.category.id}>
        <option disabled value="0">Vali kategooria!</option>
        {categories.map(category => 
          <option key={category.name} value={category.id}>
            {category.name}
          </option>)}
      </select> <br />
      <label>Pilt</label> <br />
      <input onChange={(e) => setProduct({...product, "image": e.target.value})} value={product.image} type="text" /> <br />
      <label>Hinnang</label> <br />
      <input onChange={(e) => setProduct({...product, "rating": {...product.rating, "rate": Number(e.target.value)}})} value={product.rating.rate === 0 ? "" : product.rating.rate} type="number" /> <br />
      <label>Hinnangu andjate arv</label> <br />
      <input onChange={(e) => setProduct({...product, "rating": {...product.rating, "count": Number(e.target.value)}})} value={product.rating.count === 0 ? "" : product.rating.count} type="number" /> <br />
      <button onClick={submit}>{props.id === -1 ? "Lisa" : "Muuda"}</button>

      <ToastContainer 
        position="bottom-right"
        autoClose={4000}
        theme="dark"
      />
    </div>
  )
}

export default ProductForm