import React, { useContext, useState } from "react";
import "../../asset/css/auth.css";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Button from "../../component/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { FormContext } from "../../pages/auth-pages/Register";
import { Country, State } from "country-state-city";

import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { saveFormData } from "../../store/FormSlice";
import { BASE_URL } from "../../api/baseUrl";
const initialValues = {
  companyAddress: "",
  companyCity: "",
  companyState: "",
  companyCountry: "",
  companyPostalCode: "",
  registrationNumber: "",
  companyWebmasterEmail: "",
  companyPhone: "",
  companySocialLink: "",
  termsNconditions: 0,
  otp: "",
};

const validationSchema = yup.object().shape({
  companyAddress: yup.string(),
  companyCity: yup.string(),
  companyState: yup.string(),
  companyCountry: yup.string(),
  companyPostalCode: yup.string(),
  registrationNumber: yup.string().required("Registration Number is required"),
  companyWebmasterEmail: yup.string().email("Invalid email"),
  companyPhone: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Invalid mobile number"),
  companySocialLink: yup.string().url("Invalid Url"),
  termsNconditions: yup
    .number()
    .oneOf([1], "Please accept the Terms and Conditions")
    .required("Terms and Conditions is required"),
  otp: yup.string().required("OTP is required"),
});

const SignupStepB = () => {
  const [loading, setLoading] = useState(false);
  const [optText, setOptText] = useState("Send OTP");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [otpLoading, setOtpLoading] = useState(null);

  const mypreviousData = useSelector((state) => state.form.formData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const countries = Country.getAllCountries();

  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];

  const countryOptions = countries.map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = states.map((state) => ({
    value: state.isoCode,
    label: state.name,
    placeholder: "Select State...",
  }));

  const { values, errors, touched, handleSubmit, setFieldValue, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      validateOnMount: true,
      validateOnChange: true,
      isInitialValid: true,
      onSubmit: async (values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        setLoading(true);
        axios
          .post(`${BASE_URL}/register`, data)
          .then((res) => {
            setLoading(false);
            // navigate("/verification");
            navigate("/login");
       toast.success("Register Successfully")
          })
          .catch((err) => {
            setLoading(false);

            if (err?.response?.data?.errors?.email) {
              toast.error(err?.response?.data?.errors?.email[0]);
            } else if (err?.response?.data?.errors?.companySocialLink) {
              toast.error("Invalid ");
            } else {
              toast.error(err?.response?.data?.message);
            }
          });
      },
    });

  const setValues = (data) => {
    Object.keys(data).forEach((fieldName) => {
      setFieldValue(fieldName, data[fieldName]);
    });
  };

  const handlePreviousData = () => {
    setActiveStepIndex(activeStepIndex - 1);
    const data = { ...formData, ...values };
    dispatch(saveFormData(data));
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

  const handleCountryChange = (selectedOption) => {
    setFieldValue("companyCountry", selectedOption?.label);
    const countryCode = selectedOption?.value;
    const country = countries.find((c) => c.isoCode === countryCode);
    setSelectedCountry(country);
    setSelectedState(null);
  };
  const handleStateChange = (selectedOption) => {
    const stateId = selectedOption?.value;

    setFieldValue("companyState", selectedOption?.label);

    const state = states.find((s) => s.isoCode === stateId);
    setSelectedState(state);
  };

  const handleGetOpt = () => {
    setOtpLoading(true);
    if (formData.email) {
      axios
        .post(`${BASE_URL}/sendVerificationOtp`, {
          email: formData.email,
        })
        .then((res) => {
          toast.success("OTP sent, please check");
          setOptText("Resend OTP");
          setOtpLoading(false);
        })

        .catch((err) => {
          setOtpLoading(false);
        });
    }
  };

  console.log("my pre---", mypreviousData);
  return (
    <>
      <form
        noValidate="noValidate"
        className=" text-center signup_pd_inner"
        onSubmit={handleSubmit}
      >
        <h3>Company Registration</h3>

        <div className="row mt-4">
          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline">
              <Select
                className="basic-single"
                classNamePrefix="select"
                isDisabled={false}
                isClearable={true}
                isRtl={false}
                isSearchable={true}
                defaultValue={
                  mypreviousData.companyCountry
                    ? {
                        label: mypreviousData.companyCountry,
                        value: mypreviousData.companyCountry,
                      }
                    : null
                }
                name="companyCountry"
                placeholder="Select Country.."
                options={countryOptions}
                onChange={handleCountryChange}
              />
              {renderError("companyName")}
            </div>
          </div>

          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline">
              <Select
                className="basic-single"
                classNamePrefix="select"
                isDisabled={values.companyCountry ? false : true}
                isClearable={true}
                isRtl={false}
                isSearchable={true}
                name="companyState"
                placeholder="Select State.."
                defaultValue={
                  mypreviousData.companyState
                    ? {
                        label: mypreviousData.companyState,
                        value: mypreviousData.companyState,
                      }
                    : null
                }
                options={stateOptions}
                onChange={handleStateChange}
                style={{ textAlign: "center" }}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline">
              <textarea
                className="form-control"
                name="companyAddress"
                id="typeTextarea"
                value={values.companyAddress}
                onChange={handleChange}
                required
              ></textarea>
              <label
                className="form-label"
                htmlFor="typeTextarea"
                style={{ background: "#fff" }}
              >
                Address
              </label>
              {renderError("companyAddress")}
            </div>
          </div>
          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline">
              <input
                type="text"
                className="form-control"
                name="companyCity"
                value={values.companyCity}
                onChange={handleChange}
                required
              />
              <label
                className="form-label"
                htmlFor="typeText"
                style={{ background: "#fff" }}
              >
                City
              </label>
              {renderError("companyCity")}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline">
              <input
                type="text"
                className="form-control"
                name="companyPostalCode"
                value={values.companyPostalCode}
                onChange={handleChange}
                required
              />
              <label
                className="form-label"
                htmlFor="typeText"
                style={{ background: "#fff" }}
              >
                Postal Code
              </label>
              {renderError("companyPostalCode")}
            </div>
          </div>
          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline">
              <input
                type="text"
                className="form-control"
                name="registrationNumber"
                value={values.registrationNumber}
                onChange={handleChange}
                required
              />
              <label
                className="form-label"
                htmlFor="typeText"
                style={{ background: "#fff" }}
              >
                Registration/Tax Number
              </label>
              {renderError("registrationNumber")}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline ">
              <input
                type="text"
                className="form-control"
                name="companyWebmasterEmail"
                value={values.companyWebmasterEmail}
                onChange={handleChange}
                required
              />
              <label
                className="form-label"
                htmlFor="typeText"
                style={{ background: "#fff" }}
              >
                {" "}
                Webmaster E-Mail
              </label>
              {renderError("companyWebmasterEmail")}
            </div>
          </div>
          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline  ">
              <input
                type="text"
                className="form-control"
                name="companyPhone"
                value={values.companyPhone}
                onChange={handleChange}
                required
              />
              <label
                className="form-label"
                htmlFor="typeText"
                style={{ background: "#fff" }}
              >
                Company Phone Number
              </label>
              {renderError("companyPhone")}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline  ">
              <input
                type="text"
                className="form-control"
                name="companySocialLink"
                value={values.companySocialLink}
                onChange={handleChange}
                required
              />
              <label
                className="form-label"
                htmlFor="typeText"
                style={{ background: "#fff" }}
              >
                LinkedIn URL
              </label>
              {renderError("companySocialLink")}
            </div>
          </div>
          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline position-relative">
              <input
                type="text"
                name="otp"
                className="form-control "
                value={values.otp}
                onChange={handleChange}
                required
              />
              <label
                className="form-label"
                htmlFor="typeText"
                style={{ background: "#fff" }}
              >
                Email Verification OTP
              </label>
              <p className="get-otp">
                Get OTP to verify your Email{" "}
                <span onClick={handleGetOpt} className="get-otp-class">
                  {optText}.{" "}
                  {otpLoading && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                </span>
              </p>

              {renderError("otp")}
            </div>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-12  pb-2">
            <p>
              <input
                type="checkbox"
                name="termsNconditions"
                checked={values.termsNconditions === 1} // Set the checked state based on the value
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: e.target.name,
                      value: e.target.checked ? 1 : 0, // Set the value as 1 if checked, 0 if unchecked
                    },
                  })
                }
              />
              &nbsp;By ticking this box, you affirm your agreement to ORPECT's<Link style={{textDecoration:'none', color:'#134d75',fontWeight:600}} to="/terms-of-use"> Terms of Use </Link> &<Link style={{textDecoration:'none' ,color:'#134d75',fontWeight:600}}  to="/privacy-policy"> Privacy Policy.</Link>
            </p>
            {renderError("termsNconditions")}
          </div>
        </div>

        <div className="row proceedbtn">
          <div className="col-md-12 mb-4 pb-2">
            <button
              className="btn mybtn"
              style={{ marginRight: "1rem" }}
              onClick={handlePreviousData}
              //  setActiveStepIndex(activeStepIndex - 1)
            >
              Previous
            </button>
            <Button className="btn mybtn" loading={loading} text="Submit" />
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

export default SignupStepB;
