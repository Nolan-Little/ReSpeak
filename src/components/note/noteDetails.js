import React, { Component } from 'react'
import { Input, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import moment from 'moment'

export default class NoteDetails extends Component {
  constructor() {
    super()
    this.state = {
      title: null,
      textContent: null,
    }
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  saveEdit = (id) => {
    let newTimeStamp = moment(new Date()).format('lll')


    let newNote = {
      title: this.state.title,
      textContent: this.state.textContent,
      timestamp: newTimeStamp,
      collectionId: this.props.currentCollection,
      isPinned: false,
      reminder: false
    }
    if (newNote.title !== null && newNote.textContent !== null && newNote.collectionId !== null) {
      this.props.editNote(newNote, id)
      this.props.toggleEditing()
    }
  }

  render() {
    return (

      this.props.editing

        ?
        // ALLOW EDITING
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>
            <Input onChange={(e) => this.handleFieldChange(e)} id="title" type="text" defaultValue={this.props.note.title}></Input>
          </ModalHeader>
          <ModalBody>
            <Input onChange={(e) => this.handleFieldChange(e)} id="textContent" type="text" defaultValue={this.props.note.textContent}></Input>
          </ModalBody>
          <ModalFooter>
            <audio controls></audio>
            <Button color="primary" onClick={() => this.saveEdit(this.props.note.id)}>Save Changes</Button>{' '}
            <Button color="secondary" onClick={() => this.props.toggleEditing()}>Cancel</Button>
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
            <Button color="primary" onClick={() => {
              this.props.toggleEditing()
              this.setState({
                title: this.props.note.title,
                textContent: this.props.note.textContent
              })
            }}>Edit</Button>{' '}
            <Button color="primary" onClick={() => this.props.deleteNote(this.props.note.id)}>Delete</Button>{' '}
            <Button color="secondary" onClick={() => this.props.toggle()}>Save</Button>
          </ModalFooter>
        </Modal>
    )
  }
}