import React, { Component } from 'react';
import '../index.css';
import '../App.css';
import './FAQ.css';

class FAQ extends Component{
  constructor(){
    super();
    this.state = {
      searchTerm:""
    }
    this.faqs = [
      {
          title:"What is a content block?",
          text:"Your content is stored is easy-to-manage building blocks, whether as whole section with multiple paragraphs, a single paragraph, or even a single sentence."
      },
      {
          title:"What are variables?",
          text:"Variables are the tools for personalizing your content block. Insert one anytime you need to refer to a changing piece of data such as a company name, a personal name, a location, a title, statistics such as number of employees, and much more."
      },
      {
          title:"What are templates?",
          text:"Templates are time-saving first drafts of volumes that we put together for you with content blocks from your library, for frequently used proposal situations. For example, a management volume for a file management contract where you are the incumbent."
      },
      {
          title:"How do I build my first draft of a volume?",
          text:"Drag and drop your content blocks in the order needed for your document. When you’re satisfied with the result, click on Preview. At this stage, fill in the values for your variables."
      },
      {
          title:"Can I edit a document after it's started?",
          text:"Yes. Go to the Edit Documents link and click on the document you’ve already saved to change."
      },
      {
          title:"What format can I export my document in?",
          text:"We support export into Microsoft word. Expert your content in your own branded, compliant design template."
      },
    ]
  }
  handleSearchTermInput = (event)=>{
    this.setState({
      searchTerm:event.target.value
    });
  }
  render(){
    //This filters FAQ items based on the input search query
    //it then maps the maps each item to a react Component
    //the collection of components can then be rendered all at once
    let faqComponents = this.faqs.filter((el)=>{
      return el.title.toLowerCase().includes(this.state.searchTerm.toLowerCase());
    }).map(function(el, pos){
      return (<FAQItem
        key={pos}
        title={el.title}
        text={el.text}/>
      )
    });
    return (
      <div className="content-container-1">
        <div className="content-container-2">
          <h1 className="content-header">FAQ</h1>
          <div className="faq-input-container">
            <input type="text"
              placeholder="Search for Frequently Asked Questions"
              value={this.state.searchTerm}
              onChange={this.handleSearchTermInput}
              className="faq-input"/>
              <i className="faq-input-icon">
            </i>
          </div>
          <div className="faq-items-container">
            {faqComponents}
            </div>
          </div>
        </div>
)}}

export default FAQ;

class FAQItem extends Component{
  constructor(){
    super();
    this.state = {
      displayed:false
    };
  }
  toggleDisplayed = ()=>{
    this.setState({
      displayed:!this.state.displayed
    });
  }
  render(){
    let hiddenClass = "faq-content-container-hidden";
    if(this.state.displayed) hiddenClass = "";
    return (
      <div className="faq-item-container">
        <div className="faq-item-container-inner">
          <button className="faq-item-button" onClick={this.toggleDisplayed}>
            <span className="faq-item-title">{this.props.title}</span>
            <i className="faq-chevron-icon">
            </i>
          </button>
          <div className={"faq-content-container "+hiddenClass}>
            <div className="faq-content-container-inner">
              <div className="faq-content-title">Answer:</div>
              <div className="faq-content-text">{this.props.text}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
