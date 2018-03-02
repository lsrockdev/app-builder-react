import React from 'react';
import PropTypes from 'prop-types'
import Modal from 'react-responsive-modal';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class DocumentManageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dueDate: this.props.dueDate ? moment(this.props.dueDate) : null
    }
  }

  handleDateChange(date) {
    this.setState({
      dueDate: date
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({
      title: e.target.elements.title.value,
      client: e.target.elements.client.value,
      type: e.target.elements.type.value,
      dueDate: this.state.dueDate ? this.state.dueDate.valueOf() : null
    })
  }

  render() {
    const { onHide, show, title, client, dueDate, type, isEdit} = this.props;
    return (
      <Modal open={show} onClose={onHide} little showCloseIcon={false}>
        <div className="wizard">
          <div className="wizard-content">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div>
                <input placeholder="Title" className="field" required defaultValue={title} name="title"/>
              </div>
              <div style={{marginTop: 12}}>
                <input placeholder="Customer" className="field" defaultValue={client} name="client"/>
              </div>
              <div style={{marginTop: 12}}>
                <div id="new-document-wizard-type-input-wrapper">
                  <datalist id="new-document-wizard-type-list">
                    <option value="RFP"/>
                    <option value="RFI"/>
                    <option value="TO"/>
                  </datalist>
                  <input className="field" placeholder="Type" defaultValue={type} name="type"
                         list="new-document-wizard-type-list" autoComplete="off"/>
                </div>
              </div>
              <div style={{marginTop: 12}}>
                <DatePicker
                  dateFormat="dddd MMM DD YYYY"
                  className="field"
                  placeholderText="Due Date"
                  selected={this.state.dueDate}
                  onChange={this.handleDateChange.bind(this)}
                  />
              </div>
              <button type="submit" className="large form button" style={{marginTop: 20}}>{isEdit ? 'Update ' : 'Create '}Document</button>
              <div className="service-help" style={{marginTop: 30}}>
                <Link to="support">Need help?</Link>
              </div>
              <div className="clear"/>
            </form>
          </div>
        </div>
      </Modal>
    )
  }
}

DocumentManageModal.defaultProps = {
  dueDate: null,
};

DocumentManageModal.propsTypes = {
  show: PropTypes.bool,
  isEdit: PropTypes.bool,
  title: PropTypes.string,
  client: PropTypes.string,
  type: PropTypes.string,
  dueDate: PropTypes.object,
  onHide: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default DocumentManageModal;