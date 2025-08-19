import SignIn from './screens/signin';
import LogIn from './screens/login';
import Home from './screens/home';
import Purchases from './screens/purchases';
import Cart from './screens/cart';
import AddProducts from './screens/addProducts';
import BottomTabs from './components/bottomtabs';
import Stock from './screens/stock';
import Orders from './screens/orders';
import MoreInfo from './screens/moreInfo';
import { CartProvider } from './utils/cartProvider';
import { NotificationProvider } from './utils/notif';

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

          </Stack.Navigator>
        </NavigationContainer>
      </NotificationProvider>
    </CartProvider>
  )
}
