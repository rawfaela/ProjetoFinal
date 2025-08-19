import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from '../utils/controller';
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
            setCart(Array.isArray(data.products) ? data.products : []);
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
        console.log('erro ao salvar no firebase: ', error);
      }
    }
    saveCart(cart);
  }, [cart, user, loadingCart]);

  function addToCart(product) {
    const alreadyInCart = cart.some((item) => item.id === product.id);

    if (alreadyInCart) {
      return false;
    }

    setCart((previous) => [...previous, product]);
    return true;
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
