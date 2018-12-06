import React, { Component } from 'react'
import { Row, Col, Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';


export default class Dashboard extends Component {

  constructor(){
    super()
    this.state ={
      currentCollection: null
    }
  }




  render() {
    return (
      <React.Fragment>
        <h1 className="text-center">Im a dashboard</h1>
        <Container className="m-5">
        <h1 className="text-center">Collection Title</h1>
          <Row>
            <Col xs="3">
                {
                  this.props.collections.map((col) => {
                    return <ListGroupItem id={col.title} key={col.id}>{col.title}</ListGroupItem>
                  })
                }
            </Col>
            <Col xs="9">
              <ListGroup>
                <ListGroupItem active>
                  <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
                  <ListGroupItemText>
                    Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
                  <ListGroupItemText>
                    Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
                  <ListGroupItemText>
                    Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                  </ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}