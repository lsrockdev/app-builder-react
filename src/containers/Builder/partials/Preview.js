import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Frame from 'react-frame-component';
import { Link } from 'react-router-dom';

import { FlexChildWrap } from './styles';

const propTypes = { previewSelection: PropTypes.object };

const defaultProps = {};

class Preview extends Component {
  state = {};
  render() {
    const { selection: { title, textBlocks = [] } } = this.props;
    return (
      <FlexChildWrap className="flex-d left-section-border flex-col">
        <div className="section-header-box">
          <div className="section-header-title section-header-wide">
            {title}
          </div>
        </div>
        <FlexChildWrap>
          <div
            className="section-padding flex-d flex-whole flex-col"
            style={{ paddingTop: 25 }}
          >
            <Frame
              title="selection-preview"
              frameBorder="0"
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                position: 'relative',
              }}
            >
              {textBlocks.map((block, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: block }} />
              ))}
            </Frame>
          </div>
          <Link to="/preview" className="bottom-navigation-button search-box">
            Preview Document
          </Link>
        </FlexChildWrap>
      </FlexChildWrap>
    );
  }
}

Preview.propTypes = propTypes;
Preview.defaultProps = defaultProps;

export default Preview;
