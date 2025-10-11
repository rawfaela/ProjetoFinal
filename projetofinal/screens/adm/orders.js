import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../components/controller";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';

export default function Orders() {
  const [purchases, setPurchases] = useState([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        setLoadingPurchases(true);
        try {
          // 🔹 Busca todas as compras (ADM vê todas)
          const snapshot = await getDocs(collection(db, "purchases"));
          const allPurchases = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate ? doc.data().timestamp.toDate() : new Date()
          }));

          allPurchases.sort((a, b) => b.timestamp - a.timestamp);
          setPurchases(allPurchases);
        } catch (error) {
          console.log('Erro ao carregar compras', error);
          setPurchases([]);
        } finally {
          setLoadingPurchases(false);
        }
      } else {
        setPurchases([]);
        setLoadingPurchases(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Aceitar pedido
  const accept = async (item) => {
    try {
      await updateDoc(doc(db, "purchases", item.id), { situation: "Confirmado" });
      setPurchases(prev => prev.map(p => p.id === item.id ? { ...p, situation: "Confirmado" } : p));
    } catch (error) {
      console.log("Erro ao aceitar pedido:", error);
    }
  };

  // ❌ Cancelar pedido
  const deny = async (item) => {
    try {
      await updateDoc(doc(db, "purchases", item.id), { situation: "Cancelado" });
      setPurchases(prev => prev.map(p => p.id === item.id ? { ...p, situation: "Cancelado" } : p));
    } catch (error) {
      console.log("Erro ao negar pedido:", error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#eddaba' }}>
        <View style={styles.container}>
          <Text style={styles.title}>PEDIDOS</Text>

          {loadingPurchases ? (
            <Text style={styles.empty}>Carregando pedidos...</Text>
          ) : purchases.length === 0 ? (
            <Text style={styles.empty}>Nenhum pedido realizado...</Text>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={purchases}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.productcontainer}>
                  <View style={styles.topinfo}>
                    <Text style={styles.data}>
                      Situação:
                      <Text style={[
                        styles.data,
                        {
                          color:
                            item.situation === 'Confirmado' ? '#f5c529'
                              : item.situation === 'Cancelado' ? '#c0392b'
                              : item.situation === 'Entregue' ? '#119505'
                              : item.situation === 'Em análise' ? '#bf6007'
                              : '#000',
                        },
                      ]}> {item.situation}</Text>
                    </Text>
                    <Text style={styles.data}>
                      Data: {item.timestamp.toLocaleDateString('pt-BR')}
                    </Text>
                  </View>

                  {/* 🔹 Nome e endereço do cliente */}
                  <Text style={styles.client}>Cliente: {item.address?.name || item.userEmail}</Text>
                  {item.deliveryMethod === 'Motoboy' && item.address && (
                    <>
                      <Text style={styles.client}>
                        Endereço: {item.address.street}, {item.address.number}, {item.address.neighborhood}
                      </Text>
                      <Text style={styles.client}>
                        {item.address.city} - {item.address.state}, CEP {item.address.cep}
                      </Text>
                      <Text style={styles.client}>Telefone: {item.address.phone}</Text>
                    </>
                  )}

                  <View>
                    {item.items && item.items.map((product, i) => (
                      <View key={i} style={styles.productRow}>
                        <Image
                          source={{ uri: product.image }}
                          style={styles.image}
                          resizeMode="cover"
                        />
                        <View style={{ flex: 1 }}>
                          <Text style={styles.name}>{product.name}</Text>
                          <Text style={styles.data}>Preço unitário: R$ {Number(product.price).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                          <Text style={styles.data}>Quantidade: {product.quantity}</Text>
                        </View>
                      </View>
                    ))}
                  </View>

                  <Text style={styles.total}>Método de entrega: {item.deliveryMethod}</Text>
                  <Text style={styles.total}>Total: R${Number(item.total).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>

                  {item.situation === 'Em análise' && (
                    <View style={styles.checkContainer}>
                      <TouchableOpacity onPress={() => accept(item)}>
                        <Ionicons name="checkmark-circle" size={35} color="#3b3b1a" />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => deny(item)}>
                        <Ionicons name="close-circle" size={35} color="#3b3b1a" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  productcontainer: {
    backgroundColor: "#a9b388",
    flexDirection: 'column',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  topinfo: { flexDirection: 'row', justifyContent: 'space-between' },
  data: { fontSize: 15 },
  client: { fontSize: 15, fontWeight: '500', color: '#2f2f2f' },
  productRow: { flexDirection: 'row', marginVertical: 5 },
  image: { height: 85, width: 85, borderRadius: 8, marginRight: 10 },
  name: { color: '#3b3b1a', fontSize: 19, fontWeight: 'bold' },
  total: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c2c2c',
  },
  checkContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  empty: {
    textAlign: 'center',
    fontSize: 20,
    color: '#603d1a',
  },
});
