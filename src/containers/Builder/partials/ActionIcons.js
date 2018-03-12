import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  selection: PropTypes.object,
  showArrowLeft: PropTypes.bool,
  showArrowDown: PropTypes.bool,
  showArrowRight: PropTypes.bool,
  showArrowUp: PropTypes.bool,
  onModifySelection: PropTypes.func,
  showUpdateSectionModal: PropTypes.func,
};

const defaultProps = {};

let ActionIcons = ({
  showArrowLeft,
  showArrowDown,
  showArrowRight,
  showArrowUp,
  onModifySelection,
  showUpdateSectionModal,
  selection,
}) => {
  return (
    <span className="func-icons">
      {showArrowLeft && (
        <span className="pad_10">
          <a
            className="pointer-s"
            onClick={e => {
              onModifySelection(selection.id, 'left', e);
            }}
          >
            <i name="test" className="action pro icon-arrow-left  disabled" />
          </a>
        </span>
      )}
      {showArrowRight && (
        <span className="pad_10">
          <a
            className="pointer-s"
            onClick={e => {
              onModifySelection(selection.id, 'right', e);
            }}
          >
            <i name="test" className="action pro icon-arrow-right  disabled" />
          </a>
        </span>
      )}
      {showArrowUp && (
        <span className="pad_10">
          <a
            className="pointer-s"
            onClick={e => {
              onModifySelection(selection.id, 'up', e);
            }}
          >
            <i name="test" className="action pro icon-arrow-up  disabled" />
          </a>
        </span>
      )}
      {showArrowDown && (
        <span className="pad_10">
          <a
            className="pointer-s"
            onClick={e => {
              onModifySelection(selection.id, 'down', e);
            }}
          >
            <i name="test" className="action pro icon-arrow-down  disabled" />
          </a>
        </span>
      )}
      <span className="pad_10">
        <a
          className="pointer-s"
          onClick={e => {
            showUpdateSectionModal(
              selection.id,
              selection.title,
              selection.textBlocks,
              'visible',
              e
            );
          }}
        >
          <i name="test" className="action pro icon-edit  disabled" />
        </a>
      </span>
      <span className="">
        <a
          className="pointer-s"
          onClick={e => {
            onModifySelection(selection.id, 'delete', e);
          }}
        >
          <i name="test" className="action pro icon-delete  disabled" />
        </a>
      </span>
    </span>
  );
};

ActionIcons.propTypes = propTypes;
ActionIcons.defaultProps = defaultProps;

export default ActionIcons;
