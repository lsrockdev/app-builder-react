import React, { Component } from 'react';
import '../App.css';

class AppHeader extends Component{
  render(){
    return(
      <div className="app-bar">
        <div className="menu">
          <img src="https://d1xvn5mjulg4qv.cloudfront.net/3.0.0/images/logo_small.png" className="menu-logo"></img>
          <div className="right">
            <button className="">
              <span style={{marginLeft: 10+'px'}}>Library</span>
            </button>
            <button className="">
              <span style={{marginLeft: 10+'px'}}>Documents</span>
            </button>
            <button className="selected">
              <span style={{marginLeft: 10+'px'}}>Support</span>
            </button>
            <button className="">
              <span style={{marginLeft: 10+'px'}}>Log out</span>
            </button>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    )
  }
}

export default AppHeader;
