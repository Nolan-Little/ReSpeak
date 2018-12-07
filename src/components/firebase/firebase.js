
import firebase from "firebase/app";


class Firebase {
  constructor(config) {
    let app = firebase.initializeApp(config)

    this.audioStorage = app.storage()
    this.audioFilePath = app.storage().ref().child("audio.ogg");
  }
}

export default Firebase