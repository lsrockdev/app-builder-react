import React, {Component} from 'react'
import Header from 'components/Header'
import './styles.scss'


class Documents extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
          <div className="document-page">
            <div className="document-table">
              <div className="overview">

                <div className="overview-row">
                  <div className="overview-header" style={{flex: '1 1 0%'}}>
                    <span>Document Title</span>
                    <i className="fas fa-sort sort"/>
                  </div>
                  <div className="overview-header" style={{flex: '1 1 0%'}}>
                    <span>Customer</span>
                    <i className="fas fa-sort sort"/>
                  </div>
                  <div className="overview-header" style={{flex: '1 1 0%'}}>
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

  export default Documents
