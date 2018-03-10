import React, {Component, Fragment} from 'react'
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

import './Builder.css';

import Header from 'components/Header';

import {createSection} from "../../api/modules/builder";
import Library from "../../components/Library/Library";
import Preview from "../../components/Preview/Preview";
import Builder from "../../components/Builder/Builder";

class Documents extends Component {
  state = {
    showDocumentSectionModal: false,
    newSectionTitle: ''
  };

  addSectionHandler = () => {
    this.setState({
      showDocumentSectionModal: true
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let payload = {
      document: this.props.document.id,
      title: this.state.newSectionTitle
    };

    this.props.createSection({
      body: payload
    });

    this.setState({
      showDocumentSectionModal: false
    });
  };

  changeSectionTitleHandler = (event) => {
    this.setState({
      newSectionTitle: event.target.value
    })
  };

  onSupportClick = () => {
    this.props.history.push('/support');
  };

  handleOutsideClick = () => {
    this.setState({
      showDocumentSectionModal: false
    });
  };

  render() {

    const {showDocumentSectionModal} = this.state;

    if (!this.props.document.title) {
      return (<Redirect to="/documents"/>)
    }

    return (
      <Fragment>
        <Header showBuilder/>
        <div className="main hbox space-between">

          <Library/>

          <Builder document={this.props.document} onAddSectionClick={this.addSectionHandler}/>

          <Preview/>

          <button className="general-help-button" onClick={this.onSupportClick}>?</button>
        </div>

        {showDocumentSectionModal &&
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
              <button type="submit" className="large form button" style={{marginTop: 20}}>{'Create section'}</button>

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
  }
};

const mapActionToProps = {
  createSection
};

export default connect(mapStateToProps, mapActionToProps)(Documents)
