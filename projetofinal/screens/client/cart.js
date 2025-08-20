import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, StatusBar, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../utils/cartProvider';
import { useState } from 'react';

export default function Cart() { 
  const { cart } = useCart();
  const [counter, setCounter] = useState(1); // começa com 1 no carrinho
  const [isVisible, setIsVisible] = useState(true);

  function More() {
    setCounter(counter + 1);
  } 
  function Less() {
    if(counter > 1){
      setCounter(counter - 1);
    } else {
      // se já tiver 0 → remove do carrinho
      setIsVisible(false);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
          <Text style={styles.title}>CARRINHO</Text>
          {cart.length === 0 ? (
              <Text style={styles.empty}>Seu carrinho está vazio...</Text>
            ) : (
              <FlatList 
                showsVerticalScrollIndicator={false} 
                data={cart}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View style={styles.productcontainer}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.price}>{item.price}</Text>
                    </View>
                    <View style={styles.counterContainer}>
                        <TouchableOpacity style={styles.button} onPress={Less}>
                          <Text style={styles.txtbutton}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.counterText}>{counter}</Text>
                        <TouchableOpacity style={styles.button} onPress={More}>
                          <Text style={styles.txtbutton}>+</Text>
                        </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
              
            )}
          <View style={styles.addButtonContainer}>
          <TouchableOpacity 
            style={styles.addButton}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>Finalizar compra</Text>
          </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
  price: {
    fontSize: 19,
    color: '#3b3b1a'
  },
  total: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c2c2c'
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#6A7E4E',
    paddingTop: 10,
    paddingBottom: 10
  },
  addButton: {
    backgroundColor: '#6A7E4E',
    paddingVertical: 18,
    alignItems: 'center',
  },
  addButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  counterContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap: 10,
    marginRight: 5
  },
  button:{
    backgroundColor: '#5f6f52',
    height: 30,
    width: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtbutton:{
    textAlign:'center',
    color: 'white',
    fontSize: 18,
    fontWeight:'bold'
  },
  counterText:{
    fontSize:18,
    fontWeight:'bold',
    color:'#fff'
  }
});
