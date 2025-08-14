import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MoreInfo from "../screens/moreInfo";
import { TouchableOpacity, Text } from "react-native";

export default function BottomTabs({ tabs }) {
  const Bottom = createBottomTabNavigator();

  return (


    <Bottom.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#9ebc8a',
        tabBarInactiveTintColor: '#5f6f52',
        tabBarStyle: { backgroundColor: '#b99470' }
      }}
    >
      {tabs.map((tab, index) => (
        <Bottom.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <tab.font
                name={tab.icon}
                size={24}
                color={focused ? "#9ebc8a" : "#5f6f52"}
              />
            )
          }}
        />
      ))}
      <Bottom.Screen name="MoreInfo" component={MoreInfo} options={({ navigation }) => ({
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
  );
}
