import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { addRateReview } from "../../api/rate&review";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import $ from "jquery";
import Button from "../Button";
import * as yup from "yup";

const initialValues = {
  exEmployee: 0,
  nonJoiner: 1,
  review: "",
  attitudeBehaviourRating: 0,
  performanceRating: 0,
  professionalSkillsRating: 0,
  teamworkCommunicationRating: 0,
};

const Validation = yup.object().shape({
  review: yup.string().required("Review is required"),
});
const EditNonJoinerReview = ({ employee }) => {
  const [loading, setLoading] = useState(false);
  const [exEmployeeReview, setExployeeReview] = useState(null);
  const dispatch = useDispatch();

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: Validation,
    onSubmit: (values) => {
      setLoading(true);
      try {
        dispatch(addRateReview(employee?.sid, values)).then((res) => {
          toast.success("Successfully added");
          setLoading(false);
          window.location.reload();
        });
      } catch (error) {
        setLoading(false);
        toast.error(errors?.message);
      }
    },
  });

  const setValues = (data) => {
    values.review = data?.review;
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

  // const attitudeRating = values.attitudeBehaviourRating || 0;
  // const performanceRating = values.performanceRating || 0;
  // const skillsRating = values.professionalSkillsRating || 0;
  // const teamworkRating = values.teamworkCommunicationRating || 0;

  // const totalRatings = 4; // Total number of fields
  // const averageRating =
  //   (attitudeRating + performanceRating + skillsRating + teamworkRating) /
  //   totalRatings;

  return (
    <>
      <div className="row">
        <div className="readonly-form3">
          <div className="row">
            <div
              className="col-lg-12 col-md-12 col-sm-12"
              style={{ display: "flex" }}
            >
              <p className="addlabelcard2">Status</p>
              <h6
                className="profileimgboxcompanydetail2"
                style={{ paddingLeft: "5px" }}
              >
                Non Joiner
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="form-outline" style={{ display: "flex" }}>
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
            {/* ///////// */}
            <div className="starrate form-outline">
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
                className=" "
                htmlFor="typeTextarea"
                style={{ background: "#fff" }}
              >
                Review &nbsp;<span className="required">*</span>{" "}
              </label>
              {errors.review && touched.review ? (
                <p className="text-danger msg">{errors.review}</p>
              ) : null}
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <Button
                  loading={loading}
                  text="Save"
                  className="btn infoedit3"
                />
                {/* <SaveRatingPopup /> */}
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
      </div>
    </>
  );
};

export default EditNonJoinerReview;
