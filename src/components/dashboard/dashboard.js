import React, { Component } from 'react'
import { Button, Row, Col, Container, ListGroupItem } from 'reactstrap';
import NoteGroup from './noteGroup'

export default class Dashboard extends Component {

  constructor() {
    super()
    this.state = {
      currentCollection: "initial"
    }
  }




  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={{ size: 'auto', offset: 4 }}><h1 className="text-center">Im a dashboard</h1></Col>
          <Col sm={{ size: 'auto', offset: 2 }}><Button className="m-2" onClick={() => this.props.successfulLogout()}>Logout</Button></Col>
        </Row>
        <Container className="m-5">
          <h1 className="text-center">Collection Title</h1>
          <Row>
            <Col xs="3">
              {
                this.props.collections.map((col) => {
                  return <ListGroupItem id={col.id} key={col.id}>{col.title}</ListGroupItem>
                })
              }
            </Col>
            <Col xs="9">
              <NoteGroup currentCollection={this.state.currentCollection} collections={this.props.collections} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}