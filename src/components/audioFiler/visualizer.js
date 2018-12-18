import React, { Component } from 'react'
import './audioModal.css'

export default class Visualizer extends Component {
  // audio analyzer

  startGraph(stream) {

    let ctx = new (window.AudioContext || window.webkitAudioContext)()
    let audioSrc = ctx.createMediaStreamSource(stream)
    let analyser = ctx.createAnalyser()
    audioSrc.connect(analyser)
    analyser.fftSize = 2048
    let visualData = new Uint8Array(1024)

    let analyse = () => {
      analyser.getByteTimeDomainData(visualData)
      return visualData
    }

    let drawGraph = () => {
      let canvasCtx
      let canvas
      let dataSet
      let WIDTH
      let HEIGHT

      if (this.refs.visualizerCanvas){
       canvas = this.refs.visualizerCanvas
       canvasCtx = canvas.getContext("2d")
       WIDTH = this.props.width;
       HEIGHT = this.props.height;
      } else {
        return
      }

      let draw = () => {
        window.requestAnimationFrame(drawGraph)
        dataSet = analyse()

        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)
        canvasCtx.fillStyle = 'black'
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

        canvasCtx.lineWidth = 2
        canvasCtx.strokeStyle = 'rgb(51, 255, 51)'


        canvasCtx.beginPath()

        let sliceWidth = WIDTH * 1.0 / 1024
        let x = 0


        for (let i = 0; i < 1024; i++) {
          let v = dataSet[i] / 128.0
          let y = v * HEIGHT / 2

          if (i === 0) {
            canvasCtx.moveTo(x, y)
          } else {
            canvasCtx.lineTo(x, y)
          }

          x += sliceWidth;
        }
        canvasCtx.lineTo(canvas.width, canvas.height / 2)
        canvasCtx.stroke()
      }
      if (this.props.recording) {
        draw()
      }
    }
      drawGraph()
  }


  render() {
    if (this.props.recording) {
      this.startGraph(this.props.audio)
    }
    return (
      <React.Fragment>
        <canvas
          ref="visualizerCanvas"
          width={this.props.width}
          height={this.props.height}
          className="visualizer"></canvas>
      </React.Fragment>
    )
  }
}