import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import Layout from "../../component/layout";
import { InputAdd } from "../../component/InputAdd";
import { useAddUserHRMutation } from "../../apis/userHR";


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

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

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
  {
    name: "password",
    label: "Password",
    type: "password",
    star: true,
  },
  {
    name: "role",
    label: "Role",
    type: "text",
    star: true,
  },
];

const AddUserHR = () => {
  const [addUserHR, { isLoading }] = useAddUserHRMutation();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("role", values.role);

        const response = await addUserHR(formData).unwrap();

        console.log("response", response);

        toast.success(response?.message || "User Added Successfully");

        resetForm();
      } catch (error) {
        console.log("error", error);

        toast.error(
          error?.data?.message || "Something went wrong"
        );
      }
    },
  });

  return (
    <Layout>
      <div className="container-fluid searchemploye add-employe">
        <div className="row">
          <div className="col-lg-12">
            <h3>Add User</h3>
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
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Add User"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddUserHR;