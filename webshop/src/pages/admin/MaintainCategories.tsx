import { useEffect, useRef, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { type Category } from "../../models/Category";

function MaintainCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const url = import.meta.env.VITE_CATEGORIES_DB_URL;
  const categoryRef = useRef<HTMLInputElement>(null);

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
    categories.push({name: categoryRef.current.value});
    fetch(url, {method: "PUT", body: JSON.stringify(categories)})
      .then(res => res.json())
      .then(json => {
        setCategories(json || []);
        if(categoryRef.current === null) {
          return;
        }
        categoryRef.current.value = "";
      })
  }

  const deleteCategory = (index: number) => {
    categories.splice(index, 1);
    fetch(url, {method: "PUT", body: JSON.stringify(categories)})
      .then(res => res.json())
      .then(json => {
        setCategories(json || []);
        toast.success("Kategooria kustutatud");
      })
  }

  return (
    <div>
      <label>Ketegooria</label> <br />
      <input ref={categoryRef} type="text" /> <br />
      <button onClick={add}>Sisesta</button> <br />
      {categories.map((category, index) => 
        <div key={category.name}>
          {category.name}
          <button onClick={() => deleteCategory(index)}>x</button>
        </div>)}

        <ToastContainer 
          position="bottom-right"
          autoClose={4000}
          theme="dark"
        />
    </div>

  )
}

export default MaintainCategories