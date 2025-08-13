import {Text, View, StyleSheet, TouchableOpacity, TextInput, Animated, SafeAreaView, Image} from 'react-native'
import { useState } from 'react';
import { db, storage } from '../utils/controller';
import { collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

//!!! PEDIR AJUDA MARI ENVIAR FOTO (o resto pega)
export default function AddProducts(){
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType,
        allowsEditing: true,
        quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        }
    };

    const uploadImageAsync = async (uri) => {
        // Converte imagem em blob para enviar
        const response = await fetch(uri);
        const blob = await response.blob();

        // Nome único no storage
        const filename = `products/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
        const storageRef = ref(storage, filename);

        // Faz upload
        await uploadBytes(storageRef, blob, { contentType: 'image/jpeg' });

        // Pega URL pública
        return await getDownloadURL(storageRef);
    };

    const validateFields = () => {
        if (!name.trim() || !desc.trim() || !price.trim() || !quantity.trim() || !image) {
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
            // Faz upload da imagem e pega URL
            const imageUrl = await uploadImageAsync(image);

            await addDoc(collection(db, "products"), {
                name: name.trim(),
                description: desc.trim(),
                price: parseFloat(price),
                quantity: parseInt(quantity),
                image: imageUrl,
            });
            console.log("produto add com sucesso");
            showNotif("Produto adicionado com sucesso!", "success");

            setName('');
            setDesc('');
            setPrice('');
            setQuantity('');
            setImage(null);
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
        <SafeAreaView>
            <Text>Add prdudtuo</Text>

            <View style={{alignItems:'center'}}>
                <TextInput style={styles.input} placeholder='nome' value={name} onChangeText={setName}></TextInput>

                <TextInput style={styles.input} placeholder='descricao' value={desc} onChangeText={setDesc}></TextInput>

                <TextInput style={styles.input} placeholder='preco' value={price} onChangeText={setPrice} keyboardType='numeric'></TextInput>

                <TextInput style={styles.input} placeholder='quantidade' value={quantity} onChangeText={setQuantity} keyboardType='numeric'></TextInput>

                <TouchableOpacity style={styles.img} onPress={pickImage}>
                    <Text style={{fontSize: 20}}>Adicionar imagem</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.button} onPress={addProduct}>
                    <Text style={{ color: 'white', fontSize: 26 }}>{uploading ? 'Enviando...' : 'Enviar'}</Text>
                </TouchableOpacity>

                <Text style={styles.error}>{error}</Text>
                {notifVisible && (
                    <Animated.View style={[styles.notif, { opacity: fadeAnim, backgroundColor: notifType === 'success' ? '#4CAF50' : '#F44336'}]}>
                        <Text style={styles.notifText}>{notifMessage}</Text>
                    </Animated.View>
                )}
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    input: {
        fontSize: 23,
        height: 50,
        width: '90%',
        margin: 10,
        color: 'white',
        borderWidth: 3, 
        padding: 10,
        borderRadius: 7,
        backgroundColor:' rgb(167, 191, 226)',
        borderColor: 'rgba(45, 69, 121, 1)'
    },
    button:{
        backgroundColor:'#5f6f52',
        alignItems: 'center',
        borderRadius: 17,
        padding: 9,
    },
    image:{
        height: 100,
        width: 100,
    },
    error:{
        color: '#F44336',
        fontSize: 20,
    },
    notif: {
        alignSelf: 'center',
        padding: 12,
        borderRadius: 8,
    },
    notifText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})