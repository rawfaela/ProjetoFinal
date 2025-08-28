import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../utils/controller";
import { collection, onSnapshot, doc, setDoc, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNotification } from '../../utils/notif';

const Stack = createStackNavigator();

export default function AddressStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Address" component={Address} options={{ headerShown: false }} />
      <Stack.Screen name="EditAddress" component={EditAddress} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function Address({ navigation }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#eddaba" }}>
        <View style={styles.container}>
          <Text style={styles.title}>ENDEREÇOS</Text>
          <AddressList navigation={navigation} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function AddressList() {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const user = getAuth().currentUser;
    if (!user) return;

    const ref = collection(db, "addresses", user.uid, "userAddresses");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAddresses(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.containercard}>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setSelected(item.id)}
          >
            <View style={styles.row}>
              <View style={styles.radio}>
                {selected === item.id && <View style={styles.radioSelected} />}
              </View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.phone}>{item.phone}</Text>
            </View>
            <Text style={styles.address}>{item.street}, {item.number}</Text>
            <Text style={styles.address}>{item.city}, {item.state}, {item.cep}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("EditAddress", { address: item })}
            >
              <Text style={styles.editText}>Editar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("EditAddress")}
      >
        <Text style={styles.plus}>＋</Text>
        <Text style={styles.addText}>Adicionar novo endereço</Text>
      </TouchableOpacity>
    </View>
  );
}


function EditAddress({ route, navigation }) {
  const user = getAuth().currentUser;
  const address = route.params?.address || null;
  const { showNotif } = useNotification();

  const [name, setName] = useState(address?.name || "");
  const [phone, setPhone] = useState(address?.phone || "");
  const [street, setStreet] = useState(address?.street || "");
  const [number, setNumber] = useState(address?.number || "");
  const [city, setCity] = useState(address?.city || "");
  const [state, setState] = useState(address?.state || "");
  const [cep, setCep] = useState(address?.cep || "");
  const [neighborhood, setNeighborhood] = useState(address?.neighborhood || "")

  const formatPhone = (text) => {
    const cleaned = text.replace(/\D/g, "");

    if (cleaned.length === 0) return "";

    let formatted = "";

    if (cleaned.length <= 2) {
      formatted = `(${cleaned}`;
    } else if (cleaned.length <= 6) {
      formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2)}`;
    } else if (cleaned.length <= 10) {
      formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6)}`;
    } else {
      formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7, 11)}`;
    }

    return formatted;
  };

  const formatCep = (text) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length === 0) return "";
    if (cleaned.length <= 5) return cleaned;
    return cleaned.substring(0, 5) + "-" + cleaned.substring(5, 8);
  };

  async function handleSave() {
    if (!user) return;

    if (!name || !phone || !street || !number || !city || !state || !cep || !neighborhood) {
      showNotif("Preencha todos os campos!", "error");
      return;
    }

    const ref = collection(db, "addresses", user.uid, "userAddresses");

    if (address) {
      await setDoc(doc(ref, address.id), { name, phone, street, number, city, state, cep });
    } else {
      await addDoc(ref, { name, phone, street, number, city, state, cep });
    }

    navigation.goBack();
    showNotif('Endereço salvo com sucesso!', 'success');
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#eddaba" }}> 
        <View style={{ flex: 1, padding: 20 }}>
          
          <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Nome completo"/>

          <TextInput value={phone}  onChangeText={(text) => setPhone(formatPhone(text))} style={styles.input} placeholder="Número de telefone" keyboardType="number-pad" maxLength={15}/>

          <TextInput value={cep} onChangeText={(text) => setCep(formatCep(text))} style={styles.input} placeholder="CEP" keyboardType="number-pad" maxLength={9}/>

          <TextInput value={state} onChangeText={(text) => setState(text.toUpperCase())} style={styles.input} placeholder="Estado" maxLength={2}/>

          <TextInput value={city} onChangeText={setCity} style={styles.input} placeholder="Cidade"/>

          <TextInput value={neighborhood} onChangeText={setNeighborhood} style={styles.input} placeholder="Bairro"/>

          <TextInput value={street} onChangeText={setStreet} style={styles.input} placeholder="Nome da rua"/>

          <TextInput value={number} onChangeText={setNumber} style={styles.input} placeholder="Número" keyboardType="number-pad"/>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>
              {address ? "Salvar alterações" : "Adicionar endereço"}
            </Text>
          </TouchableOpacity>

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
    fontWeight: "bold", 
    alignSelf: "center", 
    paddingVertical: 10 
  },
  containercard: { 
    padding: 15 
  },
  card: { 
    backgroundColor: "#dbb795", 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 10, 
  },
  row: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 8 
  },
  radio: { 
    height: 22, 
    width: 22, 
    borderRadius: 11, 
    borderWidth: 2, 
    borderColor: "#000", 
    alignItems: "center", 
    justifyContent: "center", 
    marginRight: 8 
  },
  radioSelected: { 
    height: 12, 
    width: 12, 
    borderRadius: 6, 
    backgroundColor: "#000" 
  },
  name: { 
    fontWeight: "bold", 
    fontSize: 16, 
    marginRight: 10 
  },
  phone: { 
    fontSize: 14 
  },
  address: { 
    fontSize: 14, 
    marginLeft: 30 
  },
  editButton: { 
    alignSelf: "flex-end", 
    backgroundColor: "#9ebc8a", 
    paddingVertical: 5, 
    paddingHorizontal: 12, 
    borderRadius: 4, 
    marginTop: 8 
  },
  editText: { 
    color: "#fff", 
    fontWeight: "bold" 
  },
  addButton: { 
    flexDirection: "row", 
    alignItems: "center", 
    alignSelf: "flex-start", 
    backgroundColor: "#9ebc8a", 
    padding: 10, 
    borderRadius: 6, 
    marginTop: 10 
  },
  plus: { 
    fontSize: 20, 
    color: "#fff", 
    marginRight: 8 
  },
  addText: { 
    fontSize: 14, 
    color: "#fff", 
    fontWeight: "bold" 
  },
  input: { 
    borderWidth: 1, 
    borderRadius: 6, 
    padding: 10, 
    marginBottom: 12,
    backgroundColor: '#DBB795'
  },
  saveButton: { 
    backgroundColor: "#9ebc8a", 
    padding: 12, 
    borderRadius: 6, 
    alignItems: "center" 
  },
  saveText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  },
});