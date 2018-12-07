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
    this.props.newNote(newNote)
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

  toggleAudioModal = () => {
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
                       console.log(firebase)
                      return <AudioModal firebase={firebase} modal={this.state.audioModal} toggle={this.toggleAudioModal} />
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