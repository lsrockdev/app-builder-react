import React from 'react';

const Library = (props) => {
  return (
    <div style={{display: 'flex'}}>
      <div className="library-overview" style={{width: '356px'}}>
        <div className="section-header-block">
          <h1 className="header1" style={{flex: '1 1 0%'}}>Library</h1>
          <i className="material-icons" style={{cursor: 'pointer'}} title="Add content">
            add
          </i>
          <i className="material-icons" style={{cursor: 'pointer', marginLeft: '10px'}} title="Add folder">
            create_new_folder
          </i>
        </div>

        <div style={{flex: '1 1 0%', overflowY: 'auto'}}/>

        <div className="search-container">
          <i className="pro icon-search"/>
          <input placeholder="Search Content Blocks" className="inline-input"/>
        </div>
      </div>
    </div>
  );
};

export default Library;