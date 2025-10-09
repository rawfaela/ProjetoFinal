import { Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

export default function OrderInfo({ route, navigation }) {
  const { order } = route.params;

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#eddaba'}}>
      <View style={styles.container}>
        <Text style={styles.title}>DETALHES DO PEDIDO</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={order.items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.productcontainer}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={{ flex: 1, flexDirection: 'row' }} >
                <View>
                  <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  />
                  <Text style={styles.price}>Preço: R${Number(item.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                  <Text style={styles.price}>Quantidade: {item.quantity}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>{item.description}</Text>
                </View>
              </View>
                
              
            </View>
          )}
        />
        

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
    alignItems: 'center',      
    padding: 10,     
    borderRadius: 10,           
    margin: 10,                 
  },
  image:{
    height: 120,
    width: 120,
    borderRadius: 8,            
    marginRight: 10,            
  },
  name: {
    color: '#5f6f52',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
});