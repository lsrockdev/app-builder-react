import React from 'react';

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
                    <div style={{flex: '1 1 0%', display: 'flex', flexDirection: 'column'}}>
                        <div style={{display: 'flex', flex: '1 1 0%', alignItems: 'center', justifyContent: 'center'}}>
                            <div style={{fontSize: '13px', color: 'rgb(175, 175, 175)'}}>Click on a content block to
                                preview
                                content.
                            </div>
                        </div>
                    </div>
                    <button className="bottom-navigation-button">Preview Document</button>
                </div>
            </div>
        )
    }

    return content
};

export default Preview;