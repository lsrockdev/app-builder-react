import React, { Component } from 'react';
import Header from 'components/Header';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { Wrapper } from './styles';
import Library from './partials/Library';
import BuilderMain from './partials/BuilderMain';
import Preview from './partials/Preview';
import * as actions from '../../api/modules/document';

const propTypes = {
  match: PropTypes.object,
  getDocument: PropTypes.func,
  upUpdateDocument: PropTypes.func,
  downUpdateDocument: PropTypes.func,
  rightUpdateDocument: PropTypes.func,
  leftUpdateDocument: PropTypes.func,
  createSelection: PropTypes.func,
  updateSelection: PropTypes.func,
  deleteSelection: PropTypes.func,
};

const defaultProps = {};

class Builder extends Component {
  componentDidMount() {
    const { match, getDocument } = this.props;
    getDocument({ documentId: match.params.documentId });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.status !== this.props.status &&
      this.props.status !== 'GET_DOCUMENT/success'
    ) {
      const { match, getDocument } = this.props;
      getDocument({ documentId: match.params.documentId });
    }
  }

  render() {
    const {
      currentDocument,
      match,
      upUpdateDocument,
      downUpdateDocument,
      rightUpdateDocument,
      leftUpdateDocument,
      createSelection,
      updateSelection,
      deleteSelection,
      getDocument,
    } = this.props;
    const documentId = match.params.documentId;

    return (
      <div className="viewport vbox">
        <Header showBuilder />
        <Wrapper>
          <Library />
          <BuilderMain
            currentDocument={currentDocument}
            documentId={documentId}
            upUpdateDocument={upUpdateDocument}
            downUpdateDocument={downUpdateDocument}
            rightUpdateDocument={rightUpdateDocument}
            leftUpdateDocument={leftUpdateDocument}
            createSelection={createSelection}
            updateSelection={updateSelection}
            deleteSelection={deleteSelection}
            getDocument={getDocument}
          />
          <Preview />
        </Wrapper>
      </div>
    );
  }
}

Builder.propTypes = propTypes;
Builder.defaultProps = defaultProps;

Builder = connect(state => {
  const documentState = get(state, 'document');

  return { ...documentState };
}, actions)(Builder);

Builder = withRouter(Builder);

export default Builder;
