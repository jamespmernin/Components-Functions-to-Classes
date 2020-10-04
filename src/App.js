import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: true,
    };
  }

  changeMode() {
    this.setState({ darkMode: !this.state.darkMode });
  }

  render() {
    return (
      <div className="app">
        <div className={this.state.darkMode ? "dark" : "light"}>
          <div className="glow">
            <h1>Dragonfly Diner</h1>
            <h2>A Classy Restaurant</h2>
          </div>
          <button onClick={() => this.changeMode()}>Change Mode</button>
        </div>
      </div>
    );
  }
}

export default App;
