import React, { Component } from 'react'
import Dashboard from '../components/dashboard/dashboard'



export default class ApplicationViews extends Component {

  render(){
    return (
      <React.Fragment>
        <Dashboard successfulLogout={this.props.successfulLogout}/>
      </React.Fragment>
    )
  }
}