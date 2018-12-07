import React, { Component } from 'react'
import Dashboard from '../components/dashboard/dashboard'
import Firebase from './../components/firebase/firebase'



export default class ApplicationViews extends Component {

  render(){
    return (
      <React.Fragment>

        <Dashboard successfulLogout={this.props.successfulLogout}/>
      </React.Fragment>
    )
  }
}