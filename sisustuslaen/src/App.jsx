import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [sum, setSum] = useState(0);
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem("productsAdded")) || []);
  const productRef = useRef();
  const priceRef = useRef();

  const calculateSum = (productList) => {
    const total = productList.reduce((acc, curr) => acc + parseFloat(curr.price || 0), 0);
    setSum(total);
  }

  // const deleteProduct = (index) => {
  //   const updated = [...products];
  //   updated.splice(index, 1);
  //   setProducts(updated);
  //   localStorage.setItem("productsAdded", JSON.stringify(updated));
  //   calculateSum(updated);
  // }

  const deleteAllProducts = () => {
    setProducts([]);
    localStorage.setItem("productsAdded", JSON.stringify([]));
  }

  const addNewProduct = () => {
    const newProduct = {
      product: productRef.current.value,
      price: priceRef.current.value,
    };

    if (!newProduct.product || isNaN(newProduct.price)) {
      alert("Sisesta toote nimi ja korrektne hind");
      return;
    }

    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem("productsAdded", JSON.stringify(updated));
    calculateSum(updated);

    productRef.current.value = '';
    priceRef.current.value = '';
  }

  useEffect(() => {
    calculateSum(products);
  }, [products]);

  return (
    <>
      <div className="text-box">
        <img src="/img.png" alt="" className="decor-image" />
        <div className="text-content">
          <div className="bold"> Kas sinu diivan on oma aja ära elanud?</div>
          <div className="text">Oled väsinud segadusest, kus asjadel pole oma kohta. 
              Oled unistanud lausa täiesti uuest sisekujundusest, aga kõik tundub 
              korraga liiga kallis? LHV sisustuslaenuga saad oma unistused ellu
              viia juba täna.</div>
          <div className="bold-small">Loe lisa</div>
        </div>
      </div>

      <div className="text-box-list">
        <div className="text-content-list">
          <div className="header">Koosta soovinimekiri ja vaata oma uue sisustuse kuumakset</div>
          <div className="box-columns">
            <div className="box-left">
              <div className="text">
                <table>
                  <thead>
                    <tr>
                      <th>TOODE</th>
                      <th>HIND (€)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => 
                      <tr key={index}>
                        <td>{product.product}</td>
                        <td>{parseFloat(product.price).toFixed(2)}</td>
                        {/* <td><button onClick={() => deleteProduct(index)}>x</button></td> */}
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="input-grid">
                <div>
                  <input ref={productRef} type="text" placeholder="Toode" />
                  <div className="icon-with-label">
                    <button className="icon-button" onClick={addNewProduct}>
                      <img src="/plus.png" alt="Lisa toode" />
                    </button>
                    <span>Lisa toode</span>
                  </div>
                </div>
                <div>
                  <input ref={priceRef} type="number" placeholder="Hind" />
                  <div className="icon-with-label">
                    <button className="icon-button" onClick={deleteAllProducts}>
                      <img src="/trash.png" alt="Kustuta" />
                    </button>
                    <span>Kustuta</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-right">
              <div className="sum">{sum.toFixed(2)} €</div>
              <button className="button-loan">Taotle sisustuslaenu</button>
              <div className="text-underline">Tutvu tingimustega</div>
            </div>
          </div>
        </div>
      </div>


      <div className="contact">
        <div className="contact-section">
          <img src="/support.png" alt="" className="icon-original" />
          <div className="contact-text">
            <div className="bold">LHV Klienditugi</div>
            <div className="text">
              Kui sul tekib pangateenuse kasutamisel probleeme, saad klienditoe infotelefonilt abi ööpäev ringi.
            </div>
          </div>
        </div>

        <div className="contact-item">
          <img src="/call.png" alt="" />
          <div>6 800 400</div>
        </div>

        <div className="contact-item">
          <img src="/drafts.png" alt="" />
          <div>info@lhv.ee</div>
        </div>
      </div>
    </>
  )
}

export default App;