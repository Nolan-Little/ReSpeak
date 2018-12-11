import React, { Component } from 'react'
import { Button, Row, Col, Container, ListGroupItem, Input } from 'reactstrap';
import NoteGroup from '../note/noteGroup'
import userSession from './../../modules/userSession'
import api from './../../modules/apiManager'
import NewNoteForm from '../note/newNoteForm'
import NewCollectionForm from './../collection/newCollection'
import { FirebaseContext } from './../firebase/firebaseindex'
import firebase from 'firebase'
import { resolve } from 'url';

export default class Dashboard extends Component {

  constructor() {
    super()
    this.state = {
      currentCollection: "initial",
      currentTitle: null,
      collections: [],
      newNoteModal: false,
      newColModal: false,
      editingColName: false,
      editTarget: null,
      editedTitle: null
    }
  }

  componentDidMount() {
    this.getUserData(userSession.getUser())
      .then(() => this.setInitialTitle())

  }

  // API INTERACTIONS
  getUserData = (user) => {
    return api.getData(`collections?userId=${user}&deleted=false&_embed=notes`)
      .then((collections) => this.setState({ collections: collections }))
      .then(() => this.getNoteAudio(1, this.state.collections))
  }

  getNoteAudio = (noteId) => {
    return api.getData(`audio_notes?noteId=${noteId}&_expand=audio_files`)
  }

  editNote = (noteObj, id) => {
    return api.editData("notes", noteObj, id)
      .then(() => this.getUserData(userSession.getUser()))
  }

  newNote = (noteObj) => {
    return api.saveData("notes", noteObj)
      .then(() => this.getUserData(userSession.getUser()))
  }

  // deleteNote = (id) => {
    // return api.deleteData("notes", id)
    //   .then(() => this.getUserData(userSession.getUser()))
  // }

  deleteNote = (id) => {
    return api.getData(`audio_notes?noteId=${id}`)
      .then((res) => {
        return api.getData(`audio_files?id=${res[0].audio_filesId}`)
          .then((res) => {
            this.props.firebase.audioStorage.child(`user${userSession.getUser()}`).child(`audio${res[0].ref}.ogg`)
          }).then((res) => {
            return api.deleteData(`audio_files`, res[0].audio_filesId)
          })
      }).then(() => {
        return api.deleteData("notes", id)
        .then(() => this.getUserData(userSession.getUser()))
      })
  }

  newAudio = (audioObj, noteId) => {
    return api.saveData("audio_files", audioObj)
      .then((response) => {
        let relObj = {
          audio_filesId: response.id,
          noteId: noteId
        }
        api.saveData("audio_notes", relObj)
      })
      .then(() => this.getUserData(userSession.getUser()))
  }

  newCollection = (colObj) => {
    return api.saveData("collections", colObj)
      .then(() => this.getUserData(userSession.getUser()))
  }

  deleteCollection = (id) => {
    return api.editData("collections", { deleted: true }, id)
      .then(() => this.getUserData(userSession.getUser()))
      .then(() => {
        this.setState({ currentCollection: "initial" })
        this.setInitialTitle()
      })
  }

  editColTitle = (id) => {
    let newTitle = {
      title: this.state.editedTitle
    }
    return api.editData("collections", newTitle, id)
      .then(() => this.getUserData(userSession.getUser()))
      .then(() => {
        this.setState({
          editingColName: false,
          editTarget: null,
          editedTitle: null,
          currentTitle: this.state.editedTitle
        })
      })
  }

  getNoteId = (timestamp) => {
    return api.getData(`notes?timestamp=${timestamp}`)
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }



  // COLLECTION STATE
  selectCollection = (id) => {
    this.setState({ currentCollection: id })
  }

  setInitialTitle = () => {
    if (this.state.currentCollection === "initial") {
      this.setState({ currentTitle: this.state.collections[0].title })
    }
  }

  setCurrentTitle = (title) => {
    this.setState({ currentTitle: title })
  }



  // FORM MODALS
  toggleNoteForm = () => {
    this.setState({
      newNoteModal: !this.state.newNoteModal
    })
  }

  toggleCollectionForm = () => {
    this.setState({
      newColModal: !this.state.newColModal
    })
  }

  toggleEditColTitle = (id, defVal) => {
    this.setState({
      editingColName: !this.state.editingColName,
      editTarget: id,
      editedTitle: defVal
    })
  }




  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={{ size: 'auto', offset: 4 }}><h1 className="text-center">Im a dashboard</h1></Col>
          <Col sm={{ size: 'auto', offset: 2 }}><Button className="m-2" onClick={() => this.props.successfulLogout()}>Logout</Button></Col>
        </Row>
        <Container className="m-5">
          <h1 className="text-center">{this.state.currentTitle}</h1>
          <Button onClick={this.toggleCollectionForm} className="m-1">New Collection</Button>
          <Button onClick={this.toggleNoteForm} className="ml-5">New Note</Button>
          <NewCollectionForm
            newCollection={this.newCollection}
            toggle={this.toggleCollectionForm}
            modal={this.state.newColModal} />
          <FirebaseContext.Consumer>
            {
              firebase => {
                return <NewNoteForm
                  firebase={firebase}
                  getNoteId={this.getNoteId}
                  currentCollection={this.state.currentCollection}
                  collections={this.state.collections}
                  newAudio={this.newAudio}
                  newNote={this.newNote}
                  toggle={this.toggleNoteForm}
                  modal={this.state.newNoteModal} />
              }
            }
          </FirebaseContext.Consumer>
          <Row>
            <Col xs="4">
              {/* create list of collection titles */}
              {
                this.state.collections.map((col) => {
                  return <ListGroupItem
                    onClick={() => {
                      this.selectCollection(col.id)
                      this.setCurrentTitle(col.title)
                    }}
                    key={col.id}>

                    {
                      this.state.editingColName && this.state.editTarget === col.id
                        ?
                        // EDITNG COLLECTION TITLE
                        <React.Fragment>
                          <Col xs="auto">
                            <Input autoFocus onChange={(e) => this.handleFieldChange(e)} id="editedTitle" type="text" defaultValue={col.title}></Input>
                          </Col>
                          <Col xs="2">
                            <Button onClick={() => this.editColTitle(col.id)} className="m-1">Save</Button>
                            <Button onClick={() => this.deleteCollection(col.id)} className="m-1">Delete</Button>
                          </Col>
                        </React.Fragment>
                        :
                        // NOT EDITING
                        <React.Fragment>
                          <Col xs="auto">
                            {col.title}
                          </Col>
                          <Col xs="2">
                            <Button className="m-1" onClick={() => this.toggleEditColTitle(col.id, col.title)}>Edit</Button>
                            <Button onClick={() => this.deleteCollection(col.id)} className="m-1">Delete</Button>
                          </Col>
                        </React.Fragment>
                    }

                  </ListGroupItem>
                })
              }
            </Col>
            <Col xs="8">


              <FirebaseContext.Consumer>
                {
                  firebase => {
                    return <NoteGroup
                      firebase={firebase}
                      getNoteAudio={this.getNoteAudio}
                      deleteNote={this.deleteNote}
                      editNote={this.editNote}
                      currentCollection={this.state.currentCollection}
                      collections={this.state.collections} />
                  }
                }
              </FirebaseContext.Consumer>

            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}