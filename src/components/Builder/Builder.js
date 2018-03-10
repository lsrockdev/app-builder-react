import React from 'react';

const Builder = (props) => {
  return (
    <div className="left-section-border"
         style={{display: 'flex', flexDirection: 'column', flex: '1 1 0%'}}>
      <div className="section-header-block">
        <h1 className="header1" style={{flex: '1 1 0%'}}>Builder</h1>
        <i className="material-icons" title="Add section"
           style={{cursor: 'pointer'}}
           onClick={() => props.onAddSectionClick()}
        >add</i></div>
      <div className="section-header-block" style={{backgroundColor: 'rgb(255, 255, 255)'}}>
        <h1 className="header1">{props.document.title}</h1>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', flex: '1 1 0%'}}>
        <div style={{flex: '1 1 0%', display: 'flex', flexDirection: 'column'}}>
          <div style={{
            display: 'flex',
            flex: '1 1 0%',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{fontSize: '13px', color: 'rgb(175, 175, 175)'}}>Start by adding your
              first
              section.
            </div>
          </div>
        </div>
      </div>
      <div className="search-container">
        <i className="pro icon-search" style={{marginRight: '10px', fontSize: '16px'}}/>
        <input placeholder="Search Sections" className="inline-input"
               style={{color: 'rgb(124, 124, 124)', width: '80%'}}/>
      </div>
    </div>

  )
}

export default Builder;