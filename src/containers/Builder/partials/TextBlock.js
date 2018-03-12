import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  templateMarkup: PropTypes.string,
  onMoveTemplateUp: PropTypes.func,
  onMoveTemplateDown: PropTypes.func,
  onEditTemplate: PropTypes.func,
  onDeleteTemplate: PropTypes.func,
  showUp: PropTypes.bool,
  showDown: PropTypes.bool,
};

const defaultProps = {};

let TextBlock = ({
  templateMarkup,
  onMoveTemplateUp,
  onMoveTemplateDown,
  onEditTemplate,
  onDeleteTemplate,
  showUp,
  showDown,
}) => {
  return (
    <div className="section-content" style={{ marginBottom: 10 }}>
      <div
        className="right-section-border"
        style={{ flex: '1 1 0%', padding: '10px 15px' }}
      >
        <div className="block-text">
          <div dangerouslySetInnerHTML={{ __html: templateMarkup }} />
        </div>
      </div>
      <div className="block-icons">
        <span style={{ marginLeft: 'auto' }}>
          <span style={{ paddingRight: 10 }}>
            <a onClick={onMoveTemplateUp}>
              <i className="action pro icon-arrow-up disabled" />
            </a>
          </span>
          <span style={{ paddingRight: 10 }}>
            <a onClick={onMoveTemplateDown}>
              <i className="action pro icon-arrow-down disabled" />
            </a>
          </span>
          <span style={{ paddingRight: 10 }}>
            <a onClick={onEditTemplate}>
              <i className="action pro icon-edit disabled" />
            </a>
          </span>
          <span style={{ paddingRight: 0 }}>
            <a onClick={onDeleteTemplate}>
              <i className="action pro icon-delete disabled" />
            </a>
          </span>
        </span>
      </div>
    </div>
  );
};

TextBlock.propTypes = propTypes;
TextBlock.defaultProps = defaultProps;

export default TextBlock;
