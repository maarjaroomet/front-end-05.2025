import { useParams } from "react-router-dom";
import productsFromFile from "../../data/products.json";

function SingleProduct() {
  const {index} = useParams();
  const foundProduct = productsFromFile[index];

  if(foundProduct === undefined) {
    return <div>Toodet ei leitud</div>
  }
  return (
    <div>
      <div>{foundProduct.title}</div>
      <div>{foundProduct.price}</div>
      <div>{foundProduct.description} </div>
      <div>{foundProduct.category} </div>
      <div>{foundProduct.rating.rate} </div>
      <div>{foundProduct.rating.count} </div>
      <img src={foundProduct.image} alt="" />
    </div>
  )
}

export default SingleProduct