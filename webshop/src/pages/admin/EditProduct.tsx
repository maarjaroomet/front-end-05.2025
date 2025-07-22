import { useParams } from "react-router-dom"
import ProductForm from "../../components/forms/ProductForm";

function EditProduct() {
  const {id} = useParams();


  return (
    <div>
        <ProductForm id={Number(id)} />
    </div>
  )
}

export default EditProduct