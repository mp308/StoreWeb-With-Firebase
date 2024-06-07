//firebase V8
 
// import firebase from 'firebase/app';
//  import * as firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/storage';

// const firebaseConfig = {
//     apiKey: "AIzaSyCYLJCM-7IiBnR9ChjO456oginXHSmCyCc",
//     authDomain: "database-reactweb-01.firebaseapp.com",
//     projectId: "database-reactweb-01",
//     storageBucket: "database-reactweb-01.appspot.com",
//     messagingSenderId: "485547510302",
//     appId: "1:485547510302:web:f40ba2fe5c1f3bef76fc0f",
//     measurementId: "G-WLSEGBS57X"
//   };

//   firebase.initializeApp(firebaseConfig);

//   const auth = firebase.auth();
//   const db = firebase.firestore();
//   const storage = firebase.storage();

//   export { auth, db, storage };

//firebase V9 

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCQyJBe5xgqtfbX3kHYBGy-K9gmzl9k0t4",
    authDomain: "myshop-db-001.firebaseapp.com",
    projectId: "myshop-db-001",
    storageBucket: "myshop-db-001.appspot.com",
    messagingSenderId: "983186019749",
    appId: "1:983186019749:web:8471e760a61a90834c444c",
    measurementId: "G-45NZ8Q62K8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, ref, uploadBytesResumable, getDownloadURL, collection, addDoc, onSnapshot };
