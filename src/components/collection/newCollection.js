import React, { Component } from 'react'
import { Form, Input, Modal, ModalHeader, ModalFooter, Button } from 'reactstrap'
import userSession from './../../modules/userSession'

export default class NewCollectionForm extends Component {
  constructor(){
    super()
    this.state = {
      title: "My Collection"
    }
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleColFormSubmit = (e) => {
    e.preventDefault()
    let colObj = {
      title: this.state.title,
      userId: userSession.getUser(),
      deleted: false
    }
    if (colObj.title === ""){
      colObj.title = "My Collection"
    }
    this.props.newCollection(colObj)
    this.setState({
      title: "My Collection",
    })
    this.props.toggle()
  }

  resetForm = () => {
    this.setState({
      title: "My Collection",
    })
    this.props.toggle()
  }

  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
        <Form onSubmit={(e) => this.handleColFormSubmit(e)}>
          <ModalHeader toggle={this.props.toggle}>
            <Input maxlength="27" onFocus={(e)=> e.target.value = ""} onChange={this.handleFieldChange} id="title" type="text" required defaultValue={"My Collection"}></Input>
          </ModalHeader>
          <ModalFooter>
            <Button color="primary">Create Collection</Button>{' '}
            <Button color="secondary" onClick={() => this.resetForm()}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}