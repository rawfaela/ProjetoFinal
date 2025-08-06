import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../utils/controller';
import { errorFirebase } from '../utils/authError';

export default function LogIn({navigation}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');

    const VerifyUser = () => {
        signInWithEmailAndPassword(auth, email, password).then(userCredential => {
            if (email == 'adm@gmail.com'){
                navigation.navigate('AddProducts');
            }
            else{
                navigation.navigate('BottomTabs', {screen: 'Home'});
            }
        })
            .catch((error) => {
                console.log('erro', error.message);
                const msg = errorFirebase(error.code);
                setError(msg);
            });
    }

    return(     
        <SafeAreaView style={{flex: 1, backgroundColor: '#9ebc8a'}}>
            <View style={styles.container}>
                <Image source={require('../assets/nome.png')}
                style={{ width: '100%', height: 80, marginTop: 20}}/>
                <Image source={require('../assets/logo.png')}
                style={{ width: 150, height: 150}}/>
                <Text style={styles.title2}>LOGIN</Text>
                <View style={{rowGap: 20, width: '100%', alignItems:'center'}}>
                    <TextInput 
                        placeholder='Email' 
                        style={styles.input} 
                        keyboardType='email-address' 
                        value={email} 
                        onChangeText={(text) => {setEmail(text); setError('');}}
                    />                    
                    <TextInput 
                        placeholder='Senha' 
                        style={styles.input} 
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => {setPassword(text); setError('');}}
                    />
                </View>
                <Text style={styles.error}>{error}</Text>
                <View style={{rowGap: 20}}>
                    <TouchableOpacity style={styles.button}><Text style={styles.buttontext} onPress={VerifyUser}>Entrar</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button}><Text  style={styles.buttontext} onPress={() => navigation.navigate('SignIn')}>Criar conta</Text></TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#9ebc8a',
        flex: 1,
        alignItems: 'center',
        rowGap: 25,
    },
    title2:{
        fontSize: 25,
        backgroundColor:'#b99470',
        padding: 8,
        borderRadius: 30,
        color: 'white',
        marginBottom: 20,
        fontWeight: 600,
    },
    input:{
        backgroundColor: '#fefae0',
        fontSize: 25,
        borderRadius: 10,
        padding: 5,
        borderWidth: 1,
        fontWeight: 600,
        width: '80%',
    },
    error:{
        color:'#9b4444',
        fontWeight: 600,
        fontSize: 20,
        marginVertical: 15,
    },
    button:{
        backgroundColor:'#5f6f52',
        alignItems: 'center',
        borderRadius: 17,
        padding: 9,
    },
    buttontext:{
        color: 'white',
        fontSize: 25,
        fontWeight: 600,
    }
})