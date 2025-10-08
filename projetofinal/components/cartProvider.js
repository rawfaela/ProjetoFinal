import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from './controller';
import { doc, setDoc, getDoc } from "firebase/firestore";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoadingCart(true);
      
      if (user) {
        try {
          const docRef = doc(db, 'cart', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            const products = Array.isArray(data.products) 
              ? data.products.map(p => ({ ...p, quantity: p.quantity || 1 }))
              : [];
            setCart(products);
          } else {
            setCart([]);
          }
        } catch (error) {
          console.log('Erro no cart', error);
          setCart([]);
        }
      } else {
        setCart([]);
      }

      setLoadingCart(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function saveCart(lista) {
      if (!user || loadingCart) {
        return;
      }
      try {
        const docRef = doc(db, 'cart', user.uid);
        await setDoc(docRef, { products: lista });
      } catch (error) {
        console.log('Erro ao salvar no firebase: ', error);
      }
    }
    saveCart(cart);
  }, [cart, user, loadingCart]);

  function addToCart(product) {
    const alreadyInCart = cart.find((item) => item.id === product.id);

    if (alreadyInCart) {
      return false;
    } else {
      setCart((previous) => [...previous, { ...product, quantity: 1 }]);
      return true;
    }
  }

  const clearCart = () => {
    setCart([]);
  };

  function increase(item) {
    const updatedCart = cart.map((p) =>
      p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
    );
    setCart(updatedCart);
  }

  function decrease(item) {
    if (item.quantity > 1) {
      const updatedCart = cart.map((p) =>
        p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p
      );
      setCart(updatedCart);
    } else {
      const updatedCart = cart.filter((p) => p.id !== item.id);
      setCart(updatedCart);
    }
  }

  function remove(item){
    const updatedCart = cart.filter((p) => p.id !== item.id);
    setCart(updatedCart);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, increase, decrease, remove, clearCart, loadingCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
