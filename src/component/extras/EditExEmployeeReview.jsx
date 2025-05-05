import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { RateReviewSchema } from "../../helper/schema";
import { addRateReview } from "../../api/rate&review";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import $ from "jquery";
import Button from "../Button";
import Stars from "./Stars";
import { formatDate } from "../../helper/hooks/formatedDate";

const initialValues = {
  exEmployee: 1,
  nonJoiner: 0,
  review: "",
  dateOfLeaving: "",
  attitudeBehaviourRating: 0,
  performanceRating: 0,
  professionalSkillsRating: 0,
  teamworkCommunicationRating: 0,
  lastCTC: 0,
};
const EditExEmployeeReview = ({ employee, dateOfJoining }) => {
  const [loading, setLoading] = useState(false);
  const [exEmployeeReview, setExployeeReview] = useState(null);
  const dispatch = useDispatch();


  const { values, errors, touched, setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: RateReviewSchema,
      onSubmit: (values) => {
        setLoading(true);
        try {
          dispatch(addRateReview(employee?.sid, values)).then((res) => {
            toast.success("Successfully saved");
            setLoading(false);
            window.location.reload();
          });
        } catch (error) {
          setLoading(false);
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

  const setValues = (data) => {
    values.dateOfLeaving = data?.date_of_leaving;
    values.review = data?.review;
    values.exEmployee = data?.ex_employee;
    values.nonJoiner = data?.non_joiner;
    values.performanceRating = parseInt(data.performance_rating);
    values.attitudeBehaviourRating = parseInt(data.attitude_behaviour_rating);
    values.professionalSkillsRating = parseInt(data.professional_skills_rating);
    values.teamworkCommunicationRating = parseInt(
      data.teamwork_communication_rating
    );
    values.lastCTC = parseInt(data?.last_CTC);
  };

  useEffect(() => {
    if (employee) {
      setValues(employee);
      setExployeeReview(employee);
    }
  }, []);

  $(document).ready(function () {
    $("#editButton").click(function () {
      $(".editable-form").show();
      $(".readonly-form").hide();
      $("#editButton").hide();
      $("#cancelButton").show();
    });

    $("#cancelButton").click(function () {
      $(".editable-form").hide();
      $(".readonly-form").show();
      $("#editButton").show();
      $("#cancelButton").hide();
    });
  });

  const attitudeRating = values.attitudeBehaviourRating || 0;
  const performanceRating = values.performanceRating || 0;
  const skillsRating = values.professionalSkillsRating || 0;
  const teamworkRating = values.teamworkCommunicationRating || 0;

  const totalRatings = 4; // Total number of fields
  const averageRating =
    (attitudeRating + performanceRating + skillsRating + teamworkRating) /
    totalRatings;

  return (
    <>
      <div className="row">
        <div className="readonly-form3">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <p className="addlabelcard2">Status</p>
              <p
                className="  profileimgboxcompanydetail2"
                style={{
                  fontSize: "14px",
                  marginBottom: "1rem",
                  marginTop: "-1px",
                }}
              >
                Ex Employee
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <p className="addlabelcard2">CTC</p>
              <h6 className="profileimgboxcompanydetail2">
                {!exEmployeeReview?.last_CTC || exEmployeeReview.last_CTC==="0" ||  exEmployeeReview.last_CTC===0
                  ? "---"
                  : exEmployeeReview?.last_CTC}
              </h6>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <p className="addlabelcard2">Date of Leaving</p>
              <h6 className="profileimgboxcompanydetail2">
                {exEmployeeReview?.date_of_leaving
                  ? formatDate(exEmployeeReview?.date_of_leaving)
                  : "---"}
              </h6>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <p className="addlabelcard2">Rating</p>
              <div className="starrating risingstar d-flex justify-content-start flex-row-reverse">
                <Stars rating={exEmployeeReview?.overall_rating} />
              </div>
            </div>
            <div
              className="col-lg-12 col-md-12 col-sm-12 "
              style={{ display: "flex" }}
            >
              <p className="addlabelcard2">Review</p>

              <h6
                className="profileimgboxcompanydetail2"
                style={{ textAlign: "left" }}
              >
                {exEmployeeReview?.review}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <form noValidate="noValidate" onSubmit={handleSubmit}>
        <div className="editable-form3" style={{ display: "none" }}>
          <div className="row">
            <div className="row mt-2">
              <div className="col-lg-5 col-md-5 col-sm-12 mt-3">
                <div className="form-outline">
                  <input
                    type="date"
                    name="dateOfLeaving"
                    className="form-control"
                    value={values.dateOfLeaving}
                    onChange={handleChange}
                    required
                  />
                  <label
                    className="form-label"
                    for="typeText"
                    style={{ background: "#fff" }}
                  >
                    {" "}
                    Date of Leaving&nbsp; <span className="required">*</span>
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
                    for="typeText"
                    style={{ background: "#fff" }}
                  >
                    CTC
                  </label>
                </div>
                <div style={{ paddingBottom: "1rem" }}>
                  <h5
                    style={{
                      fontSize: "16px",
                      color: "#002d3a",
                    }}
                  >
                    <span>Overall Rating: {averageRating} </span>
                  </h5>
                  <Stars rating={averageRating} />
                </div>
              </div>

              <div className="col-lg-7 col-md-7 col-sm-12 ">
                <h5 style={{ color: "#002d3a", fontSize: "16px" }}>
                  Rate Your Experience
                </h5>

                <>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <span className="employe_factor1">
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
                        </div>
                      </span>
                      <div className="validationemploye">
                        {errors.performanceRating &&
                        touched.performanceRating ? (
                          <p className="text-danger msg">
                            {errors.performanceRating}
                          </p>
                        ) : null}
                      </div>

                      <span className="employe_factor1">
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
                      </span>
                      <div className="validationemploye">
                        {errors.professionalSkillsRating &&
                        touched.professionalSkillsRating ? (
                          <p className="text-danger msg">
                            {errors.professionalSkillsRating}
                          </p>
                        ) : null}
                      </div>

                      <span className="employe_factor1">
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
                      </span>
                      <div className="validationemploye">
                        {errors.teamworkCommunicationRating &&
                        touched.teamworkCommunicationRating ? (
                          <p className="text-danger msg">
                            {errors.teamworkCommunicationRating}
                          </p>
                        ) : null}
                      </div>

                      <span className="employe_factor1">
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
                  </div>
                </>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="starrate">
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
                <label
                  className="form-label"
                  for="typeText"
                  style={{ background: "#fff" }}
                >
                  {" "}
                  Review&nbsp; <span className="required">*</span>
                </label>
                {errors.review && touched.review ? (
                  <p className="text-danger msg">{errors.review}</p>
                ) : null}
              </div>
            </div>{" "}
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <Button loading={loading} text="Save" className="btn infoedit3" />
              &nbsp;
              <p
                id="cancelButton3"
                className="btn infoedit4"
                style={{ marginTop: "1rem" }}
              >
                Cancel
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditExEmployeeReview;
