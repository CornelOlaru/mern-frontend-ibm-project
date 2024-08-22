import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import Form from "./Form"; // Assuming it's in the same folder
// import 'bootstrap/dist/css/bootstrap.min.css';
const FormModal = ({ show, handleClose, formFields, handleCreate, title }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    handleCreate(formData);
  };

  if (!formFields || formFields.length === 0) return null;

  return (
    <Modal className="modal-container" show={show} onHide={handleClose}>
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title">
          <h2>
          Create User
          </h2>
          </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form
          formData={formData}
          handleInputChange={handleInputChange}
          fields={formFields}
        />
      </Modal.Body>
      <Modal.Footer className="modal-button">
        <Button className="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

FormModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  formFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FormModal;
