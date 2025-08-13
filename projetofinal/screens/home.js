import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";

export default function Home(){
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#eddaba'}}>
        <View style={[styles.container, Platform.OS === 'android' && { marginTop: StatusBar.currentHeight || 0 }]}>
          <View style={styles.searchContainer}>
          <TextInput
          style={styles.input}
          placeholder="Pesquisar..."
          placeholderTextColor="#666"
          value={search}
          onChangeText={setSearch}
          />
          <Image source={require('../assets/lupinha.png')} style={styles.icon} />
        </View>

        <View style={styles.cardsContainer}>
          <View style={styles.background}>
            <TouchableOpacity style={styles.touchContainer} onPress={() => navigation.navigate('MoreInfo')}>  
                <Image source={require('../assets/fotinho.jpg')} style={styles.img}></Image>
                <View>
                  <Text style={styles.productName}>Nome</Text>
                  <Text style={styles.price}>Preço</Text>
                </View>
            </TouchableOpacity>
          </View>
          <View style={styles.background}>
            <TouchableOpacity style={styles.touchContainer}  onPress={() => navigation.navigate('MoreInfo')}>  
                <Image source={require('../assets/fotinho.jpg')} style={styles.img}/>
                <View>
                    <Text style={styles.productName}>Nome</Text>
                    <Text style={styles.price}>Preço</Text>
                </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eddaba',
      paddingHorizontal: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 20,
      marginBottom: 20,
      height: 40,
    },
    input: {
      height: 40,
      backgroundColor: '#fff',
      borderRadius: 20,
      paddingHorizontal: 15,
      fontSize: 16,
      marginBottom: 20,
    },
    cardsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    },
    background: {
      width: '45%',
      height: 200,
      backgroundColor: '#b99470',
      borderRadius: 15,
      marginBottom: 20,
    },
    img: {
      width: '80%',
      height: '70%',
      alignSelf: 'center',
      marginTop: 10
    },
    touchContainer: {
      flex: 1,
      alignItems: 'center',
    },
    productName: {
      fontSize: 14
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold'
    },
    icon: {
      width: 20,
      height: 20,
      marginLeft: 190,
      marginTop: 10
    },
})
