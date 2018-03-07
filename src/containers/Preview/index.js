import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header'
import { connect } from 'react-redux'
import { getDocument, updateSettings, searchDocument} from '../../api/modules/document'
import './styles.scss'

class SidebarGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    debugger;
    return (
      <div>
        <div className="bottom-section-border" style={{padding: '15px 12px 15px 22px', cursor: 'pointer'}}>
          <div className="actionable" style={{paddingRight: '16px', display: 'flex', alignItems: 'center'}}>
            <div className="tree-text" style={{display: 'inline-block', color: 'rgb(129, 129, 129)', paddingLeft: '8px'}}>1. Section</div>
          </div>
        </div>
        <div>
          <div>
            <div className="bottom-section-border" style={{padding: '15px 12px 15px 43px', cursor: 'pointer'}}>
              <div className="actionable" style={{paddingRight: '16px', display: 'flex', alignItems: 'center'}}>
                <div className="tree-text" style={{"display":"inline-block","color":"rgb(129, 129, 129)","paddingLeft":"8px"}}>1.1. Another section</div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

SidebarGroup.propTypes = {
  depth: PropTypes.number,
  groups: PropTypes.array,
  selections: PropTypes.object
};

class PreviewSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    }
  }

  parseGroups(selections, level = 0) {
    const levels = selections.reduce((previousValue, selection) => {
      return { ...previousValue, [selection.level[level]]: true };
    }, {});
    return Object.keys(levels).sort();
  }

  componentWillReceiveProps(nextProps) {
    const groups = this.parseGroups(Object.values(nextProps.selections));
    this.setState({groups});
  }

  render() {
    const { title, selections } = this.props;
    const { groups } = this.state;

    return (
      <div style={{width: '300px', display: 'flex', flexDirection: 'column'}}>
        <div className="bottom-navigation-button" style={{cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0px 40px'}}>
          <h1 className="header1" style={{color: 'rgb(255, 255, 255)'}}>Back to Builder</h1>
        </div>
        <div className="section-header-block">
          <h1 className="header1">{title}</h1>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', flex: '1 1 0%'}}>
          <div style={{flex: '1 1 0%', display: 'flex', flexDirection: 'column', overflowY: 'auto'}}>
            <div>
              <div>
                {groups.map(group => <SidebarGroup group={group} selections={selections} key={group} />)}
              </div>
            </div>
          </div>
          <div className="search-container">
            <i className="pro icon-search" style={{"marginRight":"10px","fontSize":"16px"}}></i>
            <input placeholder="Search Sections" className="inline-input" style={{"color":"rgb(124, 124, 124)","width":"80%"}} />
          </div>
        </div>
        <div className="splitter" id="document-preview-selection-tree-splitter" data-min-width="300" data-max-width="2147483647"
          style={{display: 'none'}}></div>
      </div>
    );
  }
}

PreviewSidebar.propTypes = {
  title: PropTypes.string,
  selections: PropTypes.object
};

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

  updateSettings(data) {
    let payload = data;

    const success = (res, action) => {
      this.retrieveDocument();
    };

    payload.id = this.state.document.id;
    this.props.updateSettings({
      body: payload,
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

  renderMainContent() {
    const { searchValue } =  this.state;
    const { document } = this.props;

    return (
      <div className="main hbox space-between">
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
                <div
                  style={{padding: '40px 50px'}}>
                  <div style={{"display":"flex","flexWrap":"wrap","marginBottom":"30px","paddingLeft":"10px"}}>
                    <button className="autofill-button disabled" style={{marginRight: '10px'}}>Undo</button>
                    <button className="autofill-button disabled" style={{marginRight: '10px'}}>Redo</button>
                    <button className="autofill-button disabled" style={{paddingRight: '10px', marginLeft: 'auto'}}>Save</button>
                  </div>
                  <div>
                    <div style={{marginBottom: '30px'}}>
                      <div style={{display: 'flex', paddingLeft: '10px', marginBottom: '10px'}}>
                        <label style={{"color":"rgb(55, 109, 114)","fontSize":"16px"}}>Variable</label>
                      </div>
                      <input type="text" className="autofill-input" data-variable-name="Variable" />
                    </div>
                  </div>
              </div>
            </div>
            <div style={{display: 'flex', width: '100%'}}>
              <form id="autofill-import-file-form">
                <input id="autofill-import-file-input" type="file" accept=".xlsx" style={{display: 'none'}} />
              </form>
              <button className="autofill-function-button right-section-border">Import Fields</button>
              <button className="autofill-function-button">Export Fields</button>
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
  updateSettings: PropTypes.func
};

const mapStateToProps = (state) => {
  const { document } = state.document;
  return { document };
};

const mapActionToProps = {
  getDocument,
  updateSettings,
  searchDocument
};

export default connect(mapStateToProps, mapActionToProps)(Preview)
