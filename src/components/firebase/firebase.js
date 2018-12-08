
import firebase from "firebase/app";


class Firebase {
  constructor(config) {
    let app = firebase.initializeApp(config)

    this.Storage = app.storage()
    this.audioStorage= app.storage().ref().child("audio.ogg")
  }
}

export default Firebase