import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from "@react-navigation/native";
import { useCart } from '../utils/cartProvider';
import { useNotification } from '../utils/notif';

export default function MoreInfo() {
  const route = useRoute();
  const { item } = route.params;
  const insets = useSafeAreaInsets();
  const { addToCart } = useCart();
  const { showNotif } = useNotification();

  const handleAddToCart = () => {
    const wasAdded = addToCart(item);
    
    if (wasAdded) {
      showNotif('Produto adicionado ao carrinho!', 'success');
      console.log('Produto adicionado ao carrinho:', item);
    } else {
      showNotif('Este produto já foi adicionado ao carrinho!', 'error');
      console.log('Produto já existe no carrinho:', item);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={[styles.container, { backgroundColor: '#F0C091' }]}>
          <View style={styles.scrollContainer}>
            <ScrollView 
              contentContainerStyle={[styles.content, { paddingBottom: 100 }]}
              showsVerticalScrollIndicator={false}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
              <Text style={styles.price}>
                R${Number(item.price).toLocaleString("pt-BR", { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                })}
              </Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.stock}>Estoque: {item.quantity}</Text>
              <Text style={styles.stock}>Em estoque: {item.quantity}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </ScrollView>
          </View>
          
          <View style={[styles.addButtonContainer, { paddingBottom: insets.bottom }]}>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddToCart}
              activeOpacity={0.8}
            >
              <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginBottom: 8,
    paddingLeft: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 21,
    marginBottom: 13,
    paddingLeft: 5,
  },
  description: {
    color: '#333',
    paddingLeft: 5,
    fontSize: 15,
  },
  stock: {
    color: '#6a7e4e',
    paddingLeft: 5,
    paddingBottom: 10,
    fontWeight: '600',
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