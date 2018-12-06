import React, { Component } from 'react'
import Auth from '../components/auth/auth'
import './App.css'
import userSession from "./../modules/userSession"
class App extends Component {

  constructor(){
    super()
    this.state ={
      isAuthenticated:false
    }
  }

  componentDidMount(){
    if (userSession.getUser()){
      this.setState({isAuthenticated: !this.state.isAuthenticated})
    }
  }

  successfulLogin = () => {
    this.setState({isAuthenticated:true})
  }

  successfulLogout = () => {
    this.setState({isAuthenticated:!this.state.isAuthenticated})
    userSession.logOutUser()
  }


  render() {
    return (
      <React.Fragment>
        <Auth
        successfulLogout={this.successfulLogout}
        successfulLogin={this.successfulLogin}
        isAuthenticated={this.state.isAuthenticated}/>
      </React.Fragment>
    )
  }
}

export default App
