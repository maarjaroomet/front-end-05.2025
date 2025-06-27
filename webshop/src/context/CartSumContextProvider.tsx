import { useState, type ReactNode } from "react"
import { CartSumContext } from "./CartSumContext"
import type { CartProduct } from "../models/CartProduct";

export const CartSumContextProvider = ({children}: {children: ReactNode}) => {
    const [cartSum, setCartSum] = useState(calculateCartSum());

    function calculateCartSum() {
        const products: CartProduct[] = JSON.parse(localStorage.getItem("cart") || "[]") ;
        const totalPrice = products.reduce((sum, cp) => sum + Number(cp.product.price * cp.quantity), 0);
        return totalPrice;
    }

    const empty = () => {
        setCartSum(0);
    }

    const add = (price: number) => {
        setCartSum(cartSum + price);
    }

    const minus = (price: number) => {
        setCartSum(cartSum - price);
    }

    return (
        <CartSumContext.Provider value={{cartSum, empty, add, minus}}>
            {children}
        </CartSumContext.Provider>
    )
}