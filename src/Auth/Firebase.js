import * as firebase from "firebase";
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAH3YVQSCG9O9kWsr6t7_3SBZR8DWmD-DE",
    authDomain: "zeus-b6b4e.firebaseapp.com",
    databaseURL: "https://zeus-b6b4e.firebaseio.com",
    projectId: "zeus-b6b4e",
    storageBucket: "zeus-b6b4e.appspot.com",
    messagingSenderId: "20136145647"
  };
 export const Firebase = firebase.initializeApp(config);
