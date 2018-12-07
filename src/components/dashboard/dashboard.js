import React, { Component } from 'react'
import { Button, Row, Col, Container, ListGroupItem } from 'reactstrap';
import NoteGroup from '../note/noteGroup'
import userSession from './../../modules/userSession'
import api from './../../modules/apiManager'
import NewNoteForm from '../note/newNoteForm'
import NewCollectionForm from './../collection/newCollection'
export default class Dashboard extends Component {

  constructor() {
    super()
    this.state = {
      currentCollection: "initial",
      currentTitle: null,
      collections: [],
      newNoteModal: false,
      newColModal: false
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
    return api.deleteData("notes", id)
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
          <NewNoteForm
            currentCollection={this.state.currentCollection}
            collections={this.state.collections}
            newNote={this.newNote}
            toggle={this.toggleNoteForm}
            modal={this.state.newNoteModal} />
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
                    <Col xs="auto">
                      {col.title}
                    </Col>
                    <Col xs="2">
                      <Button className="m-1">Edit</Button>
                      <Button onClick={() => this.deleteCollection(col.id)} className="m-1">Delete</Button>
                    </Col>
                  </ListGroupItem>
                })
              }
            </Col>
            <Col xs="8">
              <NoteGroup
                deleteNote={this.deleteNote}
                editNote={this.editNote}
                currentCollection={this.state.currentCollection}
                collections={this.state.collections} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}