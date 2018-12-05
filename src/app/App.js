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
      this.setState({isAuthenticated: true})
    }
  }

  successfulLogin = () => {
    this.setState({isAuthenticated:true})
  }


  render() {
    return (
      <React.Fragment>
        <Auth
        successfulLogin={this.successfulLogin}
        isAuthenticated={this.state.isAuthenticated}/>
      </React.Fragment>
    )
  }
}

export default App
