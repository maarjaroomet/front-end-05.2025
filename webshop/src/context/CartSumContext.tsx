import { createContext } from "react";

export const CartSumContext = createContext({
    cartSum: 0,
    empty: () => {},
    add: (nr: number) => {console.log(nr)},
    minus: (nr: number) => {console.log(nr)}
});

