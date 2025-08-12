import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Animated } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';

export default function Info(){
  const [notifVisible, setNotifVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const showNotif = () => {
    setNotifVisible(true);

    // Anima entrada
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Some depois de 2 segundos
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setNotifVisible(false);
      });
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={showNotif}>
        <Text style={styles.text}>Add to cart</Text>
      </TouchableOpacity>

      {notifVisible && (
        <Animated.View style={[styles.notif, { opacity: fadeAnim }]}>
          <Text style={styles.notifText}>Item adicionado ao carrinho!</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    backgroundColor: 'black',
  },
  text:{
    color: 'white',
    fontSize: 25,
  },
   notif: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    zIndex: 100,
  },
  notifText: {
    color: 'white',
    fontSize: 16,
  },
})