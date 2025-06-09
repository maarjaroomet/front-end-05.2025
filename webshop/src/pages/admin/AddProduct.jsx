import { ToastContainer, toast } from 'react-toastify';
import productsFromFile from "../../data/products.json"
import { useState } from 'react';

function AddProduct() {
  const [product, setProduct] = useState({});

  const addProduct = () => {

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

    toast.success("Toode lisatud: " + product.title);
    productsFromFile.push(product);
    
  }
  return (
    <div>
      <div>{JSON.stringify(product)}</div>
      <label>Toote nimi</label> <br />
      <input onChange={(e) => setProduct({...product, "title":e.target.value})} type="text" /> <br />
      <label>Toote hind</label> <br />
      <input onChange={(e) => setProduct({...product, "price":e.target.value})} type="number" /> <br />
      <label>Toote kirjeldus</label> <br />
      <input onChange={(e) => setProduct({...product, "description":e.target.value})} type="text" /> <br />
      <label>Toote kategooria</label> <br />
      <input onChange={(e) => setProduct({...product, "category":e.target.value})} type="text" /> <br />
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