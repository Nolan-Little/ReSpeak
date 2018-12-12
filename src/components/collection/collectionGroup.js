import React, { Component } from 'react'
import { Button, Col, ListGroupItem, Input } from 'reactstrap';
import DeleteConfirm from './deleteConfirm'
import './collection.css'
export default class CollectionGroup extends Component {

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  render() {
    return (
      <React.Fragment>
        {

          this.props.collections.map((col) => {
            return <ListGroupItem
              className="collection--item"
              onClick={() => {
                this.props.selectCollection(col.id)
                this.props.setCurrentTitle(col.title)
              }}
              key={col.id}>

              {
                this.props.editingColName && this.props.editTarget === col.id
                  ?
                  // EDITNG COLLECTION TITLE
                  <React.Fragment>
                    <Col xs="auto">
                      <Input autoFocus onChange={(e) => this.handleFieldChange(e)} id="editedTitle" type="text" defaultValue={col.title}></Input>
                    </Col>
                    <Col xs="2">
                      {
                        this.props.collections.length === 1
                          ?
                          <Button onClick={() => this.props.editColTitle(col.id)} className="m-1">Save</Button>
                          :
                          <React.Fragment>
                            <Button onClick={() => this.props.editColTitle(col.id)} className="m-1">Save</Button>
                            <Button onClick={() => this.props.toggleDeleteConfirm()} className="m-1">Delete</Button>
                            <DeleteConfirm
                              colId={col.id}
                              deleteCollection={this.props.deleteCollection}
                              toggle={this.props.toggleDeleteConfirm}
                              modal={this.props.deleteConfirmModal} />
                          </React.Fragment>
                      }
                    </Col>
                  </React.Fragment>
                  :
                  // NOT EDITING
                  <React.Fragment>
                    <Col xs="auto">
                      {col.title}
                    </Col>
                    <Col xs="2">
                      {
                        this.props.collections.length === 1
                          ?
                          <Button className="m-1" onClick={() => this.props.toggleEditColTitle(col.id, col.title)}>Edit</Button>
                          :
                          <React.Fragment>
                            <Button className="m-1" onClick={() => this.props.toggleEditColTitle(col.id, col.title)}>Edit</Button>
                            <Button onClick={() => this.props.toggleDeleteConfirm()} className="m-1">Delete</Button>
                            <DeleteConfirm
                              colId={col.id}
                              deleteCollection={this.props.deleteCollection}
                              toggle={this.props.toggleDeleteConfirm}
                              modal={this.props.deleteConfirmModal} />
                          </React.Fragment>
                      }
                    </Col>
                  </React.Fragment>
              }

            </ListGroupItem>
          })
        }
      </React.Fragment>
    )
  }
}