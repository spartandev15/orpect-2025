import React, { useState } from "react";
import Layout from "../../component/layout";
import { useFormik } from "formik";
import { getFromLocalStorage } from "../../helper";
import { toast } from "react-toastify";
import Button from "../../component/Button";
import { useNavigate } from "react-router";
import { AddExEmployeeReviewSchema } from "../../helper/schema";
import { useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import Select from "react-select";

import Stars from "../../component/extras/Stars";
import EmployeeCropImage from "../../component/extras/crop-image/EmployeeCropImage";
import { BASE_URL } from "../../api/baseUrl";
import { InputAdd } from "../../component/InputAdd";
import { useAddExEmployeeReviewMutation } from "../../apis/employee";

const initialValues = {
  empId: "",
  empName: "",
  email: "",
  phone: "",
  position: "",
  dateOfJoining: "",
  pan_number: "",
  dateOfBirth: "",
  dateOfLeaving: "",
  permanentAddress: "",
  city: "",
  state: "",
  country: "",
  linkedIn: "",
  review: "",
  attitudeBehaviourRating: "",
  performanceRating: "",
  professionalSkillsRating: "",
  teamworkCommunicationRating: "",
  lastCTC: null,
  postalCode: "",
};

const AddExEmployeeReview = () => {
  // const [loading, setLoading] = useState(false);
  const bearerToken = getFromLocalStorage("token");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.data);
  const [addExEmployeeReview,{isLoading:loading}]=useAddExEmployeeReviewMutation()

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      validationSchema: AddExEmployeeReviewSchema,
      onSubmit: async (values) => {
        try {
          // setLoading(true);
          const formData = new FormData();
          formData.append("empId", values.empId);
          formData.append("empName", values.empName);
          formData.append("email", values.email);
          formData.append("phone", values.phone);
          formData.append("position", values.position);
          formData.append("dateOfJoining", values.dateOfJoining);
          formData.append("image", values?.image?.blob || ""); // Use default value if no image
          formData.append("pan_number", values.pan_number);
          formData.append("dateOfBirth", values.dateOfBirth);
          formData.append("permanentAddress", values.permanentAddress);
          formData.append("linkedIn", values.linkedIn);
          formData.append("city", values.city);
          formData.append("state", values.state);
          formData.append("country", values.country);
          formData.append("postalCode", values.postalCode);
          formData.append("exEmployee", 1);
          formData.append("nonJoiner", 0);
          formData.append("dateOfLeaving", values.dateOfLeaving);
          formData.append("rating", values.rating);
          formData.append("performanceRating", values.performanceRating);
          formData.append(
            "professionalSkillsRating",
            values.professionalSkillsRating
          );
          formData.append(
            "teamworkCommunicationRating",
            values.teamworkCommunicationRating
          );
          formData.append(
            "attitudeBehaviourRating",
            values.attitudeBehaviourRating
          );
          formData.append("lastCTC", values.lastCTC);
          formData.append("review", values.review);

          // const response = await fetch(`${BASE_URL}/addReview`, {
          //   method: "POST",
          //   headers: {
          //     Authorization: `Bearer ${bearerToken}`,
          //     Accept: "application/json",
          //   },
          //   body: formData,
          // });
          const response =  await addExEmployeeReview({ formData }).unwrap();
          
          if (response?.status) {
            //  await response.json();
            toast.success("Successfully added");
            navigate("/ex-employee");
          } else {
            const errorData = await response.json();
            throw new Error(errorData?.message);
          }
        } catch (error) {
          toast.error(error.message);
        } finally {
          // setLoading(false);
        }
      },
      validate: (values) => {
        const errors = {};

        const dateOfJoining = new Date(values.dateOfJoining);
        const dateOfLeaving = new Date(values.dateOfLeaving);

        if (dateOfJoining >= dateOfLeaving) {
          errors.dateOfLeaving =
            "Date of Leaving should be later than Date of Joining";
        }

        return errors;
      },
    });
  const getImageValue = (getCropedImage) => {
    values.image = getCropedImage;
  };

  const attitudeRating = values.attitudeBehaviourRating || 0;
  const performanceRating = values.performanceRating || 0;
  const skillsRating = values.professionalSkillsRating || 0;
  const teamworkRating = values.teamworkCommunicationRating || 0;

  const totalRatings = 4; // Total number of fields
  const averageRating =
    (attitudeRating + performanceRating + skillsRating + teamworkRating) /
    totalRatings;

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
  }));

  const handleCountryChange = (selectedOption) => {
    setFieldValue("country", selectedOption?.label);
    const countryCode = selectedOption?.value;
    const country = countries.find((c) => c.isoCode === countryCode);
    setSelectedCountry(country);
    setSelectedState(null);
  };

  const handleStateChange = (selectedOption) => {
    const stateId = selectedOption?.value;
    setFieldValue("state", selectedOption?.label);

    const state = states.find((s) => s.isoCode === stateId);
    setSelectedState(state);
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <Layout>
        <form
          autoComplete="off"
          noValidate="noValidate"
          className="container-fluid add-employe "
          onSubmit={handleSubmit}
        >
          <div className="row ">
            <div className="col-lg-12">
              <h3>Add Review</h3>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="profile-pic-wrapper">
              <EmployeeCropImage
                getImageValue={getImageValue}
                setFieldValue={setFieldValue}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <InputAdd
                  name="empId"
                  value={values.empId}
                  onChange={handleChange}
                  label="Employee Id"
                  star={true}
                />
                {errors.empId && touched.empId ? (
                  <p className="text-danger msg">{errors.empId}</p>
                ) : null}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12  pb-4">
              <div className="form-outline">
                <InputAdd
                  name="empName"
                  value={values.empName}
                  onChange={handleChange}
                  label="Employee Name"
                  star={true}
                />
                {errors.empName && touched.empName ? (
                  <p className="text-danger msg">{errors.empName}</p>
                ) : null}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12  pb-4">
              <div className="form-outline">
                <InputAdd
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  label="E-Mail"
                  star={true}
                />
                {errors.email && touched.email ? (
                  <p className="text-danger msg">{errors.email}</p>
                ) : null}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12  pb-4">
              <div className="form-outline">
                <InputAdd
                  type="number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  label="Phone Number"
                  star={true}
                />
                {errors.phone && touched.phone ? (
                  <p className="text-danger msg">{errors.phone}</p>
                ) : null}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12  pb-4">
              <div className="form-outline datalist">
                <input
                  type="text"
                  list="cars"
                  className="form-control"
                  name="position"
                  value={values.position}
                  onChange={handleChange}
                  required
                />
                <label className="form-label" for="typeText">
                  Position &nbsp;<span className="required">*</span>
                </label>
                <datalist className="datalist-ul" id="cars">
                  {data?.positions?.map((i) => (
                    <option key={i.id} value={i.position}>
                      {i.position}
                    </option>
                  ))}
                </datalist>
                {errors.position && touched.position ? (
                  <p className="text-danger msg">{errors.position}</p>
                ) : null}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12  pb-4">
              <div className="form-outline">
              <input
                  type="date"
                  name="dateOfJoining"
                  value={values.dateOfJoining}
                  onChange={handleChange}
                  max={currentDate}
                  required
                />

                <label
                  className="form-label"
                  // for="typeText"
                >
                  Date of Joining &nbsp;
                  <span className=" required">*</span>
                </label>
                {errors.dateOfJoining && touched.dateOfJoining ? (
                  <p className="text-danger msg">{errors.dateOfJoining}</p>
                ) : null}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <InputAdd
                  name="pan_number"
                  value={values.pan_number}
                  onChange={(event) =>
                    setFieldValue(
                      "pan_number",
                      event.target.value.toUpperCase()
                    )
                  }
                  label="Tax Number"
                  star={true}
                />
                {errors.pan_number && touched.pan_number ? (
                  <p className="text-danger msg">{errors.pan_number}</p>
                ) : null}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
              <input
                  type="date"
                  className="form-control"
                  placeholder=" "
                  name="dateOfBirth"
                  value={values.dateOfBirth}
                  max={currentDate}
                  onChange={handleChange}
                  required
                />
                <label className="form-label" for="typeText">
                  Date of Birth
                </label>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <InputAdd
                  name="permanentAddress"
                  value={values.permanentAddress}
                  onChange={handleChange}
                  label="Permanent Address"
                  star={true}
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <InputAdd
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  label="City"
                />
                {errors.city && touched.city ? (
                  <p className="text-danger msg">{errors.city}</p>
                ) : null}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <label className="addlabel"> Country</label>

                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Select Country.."
                  isClearable={true}
                  isRtl={false}
                  isSearchable={true}
                  defaultValue={values.company_country}
                  options={countryOptions}
                  id="company_country"
                  name="company_country"
                  onChange={handleCountryChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <label className="addlabel"> State</label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Select State.."
                  isDisabled={selectedCountry?.name ? false : true}
                  isClearable={true}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  options={stateOptions}
                  onChange={handleStateChange}
                  style={{ textAlign: "center" }}
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <InputAdd
                  type="number"
                  name="postalCode"
                  value={values.postalCode}
                  onChange={handleChange}
                  label="Postal Code"
                />
                {errors.postalCode && touched.postalCode ? (
                  <p className="text-danger msg">{errors.postalCode}</p>
                ) : null}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <InputAdd
                  name="linkedIn"
                  value={values.linkedIn}
                  onChange={handleChange}
                  label="LinkedIn"
                />
                {errors.linkedIn && touched.linkedIn ? (
                  <p className="text-danger msg">{errors.linkedIn}</p>
                ) : null}
              </div>
            </div>

            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <InputAdd
                  name="lastCTC"
                  value={values.lastCTC}
                  onChange={handleChange}
                  label="CTC"
                />
                {errors.lastCTC && touched.lastCTC ? (
                  <p className="text-danger msg">{errors.lastCTC}</p>
                ) : null}
              </div>
            </div>

            {/* ///////////////////////////////////////// */}

            {/* ////////////////////////////// */}

            <div className="starrate">
              <>
                <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
                  <h5>Rate Your Experience</h5>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <span className="employe_factor">
                      <h6>1. Job Performance</h6>
                      <div className="starrating risingstar employee_star ">
                        {[...Array(5)].map((_, index) => {
                          const starValue = index + 1; // Calculate the star value in ascending order
                          return (
                            <span
                              key={starValue}
                              className={`star ${
                                starValue <= values.performanceRating
                                  ? "filled"
                                  : ""
                              }`}
                              onClick={() =>
                                setFieldValue("performanceRating", starValue)
                              }
                            >
                              <i className="fa fa-star" />
                            </span>
                          );
                        })}
                        {/* {errors.performanceRating &&
                        touched.performanceRating ? (
                          <p className="text-danger msg">
                            {errors.performanceRating}
                          </p>
                        ) : null} */}
                      </div>
                    </span>
                    <div className="validationemploye">
                      {errors.performanceRating && touched.performanceRating ? (
                        <p className="text-danger msg">
                          {errors.performanceRating}
                        </p>
                      ) : null}
                    </div>

                    <span className="employe_factor">
                      <h6>2. Professional Skills</h6>
                      <div className="starrating risingstar employee_star">
                        {[...Array(5)].map((_, index) => {
                          const starValue = index + 1; // Calculate the star value in ascending order
                          return (
                            <span
                              key={starValue}
                              className={`star ${
                                starValue <= values.professionalSkillsRating
                                  ? "filled"
                                  : ""
                              }`}
                              onClick={() =>
                                setFieldValue(
                                  "professionalSkillsRating",
                                  starValue
                                )
                              }
                            >
                              <i className="fa fa-star" />
                            </span>
                          );
                        })}
                      </div>
                    </span>
                    <div className="validationemploye">
                      {errors.professionalSkillsRating &&
                      touched.professionalSkillsRating ? (
                        <p className="text-danger msg">
                          {errors.professionalSkillsRating}
                        </p>
                      ) : null}
                    </div>

                    <span className="employe_factor">
                      <h6>3. Teamwork and Communication</h6>
                      <div className="starrating risingstar employee_star ">
                        {[...Array(5)].map((_, index) => {
                          const starValue = index + 1; // Calculate the star value in ascending order
                          return (
                            <span
                              key={starValue}
                              className={`star ${
                                starValue <= values.teamworkCommunicationRating
                                  ? "filled"
                                  : ""
                              }`}
                              onClick={() =>
                                setFieldValue(
                                  "teamworkCommunicationRating",
                                  starValue
                                )
                              }
                            >
                              <i className="fa fa-star" />
                            </span>
                          );
                        })}
                      </div>
                    </span>
                    <div className="validationemploye">
                      {errors.teamworkCommunicationRating &&
                      touched.teamworkCommunicationRating ? (
                        <p className="text-danger msg">
                          {errors.teamworkCommunicationRating}
                        </p>
                      ) : null}
                    </div>

                    <span className="employe_factor">
                      <h6>4. Attitude and Behavior</h6>
                      <div className="starrating risingstar employee_star ">
                        {[...Array(5)].map((_, index) => {
                          const starValue = index + 1; // Calculate the star value in ascending order
                          return (
                            <span
                              key={starValue}
                              className={`star ${
                                starValue <= values.attitudeBehaviourRating
                                  ? "filled"
                                  : ""
                              }`}
                              onClick={() =>
                                setFieldValue(
                                  "attitudeBehaviourRating",
                                  starValue
                                )
                              }
                            >
                              <i className="fa fa-star" />
                            </span>
                          );
                        })}
                      </div>
                    </span>
                    <div className="validationemploye">
                      {errors.attitudeBehaviourRating &&
                      touched.attitudeBehaviourRating ? (
                        <p className="text-danger msg">
                          {errors.attitudeBehaviourRating}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <span
                      className="employe_factor"
                      style={{
                        fontSize: "18px",
                      }}
                    >
                      Overall Rating: {averageRating}{" "}
                      <Stars
                        rating={averageRating}
                        style={{ fontSize: "18px" }}
                      />
                    </span>
                    <div className="form-outline mt-4">
                      <InputAdd
                        type="date"
                        name="dateOfLeaving"
                        value={values.dateOfLeaving}
                        onChange={handleChange}
                        label="Date of Leaving"
                        star={true}
                      />

                      {errors.dateOfLeaving && touched.dateOfLeaving ? (
                        <p className="text-danger msg">
                          {errors.dateOfLeaving}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </>
              <div className="form-outline mt-3">
                <textarea
                  name="review"
                  className="form-control mt-1"
                  rows="3"
                  cols="30"
                  value={values.review}
                  onChange={handleChange}
                  required
                />
                <label for="typeTextarea">
                  Review &nbsp;<span className="required">*</span>{" "}
                </label>
                {errors.review && touched.review ? (
                  <p className="text-danger msg">{errors.review}</p>
                ) : null}
              </div>
            </div>
            <div className="row" style={{ paddingRight: "0" }}>
              <div className="col-lg-4 col-md-4 pd-4"></div>
              <div
                className="col-lg-4 col-md-4 col-sm-12 pb-4 mt-3"
                style={{ textAlign: "center", paddingRight: "0" }}
              >
                <Button className="btn mybtn" loading={loading} text="Submit" />
              </div>
              <div className="col-lg-4 col-md-4 pd-4  btnright"></div>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default AddExEmployeeReview;
