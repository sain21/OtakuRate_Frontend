import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGaWyHLNpYug1IYmjNEaTInULf5a7_oxM",
  authDomain: "otakurate-25ea5.firebaseapp.com",
  projectId: "otakurate-25ea5",
  storageBucket: "otakurate-25ea5.appspot.com",
  messagingSenderId: "772507256984",
  appId: "1:772507256984:web:240fc9c73d53ee662d28ed",
  measurementId: "G-2GCQ7VNR8P"
};

initializeApp(firebaseConfig);

const app = createApp(App)
app.use(router)

app.mount('#app')
