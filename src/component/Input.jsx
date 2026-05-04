import React from "react";

export const Input = ({ label, name, value, onChange, type, star, max, min, inputMode, pattern, required }) => {
  return (
    <>
      <input
        type={type ? type : "text"}
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
        max={max}
        min={min}
        inputMode={inputMode}
        pattern={pattern}
        required={required !== undefined ? required : star}
      />
      <label
        className="form-label"
        style={{ background: "#fff" }}
      >
        {label} &nbsp;
        {star ? <span className=" required">*</span> : null}
      </label>
    </>
  );
};
