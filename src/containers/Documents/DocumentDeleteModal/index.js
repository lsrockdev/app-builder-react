import React from 'react';
import PropTypes from 'prop-types'
import Modal from 'react-responsive-modal';
import 'react-datepicker/dist/react-datepicker.css';

const DocumentDeleteModal = props =>
  <Modal open={props.show} onClose={props.onHide} little showCloseIcon={false}>
    <div className="wizard">
      <div className="wizard-content">
        <div className="wizard-text">Are you sure that you want to delete "{props.title}"? This action cannot be undone.</div>
        <button className="large form button" style={{marginTop: 30}} onClick={props.onDelete}>Delete</button>
      </div>
    </div>
  </Modal>

DocumentDeleteModal.propsTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  onHide: PropTypes.func,
  onDelete: PropTypes.func,
};

export default DocumentDeleteModal;