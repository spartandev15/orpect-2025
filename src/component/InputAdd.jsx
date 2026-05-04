import React from "react";
import useToggle from "../helper/hooks/useToggle";

export const InputAdd = ({ label, name, value, onChange, type, star,inputMode,pattern }) => {
  const [showPassword, toggleShowPassword] = useToggle();
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <>
      <input
        type={inputType ? inputType : "text"}
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
        required
        inputMode={inputMode}
        pattern={pattern}
      />
      <label
        className="form-label"
        // for="typeText"
      >
        {label} &nbsp;
        {star ? <span className=" required">*</span> : null}
      </label>
      {isPassword && (
        <span className="pwdeye" onClick={toggleShowPassword} style={{ cursor: "pointer" }}>
          {showPassword ? (
            <i className="far fa-eye"></i>
          ) : (
            <i className="fa fa-eye-slash"></i>
          )}
        </span>
      )}
    </>
  );
};
