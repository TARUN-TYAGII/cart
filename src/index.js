import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";





// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7xTc3qNNS-Ygqiu8ZTx1GygBNLwz9NbU",
  authDomain: "cart-b58a6.firebaseapp.com",
  projectId: "cart-b58a6",
  storageBucket: "cart-b58a6.appspot.com",
  messagingSenderId: "676133970313",
  appId: "1:676133970313:web:785d1f905763836353c158"
};

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


