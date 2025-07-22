import { useEffect, useRef, useState } from "react";
// import productsFromFile from "../../data/products.json";
import {Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import type { Product } from "../../models/Product";
import Table from 'react-bootstrap/Table';
import ConfirmationModal from "../../components/ConfirmationModal";
import useFetchProducts from "../../hooks/useFetchProducts";

function MaintainProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  //const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const productsUrl = import.meta.env.VITE_PRODUCTS_DB_URL;
  //const [loading, setLoading] = useState(true);
  const idToBeDeleted = useRef(-1);
  const confirmationModalRef = useRef<any>(null);
  const {items, dbProducts, loading} = useFetchProducts();

  useEffect(() => {
    setProducts(items);
  }, [items]);

  // useEffect(() => {
  //     fetch(productsUrl)
  //       .then(res => res.json())
  //       .then(json =>{ 
  //         setProducts(json || []);
  //         setDbProducts(json || []);
  //         setLoading(false);
  //       })
  //   }, [productsUrl]);

  const openModal = (productId: number) => {
    idToBeDeleted.current = productId;
    confirmationModalRef.current.setShow(true);
  }

  const deleteProduct = () => {
    // const index = dbProducts.findIndex(product => product.id === idToBeDeleted.current);
    // dbProducts.splice(index,1);
    //setProducts(dbProducts.slice());
    
    fetch(productsUrl + "?id=" + idToBeDeleted.current, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(json => {
        searchFromProcucts(json);
        toast.success("Toode kustutatud");
        confirmationModalRef.current.setShow(false);
    })
    
  }

  const searchFromProcucts = (dbProducts: Product[]) => {
    const searchInput = searchRef.current;
    if(searchInput === null) {
      return;
    }
    const result = dbProducts.filter(product => 
        product.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        product.description.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    setProducts(result);
  }

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
        <label>Otsi </label>
        <input onChange={() => searchFromProcucts(dbProducts)} ref={searchRef} type="text" />
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Toote nimi</th>
                    <th>Toote hind</th>
                    <th>Toote kirjeldus</th>
                    <th>Toote kategooria</th>
                    <th>Toote pilt</th>
                    <th>Toote hinnang</th>
                    <th>Hindajate arv</th>
                    <th>Kustuta</th>
                    <th>Muuda</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => 
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.category.name}</td>
                    <td><img style={{width: "50px"}} src={product.image} alt="" /></td>
                    <td>{product.rating.rate}</td>
                    <td>{product.rating.count}</td>
                    <td><button onClick={() => openModal(Number(product.id))}>x</button></td>
                    <td><Link to={"/admin/edit-product/" + product.id}><button>Muuda</button></Link></td>
                </tr>)}
            </tbody>
        </Table>

        <ConfirmationModal 
          ref={confirmationModalRef} 
          onDelete={deleteProduct}
          message="product"
        />

        <ToastContainer 
            position="bottom-right"
            autoClose={4000}
            theme="dark"
        />
    </div>
  )
}

export default MaintainProducts