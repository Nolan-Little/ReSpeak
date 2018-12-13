import React, { Component } from 'react'
import { ButtonGroup, Button, Col, ListGroupItem, Input } from 'reactstrap';
import DeleteConfirm from './deleteConfirm'
import './collection.css'
export default class CollectionGroup extends Component {


  setActive = (id) => {
    if (id === this.props.currentCollection) {
      return "primary"
    }
  }

  setInitial = (id) => {
    if (this.props.collections[0].id === id) {
      return "primary"
    }
  }

  render() {
    return (
      <React.Fragment>
        {

          this.props.collections.map((col) => {
            return <ListGroupItem
              className={
                this.props.editingColName && this.props.editTarget === col.id
                  ?
                  "collection--item d-flex-column "
                  :
                  "collection--item d-flex"}
              onClick={() => {
                this.props.selectCollection(col.id)
                this.props.setCurrentTitle(col.title)
              }}
              key={col.id}
              color={
                this.props.currentCollection === "initial"
                  ?
                  this.setInitial(col.id)
                  :
                  this.setActive(col.id)
              }>
              {
                this.props.editingColName && this.props.editTarget === col.id
                  ?
                  // EDITNG COLLECTION TITLE
                  <React.Fragment>
                    <Col xs="auto p-0">
                      <Input maxlength="27" autoFocus onChange={(e) => this.props.handleCollectionFieldChange(e)} id="editedTitle" type="text" defaultValue={col.title}></Input>
                    </Col>
                    <Col xs="2">
                      {
                        this.props.collections.length === 1
                          ?
                          <Button color="primary" onClick={() => this.props.editColTitle(col.id)} className="m-2">Save</Button>
                          :
                          <React.Fragment>
                            <Button color="primary" onClick={() => this.props.editColTitle(col.id)} className="m-2">Save</Button>
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
                    <Col xs="7 p-0">
                      <h5>{col.title}</h5>
                    </Col>
                    <Col xs="2" >
                      {
                        this.props.collections.length === 1
                          ?
                          <Button color="primary" onClick={() => this.props.toggleEditColTitle(col.id, col.title)}><i className="icon-pencil"></i></Button>
                          :
                          <React.Fragment>
                            <ButtonGroup>
                              <Button color="primary" onClick={() => this.props.toggleEditColTitle(col.id, col.title)}><i className="icon-pencil"></i></Button>
                              <Button color="primary" onClick={() => {
                                this.props.toggleDeleteConfirm()
                                this.props.setDeleteTarget(col.id)
                              }
                            }>
                            <i className="icon-trash"></i></Button>
                            </ButtonGroup>
                            {
                              this.props.deleteTarget === col.id
                              ?
                              <DeleteConfirm
                                colId={col.id}
                                deleteCollection={this.props.deleteCollection}
                                toggle={this.props.toggleDeleteConfirm}
                                modal={this.props.deleteConfirmModal} />
                                : null
                              }
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