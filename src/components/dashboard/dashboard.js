import React, { Component } from 'react'
import { Button, Row, Col, Container, ListGroupItem } from 'reactstrap';
import NoteGroup from '../note/noteGroup'
import userSession from './../../modules/userSession'
import api from './../../modules/apiManager'
export default class Dashboard extends Component {

  constructor() {
    super()
    this.state = {
      currentCollection: "initial",
      currentTitle: null,
      collections: []
    }
  }

  getUserData = (user) => {
    return api.getData(`collections?userId=${user}&_embed=notes`)
      .then((collections) => this.setState({ collections: collections }))
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




  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={{ size: 'auto', offset: 4 }}><h1 className="text-center">Im a dashboard</h1></Col>
          <Col sm={{ size: 'auto', offset: 2 }}><Button className="m-2" onClick={() => this.props.successfulLogout()}>Logout</Button></Col>
        </Row>
        <Container className="m-5">
          <h1 className="text-center">{this.state.currentTitle}</h1>
          <Row>
            <Col xs="3">
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
              <NoteGroup currentCollection={this.state.currentCollection} collections={this.state.collections} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}