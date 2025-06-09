import { useState } from "react";
import productsFromFile from "../../data/products.json";
import {Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function MaintainProducts() {
    const [products, setProducts] = useState(productsFromFile.slice());
    
      const deleteProduct = (index) => {
        productsFromFile.splice(index,1);
        setProducts(productsFromFile.slice());
        toast.success("Toode kustutatud");
  }
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Index</th>
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
                {products.map((product, index) => 
                <tr key={product.id}>
                    <td>{index}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.category}</td>
                    <td><img style={{width: "50px"}} src={product.image} alt="" /></td>
                    <td>{product.rating.rate}</td>
                    <td>{product.rating.count}</td>
                    <td><button onClick={() => deleteProduct(index)}>x</button></td>
                    <td><Link to={"/admin/edit-product/" + index}><button>Muuda</button></Link></td>
                </tr>)}
            </tbody>
        </table>

        <ToastContainer 
            position="bottom-right"
            autoClose={4000}
            theme="dark"
        />
    </div>
  )
}

export default MaintainProducts