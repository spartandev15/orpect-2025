import React, { useContext, useEffect, useState } from "react";
import "../../asset/css/auth.css";
import { useFormik } from "formik";
import useToggle from "../../helper/hooks/useToggle";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { FormContext } from "../../pages/auth-pages/Register";
import { saveFormData } from "../../store/FormSlice";
import { useDispatch, useSelector } from "react-redux";
import { IsDomainValid } from "../../api/auth";
import {getDesignation } from "../../api/company";
import $ from "jquery";
import { toggle } from "../../store/toggleSlice";

const initialValues = {
  companyName: "",
  companyType: "",
  fullName: "",
  designation: "",
  domainName: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const validationSchema = yup.object().shape({
  companyName: yup.string().required("Company Name is required"),
  companyType: yup.string().required("Company Type is required"),

  fullName: yup.string().required("Full Name is required"),
  designation: yup.string().required("Designation is required"),

  domainName: yup
    .string()
    // .matches(
    //   /^(?!:\/\/)([a-zA-Z0-9-]+\.)*[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]$/,
    //   "Invalid Domain"
    // )
    .required("Domain name is required"),
  // email: yup
  //   .string()
  //   .required("Email is required")
  //   .email("Invalid email")
  //   .test("email-domain-match", "Domain name not matching", function (value) {
  //     const domainName = this.resolve(yup.ref("domainName"));
  //     if (!domainName) {
  //       return this.createError({
  //         path: "email",
  //         message: "Please enter a domain name in the Domain Name field",
  //       });
  //     }
  //     return !value || value.split("@")[1] === domainName;
  //   }),
  email: yup
  .string()
  .required("Email is required")
  .email("Invalid email"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
      "Use 6 or more characters with a mix of uppercase, lowercase letters, numbers & symbols"
    ),
  password_confirmation: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"), // Validate password confirmation
});

const SignupStepA = () => {
  const [show, toggleShow] = useToggle();
  const [validDomain, setValidDomain] = useState();
  const [designation, setDesignation] = useState();

  const mypreviousData = useSelector((state) => state.form.formData);
  const toggleValue = useSelector((state) => state.toggle);

  const dispatch = useDispatch();
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    handleBlur,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    isInitialValid: true,
    onSubmit: async (values) => {
      const data = { ...formData, ...values };
      setFormData(data);
      if (!validDomain) {
        setActiveStepIndex(activeStepIndex + 1);
        dispatch(saveFormData(data));
      }
    },
  });

  const setValues = (data) => {
    Object.keys(data).forEach((fieldName) => {
      setFieldValue(fieldName, data[fieldName]);
    });
  };
  useEffect(() => {
    if (mypreviousData) {
      setValues(mypreviousData);
    }
  }, [mypreviousData]);

  const renderError = (field) => {
    if (touched[field] && errors[field]) {
      return <p className="text-danger msg">{errors[field]}</p>;
    }
    return null;
  };

  useEffect(() => {
    if (values.domainName) {
      dispatch(IsDomainValid(values.domainName))
        .then((res) => {
          setValidDomain(null);
        })
        .catch((err) => {
          setValidDomain(err?.data?.message);
        });
    }
  }, [values.domainName]);

  useEffect(() => {
    dispatch(getDesignation()).then((res) => {
      setDesignation(res.designations);
    });
  }, []);

  $(document).ready(function () {
    $("#select-list").change(function () {
      if ($(this).val() === "other") {
        $("#txt-custom").show();
      } else {
        $("#txt-custom").hide();
      }
    });
  });
  const handleDesignation = (event) => {
    const value = event.target.value;
    if (value === "other") {
      setFieldValue("designation", "other");
      dispatch(toggle(true))
    } else {
      setFieldValue("designation", value);
      dispatch(toggle(false))
    }
  };

  return (
    <>
      <form
        noValidate="noValidate"
        className="text-center signup_pd_inner"
        onSubmit={handleSubmit}
      >
        <h3>Company Registration</h3>
        <div className="row mt-4">
          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline">
              <input
                type="text"
                name="companyName"
                className="form-control"
                value={values.companyName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <label
                className="form-label"
                htmlFor="typeText"
                style={{ background: "#fff" }}
              >
                Company Name
              </label>
              {renderError("companyName")}
            </div>
          </div>
          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline">
              <input
                type="text"
                name="companyType"
                className="form-control"
                value={values.companyType}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <label
                className="form-label"
                htmlFor="typeText"
                style={{ background: "#fff" }}
              >
                Company Type
              </label>
              {renderError("companyType")}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline">
              <input
                type="text"
                name="fullName"
                className="form-control"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <label
                className="form-label"
                htmlFor="typeText"
                style={{ background: "#fff" }}
              >
                Full Name
              </label>
              {renderError("fullName")}
            </div>
          </div>

          {/* //////////////////////////////////// */}
          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline">
              <select
                className="form-control slect-color"
                name="designation"
                id="select-list"
                // value={values.designation}
                onChange={handleDesignation}
                onBlur={handleBlur}
                required
              >
                <option disabled selected> </option>
                {designation?.map((i) => (
                  <option key={i.id} value={i.designation}>
                    {i.designation}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
              <label
                className="form-label"
                htmlFor="typeSelect"
                style={{ background: "#fff" }}
              >
                Select Designation
              </label>
              {renderError("designation")}
              {toggleValue && (
                <div style={{ marginTop: "1rem" }}>
                  <input
                    type="text"
                    id="txt-custom"
                    className="form-control"
                    name="designation"
                    placeholder="Please Specify"
                    defaultValue={mypreviousData?.designation}
                    onChange={(event) => {
                      handleChange(event);
                      setFieldValue("designation", event.target.value);
                    }}
                    required
                  />
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="row">
          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline">
              <input
                type="text"
                name="domainName"
                className="form-control "
                value={values.domainName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <label
                className="form-label"
                htmlFor="typeText"
                style={{ background: "#fff" }}
              >
                Domain Name
              </label>
              <p className="text-danger msg">
                {validDomain ? validDomain : renderError("domainName")}
              </p>
            </div>
          </div>
          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline">
              <input
                type="text"
                name="email"
                // placeholder="xyz@example.com"
                className="form-control "
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <label
                className="form-label"
                htmlFor="typeText"
                style={{ background: "#fff" }}
              >
                Company E-Mail
              </label>
              {renderError("email")}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6  mb-4">
            <div className="form-outline ">
              <input
                type={show ? "text" : "password"}
                name="password"
                className="form-control"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <label
                className="form-label"
                htmlFor="typeText"
                style={{ background: "#fff" }}
              >
                Password
              </label>
              <span
                className="pwdeye"
              
                onClick={toggleShow}
              >
                {show ? (
                  <i className="far fa-eye" id="togglePassword"></i>
                ) : (
                  <i className="fa fa-eye-slash" id="togglePassword"></i>
                )}
              </span>
              <span
                style={{ position: "absolute",  left: "0" }}
              >
                {" "}
                {renderError("password")}
              </span>
            </div>
          </div>
          <div className="col-md-6 mb-4" >
            <div className="form-outline">
              <input
                type={show ? "text" : "password"}
                name="password_confirmation"
                className="form-control"
                value={values.password_confirmation}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <label
                className="form-label"
                htmlFor="typeText"
                style={{ background: "#fff" }}
              >
                Confirm Password
              </label>
              <span
                className="pwdeye"          
                
                onClick={toggleShow}
              >
                {show ? (
                  <i className="fa fa-eye icn" id="togglePassword"></i>
                ) : (
                  <i className="fa fa-eye-slash icn" id="togglePassword"></i>
                )}
              </span>
              <span
                style={{ position: "absolute",  left: "0" }}
              >

                {renderError("password_confirmation")}
              </span>
            </div>
          </div>
        </div>

        <div className="row proceedbtn">
          <div className="col-md-12 mb-4 pb-2">
            <button type="submit" className="btn mybtn">
              Next
            </button>
            <p className="submitcontent">
              Already have an account.{" "}
              <Link to="/login" style={{ color: "#134d75", fontWeight: "600" }}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignupStepA;

