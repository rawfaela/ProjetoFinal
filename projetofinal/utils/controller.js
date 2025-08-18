import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3_mH3DiRXFb3640qHSFy37ZBhcL_yXsc",
  authDomain: "naturall-25201.firebaseapp.com",
  projectId: "naturall-25201",
  storageBucket: "naturall-25201.firebasestorage.app",
  messagingSenderId: "183288689473",
  appId: "1:183288689473:web:848ffa55d6dc5837d3e7c0"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);