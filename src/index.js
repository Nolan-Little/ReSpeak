import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import Firebase, { FirebaseContext } from './components/firebase/firebaseindex'

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'));
