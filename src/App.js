import React, { Component } from 'react';
import './App.css';

import AppHeader from './components/AppHeader';
import Billboard from './components/Billboard';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader/>
        <div>
          <Billboard/>
          <FAQ/>
          <ContactForm/>
        </div>

      </div>
    );
  }
}

export default App;
