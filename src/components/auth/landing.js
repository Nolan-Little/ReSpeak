import React, { Component } from 'react'
import { Jumbotron, Button } from 'reactstrap'
import LoginModal from './login'
import RegisterModal from './register'
import validate from '../../modules/validateUser';

export default class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
      registerModal: false
    }
  }

  toggleLoginModal = () => {
    this.setState({ loginModal: !this.state.loginModal })
  }

  toggleRegisterModal = () => {
    this.setState({ registerModal: !this.state.registerModal })
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleLoginSubmit = (e) => {
    e.preventDefault()
    let obj = {
      email: this.state.email,
      password: this.state.password,
      unsuccesfulLogin: false
    }

    validate.existingUser(obj)
      .then((res) => {
        if (res) {
          this.props.successfulLogin()
        } else if (res === false){
          this.setState({unsuccesfulLogin:true})
        }
      })
  }


  render() {
    return (
      <React.Fragment>
        <Jumbotron>
          <h1 className="display-3">ReSpeak!</h1>
          <p className="lead">Organize your thoughts</p>
          <hr className="my-2" />
          <p className="lead">
            <Button className="m-1" color="primary" onClick={() => this.toggleLoginModal()}>Login</Button>
            <LoginModal
              unsuccesfulLogin={this.state.unsuccesfulLogin}
              handleLoginSubmit={this.handleLoginSubmit}
              handleFieldChange={this.handleFieldChange}
              modal={this.state.loginModal}
              toggle={this.toggleLoginModal} />
            <Button className="m-1" color="primary" onClick={() => this.toggleRegisterModal()}>Register</Button>
            <RegisterModal
              handleFieldChange={this.handleFieldChange}
              modal={this.state.registerModal}
              toggle={this.toggleRegisterModal} />
          </p>
        </Jumbotron>
      </React.Fragment>
    )
  }
}