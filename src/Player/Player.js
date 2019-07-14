import React from 'react';

class Player extends React.Component {
  AudioContext = this.makeAudioContext();
  positionCounter = null;

  state = {
    buffers: {},
  }

  componentDidMount() {
    this.queuePieces();
    this.startPlayer();
  }

  makeAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      return new AudioContext();
    }
    catch(e) {
      alert('WebAudio API is not supported by your browser :\'(');
    }
  }

  queuePieces = () => Promise.all(this.props.pieces.map(this.loadAudio)).then(bufferObjects => {
    const buffers = bufferObjects.reduce((acc, bufferObject) => ({
      ...acc,
      ...bufferObject,
    }), {});
    this.setState({ buffers });
  });

  loadAudio = ({ id, audio }) => new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', audio, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      this.AudioContext.decodeAudioData(request.response, buffer => {
        resolve({
          [id]: buffer,
        });
      }, reject);
    }
    request.send();
  })

  playAudio = id => {
    const source = this.AudioContext.createBufferSource();
    source.buffer = this.state.buffers[id];
    source.connect(this.AudioContext.destination);
    source.start(0);
  }

  updatePosition = () => {
    const newPosition = this.props.position === 1199 ? 0 : this.props.position + 1;
    const pieceToPlay = this.props.pieces.find(({ position: { y }}) => y === newPosition);
    if (pieceToPlay) this.playAudio(pieceToPlay.id);
    this.props.setPosition(newPosition);
  }

  startPlayer = () => {
    this.positionCounter = setInterval(this.updatePosition, 600 / this.props.bpm)
  }

  render = () => null;
}

export default Player;
