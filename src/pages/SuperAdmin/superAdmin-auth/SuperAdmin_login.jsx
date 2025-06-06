import React, { useEffect } from "react";
import "../../../asset/css/auth.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginSchema } from "../../../helper/schema";
import { getFromLocalStorage, setToLocalStorage } from "../../../helper";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "../../../component/Button";
import useToggle from "../../../helper/hooks/useToggle";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveFormData } from "../../../store/FormSlice";
import LayoutOrpect from "../../LandingPage/Index";
import { useLoginUserMutation } from "../../../apis/auth";
import { useLoginSuperAdminMutation } from "../../../apis/SuperAdmin/auth";

// RTK Query Hook

const initialValues = {
  email: "",
  password: "",
};

const SuperAdmin_login = () => {
  const [loginSuperAdmin, { isLoading }] = useLoginSuperAdminMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, toggleShow] = useToggle();

  useEffect(() => {
    const isLoggedIn = !!getFromLocalStorage("superAdmintoken");
    if (isLoggedIn) {
      navigate("/super-admin/dashboard");
    }
  }, [navigate]);

  const onSubmit = async (values) => {
    try {
      dispatch(saveFormData(null));
      const response = await loginSuperAdmin(values).unwrap();
      console.log(response)
      navigate("/super-admin/dashboard");
      if (response?.status) {
        setToLocalStorage("user", response?.user);
        setToLocalStorage("token", response?.token);
        navigate("/super-admin/dashboard");
      } else {
        navigate("/super-admin/login");
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "Invalid Credentials";
      // if (errorMessage === "Account not verified.") {
      //   navigate("/verification");
      // }
      toast.error(errorMessage);
    }
  };

  return (
    <LayoutOrpect>
      <section className="signuppage">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 contact_form11 animate fadeInLeft One">
              <div className="signupform2">
                <h5>Welcome to Super admin!</h5>
                <p>Enter your Organization details and start your journey with us.</p>
                {/* <Link to="/signup">
                  <button className="btn signupbtn">Sign Up</button>
                </Link> */}
              </div>
            </div>
            <div className="col-lg-6 contact_form12 animate fadeInRight One">
              <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={onSubmit}
              >
                {({ setFieldValue }) => (
                  <Form noValidate className="text-center signin_pd_inner">
                    <h3>Sign In</h3>
                    <div className="row mt-4">
                      <div className="col-md-2"></div>
                      <div className="col-md-8 auth_page_padding">
                        <div className="form-outline">
                          <Field type="text" name="email" required />
                          <label className="form-label" htmlFor="typeText" style={{ background: "#fff" }}>
                            E-Mail
                          </label>
                        </div>
                        <p className="text-danger msg">
                          <ErrorMessage name="email" className="msg" />
                        </p>
                      </div>
                      <div className="col-md-2"></div>
                      <div className="col-md-2"></div>
                      <div className="col-md-8">
                        <div className="form-outline mt-2">
                          <Field
                            type={show ? "text" : "password"}
                            name="password"
                            className="form-control"
                            required
                          />
                          <label className="form-label" htmlFor="typeText" style={{ background: "#fff" }}>
                            Password
                          </label>
                          <span className="pwdeye" id="eye" onClick={toggleShow}>
                            {show ? <i className="far fa-eye"></i> : <i className="fa fa-eye-slash"></i>}
                          </span>
                          <p className="text-danger msg">
                            <ErrorMessage name="password" className="msg" />
                          </p>
                        </div>
                      </div>
                      <div className="col-md-2"></div>
                      <div className="row proceedbtn" style={{ paddingRight: "0" }}>
                        <div className="col-md-12 auth_page_padding" style={{ paddingRight: "0" }}>
                          <Button className="btn mybtn" loading={isLoading} text="Proceed" />
                          {/* <p className="submitcontent">
                            Don't have an account.{" "}
                            <Link to="/signup" style={{ color: "#134d75", fontWeight: "600" }}>
                              Sign Up
                            </Link>
                          </p> */}
                          <p>
                            {/* <Link to="/super-admin/updatepassword" style={{ color: "#134d75", fontWeight: "600" }}>
                              Forget Password
                            </Link> */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </LayoutOrpect>
  );
};

export default SuperAdmin_login;
