import React, {Component} from 'react';
import renderHTML from 'react-render-html';

class Builder extends Component {
  state = {
    activeIndex: null,
    search: ''
  };

  searchTitleHandler = (event) => {
    this.setState({search: event.target.value});
  };

  sectionClickHandler = (section) => {
    this.setState({activeIndex: section.id});
    this.props.onSectionClick(section);
  };

  render() {
    let selectionsArr = [], selection = null, isSelection = null;

    if (this.props.document.selections) {
      Object.keys(this.props.document.selections).forEach(key => {
        selectionsArr.push(this.props.document.selections[key]);
      });

      let allSelections = selectionsArr.sort((a, b) => {
        if (+a.level.join('') < +b.level.join())
          return -1;
        if (+a.level.join('') > +b.level.join(''))
          return 1;
        return 0;
      });

      let parentSelections = allSelections.filter(item => item.level.length === 1);
      let childrenSelections = allSelections.filter(item => item.level.length > 1);

      childrenSelections.forEach(item => {
        let index = null;
        for (let i = 0; i < parentSelections.length; i++) {
          if (item.previous && parentSelections[i].id === item.previous) {
            index = i;
            break;
          } else if (!item.previous && item.parent && parentSelections[i].id === item.parent) {
            index = i;
            break;
          }
        }

        if (index >= 0) {
          parentSelections = [...parentSelections.slice(0, index === 0 ? 1 : index + 1), item, ...parentSelections.slice(index < parentSelections.length ? index + 1 : null)];
        }

      });

      if (this.state.search.length) {
        let re = new RegExp(this.state.search, 'gi');
        parentSelections = parentSelections.filter(item => {
          return item.title.match(re);
        });
      }

      isSelection = parentSelections.map((current, index) => {
        return (
          <div key={current.id} onClick={(index) => this.sectionClickHandler(current)}>
            <div className="bottom-section-border"
                 style={current.id === this.state.activeIndex ? {
                   padding: '15px 12px 15px 22px',
                   backgroundColor: 'rgb(247, 247, 247)'
                 } : {padding: '15px 12px 15px 22px', cursor: 'pointer'}}>

              <div className="actionable"
                   style={{paddingRight: '16px', display: 'flex', alignItems: 'center'}}>
                <div className="tree-text"
                     style={current.id === this.state.activeIndex ? {
                       color: 'rgb(55, 109, 114)',
                       display: 'inline-block',
                       paddingLeft: current.level.length > 1 ? (current.level.length * 16 + 'px') : '8px'
                     } : {
                       color: 'rgb(129, 129, 129)',
                       display: 'inline-block',
                       paddingLeft: current.level.length > 1 ? (current.level.length * 16 + 'px') : '8px'
                     }}>
                  {current.level.join('. ')}. {current.title}
                </div>
                <span style={{marginLeft: 'auto', fontSize: '15px'}}>

                  {current.parent && <span style={{paddingRight: '10px'}}>
                    <a title="Move section left" style={{cursor: 'pointer'}} onClick={(selectionId) => this.props.onMoveLeftSectionClick(current.id)}>
                      <i className={"action pro icon-arrow-left " + (current.id !== this.state.activeIndex ? "disabled" : "")}/>
                    </a>
                  </span>}

                  {current.previous && <span style={{paddingRight: '10px'}}>
                  <a title="Move section right" style={{cursor: 'pointer'}} onClick={(selectionId) => this.props.onMoveRightSectionClick(current.id)}>
                    <i className={"action pro icon-arrow-right " + (current.id !== this.state.activeIndex ? "disabled" : "")}/>
                  </a>
                  </span>}

                    {index > 0 && <span style={{paddingRight: '10px'}}>
                    <a title="Move section up" style={{cursor: 'pointer'}}
                       onClick={(selectionId) => this.props.onMoveUpSectionClick(current.id)}>
                        <i
                          className={"action pro icon-arrow-up " + (current.id !== this.state.activeIndex ? "disabled" : "")}/>
                    </a>
                    </span>}
                  {index < parentSelections.length - 1 && <span style={{paddingRight: '10px'}}>
                      <a title="Move section down" style={{cursor: 'pointer'}}
                         onClick={(selectionId) => this.props.onMoveDownSectionClick(current.id)}>
                        <i
                          className={"action pro icon-arrow-down  " + (current.id !== this.state.activeIndex ? "disabled" : "")}/>
                      </a>
                    </span>}
                  <span style={{paddingRight: '10px'}}>
                      <a title="Edit section" style={{cursor: 'pointer'}}
                         onClick={(selection) => this.props.onEditSectionClick(current)}>
                        <i
                          className={"action pro icon-edit " + (current.id !== this.state.activeIndex ? "disabled" : "")}/>
                      </a>
                    </span>
                    <span style={{paddingRight: '0px'}}>
                      <a title="Delete section" style={{cursor: 'pointer'}}
                         onClick={(selectionId) => this.props.onDeleteSectionClick(current.id)}>
                        <i
                          className={"action pro icon-delete " + (current.id !== this.state.activeIndex ? "disabled" : "")}/>
                      </a>
                    </span>
                  </span>
              </div>

                {current.id === this.state.activeIndex && current.textBlocks.length === 0 && <div style={{marginTop: '20px'}}>
                <div>
                  <span className="drop-here-area-new">Drop in content</span>
                </div>
              </div>}

                {current.id === this.state.activeIndex && current.textBlocks.length > 0 &&
                <div style={{marginTop: '20px'}}>
                  <div>
                    <span className="drop-here-area-new">Drop in content above</span>
                  </div>
                    {current.textBlocks.map((block, index) => {
                      return (
                          <div key={index} className="section-content" style={{marginBottom: '15px'}}>
                    <div className="right-section-border" style={{flex: '1 1 0%', padding: '10px 15px'}}>
                      <div id="selection-text-block-text-0" className="html-preview"
                           style={{fontFamily: 'Times New Roman, serif', fontSize: '15px', lineHeight: '1.25'}}>
                        <div>
                            {renderHTML(block)}
                        </div>
                      </div>
                    </div>
                    <div style={{width: '90px', padding: '10px 15px', textAlign: 'right'}}>
                      <span style={{marginLeft: 'auto'}}>
                        <span style={{paddingRight: '10px'}}>
                          <a title="Move content up" style={{cursor: 'pointer'}}>
                            <i className="action pro icon-arrow-up disabled"/>
                          </a>
                        </span>
                        <span style={{paddingRight: '10px'}}>
                          <a title="Move content down" style={{cursor: 'pointer'}}>
                            <i className="action pro icon-arrow-down disabled"/>
                          </a>
                        </span>
                        <span style={{paddingRight: '10px'}}>
                          <a title="Edit content" style={{cursor: 'pointer'}}>
                            <i className="action pro icon-edit disabled"/>
                          </a>
                        </span>
                        <span style={{paddingRight: '0px'}}>
                          <a title="Delete content" style={{cursor: 'pointer'}}>
                            <i className="action pro icon-delete disabled"/>
                          </a>
                        </span>
                      </span>
                    </div>
                  </div>
                      )
                    })}

                  <span className="drop-here-area-new">Drop in content below</span></div>
                }

            </div>
          </div>
        );
      });

      if (parentSelections.length) {
        selection = (
          <div>
            {isSelection}
          </div>
        )
      } else {
        selection = (
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
        )
      }
    }

    return (
      <div className="left-section-border"
           style={{display: 'flex', flexDirection: 'column', flex: '1 1 0%'}}>
        <div className="section-header-block">
          <h1 className="header1" style={{flex: '1 1 0%'}}>Builder</h1>
          <i className="material-icons" title="Add section"
             style={{cursor: 'pointer'}}
             onClick={() => this.props.onAddSectionClick()}
          >add</i></div>
        <div className="section-header-block" style={{backgroundColor: 'rgb(255, 255, 255)'}}>
          <h1 className="header1">{this.props.document.title}</h1>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', flex: '1 1 0%'}}>
          <div style={{flex: '1 1 0%', display: 'flex', flexDirection: 'column', overflowY: 'auto'}}>
            {selection}
          </div>
        </div>
        {selectionsArr.length &&
        <div className="search-container">
          <i className="pro icon-search" style={{marginRight: '10px', fontSize: '16px'}}/>
          <input placeholder="Search Sections" className="inline-input" value={this.state.search}
                 onChange={(event) => this.searchTitleHandler(event)}
                 style={{color: 'rgb(124, 124, 124)', width: '80%'}}/>
        </div>}
      </div>
    )
  }
}

export default Builder;