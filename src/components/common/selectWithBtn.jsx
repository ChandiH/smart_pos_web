import React from "react";

const SelectWithBtn = ({
  label,
  placeHolder,
  options,
  onClick,
  selectDisabled,
  btnTitle = "Confirm",
  btnDisabled,
  error,
}) => {
  return (
    <>
      {label && <label className="mb-2 d-block">{label}:</label>}
      <div className="row mb-2">
        <div className="col-8">
          <select
            className="form-select"
            aria-label={label}
            disabled={selectDisabled}
          >
            <option defaultValue={null}>
              {placeHolder ? placeHolder : "Select"}
            </option>
            {options.map((option, index) => (
              <option key={index} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <button
          disabled={btnDisabled}
          className="col-4 btn btn-primary shadow-0"
          onClick={onClick}
        >
          {btnTitle}
        </button>
      </div>
      {error && (
        <div role="alert" className="alert alert-danger">
          {error}
        </div>
      )}
    </>
  );
};

export default SelectWithBtn;
