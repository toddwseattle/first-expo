import * as firebase from "firebase";
import "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDlVni_zGXUoAROkAON2UwwNsjRBmQoeQo",
  authDomain: "first-expo.firebaseapp.com",
  databaseURL: "https://first-expo-default-rtdb.firebaseio.com",
  projectId: "first-expo",
  storageBucket: "first-expo.appspot.com",
  messagingSenderId: "21921224800",
  appId: "1:21921224800:web:87d7f6edd2e0640cac4b05",
};

firebase.initializeApp(firebaseConfig);
export { firebase };
