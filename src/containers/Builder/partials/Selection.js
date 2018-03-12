import React, { Component } from 'react';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';

import { SelectionWrapper } from './styles';
import ActionIcons from './ActionIcons';
import TextBlock from './TextBlock';

const propTypes = {
  selectLen: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selection: PropTypes.object,
  strLevel: PropTypes.string,
  showArrowLeft: PropTypes.bool,
  showArrowDown: PropTypes.bool,
  showArrowRight: PropTypes.bool,
  showArrowUp: PropTypes.bool,
  onModifySelection: PropTypes.func,
  showUpdateSectionModal: PropTypes.func,
};

const defaultProps = {};

class Selection extends Component {
  state = {};

  render() {
    const {
      selectLen,
      selection,
      strLevel,
      showArrowLeft,
      showArrowDown,
      showArrowRight,
      showArrowUp,
      onModifySelection,
      showUpdateSectionModal,
      currentExpanded,
      onExpand,
    } = this.props;
    const isExpanded = currentExpanded === selection.id;
    const { id, title, textBlocks } = selection;
    const hasTemplate = textBlocks.length > 0;

    return (
      <SelectionWrapper expanded={isExpanded} paddingLeft={selectLen * 21 + 1}>
        <div
          onClick={() => onExpand(id)}
          className="selection-plain bottom-section-border"
        >
          <div className="selection-inner">
            <div className="inner-text">{`${strLevel}. ${title}`}</div>
            <ActionIcons
              selectLen={selectLen}
              selection={selection}
              showArrowLeft={showArrowLeft}
              showArrowRight={showArrowRight}
              showArrowDown={showArrowDown}
              showArrowUp={showArrowUp}
              onModifySelection={onModifySelection}
              showUpdateSectionModal={showUpdateSectionModal}
            />
          </div>
          {isExpanded && (
            <div style={{ marginTop: 20 }}>
              <div>
                <span className="drop-here-area-new">
                  {hasTemplate ? 'Drop in content above' : 'Drop in content'}
                </span>
              </div>
              {textBlocks.map((markup, i) => (
                <TextBlock templateMarkup={markup} />
              ))}
              {hasTemplate && (
                <div>
                  <span className="drop-here-area-new">
                    Drop in content below
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </SelectionWrapper>
    );
  }
}

Selection.propTypes = propTypes;
Selection.defaultProps = defaultProps;

Selection = enhanceWithClickOutside(Selection);

export default Selection;
