import { ToastContainer, toast } from 'react-toastify';
// import productsFromFile from "../../data/products.json"
import { useEffect, useState } from 'react';

function AddProduct() {
  const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const categoriesUrl = import.meta.env.VITE_CATEGORIES_DB_URL;
    const [loading, setLoading] = useState(true);
    const productsUrl = import.meta.env.VITE_PRODUCTS_DB_URL;
    const [dbProducts, setDbProducts] = useState([]);

    
    useEffect(() => {
      fetch(productsUrl)
        .then(res => res.json())
        .then(json =>{ 
          setDbProducts(json || []);
          setLoading(false);
        })
    }, [productsUrl]);
  
    useEffect(() => {
      fetch(categoriesUrl)
        .then(res => res.json())
        .then(json => {
          setCategories(json || []);
          setLoading(false);
        })
    }, [categoriesUrl]);

  const addProduct = () => {

    if (product.id === undefined || product.id === "") {
      toast.error("ID puudu!");
      return;
    }

    if (product.title === undefined || product.title === "") {
      toast.error("Nimi puudu!");
      return;
    }

    if (product.price === undefined || product.price === "") {
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

    if (product.category === undefined || product.category === "") {
      toast.error("Kategooria puudu!");
      return;
    }

    if (product.rating.rate === undefined || product.rating.rate === "") {
      toast.error("Hinnang puudu");
      return;
    }

    if (product.rating.count === undefined || product.rating.count === "") {
      toast.error("Hinnangu andjate arv puudu");
      return;
    }

    
    dbProducts.push(product);
    fetch(productsUrl, {method: "PUT", body: JSON.stringify(dbProducts)})
      .then(res => res.json())
      .then(() => {
        toast.success("Toode lisatud: " + product.title);
      })
    
  }

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>{JSON.stringify(product)}</div>
      <label>Toote ID</label> <br />
      <input onChange={(e) => setProduct({...product, "id":e.target.value})} type="number" /> <br />
      <label>Toote nimi</label> <br />
      <input onChange={(e) => setProduct({...product, "title":e.target.value})} type="text" /> <br />
      <label>Toote hind</label> <br />
      <input onChange={(e) => setProduct({...product, "price":e.target.value})} type="number" /> <br />
      <label>Toote kirjeldus</label> <br />
      <input onChange={(e) => setProduct({...product, "description":e.target.value})} type="text" /> <br />
      <label>Toote kategooria</label> <br />
      <select onChange={(e) => setProduct({...product, "category": e.target.value})} defaultValue={""}>
        <option disabled value ="">Vali kategooria!</option>
        {categories.map(category => 
          <option key={category.name}>
            {category.name}
          </option>)}
      </select> <br />
      {/* <input onChange={(e) => setProduct({...product, "category":e.target.value})} type="text" /> <br /> */}
      <label>Toote pilt</label> <br />
      <input onChange={(e) => setProduct({...product, "image":e.target.value})} type="text" /> <br />
      <label>Toote hinnang</label> <br />
      <input onChange={(e) => setProduct({...product, "rating": {...product.rating, "rate": e.target.value}})} type="number" /> <br />
      <label>Toote hinnangute andjate arv</label> <br />
      <input onChange={(e) => setProduct({...product, "rating": {...product.rating, "count": e.target.value}})} type="number" /> <br />
      <button onClick={addProduct}>Lisa</button> <br />

      <ToastContainer 
        position="bottom-right"
        autoClose={4000}
        theme="dark"
      />
    </div>
  )
}

export default AddProduct