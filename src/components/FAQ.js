import React, { Component } from 'react';
import '../index.css';
import '../App.css';
import './FAQ.css';

class FAQ extends Component{
  constructor(){
    super();
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
  render(){
    let faqComponents = this.faqs.map(function(el){
      return (<FAQItem
        title={el.title}
        text={el.text}/>
      )
    });
    return (
      <div className="content-container-1">
        <div className="content-container-2">
          <h1 className="content-header">FAQ</h1>
          <div className="faq-input-container">
            <input type="text" placeholder="Search for Frequently Asked Questions" className="faq-input"/>
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

function FAQItem(props){
  return (
    <div className="faq-item-container">
      <div className="faq-item-container-inner">
        <button className="faq-item-button">
          <span className="faq-item-title">{props.title}</span>
          <i className="faq-chevron-icon">
          </i>
        </button>
        <div className="faq-content-container">
          <div className="faq-content-container-inner">
            <div className="faq-content-title">Answer:</div>
            <div className="faq-content-text">{props.text}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
