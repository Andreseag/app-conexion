import {v4} from 'uuid';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdNbjNvKpeyugGHNF6nd8eobDPPVYQK5A",
  authDomain: "conexion-medios-54c06.firebaseapp.com",
  projectId: "conexion-medios-54c06",
  storageBucket: "conexion-medios-54c06.appspot.com",
  messagingSenderId: "225647294779",
  appId: "1:225647294779:web:206ada33939411d0599f1e",
  measurementId: "G-2GW4418K0K"
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


