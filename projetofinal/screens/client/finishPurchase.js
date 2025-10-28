import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNotification } from "../../components/notif";
import { collection, doc, getDoc, setDoc, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../components/controller";
import { useCart } from "../../components/cartProvider";

export default function FinishPurchase({navigation, route}) {
  const { showNotif } = useNotification();
  const { cart } = route.params;
  const { clearCart } = useCart();
  const baseTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const freight = selectedDelivery === 'Motoboy' ? 15 : 0;
  const displayTotal = baseTotal + freight;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (route.params?.selectedAddress) {
        setSelectedAddress(route.params.selectedAddress);
      }
    });

    return unsubscribe;
  }, [navigation, route.params]);

  const handlePurchase = async () => {
    if (selectedDelivery === 'Motoboy' && !selectedAddress) {
      showNotif('Por favor, selecione um endereço de entrega!', 'error');
      return;
    }
    if (!selectedDelivery) {
      showNotif('Por favor, selecione um método de entrega!', 'error');
      return;
    }

    const user = getAuth().currentUser ;
    if (!user) {
      showNotif('Usuário não autenticado. Faça login novamente.', 'error');
      return;
    }

    const ref = collection(db, "purchases");

    try {
      await addDoc(ref, {
        userId: user.uid,
        userEmail: user.email,
        items: cart,
        total: displayTotal,
        deliveryMethod: selectedDelivery,
        timestamp: new Date(),
        situation: 'Em análise',
        ...(selectedDelivery === 'Motoboy' && { address: selectedAddress }),
      });

      showNotif('Compra realizada com sucesso!', 'success');
      clearCart();
      navigation.navigate('TabsClient',{screen:'Home'});
    } catch (error) {
      showNotif('Erro ao registrar compra. Tente novamente.', 'error');
    }
  };

  useEffect(() => {
    const fetchSelectedAddress = async () => {
      const user = getAuth().currentUser ;
      if (!user) return;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.selectedAddressId) {
          const addrDoc = await getDoc(doc(db, "addresses", user.uid, "userAddresses", data.selectedAddressId));
          if (addrDoc.exists()) {
            setSelectedAddress({ id: addrDoc.id, ...addrDoc.data() });
          }
        }
      }
    };

    fetchSelectedAddress();
  }, []);

  const showAddressSection = selectedDelivery === 'Motoboy';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eddaba' }}>
      <View style={styles.container}>   
        <ScrollView>     
          {showAddressSection && (
            <TouchableOpacity
              style={styles.addressContainer}
              onPress={() => {
                navigation.navigate("AddressStack", {
                  screen: "Address",
                  params: {
                    onSelect: async (addr) => {
                      setSelectedAddress(addr);
                      const user = getAuth().currentUser ;
                      if (user) {
                        await setDoc(doc(db, "users", user.uid), {
                          selectedAddressId: addr.id,
                        }, { merge: true });
                      }
                    },
                  }
                });
              }}
            >
              <View style={{ flex: 1 }}>
                <View style={styles.row}>
                  <MaterialCommunityIcons 
                    name="map-marker" 
                    size={20} 
                    color="black" 
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.name}>
                    {selectedAddress?.name || "Selecione um endereço"}
                  </Text>
                  {selectedAddress && (
                    <Text style={styles.phone}>{selectedAddress.phone}</Text>
                  )}
                </View>
                {selectedAddress ? (
                  <>
                    <Text style={styles.address}>
                      {selectedAddress.street}, {selectedAddress.number}, {selectedAddress.neighborhood}
                    </Text>
                    <Text style={styles.address}>
                      {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.cep}
                    </Text>
                  </>
                ) : (
                  <Text style={[styles.address, { fontStyle: 'italic' }]}>
                    Toque para adicionar um endereço
                  </Text>
                )}
              </View>
              <MaterialCommunityIcons 
                name="chevron-right" 
                size={24} 
                color="black" 
              />
            </TouchableOpacity>
          )}

          <View style={styles.method}>
              <View style={styles.methodtextview}>
                <Text style={styles.methodtext}>Método de entrega</Text>
              </View>
              <View>
                {[
                  { id: 'Retirada na loja', plus: '' },
                  { id: 'Motoboy', plus: 'Frete: R$ 15,00' }
                ].map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.methodOption}
                    onPress={() => setSelectedDelivery(option.id)}
                  >
                    <View style={styles.methodRow}>
                      <Text style={styles.methodLabel} numberOfLines={1}>{option.id}</Text>
                      <View style={styles.freteContainer}>
                        {option.plus && <Text style={styles.plus}>{option.plus}</Text>}
                        <View style={styles.radio}>
                          {selectedDelivery === option.id && <View style={styles.radioSelected} />}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
          </View>

          <View style={{flex:1, marginBottom: 50}}>
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => (
                <View style={styles.productcontainer}>
                  <Image
                    source={{uri: item.image}}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={{flex:1}}>
                    <Text style={styles.prodname}>{item.name}</Text>
                    <Text style={styles.prodprice}>
                      R${Number(item.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <Text style={styles.prodqtt}>Qtd: {item.quantity}</Text>
                  </View>
                </View>
              )}
            />
          </View>
          
        </ScrollView>
        <View style={styles.bottomBar}>
          <View style={styles.total}>
            <Text style={styles.totalText}>Total: R${Number(displayTotal).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={{flex:1, justifyContent: 'center', alignItems:'center'}} 
              onPress={handlePurchase}
            > 
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
    minHeight: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
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
    marginRight: 8,
    flex: 1,
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

  productcontainer: {
    backgroundColor: "#d9b898", 
    flexDirection: 'row',      
    alignItems: 'center',      
    padding: 10,     
    borderRadius: 10,           
    margin: 10,  
    position: 'relative'               
  },
  image:{
    height: 85,
    width: 85,
    borderRadius: 8,            
    marginRight: 10,            
  },
  prodname:{
    color: '#3b3b1a',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5
  },
  prodprice:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityContainer: {
    position: 'absolute',
    bottom: 8,
    right: 12,
  },
  prodqtt:{
    fontSize: 16,
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
  },


  method:{
    backgroundColor: "#d9b898",
    flex: 1,
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  methodtextview:{
    marginBottom: 8,
  },
  methodtext:{
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  methodOption: {
    marginBottom: 10,
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  methodLabel:{
    fontSize: 17,
    flex: 1, 
  },
  freteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plus:{
    fontSize: 15,
    marginRight: 10,
  },
  radio: { 
    height: 22, 
    width: 22, 
    borderRadius: 11, 
    borderWidth: 2, 
    borderColor: "#000", 
    alignItems: "center", 
    justifyContent: "center", 
  },
  radioSelected: { 
    height: 12, 
    width: 12, 
    borderRadius: 6, 
    backgroundColor: "#000" 
  },
});