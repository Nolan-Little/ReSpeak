import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import Firebase, { FirebaseContext } from './components/firebase/firebaseindex'
import './index.scss';

const config = {
  apiKey: "AIzaSyAXUA1zzckhR-yUdwa19xAWdmA-Zz1_5zU",
  authDomain: "respeak-d5f08.firebaseapp.com",
  databaseURL: "https://respeak-d5f08.firebaseio.com",
  projectId: "respeak-d5f08",
  storageBucket: "respeak-d5f08.appspot.com",
  messagingSenderId: "233620278412"
}


const firebase = new Firebase(config)

ReactDOM.render(
  <FirebaseContext.Provider value={firebase}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'));
