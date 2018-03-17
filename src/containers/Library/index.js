import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Resizable from 're-resizable';

import { getTemplates, openFolder, moveTemplate } from 'api/modules/template';
import Header from 'components/Header';
import Templates from 'components/Templates';
import PreviewDocument from '../Preview/PreviewDocument';
import FolderModal from './FolderModal';
import ContentModal from './ContentModal';
import DeleteModal from './DeleteModal';

import Wrapper from './Wrapper';
import './styles.scss';

class Library extends Component {
  state = {
    previewTemplate: { show: false, info: null },
    totalPages: 0,
    scrolling: false,
    scrollbarOffset: 0,
    scrollbarPercent: 0,
    iframeScrollPercent: 0
  };

  componentWillMount() {
    this.props.getTemplates();
  }
  updateScroll = (mouseY, scrollbarOffset) => {
    if (this.scrollbar) {
      const position = Math.max(0, Math.min(this.scrollbar.clientHeight, mouseY - scrollbarOffset));
      const scrollbarPercent = Math.max(0, Math.min(100, (position / this.scrollbar.clientHeight) * 100));
      const iframeScrollPercent = scrollbarPercent;
      this.setState({scrollbarPercent, iframeScrollPercent});
    }
  }
  handleScroll = (scrollbarPercent) => {
    this.setState({scrollbarPercent});
  }
  handleIframeMouseMove = (mouseY) => {
    if (this.state.scrolling) {
      this.updateScroll(mouseY, this.state.scrollbarOffset);
    }
  }
  startScroll = (e) => {
    if (this.scrollbar) {
      let scrollbarOffset = this.scrollbar.offsetTop;
      let offsetParent = this.scrollbar.offsetParent;
      const mouseY = e.clientY;

      while (offsetParent) {
        scrollbarOffset += offsetParent.offsetTop;
        offsetParent = offsetParent.offsetParent;
      }

      this.setState({ scrolling: true, scrollbarOffset, anchor: '' }, this.updateScroll(mouseY, scrollbarOffset));
    }
  }
  stopScroll = (e) => {
    if (this.state.scrolling) {
      this.setState({ scrolling: false });
    }
  }
  handleMouseMove = (e) => {
      if (this.state.scrolling) {
        this.updateScroll(e.clientY, this.state.scrollbarOffset);
      }
    }
  handlePageCount = (totalPages) => {
    this.setState({totalPages});
  }
  showDialog = (kind, item) => this.setState({ dialog: { kind, item } });
  hideDialog = () => this.setState({ dialog: null });
  showPreviewTemplate = (info) => {
    !info.folder && this.setState({previewTemplate: {show:true, info}})
  };

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
    const { templates, opens, openFolder, moveTemplate } = this.props;
    const { dialog, previewTemplate } = this.state;
    const { kind, item } = dialog || {};
    const { anchor, scrollbarPercent, iframeScrollPercent, totalPages } =  this.state;
    const currentPage = scrollbarPercent < 100 ? Math.floor((scrollbarPercent / 100) * totalPages) + 1 : totalPages;
    return (
      <Fragment>
        <Header />
        <Wrapper className="main hbox space-between">
          <Resizable defaultSize={{ width: 356 }} minWidth="356">
            <Templates
              data={templates}
              opens={opens}
              showTemplate={this.showPreviewTemplate}
              onEdit={this.showEditDialog}
              onDelete={this.showDeleteDialog}
              onAddContent={this.showAddContentDialog}
              onAddFolder={this.showAddFolderDialog}
              openFolder={openFolder}
              moveTemplate={moveTemplate}
            />

            {kind === 'folder' && <FolderModal item={item} onClose={this.hideDialog} />}
            {kind === 'content' && <ContentModal item={item} onClose={this.hideDialog} />}
            {kind === 'delete' && <DeleteModal item={item} onClose={this.hideDialog} />}
          </Resizable>

          <div className="main left-section-border">
            <div className="template-preview">
              <div className="template-preview-inner">
                <div style={{"display":(previewTemplate.show ? "flex" : 'none'),"flexDirection":"column","flex":"1 1 0%"}}>
                  <div id="document-preview-node" style={{"display":"flex","flex":"1 1 0%","position":"relative","overflowX":"hidden","backgroundColor":"rgb(16, 71, 71)"}}>
                    <div id="document-preview-node-inner" style={{"position":"absolute","top":"0px","left":"0px","right":"0","bottom":"0px","paddingLeft":"10px"}}>
                        <PreviewDocument
                                  document={previewTemplate.info}
                                  onPageCountComplete={this.handlePageCount}
                                  onMouseMove={this.handleMouseMove}
                                  scrollPercent={iframeScrollPercent}
                                  onScroll={this.handleScroll}
                                  onMouseUp={this.stopScroll} />
                        <div
                          ref={(element) => this.scrollbar = element}
                          onMouseDown={this.startScroll}
                          style={{"position":"absolute","right":"70px","top":"90px","height":"300px","width":"7px","borderRadius":"7px","backgroundColor":"rgb(25, 91, 91)","display":'inline'}}>
                          <div className="scroll-thumb" style={{ top: `${scrollbarPercent}%`}}>
                            <div className="scroll-indicator" style={{"position":"absolute","left":"15px","top":"3px","fontSize":".75rem","fontFamily":"'Open Sans', Arial, sans-serif","color":"#5e9090"}}>{currentPage}/{totalPages}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          <Link className="general-help-button" to="/support">
            ?
          </Link>
        </Wrapper>
      </Fragment>
    );
  }
}

export default connect(
  ({ template, document }) => ({
    templates: template.templates,
    opens: template.opens
  }),
  { getTemplates, openFolder, moveTemplate }
)(Library);
