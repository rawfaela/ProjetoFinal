import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

export default function SignIn(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>NOME</Text>
            <Image source={require('../assets/logofake.png')}
            style={{ width: 150, height: 150, marginVertical: 20}}/>
            <Text style={styles.title2}>CADASTRO</Text>
            <View style={{rowGap: 20, width: '100%', alignItems:'center'}}>
                <TextInput placeholder='Email' style={styles.input}></TextInput>
                <TextInput placeholder='Senha' style={styles.input}></TextInput>
            </View>
            <Text style={styles.error}>{/* {error} */}erros</Text>
            <View style={{rowGap: 20}}>
                <TouchableOpacity style={styles.button}><Text style={styles.buttontext}>Criar conta</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text  style={styles.buttontext}>Voltar ao login</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#9ebc8a',
        flex: 1,
        alignItems: 'center',
        rowGap: 25,
    },
    title:{
        fontSize: 35,
        marginTop: 35,
        fontWeight: 800,
        color: '#5f6f52',
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
        fontSize: 25,
        marginVertical: 15,
    },
    button:{
        backgroundColor:'#3b3b1a',
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