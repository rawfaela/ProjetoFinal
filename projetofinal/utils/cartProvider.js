import { createContext, useContext, useProvider, useState } from "react";

const CartContext = createContext();

export function CartProvider({children}) {

    const [cart, setCart] = useState([]);

    function addProduct(product) {
        setCart((previous) => [...previous, product])
    }

    return (
        <CartContext.Provider value = {{cart, addProduct}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext);
}