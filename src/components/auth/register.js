import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class RegisterModal extends Component {
  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>Register A New Account</ModalHeader>
          <Form onSubmit={(e) => this.props.handleRegisterSubmit(e)}>
            <ModalBody >
              <FormGroup >
                <Label for="taskname">email:</Label>
                <Input
                  invalid={this.props.unsuccesfulRegister ? true : null}
                  required ref={this.nameInput} onChange={this.props.handleFieldChange} type="email" name="taskName" id="RegisterEmail" placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleDate">password:</Label>
                <Input
                  invalid={this.props.unsuccesfulRegister ? true : null}
                  required onChange={this.props.handleFieldChange} type="password" name="date" id="RegisterPassword" placeholder="Password" />
              </FormGroup>
            </ModalBody>
            <ModalFooter>

              {this.props.unsuccesfulRegister ?
              <Alert color="danger">There is already a registered user with that email</Alert>
              : null
              }

              <Button color="primary" type="submit">Login</Button>{' '}
              <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </React.Fragment>
    )
  }
}