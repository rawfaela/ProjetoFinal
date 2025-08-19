import { createContext, useProvider, useState } from "react";

const CartProvider = createContext();

export function CartProvider({children}) {

    const [cart, setCart] = useState([]);

    function addProduct(produto) {
        setCart((anterior) => [...anterior, produto])
    }

    return (
        <CartProvider.Provider value = {{cart, addProduct}}>
            {children}
        </CartProvider.Provider>
    )
}

export function useCart() {
    return useProvider(CartProvider);
}