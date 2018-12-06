import React, { Component } from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap'

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
                <ListGroupItem key={note.id}>
                  <ListGroupItemHeading>{note.title}</ListGroupItemHeading>
                </ListGroupItem>
              )
            })

            :

            // if other than initial, match current collection with correct col and loop over its notes.
            this.props.collections.map((col) => {

              return col.notes.map((note) => {
                if (note.collectionId === this.props.currentCollection)
                  return (
                    <ListGroupItem key={note.id}>
                      <ListGroupItemHeading>{note.title}</ListGroupItemHeading>
                    </ListGroupItem>
                  )
                })

            })

        }
      </ListGroup>
    )
  }
}