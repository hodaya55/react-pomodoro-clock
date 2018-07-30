import React, { Component } from 'react';
import './App.css';
import sound from './intro.mp3'

// Using props.children we can pass child elements to the component instance  for rendering.
const Border = (props) => <div className={'FancyBorder'}>{props.children} </div>

const ChooseTimer = (props) =>
  <button className="chooseTime" onClick={props.selectTimer} value={props.time}>{props.time}</button>

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(), counterTimer: 0, showTimer: '00:00', isStart: false,
      isSelect: false, isStop: false, isReset: false, play: false
    };
    this.audio = new Audio(sound);
  }
  // this function will be invoked a setInterval function immediately after the view is ready and rendered.
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  togglePlay = () => {
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
      this.audio.play();
      count--;
      let m = Math.floor(count / 60);
      let s = count % 60;
      let showTimer = `${m < 10 ? ('0' + m) : m}:${s < 10 ? ('0' + s) : s}`;
      this.setState(() => {
        return { counterTimer: count, showTimer: showTimer, play: true };
      });
    }
    else { // timer is over
      clearInterval(this.countDown);
      this.audio.pause();
      this.setState(() => {
        return { isSelect: false, isStart: false, play: false };
      });
    }

  }
  //shut down the clock process when the instance of Clock instance is removed.
  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.countDown);
  }
  selectTimer = (e) => {
    let { value } = e.target;
    let showTimer = `${value < 10 ? ('0' + value) : value}:00`;
    if (this.state.isStart && this.state.isSelect) {
      this.setState({ counterTimer: e.target.value * 60, showTimer: showTimer, isStart: false });
      this.audio.pause();
    }
    else if (!this.state.isStart) {
      this.setState({ counterTimer: e.target.value * 60, showTimer: showTimer, isSelect: true });
      this.audio.pause();
    }

  }
  startTimer = () => {
    // disable the button after start timer
    // this.isStart = true;
    this.setState({ isStart: true });
    this.countDown = setInterval(() => this.down(), 1000);
  }
  stopTimer = () => {
    clearInterval(this.countDown);
    this.audio.pause();

    this.setState({ isStop: true, isStart: false, play: false });
  }
  resetTimer = () => {
    clearInterval(this.countDown);
    this.audio.pause();
    this.audio = new Audio(sound);

    this.setState({ showTimer: '00:00', isSelect: false, isStart: false, counterTimer: 0, play: false });
  }
  render() {
    return (
      <React.Fragment>
        {/* <Border> */}
        {/* <h2>It is {this.state.date.toLocaleTimeString()}    now</h2> */}
        {/* <h2> Timer Break</h2> */}
        {/* </Border> */}
        <h1>Choose time:</h1>
        <ChooseTimer time={25} selectTimer={this.selectTimer} />
        <ChooseTimer time={20} selectTimer={this.selectTimer} />
        <ChooseTimer time={15} selectTimer={this.selectTimer} />
        <ChooseTimer time={10} selectTimer={this.selectTimer} />
        <ChooseTimer time={5} selectTimer={this.selectTimer} />
        <ChooseTimer time={1} selectTimer={this.selectTimer} />
        <hr />
        <h2 className="timer">
          {
            this.state.showTimer
          }
        </h2>
        <div className="actions">
          <button disabled={this.state.isStart} onClick={this.startTimer} >Start >></button>
          <button onClick={this.stopTimer} >Stop ||</button>
          <button onClick={this.resetTimer} >Reset •</button>
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

