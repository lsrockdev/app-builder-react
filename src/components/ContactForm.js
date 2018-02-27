import React, { Component } from 'react';
import '../index.css';
import '../App.css';
import './ContactForm.css';

class ContactForm extends Component{
  render(){
    return(
      <div className="content-container-1">
        <div className="content-container-2">
          <h1 className="content-header">Contact</h1>
          <form id="support-contact-form">
            <div className="contact-form-header">
              <div className="contact-form-header-title">Contact Support</div>
              <div className="contact-form-header-subtitle">Technical Support</div>
            </div>
            <div className="contact-form-container">
              <div className="contact-form-item-container">
                <div className="contact-form-label">
                  <div>First Name *</div>
                  <div>
                    <input type="text" name="firstname" tabIndex="1" className="contact-form-input" required=""/>
                  </div>
                </div>
                <div className="contact-form-label">
                  <div>Phone Number *</div>
                  <div>
                    <input type="tel" name="usrtel" tabIndex="4" className="contact-form-input" required=""/>
                  </div>
                </div>
                <div className="contact-form-label">
                  <div>City</div>
                  <div>
                    <input type="text" name="city" tabIndex="7" className="contact-form-input"/>
                  </div>
                </div>
              </div>
              <div className="contact-form-item-container">
                <div className="contact-form-label">
                  <div>Last Name *</div>
                  <div>
                    <input type="text" name="lastname" tabIndex="2" className="contact-form-input" required=""/>
                  </div>
                </div>
                <div className="contact-form-label">
                  <div>Account Number *</div>
                  <div>
                    <input type="text" name="accnumber" tabIndex="5" className="contact-form-input" required=""/>
                  </div>
                </div>
                <div className="contact-form-label">
                  <div>State/Province</div>
                  <div>
                    <input type="text" name="state" tabIndex="8" className="contact-form-input"/>
                  </div>
                </div>
              </div>
              <div className="contact-form-item-container">
                <div className="contact-form-label">
                  <div>Email Adress *</div>
                  <div>
                    <input type="email" name="email" tabIndex="3" className="contact-form-input" required=""/>
                  </div>
                </div>
                <div className="contact-form-label">
                  <div>Company</div>
                  <div>
                    <input type="text" name="company" tabIndex="6" className="contact-form-input"/>
                  </div>
                </div>
                <div className="contact-form-label">
                  <div>Country</div>
                  <div>
                    <input type="text" name="country" tabIndex="9" className="contact-form-input"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-subsection">
              <div className="cfhead1">Technical issue</div>
              <div className="cfhead2">Message</div>
            </div>
            <div className="contact-form-subsection">
              <div className="contact-form-subsection-body contact-form-subsection-radio-body">
                <div className="contact-form-radio-col">
                  <div>
                    <input type="radio" name="issue" tabIndex="10" id="support-technical-issue-input-login-difficulties" value="login-difficulties" defaultChecked="onchange" className="contact-form-radio-input"/>
                    <label htmlFor="support-technical-issue-input-login-difficulties" className="contact-form-radio-input-label">Login difficulties</label>
                  </div>
                  <div>
                    <input type="radio" name="issue" tabIndex="-1" id="support-technical-issue-input-document-creation" value="document-creation" className="contact-form-radio-input"/>
                    <label htmlFor="support-technical-issue-input-document-creation" className="contact-form-radio-input-label">Document creation</label>
                  </div>
                </div>
                <div className="contact-form-radio-col">
                  <div>
                    <input type="radio" name="issue" tabIndex="-1" id="support-technical-issue-input-library-creation" value="library-creation" className="contact-form-radio-input"/>
                    <label htmlFor="support-technical-issue-input-library-creation" className="contact-form-radio-input-label">Library creation</label>
                  </div>
                  <div>
                    <input type="radio" name="issue" tabIndex="-1" id="support-technical-issue-input-document-preview" value="document-preview" className="contact-form-radio-input"/>
                    <label htmlFor="support-technical-issue-input-document-preview" className="contact-form-radio-input-label">Document preview</label>
                  </div>
                </div>
                <div className="contact-form-radio-col">
                  <div>
                    <input type="radio" name="issue" tabIndex="-1" id="support-technical-issue-input-content-variables" value="content-variables" className="contact-form-radio-input"/>
                    <label htmlFor="support-technical-issue-input-content-variables" className="contact-form-radio-input-label">Content variables</label>
                  </div>
                  <div>
                    <input type="radio" name="issue" tabIndex="-1" id="support-technical-issue-input-document-export" value="document-export" className="contact-form-radio-input"/>
                    <label htmlFor="support-technical-issue-input-document-export" className="contact-form-radio-input-label">Document export</label>
                  </div>
                </div>
              </div>
              <div className="contact-form-subsection-body">
                <div>
                  <textarea className="contact-form-textarea" name="textarea" rows="3" cols="50" tabIndex="11">
                  </textarea>
                </div>
                <div>
                  <button type="submit" tabIndex="12" className="contact-form-submit">Submit Form</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default ContactForm;
