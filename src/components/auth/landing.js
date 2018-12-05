import React, { Component } from 'react'
import { Jumbotron, Button } from 'reactstrap'
import LoginModal from './login'
import RegisterModal from './register'

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

  render() {
    return (
      <React.Fragment>
        <Jumbotron>
          <h1 className="display-3">ReSpeak!</h1>
          <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-2" />
          <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
          <p className="lead">
            <Button className="m-1" color="primary" onClick={() => this.toggleLoginModal()}>Login</Button>
            <LoginModal
              modal={this.state.loginModal}
              toggle={this.toggleLoginModal} />
            <Button className="m-1" color="primary" onClick={() => this.toggleRegisterModal()}>Register</Button>
            <RegisterModal
              modal={this.state.registerModal}
              toggle={this.toggleRegisterModal} />
          </p>
        </Jumbotron>
      </React.Fragment>
    )
  }
}