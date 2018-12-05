import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class LoginModal extends Component {
  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>Login</ModalHeader>
          <Form onSubmit={(e) => this.props.handleLoginSubmit(e)}>
            <ModalBody >
              <FormGroup >
                <Label for="taskname">email:</Label>
                <Input required ref={this.nameInput} onChange={this.props.handleFieldChange} type="email" name="taskName" id="email" placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleDate">password:</Label>
                <Input required onChange={this.props.handleFieldChange} type="password" name="date" id="password" placeholder="Password" />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">Login</Button>{' '}
              <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </React.Fragment>
    )
  }
}