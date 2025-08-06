import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function BottomTabs({ tabs }) {
  const Bottom = createBottomTabNavigator();

  return (
    <Bottom.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#5f6f52',
        tabBarInactiveTintColor: '#9ebc8a',
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
                color={focused ? "#5f6f52" : "#9ebc8a"}
              />
            )
          }}
        />
      ))}
    </Bottom.Navigator>
  );
}
