import React from "react";
import SaveRatingPopup from "../SaveReviewPopup";
import { useFormik } from "formik";
import { RateReviewSchema } from "../../helper/schema";
import { addRateReview } from "../../api/rate&review";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Stars from "./Stars";
import { useNavigate } from "react-router-dom";

const initialValues = {
  exEmployee: 1,
  nonJoiner: 0,
  review: "",
  dateOfLeaving: "",
  attitudeBehaviourRating: "",
  performanceRating: "",
  professionalSkillsRating: "",
  teamworkCommunicationRating: "",
  lastCTC: 0,
};
const AddEmployeeReview = ({ id, dateOfJoining }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { values, errors, touched, setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: RateReviewSchema,
      onSubmit: (values) => {
        try {
          dispatch(addRateReview(id, values)).then((res) => {
            toast.success("Successfully added");
            // navigate('/ex-employee')
            
              window.location.href= '/orpect/ex-employee'
          });
        } catch (error) {
          toast.error(errors?.message);
        }
      },
      validate: (values) => {
        const errors = {};

        const mydateOfJoining = new Date(dateOfJoining);
        const dateOfLeaving = new Date(values.dateOfLeaving);

        if (mydateOfJoining >= dateOfLeaving) {
          errors.dateOfLeaving =
            "Date of Leaving should be later than Date of Joining";
        }

        return errors;
      },
    });

  const attitudeRating = values.attitudeBehaviourRating || 0;
  const performanceRating = values.performanceRating || 0;
  const skillsRating = values.professionalSkillsRating || 0;
  const teamworkRating = values.teamworkCommunicationRating || 0;

  const totalRatings = 4; // Total number of fields
  const averageRating =
    (attitudeRating + performanceRating + skillsRating + teamworkRating) /
    totalRatings;

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="row">
        <form noValidate="noValidate" onSubmit={handleSubmit}>
          <div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12"></div>
              <div className="col-lg-6 col-md-6 col-sm-12"></div>
              <div className="row mt-2">
                <div className="col-lg-5 col-md-5 col-sm-12 mt-2">
                  <div className="form-outline">
                    <input
                      type="date"
                      name="dateOfLeaving"
                      className="form-control"
                      placeholder="Date of Leaving"
                      max={currentDate}
                      value={values.dateOfLeaving}
                      onChange={handleChange}
                      required
                    />
                    <label
                      className="form-label"
                      htmlFor="typeText"
                      style={{ background: "#fff" }}
                    >
                      Date of Leaving &nbsp;
                      <span className=" required">*</span>
                    </label>
                    {errors.dateOfLeaving && touched.dateOfLeaving ? (
                      <p className="text-danger msg">{errors.dateOfLeaving}</p>
                    ) : null}
                  </div>

                  <div className="form-outline">
                    <input
                      type="text"
                      name="lastCTC"
                      className="form-control"
                      value={values.lastCTC || ""}
                      onChange={handleChange}
                      required
                    />
                    <label
                      className="form-label"
                      htmlFor="typeText"
                      style={{ background: "#fff" }}
                    >
                      CTC
                    </label>
                    {errors.lastCTC && touched.lastCTC ? (
                      <p className="text-danger msg">{errors.lastCTC}</p>
                    ) : null}
                  </div>

                  <span>
                    <h5
                      style={{
                        fontSize: "16px",
                        color: "#002d3a",
                      }}
                    >
                      <span>Overall Rating: {averageRating} </span>
                    </h5>{" "}
                    <Stars rating={averageRating} />
                  </span>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12 ">
                  <h5 style={{ color: "#002d3a", fontSize: "16px" }}>
                    Rate Your Experience
                  </h5>

                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div>
                        <div className="employe_factor1">
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
                                    setFieldValue(
                                      "performanceRating",
                                      starValue
                                    )
                                  }
                                >
                                  <i className="fa fa-star" />
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        <div className="validationemploye">
                          {errors.performanceRating &&
                          touched.performanceRating ? (
                            <p className="text-danger msg">
                              {errors.performanceRating}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div>
                        <div className="employe_factor1">
                          <h6>2. Professional Skills</h6>
                          <div className="starrating risingstar employee_star employee_star3">
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
                        </div>
                        <div className="validationemploye">
                          {errors.professionalSkillsRating &&
                          touched.professionalSkillsRating ? (
                            <p className="text-danger msg">
                              {errors.professionalSkillsRating}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div>
                        <div className="employe_factor1">
                          <h6>3. Teamwork and Communication</h6>
                          <div className="starrating risingstar employee_star employee_star3">
                            {[...Array(5)].map((_, index) => {
                              const starValue = index + 1; // Calculate the star value in ascending order
                              return (
                                <span
                                  key={starValue}
                                  className={`star ${
                                    starValue <=
                                    values.teamworkCommunicationRating
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
                        </div>
                        <div className="validationemploye">
                          {errors.teamworkCommunicationRating &&
                          touched.teamworkCommunicationRating ? (
                            <p className="text-danger msg">
                              {errors.teamworkCommunicationRating}
                            </p>
                          ) : null}
                        </div>{" "}
                      </div>
                      <div>
                        <div className="employe_factor1">
                          <h6>4. Attitude and Behavior</h6>
                          <div className="starrating risingstar employee_star employee_star3">
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
                        </div>
                        <div className="validationemploye">
                          {errors.attitudeBehaviourRating &&
                          touched.attitudeBehaviourRating ? (
                            <p className="text-danger msg">
                              {errors.attitudeBehaviourRating}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="starrate">
                  <></>
                  <div className="mt-3 form-outline">
                    <textarea
                      name="review"
                      className="form-control mt-1"
                      rows="3"
                      cols="30"
                      value={values.review}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="typeTextarea" style={{ background: "#fff" }}>
                      Review &nbsp;<span className="required">*</span>{" "}
                    </label>
                    {errors.review && touched.review ? (
                      <p className="text-danger msg">{errors.review}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* ///////// */}

            <div className="row mt-4">
              <div className="col-12">            
                <SaveRatingPopup />
                &nbsp;
                <p
                  style={{ margin: "0" }}
                  className="btn infoedit4"
                  data-toggle="collapse"
                  data-target="#collapserate"
                  aria-expanded="false"
                  aria-controls="collapserate"
                >
                  Cancel
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEmployeeReview;
