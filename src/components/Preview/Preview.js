import React from 'react';
import renderHTML from 'react-render-html';

const Preview = (props) => {
    let content = (
        <div className="left-section-border" style={{display: 'flex', flexDirection: 'column', flex: '1 1 0%'}}>
            <div style={{display: 'flex', flexDirection: 'column', flex: '1 1 0%'}}>
                <div className="section-header-block"><h1
                    className="header1">{'Content preview'}</h1></div>
                <div style={{flex: '1 1 0%', display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', flex: '1 1 0%', alignItems: 'center', justifyContent: 'center'}}>
                        <div style={{fontSize: '13px', color: 'rgb(175, 175, 175)'}}>Click on a content block to preview
                            content.
                        </div>
                    </div>
                </div>
                <button className="bottom-navigation-button">Preview Document</button>
            </div>
        </div>
    );

    if (props.section) {
        content = (
            <div className="left-section-border" style={{display: 'flex', flexDirection: 'column', flex: '1 1 0%'}}>
                <div style={{display: 'flex', flexDirection: 'column', flex: '1 1 0%'}}>
                    <div className="section-header-block"><h1
                        className="header1">{props.section.title ? props.section.title : ''}</h1></div>
                    {props.section.textBlocks.length === 0 && <div className="section-padding" style={{display: 'flex', flexDirection: 'column', flex: '1 1 0%'}}>
                        <div style={{marginTop: '10px', display: 'flex', flex: '1 1 0%'}}></div>
                    </div>
                    }
                    {props.section.textBlocks.length >= 1 &&  props.section.textBlocks.map((block, index) => (<div key={index} className="section-padding" style={{display: 'flex', flexDirection: 'column', flex: '1 1 0%'}}>
                        <div style={{marginTop: '10px', display: 'flex', flex: '1 1 0%'}}>
                            <div id="preview-text"
                                 style={{display: 'flex', flex: '1 1 0%', position: 'relative', overflowX: 'hidden'}}>
                                <div id="preview-text-inner"
                                     style={{position: 'absolute', top: '0px', left: '0px', right: '0px', bottom: '0px', paddingLeft: '0px'}}>
                                    <div style={{display: 'block', width: '100%', height: '100%', position: 'relative'}}>
                                        {renderHTML(block)}
                                    </div>
                                    <div style={{position: 'absolute', right: '70px', top: '90px', height: '300px',
                                        width: '7px', borderRadius: '7px', backgroundColor: 'rgb(25, 91, 91)', display: 'none'}}>
                                        <div className="scroll-thumb"
                                             style={{cursor: 'default', position: 'absolute', left: '0', height: '20px', width: '7px', borderRadius: '7px', backgroundColor: '#5e9090'}}>
                                            <div className="scroll-indicator"
                                                 style={{position: 'absolute', left: '15px', top: '3px', fontSize: '.75rem', fontFamily: 'Open Sans, Arial, sans-serif', color: '#5e9090'}}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>))}
                    <button className="bottom-navigation-button">Preview Document</button>
                </div>
            </div>
        )
    }

    return content
};

export default Preview;