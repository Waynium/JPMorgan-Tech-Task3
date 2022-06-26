import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      showGraph: false,
    };
  }

  renderGraph() {
    if (this.state.showGraph) {
      return (<Graph data={this.state.data}/>)
    }
  }

  getDataFromServer() {
    let x = 0;
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
          data: serverResponds,
          showGraph: true,
        });
      });
      x++;
      if (x > 1000) {
        clearInterval(interval);
      }
    }, 100);
  }

  render() {
    return (
      <div className="App">
        <div className="Graph">
          <header className="App-header">
            Bank Merge & Co Task 3
          </header>
          <button className="btn btn-primary Stream-button" onClick={() => {this.getDataFromServer()}}>Start Streaming Data</button>
          {this.renderGraph()}
        </div>
        <div className="task__details">
          <big>Aim</big>
          <br/>
          Use Perspective to generate a chart that displays the data feed in a clear 
          and visually appealing manner for traders to monitor this trading strategy. 
          Basically, you have to modify the existing live chart to be able to 
          (1) track and display the ratio between the two stock prices 
          (2) show the historical upper and lower bounds of the stocks' ratio 
          (3) and finally, show 'alerts'  whenever these bounds are crossed by the ratio.
          <br/>
          <br/>
          <small>
            &copy; Copyright Wandile Nyembe 2022 - All rights reserved.
          </small>
        </div>
        
      </div>
    )
  }
}

export default App;
