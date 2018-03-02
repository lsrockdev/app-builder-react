import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header'
import DocumentManageModal from './DocumentManageModal';
import { connect } from 'react-redux'
import { getDocuments, createDocument, updateDocument, deleteDocument } from '../../api/modules/document'
import { epochToString } from '../../utils/timeHelper';
import './styles.scss'

class Documents extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedDocumentIndex: -1,
      showDocumentManageModal: false,
      isEdit: false,
    }
  }

  componentWillMount() {
    this.props.getDocuments();
  }

  handleDocumentClick(index) {
    this.setState({selectedDocumentIndex: index});
  }

  openDocumentManageModal(isEdit = false) {
    this.setState({
      showDocumentManageModal: true,
      isEdit
    });
  }

  closeDocumentManageModal() {
    this.setState({
      showDocumentManageModal: false,
      isEdit: false,
    });
  }

  updateDocument(data) {
    console.log(data);
    let payload = data;

    const success = (res, action) => {
      this.props.getDocuments();
    };

    if (this.state.isEdit) {
      payload.id = this.props.documents[this.state.selectedDocumentIndex].id;
      this.props.updateDocument({
        body: payload,
        success
      });
    } else {
      this.props.createDocument({
        body: payload,
        success
      });
    }

    this.closeDocumentManageModal();
  }

  renderTable(selectedDocumentIndex) {
    const { documents } = this.props;

    return (
      <React.Fragment>
        {documents.map((doc, i) => {
          let className = i === selectedDocumentIndex ? 'selected' : i === selectedDocumentIndex - 1 ? 'before-selected' : '';
          return (
            <div className="overview-row" style={{cursor: 'pointer'}} key={i} onClick={() => this.handleDocumentClick(i)}>
              <div className={"overview-body flex0 " + className}>{doc.title}</div>
              <div className={"overview-body flex0 " + className}>{doc.client}</div>
              <div className={"overview-body flex0 " + className}>{doc.type}</div>
              <div className={"overview-body " + className} style={{width: 180}}>{doc.dueDate ? epochToString(doc.dueDate, 'MM/DD/YY') : ''}</div>
              <div className={"overview-body " + className} style={{width: 180}}>{epochToString(doc.lastModified, 'MM/DD/YY')}</div>
            </div>
          )
        })}
      </React.Fragment>
    )
  }

  renderMainContent() {
    const { selectedDocumentIndex } =  this.state;

    return (
      <div className="document-page">
        <div className="document-table">
          <div className="overview">

            <div className="overview-row">
              <div className="overview-header flex0">
                <span>Document Title</span>
                <i className="fas fa-sort sort"/>
              </div>
              <div className="overview-header flex0" >
                <span>Customer</span>
                <i className="fas fa-sort sort"/>
              </div>
              <div className="overview-header flex0">
                <span>Type</span>
                <i className="fas fa-sort sort"/>
              </div>
              <div className="overview-header" style={{width: 180}}>
                <span>Due</span>
                <i className="fas fa-sort sort"/>
              </div>
              <div className="overview-header" style={{width: 180}}>
                <span>Changed</span>
                <i className="fas fa-sort sort"/>
              </div>
            </div>

            <div className="overview-row">
              <div className={"overview-body flex0 " + (selectedDocumentIndex === 0 ? "before-selected" : "")}
                   style={{color: 'rgb(175, 175, 175)'}}>
                <i className="material-icons" style={{paddingRight: 10}} onClick={() => this.openDocumentManageModal()}>add</i>
                {selectedDocumentIndex !== -1 &&
                <React.Fragment>
                  <i className="material-icons" style={{paddingRight: 10}} onClick={() => this.openDocumentManageModal(true)}>edit</i>
                  <i className="material-icons" style={{paddingRight: 10}}>close</i>
                </React.Fragment>
                }
              </div>
            </div>

            {this.renderTable(selectedDocumentIndex)}

          </div>
        </div>

        <div className="top-section-border search-document-bar">
          <div>
            <i className="material-icons">search</i>
            <input placeholder="Search Document" className="inline-input"/>
          </div>
          <button className="bottom-navigation-button disabled" disabled="disabled">Build Document</button>
        </div>
      </div>

    )
  }

  render() {
    const { showDocumentManageModal, isEdit, selectedDocumentIndex} = this.state;
    const { documents } = this.props;
    return (
      <div>
        <Header/>
        {this.renderMainContent()}
        {showDocumentManageModal &&
          <DocumentManageModal
            show={showDocumentManageModal}
            title={isEdit ? documents[selectedDocumentIndex].title : ''}
            client={isEdit ? documents[selectedDocumentIndex].client : ''}
            type={isEdit ? documents[selectedDocumentIndex].type : ''}
            dueDate={isEdit ? documents[selectedDocumentIndex].dueDate: ''}
            isEdit={isEdit}
            onHide={this.closeDocumentManageModal.bind(this)}
            onSubmit={this.updateDocument.bind(this)}
          />
        }
        <button className="general-help-button">?</button>
      </div>
    )
  }
}

Documents.propTypes = {
  documents: PropTypes.array,
  getDocuments: PropTypes.func,
  createDocument: PropTypes.func,
};

const mapStateToProps = ({document}) => {
  const { documents } = document
  return {documents}
};

const mapActionToProps = {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
};

export default connect(mapStateToProps, mapActionToProps)(Documents)
