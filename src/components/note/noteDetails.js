import React, { Component } from 'react'
import {Modal, ModalBody, ModalHeader, ModalFooter, Button} from 'reactstrap'

export default class NoteDetails extends Component {
  render () {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
      <ModalHeader toggle={this.props.toggle}>{this.props.note.title}</ModalHeader>
      <ModalBody>
        {this.props.note.textContent}
      </ModalBody>
      <ModalFooter>
        <audio controls></audio>
        <Button color="primary">Edit</Button>{' '}
        <Button color="primary">Delete</Button>{' '}
        <Button color="secondary" onClick={()=>this.props.toggle()}>Save</Button>
      </ModalFooter>
    </Modal>
    )
  }
}