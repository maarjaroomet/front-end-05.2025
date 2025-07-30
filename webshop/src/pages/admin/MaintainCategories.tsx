import { useEffect, useRef, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { type Category } from "../../models/Category";
import Button from 'react-bootstrap/Button';
import ConfirmationModal from "../../components/ConfirmationModal";

//let indexToBeDeleted = -1; üks lahendus, mis töötab, aga ei ole õige, sest kui mitu komponenti kasutavad, 
//siis see on neil ühine muutuja, igal komponendil peaksid olema oma muutujad

function MaintainCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const url = import.meta.env.VITE_CATEGORIES_DB_URL;
  const categoryRef = useRef<HTMLInputElement>(null);
  const idToBeDeleted = useRef(-1);
  const confirmationModalRef = useRef<any>(null);


  const handleShow = (index: number) => {
    idToBeDeleted.current = index;
    confirmationModalRef.current.setShow(true);
    console.log(idToBeDeleted);
  };

  //uef ja enter
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => setCategories(json || []))
  }, [url]);

  const add = () => {
    if(categoryRef.current === null) {
      return;
    }
    //categories.push({name: categoryRef.current.value});
    fetch(url, {
      method: "POST", 
      body: JSON.stringify({name: categoryRef.current.value}),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json => {
        setCategories(json || []);
        if(categoryRef.current === null) {
          return;
        }
        categoryRef.current.value = "";
        toast.success("Kategooria lisatud");
      })
  }

  const deleteCategory = () => {
    console.log(idToBeDeleted);
    //categories.splice(indexToBeDeleted.current, 1);
    fetch(url + "?id=" + idToBeDeleted.current, {
      method: "DELETE",
      headers: {"Authorization": "Bearer" + sessionStorage.getItem("token")}
    })
      .then(res => res.json())
      .then(json => {
        setCategories(json || []);
        toast.success("Kategooria kustutatud");
        confirmationModalRef.current.setShow(false);
      })
    //setCategories(categories.slice());
  }

  return (
    <div>
      <label>Ketegooria</label> <br />
      <input ref={categoryRef} type="text" /> <br />
      <button onClick={add}>Sisesta</button> <br />
      {categories.map((category) => 
        <div key={category.name}>
          {category.name}
          <Button variant="danger" onClick={() => handleShow(Number(category.id))}>x</Button>
          {/* <Button variant="danger" onClick={() => deleteCategory(index)}>x</Button> */}
        </div>)}

    <ToastContainer 
      position="bottom-right"
      autoClose={4000}
      theme="dark"
    />

    <ConfirmationModal 
      ref={confirmationModalRef} 
      onDelete={deleteCategory} 
      message="category"
    />

    </div>

  )
}

export default MaintainCategories