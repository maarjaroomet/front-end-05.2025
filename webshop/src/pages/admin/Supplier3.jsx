import { useEffect } from "react";
import { useState } from "react"

function Supplier3() {
  // https://fakestoreapi.com/products
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("react");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // läheb uuesti käima siis kui väline muutuja kandilistes sulgudes, nt search, muutub
  useEffect(() => {
      fetch(`https://api.itbook.store/1.0/search/${search}?page=${page}`)
          .then(res => res.json())
          .then(json => {
            setProducts(json.books);
            setLoading(false);
            setTotalProducts(json.total);
        })
  }, [search, page]);

  const searchFromProducts = (searchValue) => {
    if(searchValue.length < 3) {
        return;
    }
    setSearch(searchValue);
  }

  if(loading) {
      return <div>Loading...</div>
  }
 
    
  return (
    <div>
        <label>Search books</label>
        <input onChange={(e) => searchFromProducts(e.target.value)} type="text" />
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Toote nimi</th>
                    <th>Toote ostuhind</th>
                    <th>Toote müügihind</th>
                    <th>Toote kirjeldus</th>
                    <th>Toote pilt</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => 
                <tr key={product.isbn13}>
                    <td>{product.isbn13}</td>
                    <td>{product.title}</td>
                    <td>{product.price.replace("$", "")}</td>
                    <td>{(product.price.replace("$", "") * 1.2).toFixed(2)}</td>
                    <td>{product.subtitle}</td>
                    <td><img style={{width: "50px"}} src={product.image} alt="" /></td>
                </tr>)}
            </tbody>
        </table>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Eelmine</button>
        <span>{page}</span>
        <button disabled={page === Math.ceil(totalProducts/10)} onClick={() => setPage(page + 1)}>Järgmine</button>
    </div>
  )
}

export default Supplier3