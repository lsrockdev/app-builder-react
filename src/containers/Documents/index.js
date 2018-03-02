import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header'
import { connect } from 'react-redux'
import { getDocuments } from '../../api/modules/document'
import { epochToString } from '../../utils/timeHelper';
import './styles.scss'

class Documents extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedDocumentIndex: -1,
    }
  }

  componentWillMount() {
    this.props.getDocuments();
  }

  handleDocumentClick(index) {
    this.setState({selectedDocumentIndex: index});
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
              <div className={"overview-body " + className} style={{width: 180}}>{epochToString(doc.dueDate, 'MM/DD/YY')}</div>
              <div className={"overview-body " + className} style={{width: 180}}>{epochToString(doc.lastModified, 'MM/DD/YY')}</div>
            </div>
          )
        })}
      </React.Fragment>
    )
  }

  render() {
    const { selectedDocumentIndex } =  this.state;
    console.log(selectedDocumentIndex);
    return (
      <div className="viewport vbox">
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
                <div className={"overview-body flex0 " + (selectedDocumentIndex === 0 ? "before-selected" : "")}
                     style={{color: 'rgb(175, 175, 175)'}}>
                  <i className="material-icons" style={{paddingRight: 10}}>add</i>
                  {selectedDocumentIndex !== -1 &&
                    <React.Fragment>
                      <i className="material-icons" style={{paddingRight: 10}}>edit</i>
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
