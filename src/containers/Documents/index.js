import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header'
import { connect } from 'react-redux'
import { getDocuments } from '../../api/modules/document'
import { epochToString } from '../../utils/timeHelper';
import './styles.scss'

class Documents extends Component {

  componentWillMount() {
    this.props.getDocuments();
  }

  renderTable() {
    const { documents } = this.props
    return (
      <React.Fragment>
        {documents.map((doc, i) =>
          <div className="overview-row" style={{cursor: 'pointer'}} key={i}>
            <div className="overview-body flex0">{doc.title}</div>
            <div className="overview-body flex0">{doc.client}</div>
            <div className="overview-body flex0">{doc.type}</div>
            <div className="overview-body" style={{width: 180}}>{epochToString(doc.dueDate, 'MM/DD/YY')}</div>
            <div className="overview-body" style={{width: 180}}>{epochToString(doc.lastModified, 'MM/DD/YY')}</div>
          </div>
        )}
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className="App">
        <Header/>
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
                <div className="overview-body" style={{flex: '1 1 0%', color: 'rgb(175, 175, 175)'}}>
                  <i className="material-icons" style={{paddingRight: 10}}>add</i>
                  <i className="material-icons" style={{paddingRight: 10}}>edit</i>
                  <i className="material-icons" style={{paddingRight: 10}}>close</i>
                </div>
              </div>

              {this.renderTable()}

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

        <button className="general-help-button">?</button>
      </div>
    )
  }
}

Documents.propTypes = {
  documents: PropTypes.array,
  getDocuments: PropTypes.func
}

const mapStateToProps = ({document}) => {
  const { documents } = document
  return {documents}
}

const mapActionToProps = {
  getDocuments
}

export default connect(mapStateToProps, mapActionToProps)(Documents)
