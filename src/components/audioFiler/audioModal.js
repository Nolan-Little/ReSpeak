import React, { Component } from 'react'
import {Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import firebase from 'firebase'
import userSession from './../../modules/userSession'

export default class AudioModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audio: null,
      chunks: [],
      recording: false,
      mRec: null,
    }
  }


  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    })
    this.setState({ audio })
    this.recorder()
  }

  stopMicrophone = () => {
    this.state.audio.getTracks().forEach(track => track.stop())
    this.setState({ audio: null })
  }

  toggleMicrophone = () => {
    if (this.state.audio) {
      this.stopMicrophone()
    } else {
      this.getMicrophone()
    }
  }



  recorder = () => {
    let r = new MediaRecorder(this.state.audio)
    r.ondataavailable = (e) => {
      let newDateArray = []
      newDateArray.push(e.data)
      this.setState({ chunks: newDateArray })
    }
    r.onstop = (e) => {
      let audioBlob = new Blob(this.state.chunks, { 'type': 'audio/ogg; codecs=opus' });
      this.setState({ chunks: [] })
      let audioURL = window.URL.createObjectURL(audioBlob);
      this.setState({ audioURL: audioURL })
      this.setState({
        filepath: this.props.firebase.audioStorage.child(`user${userSession.getUser()}`).child(`audio${this.props.audioName}.ogg`),
        audioBlob: audioBlob
      })
    }
    this.setState({ mRec: r })
  }

  // TODO: FIX atttempting to get reference to strage url to pass back up to newNoteForm via function
  uploadBlob = () => {
    this.state.filepath.put(this.state.audioBlob).then( (snapshot) => {
      console.log('Uploaded a audioBlob or file!', snapshot)
      return snapshot.ref.fullpath
    }).then(()=> {
      this.state.filepath.getDownloadURL()
      .then((url) => this.props.saveDownloadURL(url))

    })
    this.toggleStopRecording()
  }

  startRecording = () => {
    this.state.mRec.start()
    this.setState({ recording: true })
  }

  stopRecording = () => {
    this.state.mRec.stop()
    this.setState({ recording: false })
  }

  toggleRecording = () => {
    if (this.state.recording) {
      this.stopRecording()
    } else {
      this.startRecording()
    }
  }

  toggleStopRecording = () => {
    this.stopMicrophone()
    this.props.toggle()
  }


  render() {
    if(this.props.modal && !this.state.audio){
      this.getMicrophone()
    }
    return (
      <Modal isOpen={this.props.modal} toggle={this.toggleStopRecording} className={this.props.className}>
          <ModalHeader toggle={this.toggleStopRecording}>
          </ModalHeader>
          <ModalBody>
            <div className="App">
              <main>
                <div className="controls">
                  <button onClick={() => this.toggleRecording()}>
                    {this.state.recording ? 'Stop' : 'Start Recording'}
                  </button>
                  <audio controls src={this.state.audioURL} />
                </div>
              </main>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.uploadBlob()}>Save</Button>{' '}
            <Button color="secondary" onClick={() => {
              this.stopMicrophone()
              this.props.toggle()
            }}>Cancel</Button>
          </ModalFooter>
      </Modal>
    )
  }
}