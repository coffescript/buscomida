import * as firebase from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzQ7YJAL6suKt7J-iW1t-Dft_M19issKE",
  authDomain: "buscomida-286406.firebaseapp.com",
  databaseURL: "https://buscomida-286406.firebaseio.com",
  projectId: "buscomida-286406",
  storageBucket: "buscomida-286406.appspot.com",
  messagingSenderId: "353773555163",
  appId: "1:353773555163:web:0a251b8c7bea2b7ca6abfe",
  measurementId: "G-QF74376FBZ"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)