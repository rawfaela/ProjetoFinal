/* import 'react-native-gesture-handler';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { FavsProvider } from './Components/FavsProvider';
import { TouchableOpacity, Text } from 'react-native';

import Login from './Screens/Login';
import Cadastro from './Screens/Cadastro';
import Home from './Screens/Home';

import ShowInfo from './Components/ShowInfo';
import Livros from './Screens/Livros';
import HQs from './Screens/HQs';
import Favoritos from './Screens/Favoritos';
import AddLivros from './Screens/AddLivros';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

function BottomTabs() {
  const Bottom = createBottomTabNavigator();

  return (
    <Bottom.Navigator
      screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor: 'rgb(108, 95, 147)', animation: 'fade', tabBarInactiveTintColor: '#000', tabBarStyle: { backgroundColor: 'rgb(208, 222, 252)'}
      }}>

      <Bottom.Screen name='Home' component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (<MaterialCommunityIcons name="bookshelf" size={30} color={focused ? "rgb(108, 95, 147)" : "black"} />)
        }} />

      <Bottom.Screen name='Livros' component={Livros}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (<FontAwesome6 name="book" size={30} color={focused ? "rgb(108, 95, 147)" : "black"} />)
        }} />

      <Bottom.Screen name='HQs' component={HQs}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (<MaterialCommunityIcons name="book-open-variant" size={30} color={focused ? "rgb(108, 95, 147)" : "black"} />)
        }} />

      <Bottom.Screen name='Favoritos' component={Favoritos}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (<MaterialCommunityIcons name="heart-multiple" size={30} color={focused ? "rgb(108, 95, 147)" : "black"} />)
        }} />


      <Bottom.Screen name="ShowInfo" component={ShowInfo} options={({ navigation }) => ({
        title: 'Detalhes do Livro', tabBarStyle: { display: 'none' }, tabBarButton: () => null, tabBarItemStyle: { position: 'absolute', left: -1000, width: 0, height: 0, }, headerStyle: {
          backgroundColor: 'rgb(193, 175, 243)',
        }, headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 15 }}
          >
            <Text style={{ fontSize: 25 }}>⭠ </Text>
          </TouchableOpacity>
        ),
      })} />
    </Bottom.Navigator>
  )
}

export default function App() {
  const Stack = createStackNavigator();

  return (
    <FavsProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShadowVisible: false, headerStyle: { margin: 0 }, headerTitleStyle: { fontWeight: 'bold', fontSize: 20 } }}>

          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />

          <Stack.Screen name='Cadastro' component={Cadastro} options={{ headerShown: false }} />


          <Stack.Screen name='AddLivros' component={AddLivros} options={{ title: 'Voltar', headerTintColor: 'white', headerStyle: { backgroundColor: 'rgb(139, 124, 182)' } }} />

          <Stack.Screen name='BottomTabs' component={BottomTabs} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </FavsProvider>

  )
} */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SignIn from "./screens/signin";

export default function App() {
  return(
    <SignIn/>
  )
}