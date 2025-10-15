import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../components/controller";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../components/dataContext';

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [user, setUser] = useState(null);
  const { orders, loading } = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const userPurchases = orders.filter(p => p.userId === user.uid);
      setPurchases(userPurchases);
    } else {
      setPurchases([]);
    }
  }, [orders, user]);
  
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#eddaba'}}>
      <View>
        <Text style={styles.title}>COMPRAS</Text>
        {loading ? (
          <Text style={styles.empty}>Carregando pedidos...</Text>
        ) : purchases.length === 0 ? (
          <Text style={styles.empty}>Você não realizou nenhuma compra ainda...</Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={purchases}
            keyExtractor={(item) => item.id.toString()} 
            renderItem={({item}) => (
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
              </View>
            )}
          />
        )}  
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10
  },
  productcontainer: {
    backgroundColor: "#a9b388",
    padding: 10,     
    borderRadius: 10,
    margin: 10,
  },
  productRow: {
    flexDirection: 'row', 
    alignItems: 'flex-start',
    marginTop: 10,
  },
  topinfo: {
    marginBottom: 1,
    borderBottomWidth: 2,  
    borderBottomColor: '#eddaba',  
    paddingBottom: 5,      
  },
  image:{
    height: 85,
    width: 85,
    borderRadius: 8,            
    marginRight: 10,            
  },
  name: {
    color: '#5f6f52',
    fontSize: 18,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 16
  },
  total: {
    fontSize: 14,
    textAlign: 'right'
  },
  empty: {
    textAlign: 'center',
    fontSize: 20,
    color: '#603d1a'
  }
});


