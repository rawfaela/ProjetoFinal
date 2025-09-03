import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Stock() { 

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#eddaba'}}>
      <View style={styles.container}>
        <Text style={styles.title}>ESTOQUE</Text>
        <View style={styles.productcontainer}>
          <Image
            source={{ uri:'https://www.nutrire.ind.br/images/f69cb32b09206b60746c751f7d6f7b96.png' }}
            style={styles.image}
            resizeMode="cover"
          />
          <View>
            <Text style={styles.name}>Gatinho fofo</Text>
            <Text style={styles.price}>R$30,99</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
    backgroundColor: "#a9b388",
    height: '15%',
    flexDirection: 'row',      
    alignItems: 'center',      
    paddingHorizontal: 10,     
    borderRadius: 10,           
    margin: 10,                 
  },
  image:{
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
  addButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#6A7E4E',
    paddingTop: 10,
    paddingBottom: 10
  },
  addButton: {
    backgroundColor: '#6A7E4E',
    paddingVertical: 18,
    alignItems: 'center',
  },
  addButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  }
});