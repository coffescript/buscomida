 import * as firebase from 'firebase/app'

 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyDSsHDSV2T19eVLodDQsvYcJk3UA93-0C4",
  authDomain: "buscomida-5c2ce.firebaseapp.com",
  databaseURL: "https://buscomida-5c2ce.firebaseio.com",
  projectId: "buscomida-5c2ce",
  storageBucket: "buscomida-5c2ce.appspot.com",
  messagingSenderId: "1034607790966",
  appId: "1:1034607790966:web:837f6f27a6699af9208857",
  measurementId: "G-DBQN339BK2"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)