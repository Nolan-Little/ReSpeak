import React, { Component } from 'react'
import ApplicationViews from '../../app/ApplicationViews'
import Landing from './landing'

export default class Auth extends Component {



  render() {
    return (
      <React.Fragment>
        {
          this.props.isAuthenticated ?
             <ApplicationViews successfulLogout={this.props.successfulLogout}/>
            :
             <Landing successfulLogin={this.props.successfulLogin}/>
        }
      </React.Fragment>
    )
  }
}