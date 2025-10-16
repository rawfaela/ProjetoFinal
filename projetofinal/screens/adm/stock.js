import { useState, useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../../components/controller';
import { doc, updateDoc } from "firebase/firestore";
import { DataContext } from '../../components/dataContext';

export default function Stock() {
  const { products } = useContext(DataContext);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initialQuantities = {};
    products.forEach(p => {
      initialQuantities[p.id] = p.quantity ?? 0;
    });
    setQuantities(initialQuantities);
  }, [products]);

  const updateStock = async (productId, newQuantity) => {
    try {
      await updateDoc(doc(db, "products", productId), { quantity: newQuantity });
    } catch (error) {
      console.error("Erro ao atualizar estoque:", error);
    }
  };

  const increase = async (productId) => {
    const newQty = (quantities[productId] || 0) + 1;
    setQuantities(prev => ({ ...prev, [productId]: newQty }));
    await updateStock(productId, newQty);
  };

  const decrease = async (productId) => {
    const newQty = quantities[productId] > 0 ? quantities[productId] - 1 : 0;
    setQuantities(prev => ({ ...prev, [productId]: newQty }));
    await updateStock(productId, newQty);
  };

  const handleChange = (productId, text) => {
    const num = parseInt(text, 10);
    if (!isNaN(num) && num >= 0) {
      setQuantities(prev => ({ ...prev, [productId]: num }));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eddaba' }}>
      <View style={styles.container}>
        <Text style={styles.title}>ESTOQUE</Text>

        {products.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum produto adicionado ainda</Text>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.productcontainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.productInfo}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>R${item.price?.toFixed(2)}</Text>
                </View>
                <View style={styles.counterContainer}>
                  <TouchableOpacity style={[styles.button, { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }]}onPress={() => decrease(item.id)}>
                    <Text style={styles.txtbutton}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.counterInput}
                    keyboardType="numeric"
                    value={(quantities[item.id] ?? item.quantity ?? 0).toString()}
                    onChangeText={(text) => handleChange(item.id, text)}
                  />
                  <TouchableOpacity style={[styles.button, { borderTopRightRadius: 8, borderBottomRightRadius: 8 }]} onPress={() => increase(item.id)}>
                    <Text style={styles.txtbutton}>+</Text>
                  </TouchableOpacity>
                </View>
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
    backgroundColor: "#dbb795",
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 10,
  },
  image: {
    height: 85,
    width: 85,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    color: '#5f6f52',
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#3b3b1a',
    fontWeight: 'bold'
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#eddaba',
    height: 40,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',   
  },
  txtbutton: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  },
  counterInput: {
    backgroundColor: '#eddaba',
    width: 50,
    height: 40,
    textAlign: 'center',
    padding: 0,
    fontSize: 16,
    fontWeight: 'bold',
    ...(Platform.OS === 'android' ? { textAlignVertical: 'center' } : {})
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#5f6f52',
    fontWeight: 'bold'
  }
});