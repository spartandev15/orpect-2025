import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import Layout from "../../component/layout";
import { InputAdd } from "../../component/InputAdd";
import { useEditUserHRQuery, useUpdateUserHRMutation } from "../../apis/userHR";



const initialValues = {
  name: "",
  email: "",
  password: "",
  role: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),

  role: Yup.string().required("Role is required"),
});

const formFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    star: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    star: true,
  },
//   {
//     name: "password",
//     label: "Password",
//     type: "password",
//     star: true,
//   },
  {
    name: "role",
    label: "Role",
    type: "text",
    star: true,
  },
];

const UpdateUserHR = () => {
  const { id } = useParams();

  // =========================
  // GET SINGLE USER
  // =========================
  const { data, isLoading: detailsLoading } =
    useEditUserHRQuery(id);

  // =========================
  // UPDATE API
  // =========================
  const [updateUserHR, { isLoading }] =
    useUpdateUserHRMutation();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (values) => {
      try {
        const payload = {
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
        };

        const response = await updateUserHR({
          id,
          data: payload,
        }).unwrap();

        console.log("response", response);

        toast.success(
          response?.message || "User Updated Successfully"
        );
      } catch (error) {
        console.log("error", error);

        toast.error(
          error?.data?.message || "Something went wrong"
        );
      }
    },
  });

  // =========================
  // SET FORM VALUES
  // =========================
  useEffect(() => {
    if (data?.data) {
      setValues({
        name: data?.data?.name || "",
        email: data?.data?.email || "",
        password: "",
        role: data?.data?.role || "",
      });
    }
  }, [data, setValues]);

  return (
    <Layout>
      <div className="container-fluid searchemploye add-employe">
        <div className="row">
          <div className="col-lg-12">
            <h3>Update User</h3>
          </div>
        </div>

        <form
          autoComplete="off"
          noValidate
          className="mt-4"
          onSubmit={handleSubmit}
        >
          <div className="row">
            {formFields.map((field, index) => (
              <div
                className="col-lg-6 col-sm-12 pb-4"
                key={index}
              >
                <div className="form-outline">
                  <InputAdd
                    name={field.name}
                    type={field.type}
                    value={values[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={field.label}
                    star={field.star}
                  />

                  {errors[field.name] &&
                  touched[field.name] ? (
                    <p className="text-danger msg">
                      {errors[field.name]}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-lg-12">
              <button
                type="submit"
                className="btn addempbtn"
                disabled={isLoading || detailsLoading}
              >
                {isLoading
                  ? "Updating..."
                  : detailsLoading
                  ? "Loading..."
                  : "Update User"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateUserHR;