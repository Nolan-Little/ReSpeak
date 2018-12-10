import React, { Component } from 'react'
import { ListGroupItem, ListGroupItemHeading, Button } from 'reactstrap'
import NoteDetails from './noteDetails'

// renders individual notes in the dashboard view

export default class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      editing: false
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      editing: false
    })
  }

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing })
  }


  render() {
    return (
      <React.Fragment>
        <ListGroupItem key={this.props.note.id}>
          <ListGroupItemHeading>{this.props.note.title}</ListGroupItemHeading>
          <Button onClick={() => this.toggle()} className="m-1" color="primary">View Details</Button>
        </ListGroupItem>
        <NoteDetails
          getNoteAudio={this.props.getNoteAudio}
          collections={this.props.collections}
          deleteNote={this.props.deleteNote}
          currentCollection={this.props.currentCollection}
          editNote={this.props.editNote}
          editing={this.state.editing}
          toggleEditing={this.toggleEditing}
          note={this.props.note}
          modal={this.state.modal}
          toggle={this.toggle} />
      </React.Fragment>
    )
  }
}