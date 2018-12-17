import React, { Component } from 'react'
// import * as d3 from "d3"

export default class Visualizer extends Component {
  // audio analyzer
  // createContext = (stream) => {
  //   let ctx = new (window.AudioContext || window.webkitAudioContext)()
  //   let audioSrc = ctx.createMediaStreamSource(stream)
  //   let analyser = ctx.createAnalyser()
  //   audioSrc.connect(analyser)
  //   analyser.fftSize = 2048
  // }


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

      let canvas = this.refs.visualizerCanvas
      let canvasCtx = canvas.getContext("2d")
      let dataSet
      let WIDTH = this.props.width;
      let HEIGHT = this.props.height;

      let draw = () => {
        window.requestAnimationFrame(drawGraph)
        dataSet = analyse()

        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)
        canvasCtx.fillStyle = 'rgb(22,107,161)'
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

        canvasCtx.lineWidth = 2
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)'


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
    } else {
      console.log("hello")
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