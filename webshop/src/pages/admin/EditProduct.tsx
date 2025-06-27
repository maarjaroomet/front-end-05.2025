import { useNavigate, useParams } from "react-router-dom"
// import productsFromFile from "../../data/products.json"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import type { Category } from "../../models/Category";
import type { Product } from "../../models/Product";

function EditProduct() {
  const {id} = useParams();
  // const foundProduct = productsFromFile.find(product => product.id === Number(id));
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const url = import.meta.env.VITE_CATEGORIES_DB_URL;
  const [loading, setLoading] = useState(true);
  const productsUrl = import.meta.env.VITE_PRODUCTS_DB_URL;;
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>({
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0
    }
  });

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setCategories(json || []);
      })
  }, [url]);

  useEffect(() => {
    fetch(productsUrl)
      .then(res => res.json())
      .then((json: Product[]) =>{ 
        const foundProduct : Product | undefined = json.find(product => product.id === Number(id));
        if(foundProduct !== undefined) {
          setProduct(foundProduct);
        }
        setDbProducts(json || []);
        setLoading(false);
      })
  }, [productsUrl, id]);

  const changeProduct = () => {
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

    if (product.category === undefined || product.category === "") {
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

    const index = dbProducts.findIndex(p => p.id === product.id);
    dbProducts[index] = product;
    fetch(productsUrl, {method: "PUT", body: JSON.stringify(dbProducts)})
          .then(res => res.json())
          .then(() => {
            navigate("/admin/maintain-products");
          }) 
  }

  if(loading) {
    return <div>Loading...</div>
  }

  if(product === undefined) {
    return <div>Toodet ei leitud</div>
  }

  return (
    <div>
      <div>{JSON.stringify(product)}</div>
      <label>Nimi</label> <br />
      <input onChange={(e) => setProduct({...product, "title": e.target.value})} defaultValue={product.title} type="text" /> <br />
      <label>Hind</label> <br />
      <input onChange={(e) => setProduct({...product, "price": Number(e.target.value)})} defaultValue={product.price} type="number" /> <br />
      <label>Kirjeldus</label> <br />
      <input onChange={(e) => setProduct({...product, "description": e.target.value})} defaultValue={product.description} type="text" /> <br />
      <label>Kategooria</label> <br />
      {/* <input onChange={(e) => setProduct({...product, "category": e.target.value})} defaultValue={foundProduct.category} type="text" /> <br /> */}
      <select onChange={(e) => setProduct({...product, "category": e.target.value})} defaultValue={product.category}>
        {categories.map(category => 
          <option key={category.name}>
            {category.name}
          </option>)}
      </select> <br />
      <label>Pilt</label> <br />
      <input onChange={(e) => setProduct({...product, "image": e.target.value})} defaultValue={product.image} type="text" /> <br />
      <label>Hinnang</label> <br />
      <input onChange={(e) => setProduct({...product, "rating": {...product.rating, "rate": Number(e.target.value)}})} defaultValue={product.rating.rate} type="number" /> <br />
      <label>Hinnangu andjate arv</label> <br />
      <input onChange={(e) => setProduct({...product, "rating": {...product.rating, "count": Number(e.target.value)}})} defaultValue={product.rating.count} type="number" /> <br />
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