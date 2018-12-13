import React, { Component } from 'react'
import { ListGroup } from 'reactstrap'
import Note from './note'
import './note.css'


export default class NoteGroup extends Component {
  render() {
    return (
      <ListGroup id="noteContainer">
        {
          // "initial is the default value of the current collection state"
          this.props.currentCollection === "initial" && this.props.collections.length > 0
            ?
            this.props.collections[0].notes.length === 0
              ?
              <h1> nothing</h1>
              :
              this.props.collections[0].notes.map((note) => {
                return (
                  <Note
                    firebase={this.props.firebase}
                    getNoteAudio={this.props.getNoteAudio}
                    collections={this.props.collections}
                    deleteNote={this.props.deleteNote}
                    editNote={this.props.editNote}
                    currentCollection={this.props.collections[0].id}
                    key={note.id}
                    note={note} />
                )
              })

            :

            // if other than initial, match current collection with correct col and loop over its notes.
            this.props.collections.map((col) => {
              if (col.notes.length === 0 && col.id === this.props.currentCollection) {
                return <h1>Nothing</h1>
              } else {
                return col.notes.map((note) => {
                  if (note.collectionId === this.props.currentCollection) {
                    return (
                      <Note
                        firebase={this.props.firebase}
                        getNoteAudio={this.props.getNoteAudio}
                        collections={this.props.collections}
                        deleteNote={this.props.deleteNote}
                        currentCollection={col.id}
                        key={note.id}
                        editNote={this.props.editNote}
                        note={note} />
                    )
                  } else {
                    return null
                  }
                })
              }
            })

        }
      </ListGroup>
    )
  }
}