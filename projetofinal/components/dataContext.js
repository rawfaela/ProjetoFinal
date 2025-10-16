import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "./controller";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]); 
  const [orders, setOrders] = useState([]); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user) {
        const unsubOrders = onSnapshot(collection(db, "purchases"), (snapshot) => {
          const allOrders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate
              ? doc.data().timestamp.toDate()
              : new Date(),
          }));
          allOrders.sort((a, b) => b.timestamp - a.timestamp);
          setOrders(allOrders);

          const userPurchases = allOrders.filter(p => p.userId === user.uid);
          setPurchases(userPurchases);
          setLoading(false);
        });

        const unsubProducts = onSnapshot(collection(db, "products"), (snapshot) => {
          const allProducts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(allProducts);
        });

        return () => {
          unsubOrders();
          unsubProducts();
        };
      } else {
        setPurchases([]);
        setOrders([]);
        setProducts([]);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <DataContext.Provider value={{ user, purchases, orders, products, loading }}>
      {children}
    </DataContext.Provider>
  );
};