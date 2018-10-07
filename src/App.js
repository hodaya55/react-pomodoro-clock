import React, { Component } from 'react';
import './App.css';
import sound from './intro.mp3'
import endSound from './endClock.mp3'

// Using props.children we can pass child elements to the component instance  for rendering.
// const Border = (props) => <div className={'FancyBorder'}>{props.children} </div>

const ChooseTimer = (props) =>
  <button className={props.active ? 'chooseTime active' : 'chooseTime'}
    onClick={props.selectTimer} id={props.i} value={props.time}>{props.time}</button>

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(), counterTimer: 0, showTimer: '00:00', isStart: false,
      isSelect: false, isStop: false, isReset: false, play: false, indexTimer: null
    };
    this.audio = new Audio(sound);
    this.endAudio = new Audio(endSound);

  }
  // this function will be invoked a setInterval function immediately after the view is ready and rendered.
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    // this.loopAudio();
  }

  togglePlay = () => { //not used
    // this.setState({ play: !this.state.play });
    console.log(this.audio);
    this.state.play ? this.audio.play() : this.audio.pause();
  }

  tick() {
    this.setState({ date: new Date() });
  }

  down() {
    let count = this.state.counterTimer;
    if (this.state.isStart && count > 0) {
      this.audio.play(); // in order to loop the audio after song finish
      count--;
      let m = Math.floor(count / 60);
      let s = count % 60;
      let showTimer = `${m < 10 ? ('0' + m) : m}:${s < 10 ? ('0' + s) : s}`;
      this.setState(() => {
        return { counterTimer: count, showTimer: showTimer, play: true };
      });
    }
    // !check that
    else if (this.state.isSelect) {
      clearInterval(this.countDown);
      this.setState(() => {
        return;
      });
    }

    // else
    if (count === 0) { // timer is over
      clearInterval(this.countDown);

      this.audio.pause();
      this.audio = new Audio(sound);

      this.endAudio = new Audio(endSound);
      this.endAudio.play();

      this.setState(() => {
        return { isSelect: false, isStart: false, isStop: false, isReset: false, play: false, };
      });
    }

  }

  loopAudio = () => {//not used
    this.audio.addEventListener('ended', () => {
      this.currentTime = 0;
      this.play();
    }, false);
  }

  //shut down the clock process when the instance of Clock instance is removed.
  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.countDown);
  }

  selectTimer = (e) => {
    console.log(e.target.id);

    this.setState({ indexTimer: parseInt(e.target.id), isReset: false, isStop: false });

    let { value } = e.target;
    let showTimer = `${value < 10 ? ('0' + value) : value}:00`;
    if (this.state.isStart && this.state.isSelect) {
      this.setState({ counterTimer: e.target.value * 60, showTimer: showTimer, isStart: false });
      this.audio.pause();
      this.audio = new Audio(sound);
    }
    else if (!this.state.isStart) {
      this.setState({ counterTimer: e.target.value * 60, showTimer: showTimer, isSelect: true });
      this.audio.pause();
    }

  }
  startTimer = () => {
    // this.endAudio.pause();
    // disable the button after start timer
    this.setState({ isStart: true, isStop: false, isReset: false });
    this.countDown = setInterval(() => this.down(), 1000);
    this.audio.play();
  }

  stopTimer = () => {
    clearInterval(this.countDown);
    this.audio.pause();
    this.setState({ isStop: true, isStart: false, play: false, isReset: false });
  }

  resetTimer = () => {
    clearInterval(this.countDown);
    this.audio.pause();
    this.audio = new Audio(sound);
    this.setState({ showTimer: '00:00', isSelect: false, isStart: false, isStop: false, counterTimer: 0, play: false, indexTimer: null, isReset: true });
  }

  render() {
    const timers = [1, 5, 10, 15, 20, 25, 30];

    return (
      <React.Fragment>
        {/* <Border> */}
        {/* <h2>It is {this.state.date.toLocaleTimeString()}    now</h2> */}
        {/* <h2> Timer Break</h2> */}
        {/* </Border> */}
        <h1 className="choose">Choose Time:</h1>

        {timers.map((t, i) =>
          <ChooseTimer key={i} time={t} i={i} selectTimer={this.selectTimer} active={this.state.indexTimer === i ? true : false} />)}

        <hr />
        <h2 className="timer">
          {this.state.showTimer}
        </h2>

        <div className="actions">
          {/* <button disabled={this.state.isStart} onClick={this.startTimer} >Start >></button>
          <button onClick={this.stopTimer} >Pause ||</button>
          <button onClick={this.resetTimer} >Reset •</button> */}
          <button className={this.state.isStart && this.state.isSelect ? 'active' : ''}
            disabled={this.state.isStart} onClick={this.startTimer} >Start >></button>
          <button className={this.state.isStop ? 'active' : ''} onClick={this.stopTimer} >Pause ||</button>
          <button className={this.state.isReset ? 'active' : ''} onClick={this.resetTimer} >Reset •</button>
        </div>
      </React.Fragment>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Clock />
      </div>
    );
  }
}

export default App;

