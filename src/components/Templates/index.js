import React, { Component, Fragment } from 'react';
import Wrapper from './Wrapper';

class Templates extends Component {
  state = {};

  onFilter = e => this.setState({ filterStr: e.target.value });

  checkFilter = item => {
    const { filterStr } = this.state;
    const { title, text } = item;
    const { children } = item;

    if (title && title.indexOf(filterStr) !== -1) {
      return true;
    }
    
    if (text && text.indexOf(filterStr) !== -1) {
      return true;
    }
    
    if (children) {
      for (let i = 0; i < children.length; i++) {
        if (this.checkFilter(children[i])) return true;
      }
    }

    return false;
  };

  renderNode = item => {
    const { id, title, folder, children } = item;
    const { opens, onEdit, onDelete, onAddContent, onAddFolder, openFolder } = this.props;
    let open = opens[id];

    if (this.state.filterStr) {
      if (!this.checkFilter(item)) return null;
      open = true;
    }

    return (
      <li key={id}>
        <div className="actionable tree-element">
          <span className="arrow">
            {children && (
              <div onClick={() => openFolder({ id, open: !open })}>
                <i className={`pro icon-library-${open ? 'expanded' : 'collapsed'}`} />
              </div>
            )}
          </span>

          <div draggable="true" className="content">
            <div>
              <i className={`pro ${folder ? 'icon-folder' : 'icon-document'}`}>
                <span className="path1" />
                <span className="path2" />
                {!folder && (
                  <Fragment>
                    <span className="path3" />
                    <span className="path4" />
                  </Fragment>
                )}
              </i>
            </div>
            <span className="tree-text">{title}</span>
          </div>

          <span className="actions">
            <span>
              <a title={`Edit ${folder ? 'folder' : 'content'}`} onClick={() => onEdit(item)}>
                <i className="material-icons">edit</i>
              </a>
            </span>
            <span>
              <a title={`Delete ${folder ? 'folder' : 'content'}`} onClick={() => onDelete(item)}>
                <i className="material-icons">close</i>
              </a>
            </span>
            {folder && (
              <Fragment>
                <span>
                  <a title="Add content" onClick={() => onAddContent(id)}>
                    <i className="material-icons">add</i>
                  </a>
                </span>
                <span>
                  <a title="Add folder" onClick={() => onAddFolder(id)}>
                    <i className="material-icons">create_new_folder</i>
                  </a>
                </span>
              </Fragment>
            )}
          </span>
        </div>

        {children && open && <ul>{children.map(node => this.renderNode(node))}</ul>}
      </li>
    );
  };

  render() {
    const { data, onAddContent, onAddFolder } = this.props;

    if (!data) return null;

    return (
      <Wrapper className="library-overview">
        <div className="section-header-block">
          <h1 className="header1">Library</h1>
          <i className="material-icons" title="Add content" onClick={() => onAddContent()}>
            add
          </i>
          <i className="material-icons" title="Add folder" onClick={() => onAddFolder()}>
            create_new_folder
          </i>
        </div>

        <div className="tree-container">
          <div className="top-level-tree">
            {data.length === 0 ? (
              <div className="empty">Start by adding your first content block or folder.</div>
            ) : (
              <ul>{data.map(node => this.renderNode(node))}</ul>
            )}
          </div>
        </div>
        <div className="search-container">
          <i className="pro icon-search" />
          <input className="inline-input" placeholder="Search Content Blocks" onChange={this.onFilter} />
        </div>
      </Wrapper>
    );
  }
}

export default Templates;
