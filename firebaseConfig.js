import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA3-hlMd8hp7bf5zBJb958v_tYUcEQ6GRw",
  authDomain: "family-app-90c31.firebaseapp.com",
  projectId: "family-app-90c31",
  storageBucket: "family-app-90c31.appspot.com",
  messagingSenderId: "208601992373",
  appId: "1:208601992373:web:a430574ce2c7ecf63602fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);