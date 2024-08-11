import React from "react";
import PropTypes from "prop-types";

const Form = ({ formData, handleInputChange, fields }) => {
  return (
    <form>
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      ))}
    </form>
  );
};

Form.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Form;
