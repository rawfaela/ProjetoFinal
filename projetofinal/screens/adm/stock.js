import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Platform, Keyboard, TouchableWithoutFeedback, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../../components/controller';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Stock() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener em tempo real do Firebase
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const loadedProducts = [];
        snapshot.forEach((doc) => {
          loadedProducts.push({
            id: doc.id,
            ...doc.data(),
          });
          // Inicializa quantidade com o valor do banco
          setQuantities(prev => ({
            ...prev,
            [doc.id]: doc.data().quantity || 0
          }));
        });
        setProducts(loadedProducts);
        setLoading(false);
      },
      (error) => {
        console.error("Erro ao buscar produtos: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const increase = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const decrease = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: prev[productId] > 0 ? prev[productId] - 1 : 0
    }));
  };

  const handleChange = (productId, text) => {
    const num = parseInt(text, 10);
    if (!isNaN(num) && num >= 0) {
      setQuantities(prev => ({
        ...prev,
        [productId]: num
      }));
    } else if (text === "") {
      setQuantities(prev => ({
        ...prev,
        [productId]: 0
      }));
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productcontainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>R${item.price?.toFixed(2)}</Text>
      </View>
      <View style={styles.counterContainer}>
        <TouchableOpacity 
          style={[styles.button, { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }]} 
          onPress={() => decrease(item.id)}
        >
          <Text style={styles.txtbutton}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.counterInput}
          keyboardType="numeric"
          value={(quantities[item.id] || 0).toString()}
          onChangeText={(text) => handleChange(item.id, text)}
        />
        <TouchableOpacity 
          style={[styles.button, { borderTopRightRadius: 8, borderBottomRightRadius: 8 }]} 
          onPress={() => increase(item.id)}
        >
          <Text style={styles.txtbutton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#eddaba', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6a7e4e" />
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#eddaba' }}>
        <View style={styles.container}>
          <Text style={styles.title}>ESTOQUE</Text>
          {products.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum produto adicionado ainda</Text>
            </View>
          ) : (
            <FlatList
              data={products}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              scrollEnabled={true}
            />
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    backgroundColor: 'white',
    height: 40,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtbutton: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  },
  counterInput: {
    backgroundColor: 'white',
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