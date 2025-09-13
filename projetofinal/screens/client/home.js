import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, SafeAreaView, Platform, StatusBar, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../../components/controller';
import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Home(){
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const array = [];
        querySnapshot.forEach((doc) => {
          array.push({id: doc.id, ...doc.data() });
        });
        setProducts(array);
      } catch (error){
        console.log("erro ao carregar produtos: ", error);
      }
    }
    loadProducts();
  }, []);

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
          <Image source={require('../../assets/lupinha.png')} style={styles.icon} />
        </View>
        
        <FlatList data={products.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))} renderItem={({item}) => (
          <View style={styles.background}>
            <TouchableOpacity style={styles.touchContainer} onPress={() => navigation.navigate('MoreInfo', {item})}>  
                <Image source={{uri: item.image}} style={styles.img}></Image>
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>R${Number(item.price).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                </View>
            </TouchableOpacity>
          </View>
        )} keyExtractor={item => item.id} showsVerticalScrollIndicator={false} numColumns={2} columnWrapperStyle={{justifyContent: 'space-around'}} />
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
      paddingHorizontal: 10,
    },
    input: {
      flex: 1,
      fontSize: 16,
    },
    icon: {
      width: 20,
      height: 20,
      marginTop: 10
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
      width: '65%',
      height: '65%',
      aspectRatio: 1,
      alignSelf: 'center',
      marginTop: 10,
      borderRadius: 8,
    },
    touchContainer: {
      flex: 1,
      alignItems: 'center',
    },
    name: {
      fontSize: 14,
      textAlign: 'center',
      paddingVertical: 3,
    },
    price: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold'
    },
})
