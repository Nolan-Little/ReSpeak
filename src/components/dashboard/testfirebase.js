import { FirebaseContext } from './../firebase/firebaseindex'
import React, { Component } from 'react'


export default class TEST extends Component {
  render (){
    return (
      <FirebaseContext.Consumer>
        {
          firebase => {
            return <div>I have firebase access</div>
          }
        }
      </FirebaseContext.Consumer>
    )
  }
}