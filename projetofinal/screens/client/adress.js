import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, doc, setDoc, addDoc } from "firebase/firestore";
import { db } from "../../utils/controller";
import { getAuth } from "firebase/auth";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator();

export default function AdressStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Adress" component={Adress} options={{ headerShown: false }} />
      <Stack.Screen name="EditAdress" component={EditAdress} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function Adress({ navigation }) {
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
            <Text style={styles.address}>{item.street}</Text>
            <Text style={styles.address}>{item.city}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("EditAdress", { address: item })}
            >
              <Text style={styles.editText}>Editar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("EditAdress")}
      >
        <Text style={styles.plus}>＋</Text>
        <Text style={styles.addText}>Adicionar novo endereço</Text>
      </TouchableOpacity>
    </View>
  );
}


function EditAdress({ route, navigation }) {
  const user = getAuth().currentUser;
  const address = route.params?.address || null;

  const [name, setName] = useState(address?.name || "");
  const [phone, setPhone] = useState(address?.phone || "");
  const [street, setStreet] = useState(address?.street || "");
  const [number, setNumber] = useState(address?.number || "");
  const [city, setCity] = useState(address?.city || "");
  const [state, setState] = useState(address?.state || "");
  const [cep, setCep] = useState(address?.cep || "");


  async function handleSave() {
    if (!user) return;
    const ref = collection(db, "addresses", user.uid, "userAddresses");

    if (address) {
      await setDoc(doc(ref, address.id), { name, phone, street, number, city, state, cep });
    } else {
      await addDoc(ref, { name, phone, street, number, city, state, cep });
    }

    navigation.goBack();
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#eddaba" }}> 
        <View style={{ flex: 1, padding: 20 }}>
          <Text>Nome</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} />

          <Text>Telefone</Text>
          <TextInput value={phone} onChangeText={setPhone} style={styles.input} />

          <Text>Rua</Text>
          <TextInput value={street} onChangeText={setStreet} style={styles.input} />

          <Text>Número</Text>
          <TextInput value={number} onChangeText={setNumber} style={styles.input} />

          <Text>Cidade</Text>
          <TextInput value={city} onChangeText={setCity} style={styles.input} />

          <Text>Estado</Text>
          <TextInput value={state} onChangeText={setState} style={styles.input} />

          <Text>CEP</Text>
          <TextInput value={cep} onChangeText={setCep} style={styles.input} />


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
  container: { flex: 1 },
  title: { fontSize: 20, fontWeight: "bold", alignSelf: "center", paddingVertical: 10 },
  containercard: { padding: 15 },
  card: { backgroundColor: "#deb887", padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: "#f5deb3" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  radio: { height: 22, width: 22, borderRadius: 11, borderWidth: 2, borderColor: "#000", alignItems: "center", justifyContent: "center", marginRight: 8 },
  radioSelected: { height: 12, width: 12, borderRadius: 6, backgroundColor: "#000" },
  name: { fontWeight: "bold", fontSize: 16, marginRight: 10 },
  phone: { fontSize: 14 },
  address: { fontSize: 14, marginLeft: 30 },
  editButton: { alignSelf: "flex-end", backgroundColor: "#8fbc8f", paddingVertical: 5, paddingHorizontal: 12, borderRadius: 4, marginTop: 8 },
  editText: { color: "#fff", fontWeight: "bold" },
  addButton: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", backgroundColor: "#8fbc8f", padding: 10, borderRadius: 6, marginTop: 10 },
  plus: { fontSize: 20, color: "#fff", marginRight: 8 },
  addText: { fontSize: 14, color: "#fff", fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10, marginBottom: 12 },
  saveButton: { backgroundColor: "#8fbc8f", padding: 12, borderRadius: 6, alignItems: "center" },
  saveText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
