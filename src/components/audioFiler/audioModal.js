import React, { Component } from 'react'
import { Alert, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import firebase from 'firebase'
import userSession from './../../modules/userSession'
import { resolve } from 'path';

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
    }).then((audio) => {
      this.setState({ audio })
      this.recorder()

    })
    .catch((audio) => {
      // catch errors if user blocks mic
      console.log(audio)
      this.setState({audio: "error"})
      this.props.blockAudio()
      this.props.toggle()
    })
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
      let newDataArray = []
      newDataArray.push(e.data)
      this.setState({ chunks: newDataArray })
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

  // checks to see if there is a created filepath. i.e. there has been audio recorded and filepath set in state then
  // uploads blob, else displays warning
  uploadBlob = () => {
    if (this.state.filepath) {
      this.state.filepath.put(this.state.audioBlob).then((snapshot) => {
        console.log('Uploaded a audioBlob or file!', snapshot)
        return snapshot.ref.fullpath
      }).then((ref) => {
        this.state.filepath.getDownloadURL()
          .then((url) => this.props.saveDownloadURL(url))

      })
      this.toggleStopRecording()
    } else {
      this.setState({ noAudioErr: true })
    }
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
    if (this.props.modal && this.state.audio === null) {
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
          {
            this.state.noAudioErr
              ?
              <Alert color="warning">No Audio Recorded</Alert>
              :
              null
          }
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