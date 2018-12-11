import React, { Component } from 'react'
import Dashboard from '../components/dashboard/dashboard'
import { FirebaseContext } from './../components/firebase/firebaseindex'
import firebase from 'firebase'


export default class ApplicationViews extends Component {

  render(){
    return (
      <React.Fragment>
        <FirebaseContext.Consumer>
        {
          firebase => {
            return <Dashboard firebase={firebase} successfulLogout={this.props.successfulLogout}/>
          }
        }
        </FirebaseContext.Consumer>
      </React.Fragment>
    )
  }
}