import {Text, View, StyleSheet, TouchableOpacity, TextInput, Animated, SafeAreaView, Image} from 'react-native'
import { useState } from 'react';
import { db, storage } from '../utils/controller';
import { collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AddProducts(){
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false);

    const validateFields = () => {
        if (!name.trim() || !desc.trim() || !price.trim() || !quantity.trim() || !image.trim()) {
            setError("Por favor, preencha todos os campos.");
            return false;
        }
        setError('');
        return true;
    };

    const addProduct = async () => {
        if (!validateFields()) {
            return;
        }

        try {
            setUploading(true);
            await addDoc(collection(db, "products"), {
                name: name.trim(),
                description: desc.trim(),
                price: parseFloat(price),
                quantity: parseInt(quantity),
                image: image.trim(),
            });
            console.log("produto add com sucesso");
            showNotif("Produto adicionado com sucesso!", "success");

            setName('');
            setDesc('');
            setPrice('');
            setQuantity('');
            setImage('');
        } catch (error) {
            console.error("Erro ao adicionar produto: ", error);
            showNotif("Erro ao adicionar produto!", "error");
        } finally {
            setUploading(false);
        }
    }


    const [notifVisible, setNotifVisible] = useState(false);
    const [notifMessage, setNotifMessage] = useState('');
    const [notifType, setNotifType] = useState('success'); // 'success' ou 'error'
    const [fadeAnim] = useState(new Animated.Value(0));
    const showNotif = (message, type = 'success') => {
    setNotifMessage(message);
    setNotifType(type);
    setNotifVisible(true);

    Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
    }).start();

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


    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Adicionar Produto</Text>
            
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.formContainer}>
                <TextInput 
                    style={styles.input} 
                    placeholder='Nome do produto' 
                    value={name} 
                    onChangeText={setName}
                />

                <TextInput 
                    style={styles.input} 
                    placeholder='Descrição' 
                    value={desc} 
                    onChangeText={setDesc}
                    multiline
                />

                <TextInput 
                    style={styles.input} 
                    placeholder='Preço (R$)' 
                    value={price} 
                    onChangeText={(text) => setPrice(text.replace(',', '.'))}
                    keyboardType='decimal-pad'
                />

                <TextInput 
                    style={styles.input} 
                    placeholder='Quantidade' 
                    value={quantity} 
                    onChangeText={setQuantity} 
                    keyboardType='number-pad'
                />

                <TextInput
                    style={styles.input}
                    placeholder='URL da imagem'
                    value={image}
                    onChangeText={setImage}
                />

                {image && (
                    <View style={styles.imagePreview}>
                        <Image source={{ uri: image }} style={styles.previewImage} />
                        <Text style={styles.imageText}>Imagem pronta para upload</Text>
                    </View>
                )}

                <TouchableOpacity 
                    style={[styles.button, uploading && styles.buttonDisabled]} 
                    onPress={addProduct}
                    disabled={uploading}
                >
                    <Text style={styles.buttonText}>
                        {uploading ? 'Enviando...' : 'Adicionar Produto'}
                    </Text>
                </TouchableOpacity>
                
                {notifVisible && (
                    <Animated.View style={[
                        styles.notif, 
                        { 
                            opacity: fadeAnim, 
                            backgroundColor: notifType === 'success' ? '#4CAF50' : '#F44336'
                        }
                    ]}>
                        <Text style={styles.notifText}>{notifMessage}</Text>
                    </Animated.View>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eddaba',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
    formContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        fontSize: 18,
        height: 50,
        width: '100%',
        margin: 10,
        color: '#333',
        borderWidth: 2,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#b99470',
        borderColor: '#ddd',
    },
    imageButton: {
        backgroundColor: '#6c7b7f',
        alignItems: 'center',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        width: '100%',
    },
    imageButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imagePreview: {
        marginVertical: 10,
        alignItems: 'center',
    },
    previewImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#4CAF50',
    },
    imageText: {
        fontSize: 14,
        color: '#4CAF50',
        marginTop: 5,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#6a7e4e',
        alignItems: 'center',
        borderRadius: 10,
        padding: 15,
        marginTop: 20,
        width: '100%',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    error: {
        color: '#F44336',
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 10,
    },
    notif: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        padding: 15,
        borderRadius: 10,
        minWidth: 200,
        alignItems: 'center',
    },
    notifText: {
        color: '#9b4444',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});