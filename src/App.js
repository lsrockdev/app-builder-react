import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AppHeader from './components/AppHeader';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader/>
      </div>
    );
  }
}

export default App;
