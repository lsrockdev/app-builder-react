import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import Header from 'components/Header'
import { connect } from 'react-redux'
import { getDocument, updateSettings, searchDocument, importFields, exportFields, exportDocument } from '../../api/modules/document'
import './styles.scss'
import PreviewSidebar from './PreviewSidebar';
import PreviewSettingsForm from './PreviewSettingsForm';
import PreviewDocument from './PreviewDocument';

class Preview extends Component {

  constructor(props) {
    const { documentId } = props.match.params;
    super(props);
    this.state = {
      documentId,
      searchValue: '',
      scrolling: false,
      scrollbarOffset: 0,
      scrollbarPercent: 0,
      iframeScrollPercent: 0,
      totalPages: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.document.selections) {
      this.setState({ totalPages: this.getPageCount(nextProps.document.selections) });
    }
  }

  componentWillMount() {
    this.retrieveDocument();
  }

  retrieveDocument() {
    const { searchValue } = this.state.searchValue;
    const id = this.state.documentId;
    
    if (searchValue) {
      this.props.searchDocument({searchValue});
    } else {
      this.props.getDocument({id});
    }
  }

  updateSettings = (settings) => {
    const success = (res, action) => {
      this.retrieveDocument();
    };

    this.props.updateSettings({
      id : this.state.documentId,
      body: { ...settings },
      success
    });
  }

  handleSearch(e) {
    const searchValue = e.target.value;
    this.setState({searchValue});
    if (searchValue)
      this.props.searchDocument({searchValue});
    else
      this.props.getDocument();
  }

  getPageCount(selections) {
    const pages = Object.keys(selections).filter(key => selections[key].level.length === 1);
    return pages.length;
  }

  makeAnchor(level) {
    return level.join('.');
  }

  importFields = (e) => {
    this.props.importFields({
      id: this.state.documentId,
      file: e.target.files[0],
      success: () => this.retrieveDocument()
    });
  }

  exportFields = () => {
    this.props.exportFields({ id: this.state.documentId });
  }

  exportDocx = (e) => {
    this.props.exportDocument({
      id: this.state.documentId,
      format: 'docx'
    });
  }

  exportPdf = (e) => {
    this.props.exportDocument({
      id: this.state.documentId,
      format: 'pdf'
    });
  }

  updateAnchor = (selection) => {
    const anchor = selection.id;
    this.setState({anchor});
  }

  handleScroll = (scrollbarPercent) => {
    this.setState({scrollbarPercent});
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

      this.setState({ scrolling: true, scrollbarOffset }, this.updateScroll(mouseY));
    }
  }

  updateScroll = (mouseY) => {
    if (this.scrollbar && this.state.scrolling) {
      const position = Math.max(0, Math.min(this.scrollbar.clientHeight, mouseY - this.state.scrollbarOffset));
      const scrollbarPercent = Math.max(0, Math.min(100, (position / this.scrollbar.clientHeight) * 100));
      const iframeScrollPercent = scrollbarPercent;
      this.setState({scrollbarPercent, iframeScrollPercent});
    }
  }

  stopScroll = (e) => {
    if (this.state.scrolling) {
      this.setState({ scrolling: false });
    }
  }

  handleMouseMove = (e) => {
    if (this.state.scrolling) {
      this.updateScroll(e.clientY);
    }
  }

  renderMainContent() {
    const { searchValue, anchor, scrollbarPercent, iframeScrollPercent, totalPages } =  this.state;
    const { document } = this.props;
    const { settings } = document;
    const currentPage = scrollbarPercent < 100 ? Math.floor((scrollbarPercent / 100) * totalPages) + 1 : totalPages;

    return (
      <div className="main hbox space-between preview-page" onMouseMove={this.handleMouseMove} onMouseUp={this.stopScroll}>
        <div style={{display: 'flex'}}>
          <PreviewSidebar {...document} onClick={this.updateAnchor} />
        </div>
        <div className="left-section-border" style={{"display":"flex","flexDirection":"column","flex":"1 1 0%"}}>
          <div style={{"display":"flex","flexDirection":"column","flex":"1 1 0%"}}>
            <div id="document-preview-node" style={{"display":"flex","flex":"1 1 0%","position":"relative","overflowX":"hidden","backgroundColor":"rgb(16, 71, 71)"}}>
              <div id="document-preview-node-inner" style={{"position":"absolute","top":"0px","left":"0px","right":"-20px","bottom":"0px","paddingLeft":"10px"}}>
                <PreviewDocument document={document} anchor={anchor} scrollPercent={iframeScrollPercent} onScroll={this.handleScroll} onMouseMove={this.updateScroll} onMouseUp={this.stopScroll} />
                <div ref={(element) => this.scrollbar = element} onMouseDown={this.startScroll} style={{"position":"absolute","right":"70px","top":"90px","height":"300px","width":"7px","borderRadius":"7px","backgroundColor":"rgb(25, 91, 91)","display":"inline"}}>
                  <div className="scroll-thumb" style={{ top: `${scrollbarPercent}%`}}>
                    <div className="scroll-indicator" style={{"position":"absolute","left":"15px","top":"3px","fontSize":".75rem","fontFamily":"'Open Sans', Arial, sans-serif","color":"#5e9090"}}>{currentPage}/{totalPages}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{backgroundColor: 'rgb(16, 71, 71)', padding: '0px 82px 0 88px'}}>
            <div className="bottom-navigation-button" style={{textAlign: 'center', display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: '20px'}}>Export Document:</span>
              <span style={{marginRight: '20px', cursor: 'pointer'}} onClick={this.exportDocx}>DOCX</span>
              <span style={{marginRight: '20px', cursor: 'pointer'}} onClick={this.exportPdf}>PDF</span>
            </div>
          </div>
        </div>
        <div className="left-section-border" style={{"display":"flex","flexDirection":"column","flex":"1 1 0%","maxWidth":"550px"}}>
          <div style={{"display":"flex","flexDirection":"column","flex":"1 1 0%","padding":"0px 50px","backgroundColor":"rgb(248, 248, 248)"}}>
            <div className="left-section-border right-section-border" style={{"backgroundColor":"rgb(255, 255, 255)","flex":"1 1 0%","display":"flex","flexDirection":"column"}}>
              <div style={{flex: '1 1 0%', overflowY: 'auto'}}>
                <div className="section-header-block">
                  <h1 className="header1">Field Autofill</h1>
                </div>
                <div className="bottom-section-border" style={{"padding":"40px 50px","fontSize":"14px","lineHeight":"1.3"}}>Use the Field Autofill tool below to quickly fill placeholders with content relevant to your proposal. If fields
                  are not readily available, you can export this list and share with other team members who have that missing content.</div>
                <PreviewSettingsForm settings={settings} onSave={this.updateSettings} />
            </div>
            <div style={{display: 'flex', width: '100%'}}>
              <form id="autofill-import-file-form">
                <input id="autofill-import-file-input" type="file" accept=".xlsx" style={{display: 'none'}} onChange={this.importFields} />
              </form>
              <label className="autofill-function-button right-section-border" htmlFor="autofill-import-file-input">Import Fields</label>
              <button className="autofill-function-button" onClick={this.exportFields}>Export Fields</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  render() {
    return (
      <div className="viewport vbox">
        <Header showBuilder={true}/>
        {this.renderMainContent()}
        <Link to="/support" className="general-help-button">?</Link>
      </div>
    )
  }
}

Preview.propTypes = {
  document: PropTypes.object,
  getDocument: PropTypes.func,
  searchDocument: PropTypes.func,
  updateSettings: PropTypes.func,
  importFields: PropTypes.func,
  exportFields: PropTypes.func,
  exportDocument: PropTypes.func
};

const mapStateToProps = (state) => {
  const { document } = state.document;
  return { document };
};

const mapActionToProps = {
  getDocument,
  updateSettings,
  searchDocument,
  importFields,
  exportFields,
  exportDocument
};

export default connect(mapStateToProps, mapActionToProps)(Preview)
