import React, { Component } from 'react';
import './App.css';

// Using props.children we can pass child elements to the component instance  for rendering.
const Border = (props) => <div className={'FancyBorder'}>{props.children} </div>


class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date(), counterTimer: 0, showTimer: '00:00', isEnd: false, isStart: false, isSelect: false };
    // this.isStart = false;
  }
  // this function will be invoked a setInterval function immediately after the view is ready and rendered.
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  tick() {
    this.setState({ date: new Date() });
  }
  down() {
    let count = this.state.counterTimer;
    let isEnd = this.state.isEnd;
    if (!isEnd) {
      count--;
      let m = Math.floor(count / 60);
      let s = count % 60;
      s < 10 ? s = '0' + s : null;
      let showTimer = `${m}:${s}`;
      count === 0 ? (isEnd = true) : (isEnd = false);
      this.setState(() => {
        return { counterTimer: count, showTimer: showTimer, isEnd: isEnd };
      });
    }
    else {
      clearInterval(this.countDown);

      this.setState(() => {
        return { isSelect: false, isStart: false, isEnd: false };
      });
    }

  }
  //shut down the clock process when the instance of Clock instance is removed.
  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.countDown);
  }
  selectTimer = (e) => {
    let showTimer = `${e.target.value}:00`;
    this.setState({ counterTimer: e.target.value * 60, showTimer: showTimer, isSelect: true });
  }
  startTimer = () => {
    // disable the button after start timer
    // this.isStart = true;
    this.setState({ isStart: true });
    this.countDown = setInterval(() => this.down(), 1000);
  }
  render() {
    return (
      <React.Fragment>
        <Border>
          {/* <h2>It is {this.state.date.toLocaleTimeString()}</h2> */}
          <h2> Timer Break</h2>
        </Border>
        <p>Choose time:</p>
        <button onClick={this.selectTimer} value="25">25</button>
        <button onClick={this.selectTimer} value="1">1</button>
        <hr />
        <h2 className="timer">
          {(!this.state.isEnd && this.state.isSelect) ? this.state.showTimer : '00:00'}
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

