import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../components/controller";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';

export default function Purchases(){
  const [purchases, setPurchases] = useState([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => { 
      setUser (user);
      
      if (user) {
        setLoadingPurchases(true); 
        
        try {
          const purchasesCollection = collection(db, 'purchases', user .uid, 'userPurchases');
          const querySnapshot = await getDocs(purchasesCollection); 

          const purchasesData = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            purchasesData.push({
              id: doc.id, 
              ...data,
              timestamp: data.timestamp ? data.timestamp.toDate() : new Date(), 
            });
          });

          purchasesData.sort((a, b) => b.timestamp - a.timestamp);
          
          setPurchases(purchasesData);
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

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#eddaba'}}>
      <View style={styles.container}>
        <Text style={styles.title}>COMPRAS</Text>
        {purchases.length === 0 ? (
          <Text style={styles.empty}>Você não realizou nenhuma compra ainda...</Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={purchases}
            keyExtractor={(item) => item.id || Math.random().toString()} 
            renderItem={({item}) => (
              <TouchableOpacity style={styles.productcontainer}>
                <Image
                  source={{ uri: item.items[0].image }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>
                    {item.items[0].name}
                    {item.items.length > 1 && (
                      <Text style={{ fontStyle: 'italic', color: '#545753ff' }}> & outros</Text>
                    )}
                  </Text>
                  <Text style={styles.data}>Total: R$ {Number(item.total).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                  <Text style={styles.data}>Data: {item.timestamp.toLocaleDateString('pt-BR')}</Text>
                  <Text style={styles.data}>Situação: 
                    <Text style={[
                      styles.data,
                      {
                        color:
                          item.situation === 'A caminho' ? '#f5c529ff' 
                            : item.situation === 'Cancelado' ? '#c0392b' 
                            : item.situation === 'Entregue' ? '#119505ff' 
                            : item.situation === 'Em análise' ? '#bf6007ff'
                            : '#000',  
                      },
                    ]}> {item.situation}</Text>
                  </Text> 
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10
  },
  productcontainer: {
    backgroundColor: "#a9b388",
    flex: 1,
    flexDirection: 'row',      
    alignItems: 'center',      
    padding: 10,     
    borderRadius: 10,           
    margin: 10,                 
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



  empty: {
    textAlign: 'center',
    fontSize: 20,
    color: '#603d1a'
  }
});


