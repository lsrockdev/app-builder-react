import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header'
import { connect } from 'react-redux'
import { getDocument, updateSettings, searchDocument, importFields, exportFields } from '../../api/modules/document'
import './styles.scss'
import PreviewSidebar from './PreviewSidebar';
import PreviewSettingsForm from './PreviewSettingsForm';

class Preview extends Component {

  constructor(props) {
    const { documentId } = props.match.params;
    super(props);
    this.state = {
      documentId,
      searchValue: '',
    }
  }

  componentWillReceiveProps(nextProps) {
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

  renderMainContent() {
    const { searchValue } =  this.state;
    const { document } = this.props;
    const { settings } = document;

    return (
      <div className="main hbox space-between preview-page">
        <div style={{display: 'flex'}}>
          <PreviewSidebar {...document} />
        </div>
        <div className="left-section-border" style={{"display":"flex","flexDirection":"column","flex":"1 1 0%"}}>
          <div style={{"display":"flex","flexDirection":"column","flex":"1 1 0%"}}>
            <div id="document-preview-node" style={{"display":"flex","flex":"1 1 0%","position":"relative","overflowX":"hidden","backgroundColor":"rgb(16, 71, 71)"}}>
              <div id="document-preview-node-inner" style={{"position":"absolute","top":"0px","left":"0px","right":"-20px","bottom":"0px","paddingLeft":"10px"}}>
                <iframe frameBorder="0" style={{"display":"block","width":"100%","height":"100%","position":"relative"}}></iframe>
                <div style={{"position":"absolute","right":"70px","top":"90px","height":"300px","width":"7px","borderRadius":"7px","backgroundColor":"rgb(25, 91, 91)","display":"inline"}}>
                  <div className="scroll-thumb" style={{"cursor":"default","position":"absolute","left":"0px","height":"20px","width":"7px","borderRadius":"7px","backgroundColor":"rgb(94, 144, 144)","top":"0px"}}
                    data-scroll-thumb-factor="12.632142857142858">
                    <div className="scroll-indicator" style={{"position":"absolute","left":"15px","top":"3px","fontSize":".75rem","fontFamily":"'Open Sans', Arial, sans-serif","color":"#5e9090"}}>1/3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{backgroundColor: 'rgb(16, 71, 71)', padding: '0px 90px'}}>
            <div className="bottom-navigation-button" style={{textAlign: 'center', display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: '20px'}}>Export Document:</span>
              <span style={{marginRight: '20px', cursor: 'pointer'}}>DOCX</span>
              <span style={{marginRight: '20px', cursor: 'pointer'}}>PDF</span>
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
        <button className="general-help-button">?</button>
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
  exportFields: PropTypes.func
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
  exportFields
};

export default connect(mapStateToProps, mapActionToProps)(Preview)
