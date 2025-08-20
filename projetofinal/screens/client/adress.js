import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default function AdressStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Adress" component={Adress} options={{ headerShown: false }} />
      <Stack.Screen name="EditAdress" component={EditAdress} options={{ title: "Editar Endereço" }} />
    </Stack.Navigator>
  );
}

function Adress({ navigation }) {
  return (
    <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: '#eddaba'}}>
            <View style={styles.container}>
                <Text style={styles.title}>ENDEREÇOS</Text>

                <View>
                    
                </View>
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
    
  );
}

/* import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function AddressList() {
  const [selected, setSelected] = useState(null);

  const addresses = [
    {
      id: 1,
      name: "Nome pessoa",
      phone: "(48) 91234-5678",
      street: "Rua tal, 123",
      city: "Cidade, Estado, CEP",
    },
    {
      id: 2,
      name: "Outra pessoa",
      phone: "(11) 98765-4321",
      street: "Av. Exemplo, 456",
      city: "São Paulo, SP, 01000-000",
    },
  ];

  return (
    <View style={styles.container}>
      {addresses.map((item) => (
        <TouchableOpacity
          key={item.id}
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
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Editar</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.plus}>＋</Text>
        <Text style={styles.addText}>Adicionar novo endereço</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  card: {
    backgroundColor: "#deb887",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f5deb3",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  radio: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 10,
  },
  phone: {
    fontSize: 14,
  },
  address: {
    fontSize: 14,
    marginLeft: 30,
  },
  editButton: {
    alignSelf: "flex-end",
    backgroundColor: "#8fbc8f",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 8,
  },
  editText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#8fbc8f",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  plus: {
    fontSize: 20,
    color: "#fff",
    marginRight: 8,
  },
  addText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
});
 */


function EditAdress({ navigation }) {
  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
      <Text>Editar Endereço</Text>
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
        alignSelf: 'center',
        paddingVertical: 10
    },
})