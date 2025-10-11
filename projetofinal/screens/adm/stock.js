import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Stock() {
  const [quantity, setQuantity] = useState(0);
  const increase = () => setQuantity(prev => prev + 1);
  const decrease = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));

  const handleChange = (text) => {
    const num = parseInt(text, 10);
    if (!isNaN(num) && num >= 0) {
      setQuantity(num);
    } else if (text === "") {
      setQuantity(0);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#eddaba' }}>
        <View style={styles.container}>
          <Text style={styles.title}>ESTOQUE</Text>
          <View style={styles.productcontainer}>
            <Image
              source={{ uri: 'https://www.nutrire.ind.br/images/f69cb32b09206b60746c751f7d6f7b96.png' }}
              style={styles.image}
              resizeMode="cover"
            />
            <View>
              <Text style={styles.name}>Gatinho fofo</Text>
              <Text style={styles.price}>R$30,99</Text>
            </View>
            <View style={styles.counterContainer}>
              <TouchableOpacity style={[styles.button, { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }]} onPress={decrease}>
                <Text style={styles.txtbutton}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.counterInput}
                keyboardType="numeric"
                value={quantity.toString()}
                onChangeText={handleChange}
              />
              <TouchableOpacity style={[styles.button, { borderTopRightRadius: 8, borderBottomRightRadius: 8 }]} onPress={increase}>
                <Text style={styles.txtbutton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10
  },
  productcontainer: {
    backgroundColor: "#dbb795",
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    margin: 10,
  },
  image: {
    height: 85,
    width: 85,
    borderRadius: 8,
    marginRight: 10,
  },
  name: {
    color: '#5f6f52',
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 19,
    color: '#3b3b1a'
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20
  },
  button: {
    backgroundColor: 'white',
    height: 40,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtbutton: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  },
  counterInput: {
    backgroundColor: 'white',
    width: 50,
    height: 40,
    textAlign: 'center',
    padding: 0,
    fontSize: 18,
    fontWeight: 'bold',
    ...(Platform.OS === 'android' ? { textAlignVertical: 'center' } : {})
  }
});