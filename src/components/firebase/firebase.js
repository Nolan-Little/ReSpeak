
import firebase from "firebase/app";


class Firebase {
  constructor(config) {
    let app = firebase.initializeApp(config)

    this.storage = app.storage()
    this.audioStorage= app.storage().ref().child("audio.ogg")
  }
}

export default Firebase