// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBis_EpQu8kexbE13zUH3MI1SkRU5UUu-E",
  authDomain: "conexion-medios.firebaseapp.com",
  projectId: "conexion-medios",
  storageBucket: "conexion-medios.appspot.com",
  messagingSenderId: "558687650779",
  appId: "1:558687650779:web:afadda531eda2589169dfe",
  measurementId: "G-KF8MZF9L4G"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


const analytics = getAnalytics(app);