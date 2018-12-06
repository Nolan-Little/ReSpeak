import React, { Component } from 'react'
import { Input, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'

export default class NoteDetails extends Component {
  constructor() {
    super()
    this.state = {
      editing: false
    }
  }

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing })
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  render() {
    return (

      this.state.editing

        ?
            // ALLOW EDITING
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>
            <Input id="title" type="text" defaultValue={this.props.note.title}></Input>
          </ModalHeader>
          <ModalBody>
            <Input id="textContent" type="text" defaultValue={this.props.note.textContent}></Input>
          </ModalBody>
          <ModalFooter>
            <audio controls></audio>
            <Button color="primary" onClick={() => this.toggleEditing()}>Save Changes</Button>{' '}
            <Button color="secondary" onClick={() => this.toggleEditing()}>Cancel</Button>
          </ModalFooter>
        </Modal>

        :
          // NOT EDITING
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>{this.props.note.title}</ModalHeader>
          <ModalBody>
            {this.props.note.textContent}
          </ModalBody>
          <ModalFooter>
            <audio controls></audio>
            <Button color="primary" onClick={() => this.toggleEditing()}>Edit</Button>{' '}
            <Button color="primary">Delete</Button>{' '}
            <Button color="secondary" onClick={() => this.props.toggle()}>Save</Button>
          </ModalFooter>
        </Modal>
    )
  }
}