export function errorFirebase(code) {
    switch (code) {
        case 'auth/invalid-email':
            return 'O email está em um formato inválido.';

        case 'auth/user-not-found':
            return 'Usuário não encontrado. Verifique o email.';

        case 'auth/invalid-credential':
            return 'Senha incorreta. Tente novamente.';

        case 'auth/email-already-in-use':
            return 'Este email já está em uso.';

        case 'auth/weak-password':
            return 'A senha precisa ter pelo menos 6 caracteres.';

        case 'auth/too-many-requests':
            return 'Muitas tentativas. Tente novamente mais tarde.';

        case 'auth/missing-password':
            return 'Digite a senha.'
            
        default:
            return `Erro ao autenticar: ${code}`;
    }
}


import { createContext, useContext, useState } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');
  const [fadeAnim] = useState(new Animated.Value(0));

  const showNotif = (msg, notifType = 'success') => {
    setMessage(msg);
    setType(notifType);
    setVisible(true);

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
        setVisible(false);
      });
    }, 2000);
  };

  return (
    <NotificationContext.Provider value={{ showNotif }}>
      {children}
      {visible && (
        <Animated.View
          style={[
            styles.notif,
            {
              opacity: fadeAnim,
              backgroundColor: type === 'success' ? '#4CAF50' : '#F44336',
            },
          ]}
        >
          <Text style={styles.notifText}>{message}</Text>
        </Animated.View>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}

const styles = StyleSheet.create({
  notif: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  notifText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
