import React, {Component, Fragment} from 'react'
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

import './Builder.css';

import Header from 'components/Header';

import {addSection, updateSection, deleteSection, moveUpSection, moveDownSection, moveRightSection, moveLeftSection, getDocument} from "../../api/modules/builder";

import Library from "../../components/Library/Library";
import Preview from "../../components/Preview/Preview";
import Builder from "../../components/Builder/Builder";

class Documents extends Component {
  state = {
    showDocumentSectionModal: false,
    isEdit: false,
    previewSection: null,
    newSectionTitle: '',
    editSectionTitle: '',
    editSection: {}
  };

  componentWillMount() {
    this.props.getDocument(this.props.document.id)
  }

  addSectionHandler = () => {
    this.setState({
      showDocumentSectionModal: true,
      isEdit: false
    })
  };

  editSectionHandler = (section) => {
    this.setState({
      showDocumentSectionModal: true,
      isEdit: true,
      editSectionTitle: section.title,
      editSection: section
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const success = (res, action) => {
      this.props.getDocument(this.props.document.id);
    };

    let payload = {
      document: this.props.document.id,
      title: this.state.newSectionTitle
    };

    this.props.addSection({
      body: payload,
      success
    });

    this.setState({
      showDocumentSectionModal: false,
      isEdit: false,
      newSectionTitle: '',
      editSectionTitle: '',
      editSection: {}
    });
  };

  handleEditSubmit = (event) => {
    event.preventDefault();

    const success = (res, action) => {
      this.props.getDocument(this.props.document.id);
    };

    let payload = {
      documentId: this.props.document.id,
      selectionId: this.state.editSection.id,
      textBlocks: this.state.editSection.textBlocks,
      title: this.state.editSectionTitle
    };

    this.props.updateSection({
      body: payload,
      success
    });

    this.setState({
      showDocumentSectionModal: false,
      isEdit: false,
      newSectionTitle: '',
      editSectionTitle: '',
      editSection: {}
    });
  };

  deleteSectionHandler = (sectionId) => {
    this.props.deleteSection({
      documentId: this.props.document.id,
      sectionId: sectionId,
    });

    setTimeout(() => {
      this.props.getDocument(this.props.document.id)
    }, 1000);
  };

  moveDownSectionHandler = (sectionId) => {
    this.props.moveDownSection({
      documentId: this.props.document.id,
      sectionId: sectionId,
    });

    setTimeout(() => {
      this.props.getDocument(this.props.document.id)
    }, 1000);
  };

  moveRightSectionHandler = (sectionId) => {
    this.props.moveRightSection({
      documentId: this.props.document.id,
      sectionId: sectionId,
    });

    setTimeout(() => {
      this.props.getDocument(this.props.document.id)
    }, 1500);
  };

  moveLeftSectionHandler= (sectionId) => {
    this.props.moveLeftSection({
      documentId: this.props.document.id,
      sectionId: sectionId,
    });

    setTimeout(() => {
      this.props.getDocument(this.props.document.id)
    }, 1500);
  };

  moveUpSectionHandler = (sectionId) => {
    this.props.moveUpSection({
      documentId: this.props.document.id,
      sectionId: sectionId,
    });

    setTimeout(() => {
      this.props.getDocument(this.props.document.id)
    }, 1000);
  };

  changeSectionTitleHandler = (event) => {
    !this.state.isEdit ?
      this.setState({
        newSectionTitle: event.target.value
      }) :
      this.setState({
        editSectionTitle: event.target.value
      })
  };

  onSupportClick = () => {
    this.props.history.push('/support');
  };

  handleOutsideClick = () => {
    this.setState({
      showDocumentSectionModal: false,
      isEdit: false,
      newSectionTitle: '',
      editSectionTitle: '',
      editSection: {}
    });
  };

  handlerOnSectionClick = (section) => {
    this.setState({previewSection: section});
  };

  render() {

    const showDocumentSectionModal = this.state.showDocumentSectionModal, isEdit = this.state.isEdit;

    if (!this.props.document.title) {
      return (<Redirect to="/documents"/>)
    }

    return (
      <Fragment>
        <Header showBuilder/>
        <div className="main hbox space-between">

          <Library/>

          <Builder document={this.props.activeDocument}
                   onAddSectionClick={this.addSectionHandler}
                   onEditSectionClick={this.editSectionHandler}
                   onDeleteSectionClick={this.deleteSectionHandler}
                   onMoveUpSectionClick={this.moveUpSectionHandler}
                   onMoveDownSectionClick={this.moveDownSectionHandler}
                   onMoveRightSectionClick={this.moveRightSectionHandler}
                   onMoveLeftSectionClick={this.moveLeftSectionHandler}
                   onSectionClick={this.handlerOnSectionClick}
          />

          <Preview section={this.state.previewSection}/>

          <button className="general-help-button" onClick={this.onSupportClick}>?</button>
        </div>

        {!isEdit && showDocumentSectionModal &&
        <div>
          <div className="wizard-container" onClick={this.handleOutsideClick}>
            <div className="wizard">
            </div>
          </div>
          <div className="wizard-content modal-content">
            <form onSubmit={(event) => this.handleSubmit(event)}>
              <div>
                <input placeholder="Title" className="field" required value={this.state.newSectionTitle}
                       name="title" autoFocus
                       onChange={(event) => this.changeSectionTitleHandler(event)}/>
              </div>
              <button type="submit" className="large form button"
                      style={{marginTop: 20}}>{'Create section'}</button>

              <div className="clear"/>
            </form>
          </div>
        </div>
        }


        {isEdit && showDocumentSectionModal &&
        <div>
          <div className="wizard-container" onClick={this.handleOutsideClick}>
            <div className="wizard">
            </div>
          </div>
          <div className="wizard-content modal-content">
            <form onSubmit={(event) => this.handleEditSubmit(event)}>
              <div>
                <input placeholder="Title" className="field" required
                       value={this.state.editSectionTitle}
                       name="title" autoFocus
                       onChange={(event) => this.changeSectionTitleHandler(event)}/>
              </div>
              <button type="submit" className="large form button"
                      style={{marginTop: 20}}>{'Update section'}</button>

              <div className="clear"/>
            </form>
          </div>
        </div>
        }
      </Fragment>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    document: state.builder.document,
    activeDocument: state.builder.activeDocument
  }
};

const mapActionToProps = {
  getDocument,
  addSection,
  updateSection,
  deleteSection,
  moveUpSection,
  moveDownSection,
  moveRightSection,
  moveLeftSection
};

export default connect(mapStateToProps, mapActionToProps)(Documents)
