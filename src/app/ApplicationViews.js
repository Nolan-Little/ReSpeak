import React, { Component } from 'react'
import Dashboard from '../components/dashboard/dashboard'
import userSession from './../modules/userSession'
import api from './../modules/apiManager'


export default class ApplicationViews extends Component {
  constructor(){
    super()
    this.state={
      collections: []
    }
  }

  getUserData = (user) => {
    api.getData(`collections?userId=${user}&_embed=notes`)
      .then((collections) => this.setState({collections:collections}))
  }

  componentDidMount(){
    this.getUserData(userSession.getUser())
  }

  render(){
    return (
      <React.Fragment>
        <Dashboard collections={this.state.collections}/>
      </React.Fragment>
    )
  }
}