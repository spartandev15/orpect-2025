import { resetPasswordSchema } from "../../helper/schema";
import { useEffect, useState } from "react";
import { isTokenValidate, resetPasswordUser } from "../../api/auth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "../../component/Button";
import useToggle from "../../helper/hooks/useToggle";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useLoggedInRedirect from "../../helper/hooks/useLoggedInRedirect ";
import LayoutOrpect from "../LandingPage/Index";

const initialValues = {
  password: "",
  password_confirmation: "",
};

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [show, toggleShow] = useToggle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useLoggedInRedirect();
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      const validateToken = () => {
        dispatch(isTokenValidate(token))
          .then((res) => {
            if (res.status !== true) {
              navigate("/login");
            toast.error("Token has expired");
            }
          })
          .catch((err) => {
            navigate("/login");
            toast.error("Token is invalid");
          });
      };
      validateToken();
    } else {
      navigate("/login"); // Redirect to login page if token is not available
    }
  }, []);

  const onSubmit = (data) => {
    setLoading(true);
    data.token = token;
    dispatch(resetPasswordUser(data))
      .then((res) => {
        setLoading(false);
        toast.success("Password Updated Successfully");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <>
      <LayoutOrpect>
        <section className="signuppage">
          <div className="container">
            <div className="row  ">
              <div className="col-lg-6 contact_form11">
                <div className="signupform2">
                  <h5>Welcome to ORPECT!</h5>
                </div>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={resetPasswordSchema}
                onSubmit={onSubmit}
              >
                {({ setFieldValue }) => (
                  <Form
                    noValidate="novalidate"
                    className="col-lg-6 text-center signin_pd_inner contact_form12"
                  >
                    <h3 className="mt-4">Reset Password</h3>

                    <div className="row mt-4">
                      <div className="col-md-2"></div>
                      <div
                        className="col-md-8 pb-2"
                        style={{ position: "relative" }}
                      >
                        <div className="form-outline">
                          <Field
                            type={show ? "text" : "password"}
                            name="password"
                            className="form-control"
                            required
                          />
                          <label
                            className="form-label"
                            for="typeText"
                            style={{ background: "#fff" }}
                          >
                            Password
                          </label>
                          <span className="pwdeye" onClick={toggleShow}>
                            {show ? (
                              <i className="far fa-eye"></i>
                            ) : (
                              <i className="fa fa-eye-slash"></i>
                            )}
                          </span>
                          <p className="text-danger msg">
                            {" "}
                            <ErrorMessage name="password" />
                          </p>
                        </div>
                      </div>
                      <div className="col-md-2"></div>
                      <div className="col-md-2"></div>
                      <div
                        className="col-md-8  pb-2"
                        style={{ position: "relative" }}
                      >
                        <div className="form-outline">
                          <Field
                            type={show ? "text" : "password"}
                            name="password_confirmation"
                            className="form-control"
                            required
                          />
                          <label
                            className="form-label"
                            for="typeText"
                            style={{ background: "#fff" }}
                          >
                            Confirm Password
                          </label>
                          <span className="pwdeye" onClick={toggleShow}>
                            {show ? (
                              <i className="far fa-eye"></i>
                            ) : (
                              <i className="fa fa-eye-slash"></i>
                            )}
                          </span>
                          <p className="text-danger msg">
                            <ErrorMessage name="password_confirmation" />
                          </p>
                        </div>
                      </div>
                      <div className="col-md-2"></div>
                      <div className="row proceedbtn">
                        <div className="col-md-12 mb-4 pb-2">
                          <Button
                            className="btn mybtn"
                            loading={loading}
                            text="Proceed"
                          />
                          <p className="submitcontent">
                            Don't have an account.{" "}
                            <Link
                              to="/signup"
                              style={{ color: "#134d75", fontWeight: "600" }}
                            >
                              Sign Up
                            </Link>
                          </p>
                          <p>
                            Back to{" "}
                            <Link
                              to="/login"
                              style={{ color: "#134d75", fontWeight: "600" }}
                            >
                              Sign In{" "}
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="col-lg-2"></div>
            </div>
          </div>
        </section>
      </LayoutOrpect>
    </>
  );
};

export default ResetPassword;
