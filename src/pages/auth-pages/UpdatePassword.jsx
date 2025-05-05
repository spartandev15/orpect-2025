/* eslint-disable no-unused-expressions */
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import useToggle from "../../helper/hooks/useToggle";
import { updatePassword } from "../../api/profile";
import Button from "../../component/Button";
import Layout from "../../component/layout";
import { signupimg } from "../../asset";
import { useUpdatePasswordMutation } from "../../apis/profile";

const initialValues = {
  oldPassword: "",
  newPassword: "",
  newPassword_confirmation: "",
};

const updatePasswordschema = yup.object().shape({
  oldPassword: yup.string().required("old Password is required"),
  newPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
    ),
  newPassword_confirmation: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"), // Validate password confirmation
});

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [show, toggleShow] = useToggle();
  const [shownewPassword, setShowNewPassword] = useToggle(false);
  const [updatePassword,{isLoading}]=useUpdatePasswordMutation()
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: updatePasswordschema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await updatePassword(values).unwrap();
        toast.success("Password updated");
        navigate("/profile");
      } catch (err) {
        toast.error(err?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    
  });
  return (
    <>
      <Layout>
        <div className="container passwordpage">
          <div className="row passwordpagehead">
            <div className="col-lg-12">
              <h3>Change Password</h3>
            </div>
          </div>
          <div className="pwdpage">
            <div className="row updatepawd">
              <div className="col-lg-6  col-sm-12">
                <img
                  src={signupimg}
                  alt="update password"
                  className="img-fluid"
                />
              </div>
              <form
              noValidate="noValidate"
                className="col-lg-6 col-md-12 col-sm-12 updatepwdresponsive"
                onSubmit={handleSubmit}
              >
                <div className="col-md-12 passwordeye">
                  <div className="form-outline">
                    <input
                      type={show ? "text" : "password"}
                      className="form-control"
                      name="oldPassword"
                      value={values.oldPassword}
                      onChange={handleChange}
                      required
                    />
                    <label className="addlabel"> Current password</label>
                    <span className="pwdeye" onClick={toggleShow}>
                      {show ? (
                        <i className="far fa-eye"></i>
                      ) : (
                        <i className="fa fa-eye-slash"></i>
                      )}
                    </span>
                    {errors.oldPassword && touched.oldPassword ? (
                      <p className="text-danger msg">{errors.oldPassword}</p>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-12 passwordeye">
                  <div className="form-outline">
                    <input
                      type={shownewPassword ? "text" : "password"}
                      className="form-control"
                      name="newPassword"
                      value={values.newPassword}
                      onChange={handleChange}
                      required
                    />
                    <label className="addlabel"> New Password</label>
                    <span className="pwdeye" onClick={setShowNewPassword}>
                      {shownewPassword ? (
                        <i className="far fa-eye"></i>
                      ) : (
                        <i className="fa fa-eye-slash"></i>
                      )}
                    </span>
                    {errors.newPassword && touched.newPassword ? (
                      <p className="text-danger msg">{errors.newPassword}</p>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-12 passwordeye">
                  <div className="form-outline">
                    <input
                      type={shownewPassword ? "text" : "password"}
                      name="newPassword_confirmation"
                      onChange={handleChange}
                      value={values.newPassword_confirmation}
                      className="form-control"
                      required
                    />
                    <label className="addlabel"> Confirm password</label>
                    <span className="pwdeye" onClick={setShowNewPassword}>
                      {shownewPassword ? (
                        <i className="far fa-eye"></i>
                      ) : (
                        <i className="fa fa-eye-slash"></i>
                      )}
                    </span>
                    {errors.newPassword_confirmation &&
                    touched.newPassword_confirmation ? (
                      <p className="text-danger msg">
                        {errors.newPassword_confirmation}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="ratebtn pd-4">
                  <Button
                    loading={loading}
                    className="btn mybtn"
                    text="Update"
                  />
                </div>
              </form>
            </div>{" "}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdatePassword;
