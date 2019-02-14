import React, { Component } from 'react';
import PatchPatterns from './PatchPatterns';
import Game from './Game';
//import Tester from './Tester';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Game />
        <PatchPatterns />
      </React.Fragment>
    );
  }
}

export default App;
