import * as firebase from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA023iAgzhEz3AczlL4S0IqxuquENldURM",
    authDomain: "buscomida-1d8dd.firebaseapp.com",
    databaseURL: "https://buscomida-1d8dd.firebaseio.com",
    projectId: "buscomida-1d8dd",
    storageBucket: "buscomida-1d8dd.appspot.com",
    messagingSenderId: "650025153379",
    appId: "1:650025153379:web:c6809a526da13d53bbd956",
    measurementId: "G-FG4MYKTW0B"
  }

export const firebaseApp = firebase.initializeApp(firebaseConfig)