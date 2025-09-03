import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; // biblioteca de ícones

export default function Cart({ navigation }) { 
  const [quantity, setQuantity] = useState(1);

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#eddaba'}}>
      <View style={styles.container}>
        <Text style={styles.title}>CARRINHO</Text>

        {/* Produto */}
        <View style={styles.productcontainer}>
          <Image
            source={{ uri:'https://www.nutrire.ind.br/images/f69cb32b09206b60746c751f7d6f7b96.png' }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Gatinho fofo</Text>
            <Text style={styles.price}>R$30,99</Text>
          </View>

          {/* Área de ações */}
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => setQuantity(quantity - 1)} disabled={quantity === 1}>
              <Ionicons name="remove-circle" size={28} color={quantity === 1 ? "#ccc" : "#3b3b1a"} />
            </TouchableOpacity>
            <Text style={styles.qty}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <Ionicons name="add-circle" size={28} color="#3b3b1a" />
            </TouchableOpacity>

            {/* Botão excluir */}
            <TouchableOpacity onPress={() => alert("Produto removido!")}>
              <Ionicons name="trash" size={28} color="#b22222" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão Finalizar compra */}
        <View style={styles.addButtonContainer}>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('')}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>Finalizar compra</Text>
          </TouchableOpacity>
        </View>

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
    height: '15%',
    flexDirection: 'row',      
    alignItems: 'center',      
    paddingHorizontal: 10,     
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
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  qty: {
    fontSize: 18,
    marginHorizontal: 6,
    fontWeight: 'bold',
    color: '#3b3b1a'
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
  }
});
