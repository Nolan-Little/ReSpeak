import React, { Component } from 'react'
import { ListGroupItem, ListGroupItemHeading, Button } from 'reactstrap'

export default class Note extends Component {
  render() {
    return (
      <React.Fragment>
        <ListGroupItem key={this.props.note.id}>
          <ListGroupItemHeading>{this.props.note.title}</ListGroupItemHeading>
          <Button className="m-1" color="primary">View Details</Button>
          <Button className="m-1" color="primary">Edit</Button>
          <Button className="m-1" color="primary">Delete</Button>
        </ListGroupItem>
      </React.Fragment>
    )
  }
}