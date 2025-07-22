import { CartProduct } from "../models/CartProduct";

export const calculateCartSum = (products: CartProduct[]) => {
    return products.reduce((sum, cp) => sum + Number(cp.product.price * cp.quantity), 0);
}