import React, { Component } from 'react'
import { Input, Modal, ModalBody, ModalHeader, ModalFooter, Button, Row, Col } from 'reactstrap'
import moment from 'moment'

export default class NoteDetails extends Component {
  constructor() {
    super()
    this.state = {
      title: null,
      textContent: null,
      collectionId: null,
      url: null
    }
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleCollectionChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = parseInt(evt.target.value)
    this.setState(stateToChange)
  }

  saveEdit = (id) => {
    let newTimeStamp = moment(new Date()).format('lll')


    let newNote = {
      title: this.state.title,
      textContent: this.state.textContent,
      timestamp: newTimeStamp,
      collectionId: this.state.collectionId,
      isPinned: false,
      reminder: false
    }
    if (newNote.title !== null && newNote.textContent !== null && newNote.collectionId !== null) {
      this.props.editNote(newNote, id)
      this.props.toggleEditing()
    }
  }

  render() {
    if (this.props.modal) {
      this.props.getNoteAudio(this.props.note.id)
        .then((audio) => {
          if(audio.length === 1){
           this.setState({url: audio[0].audio_files.url})
          }
        })
    }

    return (

      this.props.editing

        ?
        // ALLOW EDITING
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>
            <Row>
              <Col xs={{ size: 'auto', offset: 1 }}>
                <Row>
                  <Input onChange={(e) => this.handleFieldChange(e)} id="title" type="text" defaultValue={this.props.note.title}></Input>
                </Row>
                <Row>
                  <Input id="collectionId" defaultValue={this.props.currentCollection} onChange={(e) => this.handleCollectionChange(e)} type="select">
                    {
                      this.props.collections.map((col) => {
                        return <option value={col.id} key={col.id}>{col.title}</option>
                      })
                    }

                  </Input>
                </Row>
              </Col>
            </Row>
          </ModalHeader>
          <ModalBody>
            <Input onChange={(e) => this.handleFieldChange(e)} id="textContent" type="text" defaultValue={this.props.note.textContent}></Input>
          </ModalBody>
          <ModalFooter>
            <audio src={this.state.url} controls></audio>
            <Button color="primary" onClick={() => this.saveEdit(this.props.note.id)}>Save Changes</Button>{' '}
            <Button color="secondary" onClick={() => this.props.toggleEditing()}>Cancel</Button>
          </ModalFooter>
        </Modal>

        :
        // NOT EDITING
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>
            <Row>
              <Col xs={{ size: 'auto', offset: 1 }}>
                <Row>
                  {this.props.note.title}
                </Row>
                <Row>
                  {
                    this.props.collections.map((col) => {
                      if (col.id === this.props.currentCollection) {
                        return col.title
                      }
                    })
                  }
                </Row>
              </Col>
            </Row>
          </ModalHeader>
          <ModalBody>
            {this.props.note.textContent}
          </ModalBody>
          <ModalFooter>
            <audio src={this.state.url} controls></audio>
            <Button color="primary" onClick={() => {
              this.props.toggleEditing()
              this.setState({
                title: this.props.note.title,
                textContent: this.props.note.textContent,
                collectionId: this.props.note.collectionId
              })
            }}>Edit</Button>{' '}
            <Button color="primary" onClick={() => this.props.deleteNote(this.props.note.id)}>Delete</Button>{' '}
            <Button color="secondary" onClick={() => this.props.toggle()}>Save</Button>
          </ModalFooter>
        </Modal>
    )
  }
}