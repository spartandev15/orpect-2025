import { useFormik } from "formik";
import { forgetPasswordSchema } from "../../helper/schema";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../component/Button";
import { toast } from "react-toastify";
import LayoutOrpect from "../LandingPage/Index";
import { BASE_URL } from "../../api/baseUrl";
import axios from "axios";
const initialValues = {
  email: "",
};

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);

  const { values, errors, handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: initialValues,
    validationSchema: forgetPasswordSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${BASE_URL}/forgot-password`,
          values
        );
        toast.success("Please check your email");
      } catch (error) {
        const errorMessage = error?.response.data?.message || error.message;
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
  });


  return (
    <>
      <LayoutOrpect>
        <section className="signuppage">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 contact_form11 animate fadeInLeft One">
                <div className="signupform2">
                  <h5>Welcome to ORPECT!</h5> <br />
                  <p>Enter your email address to reset your password.</p>
                </div>
              </div>
              <div className="col-lg-6 contact_form12 animate fadeInRight One">
                <div className=" text-center signin_pd_inner">
                  <h3>Forget Password</h3>
                  <div className="row mt-4">
                    <div className="col-md-2"></div>
                    <form noValidate="noValidate" onSubmit={handleSubmit}>
                      <div
                        className="col-md-8 mb-4 pb-2"
                        style={{ margin: "auto" }}
                      >
                        <div className="form-outline">
                          <input
                            type="email"
                            className="form-control"
                            id="form3Examplev2"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                          />
                          <label className="form-label" for="typeText">
                            Enter Email Address
                          </label>
                          {<p className="text-danger msg">{errors.email}</p>}
                        </div>
                      </div>
                      <div className="col-md-2"></div>
                      <div className="row proceedbtn">
                        <div className="col-md-12 mb-4 pb-2">
                          <Button
                            className="btn mybtn"
                            loading={loading}
                            text="Request Link"
                          />
                          <p className="submitcontent">
                            Back To{" "}
                            <Link
                              to="/login"
                              style={{ color: "#134d75", fontWeight: "600" }}
                            >
                              Sign In
                            </Link>
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LayoutOrpect>
    </>
  );
};

export default ForgetPassword;
