import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';

export default function Cart() {  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CARRINHO</Text>
      <View style={styles.productcontainer}>
        <Image
          source={{ uri: '' }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.name}>Nome</Text>
        <Text style={styles.price}>Preço</Text>
      </View>
    </View>
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
  }
});