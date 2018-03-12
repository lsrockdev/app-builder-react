import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FlexChildWrap } from './styles';

class Preview extends Component {
  state = {};
  render() {
    return (
      <FlexChildWrap className="flex-d left-section-border flex-col">
        <div className="section-header-box" />
        <FlexChildWrap>
          <div className="flex-d flex-whole flex-col overflow-y-s" />
          <div className="search-box" />
        </FlexChildWrap>
      </FlexChildWrap>
    );
  }
}

export default Preview;
