import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


// <html>
// <head>
//   <style type='text/css'></style>
//   {this.renderStyles()}
// </head>
// <body className='html-preview' style={bodyStyle}>


// </body>
// </html>

class PreviewDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.iframe = ReactDOM.findDOMNode(this);

    const frameBody = this.iframe.contentDocument.body;
    const el = document.createElement('div');
    
    frameBody.appendChild(el);

    this.el = el;
    this.renderContentDocument();
  }

  componentDidUpdate() {
      this.renderContentDocument();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.anchor && this.iframe) {
      this.iframe.contentWindow.location.hash = `#section-${newProps.anchor}`;
    }
  }

  makeIndex(level) {
    return level.join('.');
  }

  makeTitle = (selection) => {
    return `${this.makeIndex(selection.level)} ${selection.title}`;
  }

  formatDate(timestamp) {
    const date = new Date(parseInt(timestamp));
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getYear() - 100}`;
  }

  isChild(parentLevel, childLevel) {
    if (childLevel.length !== parentLevel.length + 1) {
      return false;
    }

    for (let i = 0; i < parentLevel.length; i++) {
      if (parentLevel[i] !== childLevel[i]) {
        return false;
      }
    }
    return true;
  }

  substituteVariables(textBlock) {
    for (let setting in this.props.document.settings) {
      const value = this.props.document.settings[setting];

      textBlock = textBlock.replace(
        new RegExp(`\\[${setting}\\]`, 'gi'),
        `<span style="background-color: #ecd58c;" data-variable="${setting}" data-value="${value}" class="variable">${value}</span>`
      );
    }

    textBlock = textBlock.replace(
      new RegExp(`(\\[([a-z][0-9] _-]+)\\])`, 'gi'),
      '<span style="background-color: #ecd58c;" data-variable="$2" class="variable">$1</span>'
    );

    return textBlock;
  }

  parseChildren(level = []) {
    const { selections } = this.props.document;
    const copies = Object.keys(selections || {}).map(key => ({
      ...selections[key],
      index: this.makeIndex(selections[key].level),
      textBlocks: selections[key].textBlocks.map(textBlock => this.substituteVariables(textBlock))
    }));

    const children = copies.filter(selection => this.isChild(level, selection.level));

    return children.sort((a, b) => this.makeIndex(a.level) > this.makeIndex(b.level) ? 1 : -1);
  }

  parseSelections() {
    const pages = this.parseChildren();
    
    for (let page of pages) {
      page.children = this.parseChildren(page.level);
    }

    return pages;
  }

  renderStyles = () => {
    if (this.props.isDevelopmentMode) {
      return (
        <React.Fragment>
          <link type='text/css' rel='stylesheet' href='css/reset/reset.css'/>
          <link type='text/css' rel='stylesheet' href='css/html-preview/html-preview.css'/>
        </React.Fragment>
      );
    } else {
      const { cdnUrl } = this.props;
      return <link type='text/css' rel='stylesheet' href={`${cdnUrl}/for-html-preview.css`} />;
    }
  }

  renderContentDocument() {
    // const bodyStyle = this.props.onPage ? { backgroundColor: this.props.htmlPreviewBackgroundColor } : {};
    const footerStyles = {"position":"absolute","left":"130.11764705882354px","bottom":"130.11764705882354px","fontSize":"16.26471612783696px","color":"#afafaf","lineHeight":"2","paddingTop":"51.22742010189903px","boxSizing":"border-box"};
    const pageStyles = {"position":"relative","backgroundColor":"#fff","marginLeft":"80px","width":"1106px","height":"1431.2941176470588px","padding":"130.11764705882354px","boxSizing":"border-box","overflow":"hidden"};
    const pageNumberStyles = {"textAlign":"center","position":"absolute","bottom":"92.61764705882354px","left":"0","right":"0"};
    const firstPageStyles = { margin: '60px 0 0', display: 'flex', flexDirection: 'row' };
    const subsequentPageStyles = {"margin":"10px 0 0","display":"flex","flexDirection":"row"};
    const { document } = this.props;
    const dueDate = this.formatDate(document.dueDate);
    const selections = this.parseSelections();

    ReactDOM.render((
      <React.Fragment>
        <div style={{"position":"absolute","left":"0","right":"20px","height":"60px","display":"flex","alignItems":"center","justifyContent":"center","paddingLeft":"140px","paddingRight":"150px","fontSize":"10px","lineHeight":"1.3","fontFamily":"'Open Sans', Arial, sans-serif","color":"#5e9090"}}>
          <div style={{ textAlign: 'center' }}>
            Preview mode is designed to represent a document's appearance in Microsoft Word but may result in formatting that is different in appearance when exported.
          </div>
        </div>
        <div style={{ marginBottom: '60px' }}>
          {selections.map(selection => (
            <div style={selection === selections[0] ? firstPageStyles: subsequentPageStyles} key={selection.index}>
              <div className="page" style={pageStyles}>
                <p id={`section-${selection.index}`}><strong>{this.makeTitle(selection)}</strong></p>
                {selection.textBlocks.map((textBlock, index) => (
                  <div dangerouslySetInnerHTML={{ __html: textBlock }} key={index} />
                ))}
                {selection.children.map(child => (
                  <React.Fragment key={child.index}>
                    <br /><br />
                    <p id={`section-${selection.index}`}><strong>{this.makeTitle(child)}</strong></p>
                    {child.textBlocks.map((textBlock, childIndex) => (
                      <div dangerouslySetInnerHTML={{ __html: textBlock }} key={childIndex} />
                    ))}
                  </React.Fragment>
                ))}
                <div style={footerStyles}>
                  <p>{document.title} | Due Date: {dueDate}</p>
                  <p style={{ fontStyle: 'italic' }}>
                    Use or disclosure of data contained on this page is subject to the restriction on the cover sheet of this proposal.
                  </p>
                </div>
                <div style={pageNumberStyles}>{selection.index}</div>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    ), this.el);
  }

  render() {
    return <iframe frameBorder="0" title="preview-document"></iframe>;
  }
}

PreviewDocument.propTypes = {
  isDevelopmentMode: PropTypes.bool,
  onPage: PropTypes.bool,
  htmlPreviewBackgroundColor: PropTypes.string,
  cdnUrl: PropTypes.string,
  document: PropTypes.object,
  anchor: PropTypes.string
};

export default PreviewDocument;