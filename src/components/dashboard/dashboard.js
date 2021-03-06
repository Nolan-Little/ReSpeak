import React, { Component } from 'react'
import { Navbar, NavbarBrand, NavLink, NavItem, Nav, Button, Row, Col, Container} from 'reactstrap';
import NoteGroup from '../note/noteGroup'
import userSession from './../../modules/userSession'
import api from './../../modules/apiManager'
import NewNoteForm from '../note/newNoteForm'
import NewCollectionForm from './../collection/newCollection'
import { FirebaseContext } from './../firebase/firebaseindex'
import 'firebase'
import './dashboard.css'
import CollectionGroup from '../collection/collectionGroup';

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
      editedTitle: null,
      deleteConfirmModal: false,
      newDropdownOpen: false
    }
  }

  componentDidMount() {
    this.getUserData(userSession.getUser())
      .then(() => this.setInitialTitle())
      .then(() => this.getUserEmail())

  }

  // API INTERACTIONS
  getUserEmail = () => {
    return api.getData(`users?id=${userSession.getUser()}`)
      .then((res) => this.setState({ userEmail: res[0].email }))
  }

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

  deleteNote = (id) => {
    return api.getData(`audio_notes?noteId=${id}`)
      .then((res) => {
        if (res.length > 0) {
          return api.getData(`audio_files?id=${res[0].audio_filesId}`)
            .then((res) => {
              let audioObj = res[0]
              this.props.firebase.audioStorage.child(`user${userSession.getUser()}`).child(audioObj.ref).delete()
              return audioObj
            }).then((audioObj) => {
              return api.deleteData(`audio_files`, audioObj.id)
            })
        }
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
      .then((res) => {
        this.setState({
          currentCollection: res.id,
          currentTitle: res.title
        })
      })
      .then(() => this.getUserData(userSession.getUser()))
  }

  deleteCollection = (id) => {
    return api.editData("collections", { deleted: true }, id)
      .then(() => {
        return api.getData(`notes?collectionId=${id}`)
          .then((notes) => {
            notes.forEach((note) => {
              this.deleteNote(note.id)
            })
          })
      })
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

  handleCollectionFieldChange = (evt) => {
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

  toggleDeleteConfirm = () => {
    this.setState({
      deleteConfirmModal: !this.state.deleteConfirmModal,
    })
  }

  setDeleteTarget = (id) => {
    this.setState({
      deleteTarget: id
    })
  }

  toggleNewDropdown = () => {
    this.setState({
      newDropdownOpen: !this.state.newDropdownOpen
    })
  }





  render() {
    return (
      <React.Fragment>
        <Navbar color="info" dark>
          <NavbarBrand color="light"><h1>ReSpeak</h1></NavbarBrand>
          <Nav className="ml-auto" navbar>
            <Row>
              <NavItem>
                {
                  this.state.userEmail
                    ?
                    <NavLink className="m-2">
                      <h5>{this.state.userEmail}</h5>
                    </NavLink>
                    :
                    null
                }
              </NavItem>
              <NavItem>
                <NavLink><Button className="m-1 mr-4" onClick={() => this.props.successfulLogout()}>Logout</Button></NavLink>
              </NavItem>
            </Row>
          </Nav>
        </Navbar>
        <Container className="m-5, dashboard--container">
          <Row className="dashboard--header">
            <Col xs="3">
              <Button className="mt-2" onClick={this.toggleCollectionForm}>
                <i className="icon-plus m-1"></i>
                Collection
               </Button>
            </Col>
            <Col xs="6">
              <h1 className="text-center title">{this.state.currentTitle}</h1>
            </Col>
          </Row>
          <Row className="dashboard--row">
            <Col xs="3" className="collection--bar">
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
              {/* create list of collection titles */}
              <CollectionGroup
                setDeleteTarget={this.setDeleteTarget}
                handleCollectionFieldChange={this.handleCollectionFieldChange}
                currentCollection={this.state.currentCollection}
                collections={this.state.collections}
                selectCollection={this.selectCollection}
                setCurrentTitle={this.setCurrentTitle}
                editingColName={this.state.editingColName}
                editTarget={this.state.editTarget}
                editColTitle={this.editColTitle}
                toggleDeleteConfirm={this.toggleDeleteConfirm}
                deleteTarget={this.state.deleteTarget}
                deleteConfirmModal={this.state.deleteConfirmModal}
                deleteCollection={this.deleteCollection}
                toggleEditColTitle={this.toggleEditColTitle} />
            </Col>
            <Col xs="1" className="new-btn-col">
              <Button onClick={() => this.toggleNoteForm()} className="m-2">
                <i className="icon-plus m-1"></i>
                Note
              </Button>
            </Col>
            <Col sm={{ size: '4', offset: 1 }} className="dashboard__note--group">
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