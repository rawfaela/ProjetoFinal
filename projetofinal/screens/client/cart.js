import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../components/cartProvider';
import { Ionicons } from '@expo/vector-icons';

export default function Cart({navigation}) { 
const { cart, increase, decrease, remove } = useCart();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1, backgroundColor: '#eddaba'}}>
        <View style={styles.container}>
          <Text style={styles.title}>CARRINHO</Text>
          {cart.length === 0 ? (
            <Text style={styles.empty}>Seu carrinho está vazio...</Text>
          ) : (
            <FlatList 
              contentContainerStyle={{ paddingBottom: 70 }}
              showsVerticalScrollIndicator={false} 
              data={cart}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => (
                <View style={styles.productcontainer}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>
                      R${Number(item.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </View>
                  <View style={styles.counterContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => decrease(item)}>
                    <Text style={styles.txtbutton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.button} onPress={() => increase(item)}>
                    <Text style={styles.txtbutton}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => remove(item)}>
                    <Ionicons name="trash" size={24} color="#b22222" />
                  </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}
          {cart.length > 0 && (
            <View style={styles.addButtonContainer}>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => navigation.navigate('FinishPurchase', {cart})} 
              > 
                <Text style={styles.addButtonText}>Finalizar compra</Text>
              </TouchableOpacity> 
            </View>
          )}
          
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
    paddingBottom: 10,
    zIndex: 10,
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
    gap: 5,
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
    color:'#fff',
  },
  empty: {
    textAlign: 'center',
    fontSize: 20,
    color: '#603d1a'
  }
});
