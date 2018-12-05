import React, { Component } from 'react'
import Auth from '../components/auth/auth'
import './App.css'

class App extends Component {


  render() {
    return (
      <React.Fragment>
        <Auth isAuthenticated={false}/>
      </React.Fragment>
    )
  }
}

export default App
