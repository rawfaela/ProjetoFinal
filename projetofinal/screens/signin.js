import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

export default function SignIn(){
    return(
        <View style={styles.container}>
            <Text>Loja Tal Tal</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#9ebc8a',
        flex: 1,
    }
})