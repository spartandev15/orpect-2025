import React from "react";

export const InputAdd = ({ label, name, value, onChange, type, star }) => {
  return (
    <>
      <input
        type={type ? type : "text"}
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
        required
      />
      <label
        className="form-label"
        // for="typeText"
      >
        {label} &nbsp;
        {star ? <span className=" required">*</span> : null}
      </label>
    </>
  );
};
