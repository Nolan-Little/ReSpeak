import React, { Component } from 'react'
import { Form, Input, Modal, ModalBody, ModalHeader, ModalFooter, Button, Col, Container, Row } from 'reactstrap'
import AudioModal from './../audioFiler/audioModal'
import { FirebaseContext } from './../firebase/firebaseindex'
import 'firebase'
import userSession from './../../modules/userSession'




export default class NewNoteForm extends Component {
  constructor() {
    super()
    this.state = {
      title: "New Note",
      textContent: "Empty Note",
      audioModal: false,
      collectionId: null,
      downloadUrl: null,
      blockAudio: false,
      audioName: null
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

  blockAudio = () => {
    this.setState({ blockAudio: !this.state.blockAudio })
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
    } else if (this.state.collectionId !== null) {
      collectionId = this.state.collectionId
    } else {
      collectionId = this.props.currentCollection
    }


    let newNote = {
      title: this.state.title,
      textContent: this.state.textContent,
      timestamp: Date.now(),
      collectionId: collectionId,
      isPinned: false,
      reminder: false,
    }

    let audioObj = {
      name: "Audio Note",
      url: this.state.downloadUrl,
      ref: `audio${this.state.audioName}.ogg`
    }

    this.props.newNote(newNote)
      .then(() => this.props.getNoteId(newNote.timestamp))
      .then((notes) => {
        // retrieve note id by checking against timestamp
        let noteId
        notes.forEach((note) => {
          if (note.timestamp === newNote.timestamp) {
            noteId = note.id
          }
        })
        if (audioObj.url !== null) {
          // upload audio object and join table
          this.props.newAudio(audioObj, noteId)

          // reset state
          this.setState({
            downloadUrl: null,
            audioName: null
          })
        }
      })

    this.setState({
      title: "New Note",
      textContent: "Empty Note"
    })
    this.props.toggle()
  }


  deleteAudioandToggle = () => {
    if (this.state.downloadUrl !== null) {
      this.props.firebase.audioStorage.child(`user${userSession.getUser()}`).child(`audio${this.state.audioName}.ogg`)
      .delete().then((res) => {
        this.setState({
          audioName: null,
          title: "New Note",
          textContent: "Empty Note"
        })
        this.props.toggle()
      }).catch((res) => {
        this.setState({
          audioName: null,
          title: "New Note",
          textContent: "Empty Note"
        })
        if (res.code_ === "storage/object-not-found") {
          this.props.toggle()
        }
      })
    } else {
      this.props.toggle()
    }
  }


  createUniqueName = () => {

    // creates unique filepath by concatanating collection id and the new current time

    let collectionId
    if (this.props.currentCollection === "initial") {
      collectionId = this.props.collections[0].id
    } else {
      collectionId = this.props.currentCollection
    }

    let time = Date.now()
    if (this.state.audioName === null) {
      this.setState({ audioName: collectionId.toString() + (time.toString()) })
    }
  }

  toggleAudioModal = () => {
    this.createUniqueName()
    this.setState({
      audioModal: !this.state.audioModal,
    })
  }

  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.deleteAudioandToggle} className={this.props.className}>
        <Form onSubmit={(e) => this.handleNoteFormSubmit(e)}>
          <ModalHeader toggle={this.deleteAudioandToggle}>
            <Input maxLength="27" onChange={this.handleFieldChange} id="title" type="text" placeholder="New Note"></Input>
            <Input id="collectionId" defaultValue={this.props.currentCollection} onChange={(e) => this.handleCollectionChange(e)} type="select">
              {
                this.props.collections.map((col) => {
                  return <option value={col.id} key={col.id}>{col.title}</option>
                })
              }

            </Input>
          </ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <Col xs="7">
                  <Input onChange={this.handleFieldChange} id="textContent" type="textarea" placeholder="note contents"></Input>
                </Col>
                <Col xs="auto">
                  {
                    this.state.blockAudio
                      ?
                      <Button color="danger" onClick={(e) => {
                        e.preventDefault()
                        alert("Audio disabled, check microphone permissions")
                      }}>Audio Disabled</Button>
                      :
                      <Button onClick={() => this.toggleAudioModal()}>Record Audio</Button>
                  }
                  <FirebaseContext.Consumer>
                    {
                      firebase => {
                        return <AudioModal
                          blockAudio={this.blockAudio}
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
            <Button color="secondary" onClick={() => this.deleteAudioandToggle()}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}