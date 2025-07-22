import { useEffect } from "react";
import { useState } from "react"

// renderdamine --> esimest korda HTMLi väljakuvamine
// re-renderdamine --> setteri HTMLi uuendamine

function Supplier1() {
    // https://fakestoreapi.com/products
    const [products, setProducts] = useState<any[]>([]);

    // uef, seda tehakse ainult 1 korra (ei lähe korduvalt käima)
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(json => setProducts(json))
    }, []);

    if(products.length === 0) {
        return <div>Loading...</div>
    }
 
    
  return (
    <div>
        <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Toote nimi</th>
                            <th>Toote ostuhind</th>
                            <th>Toote müügihind</th>
                            <th>Toote kirjeldus</th>
                            <th>Toote kategooria</th>
                            <th>Toote pilt</th>
                            <th>Toote hinnang</th>
                            <th>Hindajate arv</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => 
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.price.toFixed(2)}</td>
                            <td>{(product.price * 1.2).toFixed(2)}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td><img style={{width: "50px"}} src={product.image} alt="" /></td>
                            <td>{product.rating.rate}</td>
                            <td>{product.rating.count}</td> 
                        </tr>)}
                    </tbody>
                </table>
    </div>
  )
}

export default Supplier1