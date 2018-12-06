import React, { Component } from 'react'
import { Button, Row, Col, Container, ListGroupItem } from 'reactstrap';
import NoteGroup from '../note/noteGroup'
import userSession from './../../modules/userSession'
import api from './../../modules/apiManager'
import NewNoteForm from '../note/newNoteForm';
export default class Dashboard extends Component {

  constructor() {
    super()
    this.state = {
      currentCollection: "initial",
      currentTitle: null,
      collections: [],
      newNoteModal: false,
    }
  }

  // API INTERACTIONS
  getUserData = (user) => {
    return api.getData(`collections?userId=${user}&_embed=notes`)
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

  componentDidMount() {
    this.getUserData(userSession.getUser())
      .then(() => this.setInitialTitle())

  }


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

  toggleNoteForm = () => {
    this.setState({
      newNoteModal: !this.state.newNoteModal
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
          <Button onClick={this.toggleNoteForm} className="m-1">New Note</Button>
          <NewNoteForm
            currentCollection={this.state.currentCollection}
            collections={this.state.collections}
            newNote={this.newNote}
            toggle={this.toggleNoteForm}
            modal={this.state.newNoteModal} />
          <Row>
            <Col xs="3">
              {/* create list of collection titles */}
              {
                this.state.collections.map((col) => {
                  return <ListGroupItem onClick={() => {
                    this.selectCollection(col.id)
                    this.setCurrentTitle(col.title)
                  }} key={col.id}>{col.title}</ListGroupItem>
                })
              }
            </Col>
            <Col xs="9">
              <NoteGroup
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