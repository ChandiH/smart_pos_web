import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  console.log(options);
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value="" key={"default"} />
        {options.map((option, index) => (
          <option key={index} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && (
        <div role="alert" className="alert alert-danger">
          {error}
        </div>
      )}
    </div>
  );
};

export default Select;
