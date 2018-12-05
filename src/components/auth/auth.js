import React, { Component } from 'react'
import ApplicationViews from '../../app/ApplicationViews'
import Landing from './landing'

export default class Auth extends Component {

  render() {
    return (
      <React.Fragment>
        {
          this.props.isAuthenticated ?
             <ApplicationViews/>
            :
             <Landing/>
        }
      </React.Fragment>
    )
  }
}