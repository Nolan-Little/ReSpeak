import React, { Component } from 'react'
import { Row, Col, ListGroupItem, ListGroupItemHeading, Button } from 'reactstrap'
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
    if (!this.state.url) {
      this.props.getNoteAudio(this.props.note.id)
        .then((audio) => {
          if (audio.length === 1) {
            this.setState({ url: audio[0].audio_files.url })
          }
        })
    }

    return (
      <React.Fragment>
        <ListGroupItem className="note" key={this.props.note.id}>
          <Row>
            <ListGroupItemHeading>{this.props.note.title}</ListGroupItemHeading>
            <Col>
              {
                this.state.url
                  ?
                  <i className="icon-volume-2"></i>
                  :
                  null
              }
            </Col>
          </Row>
          <Row>
            <Button onClick={() => this.toggle()} className="m-1" color="primary">View Details</Button>
          </Row>
        </ListGroupItem>
        <NoteDetails
          firebase={this.props.firebase}
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