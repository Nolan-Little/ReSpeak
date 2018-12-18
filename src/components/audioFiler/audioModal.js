import React, { Component } from 'react'
import { Row, Col, Alert, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import 'firebase'
import userSession from './../../modules/userSession'
import Visualizer from './visualizer'
import recordIcon from './../../../src/images/recordericon.png'
import stopIcon from './../../../src/images/stopIcon.ico'
import './audioModal.css'


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
    return await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    }).then((audio) => {
      this.setState({ audio })
      this.recorder()
    })
      .catch((audio) => {
        // catch errors if user blocks mic
        console.log(audio)
        this.setState({ audio: "error" })
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
    this.setState({ recording: false })
    this.props.toggle()
  }

  render() {
    if (this.props.modal && this.state.audio === null) {
      this.getMicrophone()
    }

    return (
      <Modal isOpen={this.props.modal} toggle={this.toggleStopRecording} className={this.props.className}>
        <ModalHeader toggle={this.toggleStopRecording}>
        Press Record Button to begin.
        </ModalHeader>
        <ModalBody className="d-flex justify-content-center">
          <Row>
            <Col xs="2" className="controls d-flex align-items-center justify-content-center">
              {
                this.state.recording
                  ?
                  <img
                    src={stopIcon}
                    className="stop-icon"
                    alt="recorder stop icon"
                    onClick={() => {
                      this.toggleRecording()
                    }}></img>
                  :
                  <img
                    src={recordIcon}
                    className="record-icon"
                    alt="recorder start icon"
                    onClick={() => {
                      this.toggleRecording()
                    }}></img>
              }
            </Col>
            <Col>
              <Visualizer
                recording={this.state.recording}
                audio={this.state.audio}
                height={100}
                width={300} />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <audio disabled controls src={this.state.audioURL} />
          {
            this.state.noAudioErr
              ?
              <Alert color="warning">No Audio Recorded</Alert>
              :
              null
          }
          <Button color="primary" onClick={() => this.uploadBlob()}>Save</Button>{' '}
          <Button color="secondary" onClick={() => {
            this.toggleStopRecording()
          }}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}