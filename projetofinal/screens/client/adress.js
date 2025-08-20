import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
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
            <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
            <Text>Minha Tela de Endereço</Text>
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
