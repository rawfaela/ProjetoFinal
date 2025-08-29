import SignIn from './screens/signin';
import LogIn from './screens/login';
import Home from './screens/client/home';
import Purchases from './screens/client/purchases';
import Cart from './screens/client/cart';
import AddProducts from './screens/adm/addProducts';
import BottomTabs from './components/bottomtabs';
import Stock from './screens/adm/stock';
import Orders from './screens/adm/orders';
import MoreInfo from './screens/client/moreInfo';
import AddressStack from './screens/client/address';
import { CartProvider } from './components/cartProvider';
import { NotificationProvider } from './components/notif';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5, Fontisto, FontAwesome6, FontAwesome } from '@expo/vector-icons';

function TabsClient() {
  const clientTabs = [
    { name: 'Início', component: Home, font: FontAwesome5, icon: 'home' },
    { name: 'Carrinho', component: Cart, font: FontAwesome5, icon: 'shopping-cart' },
    { name: 'Compras', component: Purchases, font: Fontisto, icon: 'shopping-bag-1' },
  ];

  return <BottomTabs tabs={clientTabs} />;
}

function TabsADM(){
  const AdmTabs = [
    { name: 'Estoque', component: Stock, font: FontAwesome6, icon: 'jar-wheat' },
    { name: 'Pedidos', component: Orders, font: FontAwesome, icon: 'inbox' },
    { name: 'Adicionar Produtos', component: AddProducts, font: FontAwesome5, icon: 'plus' },
  ];

  return <BottomTabs tabs={AdmTabs} />;
}
export default function App() {
  const Stack = createStackNavigator();

  return (
    <CartProvider>
      <NotificationProvider>
        <NavigationContainer>
          <Stack.Navigator>
            
            <Stack.Screen name='LogIn' component={LogIn} options={{ headerShown: false }}/>

            <Stack.Screen name='SignIn' component={SignIn} options={{headerShown: false}}/>

            <Stack.Screen name='TabsClient' component={TabsClient} options={{headerShown: false}}/>

            <Stack.Screen name='TabsADM' component={TabsADM} options={{headerShown: false}}/>
      
            <Stack.Screen name='MoreInfo' component={MoreInfo} options={{headerShown: false}}/>

            <Stack.Screen name='AddressStack' component={AddressStack} options={{headerShown: false}}/>

          </Stack.Navigator>
        </NavigationContainer>
      </NotificationProvider>
    </CartProvider>
  )
}
