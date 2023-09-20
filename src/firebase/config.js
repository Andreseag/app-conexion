import {v4} from 'uuid';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBis_EpQu8kexbE13zUH3MI1SkRU5UUu-E",
  authDomain: "conexion-medios.firebaseapp.com",
  projectId: "conexion-medios",
  storageBucket: "conexion-medios.appspot.com",
  messagingSenderId: "558687650779",
  appId: "1:558687650779:web:afadda531eda2589169dfe",
  measurementId: "G-KF8MZF9L4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// 'file' comes from the Blob or File API
export async function uploadFile(file){
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}


