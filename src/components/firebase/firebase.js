
import firebase from "firebase/app";


class Firebase {
  constructor(config) {
    let app = firebase.initializeApp(config)

    this.audioStorage = app.storage();
  }
}

export default Firebase