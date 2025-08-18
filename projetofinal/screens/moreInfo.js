import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

function MoreInfoContent() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { backgroundColor: '#F0C091' }]}>
      <View style={styles.scrollContainer}>
        <ScrollView 
          contentContainerStyle={[styles.content, { paddingBottom: 100 }]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMdgifDk42jqcn9ili_2tEphnb8S_oLVPl4w&s' }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.price}>R$ 99,90</Text>
          <Text style={styles.name}>Pulseira de Prata</Text>
          <Text style={styles.stock}>Em estoque: 45</Text>
          <Text style={styles.description}>
            Descrição - Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Praesent tempus odio in nibh venenatis, eu euismod enim pharetra.Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Praesent tempus odio in nibh venenatis, eu euismod enim pharetra.Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Praesent tempus odio in nibh venenatis, eu euismod enim pharetra.Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Praesent tempus odio in nibh venenatis, eu euismod enim pharetra.Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Praesent tempus odio in nibh venenatis, eu euismod enim pharetra.Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Praesent tempus odio in nibh venenatis, eu euismod enim pharetra.
          </Text>
        </ScrollView>
      </View>
      
      <View style={[styles.addButtonContainer, { paddingBottom: insets.bottom }]}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function MoreInfo() {
  const route = useRoute();
  const { item } = route.params;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <MoreInfoContent />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0C091',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 15,
  },
  content: {
    flexGrow: 1,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  price: {
    color: '#6A7E4E',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10,
    paddingLeft: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 10,
    paddingLeft: 5,
  },
  description: {
    color: '#333',
    paddingLeft: 5,
  },
  stock: {
    color: '#6a7e4e',
    paddingLeft: 5,
    paddingBottom: 10
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#6A7E4E',
    paddingTop: 10,
  },
  addButton: {
    backgroundColor: '#6A7E4E',
    paddingVertical: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
});
