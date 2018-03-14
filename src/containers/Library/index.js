import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Resizable from 're-resizable';

import { getTemplates, openFolder, moveTemplate } from 'api/modules/template';
import Header from 'components/Header';
import Templates from 'components/Templates';
import FolderModal from './FolderModal';
import ContentModal from './ContentModal';
import DeleteModal from './DeleteModal';

import Wrapper from './Wrapper';

class Library extends Component {
  state = {};

  componentWillMount() {
    this.props.getTemplates();
  }

  showDialog = (kind, item) => this.setState({ dialog: { kind, item } });
  hideDialog = () => this.setState({ dialog: null });

  showAddFolderDialog = parentId => {
    this.showDialog('folder', { parentId });
  };

  showAddContentDialog = parentId => {
    this.showDialog('content', { parentId });
  };

  showEditDialog = item => {
    this.showDialog(item.folder ? 'folder' : 'content', item);
  };

  showDeleteDialog = item => {
    this.showDialog('delete', item);
  };

  render() {
    const { templates, opens, openFolder, moveTemplate, reuse } = this.props;
    const { dialog } = this.state;
    const { kind, item } = dialog || {};

    return (
      <Fragment>
        {!reuse && <Header />}
        <Wrapper reuse={reuse} className="main hbox space-between">
          <Resizable defaultSize={{ width: 356 }} minWidth="356">
            <Templates
              data={templates}
              opens={opens}
              onEdit={this.showEditDialog}
              onDelete={this.showDeleteDialog}
              onAddContent={this.showAddContentDialog}
              onAddFolder={this.showAddFolderDialog}
              openFolder={openFolder}
              moveTemplate={moveTemplate}
            />

            {kind === 'folder' && (
              <FolderModal item={item} onClose={this.hideDialog} />
            )}
            {kind === 'content' && (
              <ContentModal item={item} onClose={this.hideDialog} />
            )}
            {kind === 'delete' && (
              <DeleteModal item={item} onClose={this.hideDialog} />
            )}
          </Resizable>

          {!reuse && (
            <div className="main left-section-border">
              <div className="template-preview">
                <div className="template-preview-inner" />
              </div>
            </div>
          )}

          {!reuse && (
            <Link className="general-help-button" to="/support">
              ?
            </Link>
          )}
        </Wrapper>
      </Fragment>
    );
  }
}

export default connect(
  ({ template }) => ({
    templates: template.templates,
    opens: template.opens,
  }),
  { getTemplates, openFolder, moveTemplate }
)(Library);
