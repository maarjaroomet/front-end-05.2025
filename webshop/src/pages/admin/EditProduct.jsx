import { useNavigate, useParams } from "react-router-dom"
import productsFromFile from "../../data/products.json"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

function EditProduct() {
  const {index} = useParams();
  const foundProduct = productsFromFile[index];
  const [product, setProduct] = useState(foundProduct);
  const navigate = useNavigate();

  const changeProduct = () => {
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

    productsFromFile[index] = product;
    navigate("/admin/maintain-products");
  }

  if(foundProduct === undefined) {
    return <div>Toodet ei leitud</div>
  }

  return (
    <div>
      <div>{JSON.stringify(product)}</div>
      <label>Nimi</label> <br />
      <input onChange={(e) => setProduct({...product, "title": e.target.value})} defaultValue={foundProduct.title} type="text" /> <br />
      <label>Hind</label> <br />
      <input onChange={(e) => setProduct({...product, "price": e.target.value})} defaultValue={foundProduct.price} type="number" /> <br />
      <label>Kirjeldus</label> <br />
      <input onChange={(e) => setProduct({...product, "description": e.target.value})} defaultValue={foundProduct.description} type="text" /> <br />
      <label>Kategooria</label> <br />
      <input onChange={(e) => setProduct({...product, "category": e.target.value})} defaultValue={foundProduct.category} type="text" /> <br />
      <label>Pilt</label> <br />
      <input onChange={(e) => setProduct({...product, "image": e.target.value})} defaultValue={foundProduct.image} type="text" /> <br />
      <label>Hinnang</label> <br />
      <input onChange={(e) => setProduct({...product, "rating": {...product.rating, "rate": e.target.value}})} defaultValue={foundProduct.rating.rate} type="number" /> <br />
      <label>Hinnangu andjate arv</label> <br />
      <input onChange={(e) => setProduct({...product, "rating": {...product.rating, "count": e.target.value}})} defaultValue={foundProduct.rating.count} type="number" /> <br />
      <button onClick={changeProduct}>Muuda</button>

      <ToastContainer 
        position="bottom-right"
        autoClose={4000}
        theme="dark"
      />
    </div>
  )
}

export default EditProduct