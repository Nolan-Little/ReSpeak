import React, { Component } from 'react'
import { Form, Input, Modal, ModalBody, ModalHeader, ModalFooter, Button, Col, Container, Row } from 'reactstrap'
import moment from 'moment'
import AudioModal from './../audioFiler/audioModal'
import { FirebaseContext } from './../firebase/firebaseindex'
import firebase from 'firebase'




export default class NewNoteForm extends Component {
  constructor() {
    super()
    this.state = {
      title: "New Note",
      textContent: "Empty Note",
      audioModal: false
    }
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  saveDownloadURL = (url) => {
    this.setState({ downloadUrl: url })
  }

  handleNoteFormSubmit = (e) => {
    e.preventDefault()

    // ensure default value of initial can be converted to correct collection id
    let collectionId = null
    if (this.props.currentCollection === "initial") {
      collectionId = this.props.collections[0].id
    } else {
      collectionId = this.props.currentCollection
    }


    let newNote = {
      title: this.state.title,
      textContent: this.state.textContent,
      timestamp: moment(new Date()).format('lll'),
      collectionId: collectionId,
      isPinned: false,
      reminder: false,
    }

    let audioObj = {
      name: "Audio Note",
      url: this.state.downloadUrl
    }

    this.props.newNote(newNote)
      .then(() => this.props.getNoteId(newNote.timestamp))
      .then((notes) => {
        let noteId = notes[0].id
        this.props.newAudio(audioObj, noteId)
      })

    this.setState({
      title: "New Note",
      textContent: "Empty Note"
    })
    this.props.toggle()
  }

  resetForm() {
    this.setState({
      title: "New Note",
      textContent: "Empty Note"
    })
    this.props.toggle()
  }

  createUniqueName = () => {

    // creates unique filepath by concatanating collection id and the new current time

    let collectionId = null
    if (this.props.currentCollection === "initial") {
      collectionId = this.props.collections[0].id
    } else {
      collectionId = this.props.currentCollection
    }

    let time = Date.now()
    this.setState({ audioName: collectionId.toString() + (time.toString()) })
  }

  toggleAudioModal = () => {
    this.createUniqueName()
    this.setState({ audioModal: !this.state.audioModal })
  }

  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
        <Form onSubmit={(e) => this.handleNoteFormSubmit(e)}>
          <ModalHeader toggle={this.props.toggle}>
            <Input onChange={this.handleFieldChange} id="title" type="text" placeholder="New Note"></Input>
          </ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <Col xs="7">
                  <Input onChange={this.handleFieldChange} id="textContent" type="textarea" placeholder="note contents"></Input>
                </Col>
                <Col xs="auto">
                  <Button onClick={() => this.toggleAudioModal()}>Record Audio</Button>
                  <FirebaseContext.Consumer>
                    {
                      firebase => {
                        return <AudioModal
                          saveDownloadURL={this.saveDownloadURL}
                          audioName={this.state.audioName}
                          firebase={firebase}
                          modal={this.state.audioModal}
                          toggle={this.toggleAudioModal} />
                      }
                    }
                  </FirebaseContext.Consumer>
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Save</Button>{' '}
            <Button color="secondary" onClick={() => this.resetForm()}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}