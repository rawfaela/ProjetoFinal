import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, StatusBar, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../utils/cartProvider';

export default function Cart() { 
  const { cart } = useCart();

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
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>{item.price}</Text>
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
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  productcontainer: {
    backgroundColor: "#a9b388"
  },
  name: {
    color: 'white'
  },
  price: {
    color: 'white'
  },
  image:{
    
  }
});