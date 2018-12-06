import React, { Component } from 'react'
import { ListGroup } from 'reactstrap'
import Note from './note'

export default class NoteGroup extends Component {
  render() {
    return (
      <ListGroup>
        {
          // "initial is the default value of the current collection state"
          this.props.currentCollection === "initial" && this.props.collections.length > 0
            ?
            this.props.collections[0].notes.map((note) => {
              return (
                <Note note={note} />
              )
            })

            :

            // if other than initial, match current collection with correct col and loop over its notes.
            this.props.collections.map((col) => {

              return col.notes.map((note) => {
                if (note.collectionId === this.props.currentCollection)
                  return (
                    <Note note={note} />
                  )
              })

            })

        }
      </ListGroup>
    )
  }
}