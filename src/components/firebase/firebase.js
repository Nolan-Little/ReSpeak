
// import firebase from "firebase";
import app from "firebase/app";


const config = {
  apiKey: "AIzaSyAXUA1zzckhR-yUdwa19xAWdmA-Zz1_5zU",
  authDomain: "respeak-d5f08.firebaseapp.com",
  databaseURL: "https://respeak-d5f08.firebaseio.com",
  projectId: "respeak-d5f08",
  storageBucket: "respeak-d5f08.appspot.com",
  messagingSenderId: "233620278412"
}


export default class Firebase {


constructor () {
 app.initializeApp(config, "respeak")
}

}