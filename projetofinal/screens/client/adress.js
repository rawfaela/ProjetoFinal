import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default function AdressStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Endereço" component={Adress}  />
      <Stack.Screen name="EditAdress" component={EditAdress} options={{ title: "Editar Endereço" }} />
    </Stack.Navigator>
  );
}

function Adress({ navigation }) {
  return (
    <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: '#eddaba'}}>
            <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
            <Text>Minha Tela de Endereço</Text>
            <Button title="Editar Endereço" onPress={() => navigation.navigate("EditAdress")} />
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
    
  );
}

function EditAdress({ navigation }) {
  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
      <Text>Editar Endereço</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}
