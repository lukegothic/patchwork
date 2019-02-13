import React, { Component } from 'react';
import PatchPatterns from './PatchPatterns';
import Game from './Game';
//import Tester from './Tester';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PatchPatterns />
        <Game />
      </div>
    );
  }
}

export default App;
