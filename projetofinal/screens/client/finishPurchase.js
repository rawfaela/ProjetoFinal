import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function FinishPurchase(item, { navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eddaba' }}>
      <View style={styles.container}>        
        <TouchableOpacity style={styles.addressContainer}>
          <View style={{ flex: 1 }}>
            <View style={styles.row}>
              <MaterialCommunityIcons 
                name="map-marker" 
                size={20} 
                color="black" 
                style={{ marginRight: 5 }}/>
              <Text style={styles.name}>Nome pessoa</Text>
              <Text style={styles.phone}>(48) 91234-5678</Text>
            </View>
            <Text style={styles.address}>Rua tal, 123</Text>
            <Text style={styles.address}>Cidade, Estado, CEP</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.bottomBar}>
          <View style={styles.total}>
            <Text style={styles.totalText}>Total: R$20,99</Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
            style={{flex:1, justifyContent: 'center', alignItems:'center'}} 
              onPress={() => navigation.navigate("Finalizar")}>
              <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addressContainer: {
    backgroundColor: "#d9b898", 
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    margin: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8
  },
  phone: {
    fontSize: 14,
    color: '#000',
  },
  address: {
    fontSize: 14,
    color: '#000',
    marginLeft: 25,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#a9b388",
    height: 50,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    backgroundColor: "#6A7E4E",
    flex: 1,
    
  },
  buyButtonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
  total: {
    flex: 1,
    alignItems: 'center',
  }
});
