import type { Product } from "../../models/Product";

interface SortButtonsInterface {
    products: Product[], 
    setProducts: (product: Product[]) => void
}

function SortButtons({products, setProducts} : SortButtonsInterface) {

  const sortAZ = () => {
    products.sort((a,b) => a.title.localeCompare(b.title));
    setProducts(products.slice());
  }

  const sortZA = () => {
    products.sort((a,b) => b.title.localeCompare(a.title));
    setProducts(products.slice());
  }

  const sortPriceHigher = () => {
    products.sort((a,b) => a.price - b.price);
    setProducts(products.slice());
  }

  const sortPriceLower = () => {
    products.sort((a,b) => b.price - a.price);
    setProducts(products.slice());
  }

  const sortRatingHigher = () => {
    products.sort((a,b) => a.rating.rate - b.rating.rate);
    setProducts(products.slice());
  }

  const sortRatingLower = () => {
    products.sort((a,b) => b.rating.rate - a.rating.rate);
    setProducts(products.slice());
  }
  return (
    <div>
        <button onClick={sortAZ}>Sorteeri A-Z</button>
              <button onClick={sortZA}>Sorteeri Z-A</button>
              <button onClick={sortPriceHigher}>Sorteeri hinna järgi kasvavalt</button>
              <button onClick={sortPriceLower}>Sorteeri hinna järgi kahanevalt</button>
              <button onClick={sortRatingHigher}>Sorteeri hinnangu järgi kasvavalt</button>
              <button onClick={sortRatingLower}>Sorteeri hinnangu järgi kahanevalt</button>
    </div>
  )
}

export default SortButtons