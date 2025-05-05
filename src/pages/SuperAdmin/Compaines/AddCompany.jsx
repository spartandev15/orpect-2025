import React, { useState } from "react";
import { useFormik } from "formik";
import { addCompanySchema, adduserSchema } from "../../../helper/schema"; // Make sure your schema matches new fields
import { toast } from "react-toastify";
import Button from "../../../component/Button";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import EmployeeCropImage from "../../../component/extras/crop-image/EmployeeCropImage";
import { InputAdd } from "../../../component/InputAdd";
import { useAddCompanyMutation } from "../../../apis/SuperAdmin/companies";

const initialValues = {
  companyName: "",
  companyType: "",
  fullName: "",
  designation: "",
  domainName: "",
  email: "",
  password: "",
  companyPhone: "",
  registrationNumber: "",
  companySocialLink: "",
  termsNconditions: 0,
  image: ""
};

const AddCompany = () => {
  const navigate = useNavigate();
  const [addCompany, { isLoading: loading }] = useAddCompanyMutation();
  const { data } = useSelector((state) => state.data);

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    validationSchema: addCompanySchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("companyName", values.companyName);
        formData.append("companyType", values.companyType);
        formData.append("fullName", values.fullName);
        formData.append("designation", values.designation);
        formData.append("domainName", values.domainName);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("companyPhone", values.companyPhone);
        formData.append("registrationNumber", values.registrationNumber);
        formData.append("companySocialLink", values.companySocialLink);
        formData.append("termsNconditions", values.termsNconditions ? 1 : 0);
        
        if (values.image) {
          formData.append("image", values?.image.blob);
        }

        const response = await addCompany({ formData }).unwrap();

        if (response.status) {
          toast.success("Successfully added");
          navigate("/super-admin/companies");
        } else {
          throw new Error(response?.message);
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      }
    }
  });

  const getImageValue = (getCropedImage) => {
    values.image = getCropedImage;
  };

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off" noValidate className="container-fluid searchemploye add-employe">
        <div className="row">
          <div className="col-lg-12">
            <h3 style={{ color: "#f6a21e", fontSize: "24px" }}>Add Company</h3>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="profile-pic-wrapper">
            <EmployeeCropImage getImageValue={getImageValue} setFieldValue={setFieldValue} />
          </div>
        </div>

        <div className="row mt-4">
          {/* Company Name */}
          <div className="col-lg-6 col-sm-12 pb-4">
          <div className="form-outline">

            <InputAdd name="companyName" value={values.companyName} onChange={handleChange} label="Company Name" star={true} />
            {errors.companyName && touched.companyName && <p className="text-danger msg">{errors.companyName}</p>}
          </div>
          </div>


          {/* Company Type */}
          <div className="col-lg-6 col-sm-12 pb-4">
          <div className="form-outline">

            <InputAdd name="companyType" value={values.companyType} onChange={handleChange} label="Company Type" star={true} />
            {errors.companyType && touched.companyType && <p className="text-danger msg">{errors.companyType}</p>}
          </div>
          </div>


          {/* Full Name */}
          <div className="col-lg-6 col-sm-12 pb-4">
          <div className="form-outline">

            <InputAdd name="fullName" value={values.fullName} onChange={handleChange} label="Full Name" star={true} />
            {errors.fullName && touched.fullName && <p className="text-danger msg">{errors.fullName}</p>}
          </div>
          </div>

          {/* Designation */}
          <div className="col-lg-6 col-sm-12 pb-4">
          <div className="form-outline">

            <InputAdd name="designation" value={values.designation} onChange={handleChange} label="Designation" star={true} />
            {errors.designation && touched.designation && <p className="text-danger msg">{errors.designation}</p>}
          </div>
          </div>

          {/* Domain Name */}
          <div className="col-lg-6 col-sm-12 pb-4">
          <div className="form-outline">

            <InputAdd name="domainName" value={values.domainName} onChange={handleChange} label="Domain Name" star={true} />
            {errors.domainName && touched.domainName && <p className="text-danger msg">{errors.domainName}</p>}
          </div>
          </div>

          {/* Email */}
          <div className="col-lg-6 col-sm-12 pb-4">
          <div className="form-outline">

            <InputAdd name="email" value={values.email} onChange={handleChange} label="Email" star={true} />
            {errors.email && touched.email && <p className="text-danger msg">{errors.email}</p>}
          </div>
          </div>

          {/* Password */}
          <div className="col-lg-6 col-sm-12 pb-4">
          <div className="form-outline">

            <InputAdd type="password" name="password" value={values.password} onChange={handleChange} label="Password" star={true} />
            {errors.password && touched.password && <p className="text-danger msg">{errors.password}</p>}
          </div>
          </div>

          {/* Company Phone */}
          <div className="col-lg-6 col-sm-12 pb-4">
          <div className="form-outline">

            <InputAdd type="number" name="companyPhone" value={values.companyPhone} onChange={handleChange} label="Company Phone" star={true} />
            {errors.companyPhone && touched.companyPhone && <p className="text-danger msg">{errors.companyPhone}</p>}
          </div>
          </div>

          {/* Registration Number */}
          <div className="col-lg-6 col-sm-12 pb-4">
          <div className="form-outline">

            <InputAdd name="registrationNumber" value={values.registrationNumber} onChange={handleChange} label="Registration Number" star={true} />
            {errors.registrationNumber && touched.registrationNumber && <p className="text-danger msg">{errors.registrationNumber}</p>}
          </div>
          </div>

          {/* Company Social Link */}
          <div className="col-lg-6 col-sm-12 pb-4">
          <div className="form-outline">

            <InputAdd name="companySocialLink" value={values.companySocialLink} onChange={handleChange} label="Company Social Link" />
            {errors.companySocialLink && touched.companySocialLink && <p className="text-danger msg">{errors.companySocialLink}</p>}
          </div>
          </div>


          {/* Terms and Conditions */}
          <div className="col-lg-12 pb-4 d-flex align-items-center">
  <input
    type="checkbox"
    name="termsNconditions"
    checked={values.termsNconditions === 1}
    onChange={(e) => setFieldValue("termsNconditions", e.target.checked ? 1 : 0)}
  />
  <label className="ms-2">Accept Terms & Conditions</label>
  {errors.termsNconditions && touched.termsNconditions && (
    <p className="text-danger msg ms-2">{errors.termsNconditions}</p>
  )}
</div>


          {/* Submit Button */}
          <div className="row">
            <div className="col text-center">
              <Button className="btn mybtn" loading={loading} text="Submit" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddCompany;
