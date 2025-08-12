import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Platform, SafeAreaView, StatusBar } from 'react-native';

export default function ProductPage() {
  const paddingTop = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
  
  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop }]}>
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={[styles.content, { paddingBottom: 100 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMdgifDk42jqcn9ili_2tEphnb8S_oLVPl4w&s' }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.price}>R$ 99,90</Text>
          <Text style={styles.name}>Pulseira de Prata</Text>
          <Text style={styles.description}>
            Descrição - Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Praesent tempus odio in nibh venenatis, eu euismod enim pharetra.
          </Text>
        </ScrollView>

        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
  content: {
    padding: 20,
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
  addButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  addButton: {
    backgroundColor: '#6A7E4E',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
});
