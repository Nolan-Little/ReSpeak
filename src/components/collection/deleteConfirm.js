import React, { Component } from 'react'
import { Form, Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap'


export default class DeleteConfirm extends Component {
  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
        <Form onSubmit={(e) => this.handleColFormSubmit(e)}>
          <ModalHeader toggle={this.props.toggle}>
            Are you sure you want to delete this collection?
          </ModalHeader>
          <ModalBody>
            All notes in the collection and their audio files will be permanently deleted.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {
              this.props.deleteCollection(this.props.colId)
              this.props.toggle()
            }}>Delete</Button>{' '}
            <Button color="secondary" onClick={() => this.props.toggle()}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}