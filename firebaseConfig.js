import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyA3-hlMd8hp7bf5zBJb958v_tYUcEQ6GRw",
  authDomain: "family-app-90c31.firebaseapp.com",
  projectId: "family-app-90c31",
  storageBucket: "family-app-90c31.appspot.com",
  messagingSenderId: "208601992373",
  appId: "1:208601992373:web:a430574ce2c7ecf63602fc"
};
const app = initializeApp(firebaseConfig);
// Initialize Firebase
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export { auth };
// ios = 89336558678-c8rmg38rdq6mabklkgtde819iuh3hfsq.apps.googleusercontent.com
// android = 89336558678-m4aiqms7dvtv9338pjjocp62njb009bn.apps.googleusercontent.com