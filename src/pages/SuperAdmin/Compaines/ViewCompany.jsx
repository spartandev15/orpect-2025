import React, { useEffect, useState } from "react";
import { updateProfilSchema } from "../../../helper/schema";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Button from "../../../component/Button";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../../component/LoadingSpinner";
import CropImage from "../../../component/extras/crop-image/CropImage";
import { Country, State } from "country-state-city";
import Select from "react-select";
import { SingleField } from "../../../component/SingleField";
import { Input } from "../../../component/Input";
import { useDeleteCompanyProfileImageMutation, useGetCompaniesByIdQuery, useUpdateCompanyMutation } from "../../../apis/SuperAdmin/companies";
import { currentem, exemploye, nonjoiner, review } from '../../../asset'
import * as yup from "yup";
import UpdateSuperAdminImage from "../../../component/extras/crop-image/UpdateSuperAdminImage";
import UpdateCompanyImage from "../../../component/extras/crop-image/UpdateCompanyImage";

const initialValues = {
  sid: "", 
  company_name: "", 
  company_type: "", 
  full_name: "", 
  designation: "", 
  domain_name: "", 
  email: "", 
  image: "", 
  company_phone: "", 
  company_address: "", 
  company_city: "", 
  company_postal_code: "", 
  registration_number: "", 
  company_social_link: "", 
  company_country: "", 
  company_state: "", 
  is_admin:""
};

const ViewCompany = () => {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [status, setStatus] = useState("profile");

  const { id } = useParams();
  const { data, refetch } = useGetCompaniesByIdQuery(id);
  const [updateCompany, { isLoading: updateLoading }] = useUpdateCompanyMutation();
   const [deleteCompanyProfileImage]=useDeleteCompanyProfileImageMutation()
  const countries = Country.getAllCountries();
const Validation = yup.object().shape({
  company_postal_code: yup
    .string()
    .matches(/^\d+$/, "Only numbers are allowed")
    // .required("Postal code is required"),
});
  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      validationSchema:Validation,
      onSubmit: async (values, { setSubmitting }) => {
        setLoading(true);
        const formData = new FormData();
        
        formData.append("company_name", values.company_name || "");
        formData.append("company_type", values.company_type || "");
        formData.append("full_name", values.full_name || "");
        formData.append("designation", values.designation || "");
        formData.append("domain_name", values.domain_name || "");
        formData.append("email", values.email || "");
        formData.append("company_phone", values.company_phone || "");
        formData.append("company_address", values.company_address || "");
        formData.append("company_city", values.company_city || "");
        formData.append("company_state", values.company_state || "");
        formData.append("company_country", values.company_country || "");
        formData.append("company_postal_code", values.company_postal_code || "");
        formData.append("registration_number", values.registration_number || "");
        formData.append("company_social_link", values.company_social_link || "");
        formData.append("status", status);

        if (values.image && typeof values.image !== 'string') {
          formData.append("image", values.image);
        }

        try {
          const response = await updateCompany({ id, formData }).unwrap();
          toast.success("Company updated successfully");
          setShowInfoForm(false);
          setShowAddressForm(false);
          setSubmitting(false);
          setLoading(false);
          refetch();
        } catch (error) {
          toast.error(error?.data?.message || error?.message || "An error occurred");
          setLoading(false);
          setSubmitting(false);
        }
      },
    });

  useEffect(() => {
    if (data?.company) {
      setProfile(data?.company);
      const companyData = data?.company;
      setFieldValue("company_name", companyData?.company_name || "");
      setFieldValue("company_type", companyData?.company_type || "");
      setFieldValue("full_name", companyData?.full_name || "");
      setFieldValue("designation", companyData?.designation || "");
      setFieldValue("domain_name", companyData?.domain_name || "");
      setFieldValue("email", companyData?.email || "");
      setFieldValue("company_phone", companyData?.company_phone || "");
      setFieldValue("company_address", companyData?.company_address || "");
      setFieldValue("company_city", companyData?.company_city || "");
      setFieldValue("company_state", companyData?.company_state || "");
      setFieldValue("company_country", companyData?.company_country || "");
      setFieldValue("company_postal_code", companyData?.company_postal_code || "");
      setFieldValue("registration_number", companyData?.registration_number || "");
      setFieldValue("company_social_link", companyData?.company_social_link || "");
      setFieldValue("image", companyData?.image || "");
      setFieldValue("is_admin", companyData?.is_admin || "");

      
      // Set country and state for selectors
      if (companyData?.company_country) {
        const country = countries.find(c => c.name === companyData.company_country);
        if (country) {
          setSelectedCountry(country);
          if (companyData?.company_state) {
            const state = State.getStatesOfCountry(country.isoCode).find(s => s.name === companyData.company_state);
            if (state) {
              setSelectedState(state);
            }
          }
        }
      }
    }
  }, [data, countries, setFieldValue]);

  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];

  const countryOptions = countries.map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = states.map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  const handleCountryChange = (selectedOption) => {
    if (selectedOption) {
      setFieldValue("company_country", selectedOption.label);
      setFieldValue("company_state", "");
      const countryCode = selectedOption.value;
      const country = countries.find((c) => c.isoCode === countryCode);
      setSelectedCountry(country);
      setSelectedState(null);
    } else {
      setFieldValue("company_country", "");
      setFieldValue("company_state", "");
      setSelectedCountry(null);
      setSelectedState(null);
    }
  };

  const handleStateChange = (selectedOption) => {
    const stateId = selectedOption?.value;
    setFieldValue("company_state", selectedOption?.label);
    const state = states.find((s) => s.isoCode === stateId);
    setSelectedState(state);
  };

  const renderValue = (value, fallback = "---") => (value ? value : fallback);
 const handleDeleteProfileImage =async()=>{
    try {
  const res=  await deleteCompanyProfileImage(profile?.id)
  //  removeFromLocalStorage("user");
  //        setToLocalStorage("profileImage", "")
   
  //           setToLocalStorage("user", res?.data?.data);
      // window.location.reload();

    } catch (error) {
      
    }
  console.log(profile)
  }
  if (!profile) {
    return <LoadingSpinner />;
  }

  return (
    <section className="profile">
      <div className="container-fluid">
        <div className="row pd-4">
          <div className="col-lg-12">
            <h3>Company Info</h3>
          </div>
        </div>
        <div className='row pd-4 viewemployee'>
            {/* <div className='col-lg-12 c_name pd-4'>
              <h3>Welcome,  </h3>
            </div> */}
           
            <div className='col-lg-3 col-md-3 col-sm-12 pd-4'>
             <Link to={`/super-admin/currentEmployee/${id}`} className="cardtag"> <div className="card  ">
              <img src={currentem} className="card1 img-fluid" alt='' />
                <div className="os-inner-col">
               <h4 className="blue-violet">Current Employees</h4>
                  <h5 className="blue-violet_text">{data?.totalCurrentEmp || '-'}</h5>
                  
                </div>
              </div></Link>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-12 pd-4'>
             <Link  to={`/super-admin/exEmployee/${id}`} className="cardtag"> <div className="card  ">
              <img src={exemploye} className="card1 img-fluid" alt ='' />
                <div className="os-inner-col">
                 <h4 className="blue-violet">Ex Employees</h4>
                  <h5 className="blue-violet_text">{data?.totalExEmp  || '-'}</h5>
                </div>
              </div></Link>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-12 pd-4'>
             <Link  to={`/super-admin/nonJoiner/${id}`} className="cardtag"> <div className="card  ">
              <img src={nonjoiner} className="card1 img-fluid" alt='' />
                <div className="os-inner-col">
                <h4 className="blue-violet">Non Joiners</h4>
                  <h5 className="blue-violet_text">{data?.totalNonJoiner  || '-'}</h5>
                </div>
              </div></Link>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-12 pd-4'>
             <Link to="/previous-review" className="cardtag"> <div className="card  ">
              <img src={review} className="card1 img-fluid" alt='' />
                <div className="os-inner-col">
               <h4 className="blue-violet"> Submitted Reviews</h4>
                  <h5 className="blue-violet_text"> {data?.totalSubmittedReview }</h5>
                  
                </div>
              </div></Link>
            </div>
          </div>
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 pd-4">
            <div className="viewem">
              <div className="employebox">
                <div className="profile-pic-wrapper">
                  {/* <CropImage
                    loading={loading}
                    oldImage={values?.image}
                    setLoading={setLoading}
                    name={profile?.full_name}
                  /> */}
                  <UpdateCompanyImage
                                       is_admin={profile?.is_admin}
                                      empId={profile?.id}
                                      oldImage={values?.image}
                                     setLoading={setLoading}
                                        // handleDeleteProfileImage={handleDeleteProfileImage}
                                        name={profile?.company_name}
                                        
                                        
                                        // deleteLoading={deleteLoading}
                                    />
                </div>
                <div
                  className="profileimgboxdetail"
                  style={{ textTransform: "capitalize" }}
                >
                  <h5>{profile?.full_name}</h5>
                </div>
                <div className="row mt-1">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <p
                      className="profileimgboxcompanydetail1"
                      style={{ color: "rgb(95, 125, 149)" }}
                    >
                      {profile?.email}
                    </p>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <p
                      className="profileimgboxcompanydetail1"
                      style={{ color: "rgb(95, 125, 149)" }}
                    >
                      {profile?.company_phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-9 col-sm-12">
            <div className="viewem pd-4">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <h5 className="infoedit">
                    <i
                      style={{ color: "#134d75" }}
                      className="fa fa-address-card"
                    ></i>{" "}
                    &nbsp; Information
                  </h5>
                  <div className="infoedit1">
                    {!showInfoForm && (
                      <button
                        className="infoedit3"
                        onClick={() => setShowInfoForm(true)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {!showInfoForm ? (
                <div className="readonly-form">
                  <div className="row">
                    <SingleField title="Company Name" answer={profile?.company_name} />
                    <SingleField title="Company Type" answer={profile?.company_type} />
                  </div>
                  <div className="row">
                    <SingleField title="Owner Name" answer={profile?.full_name} />
                    <SingleField title="Designation" answer={profile?.designation} />
                  </div>
                  <div className="row">
                    <SingleField title="Domain Name" answer={profile?.domain_name} />
                    <SingleField title="Email" answer={profile?.email} />
                  </div>
                  <div className="row">
                    <SingleField title="Phone" answer={profile?.company_phone} />
                    <SingleField title="Registration Number" answer={profile?.registration_number} />
                  </div>
                  <div className="row">
                    <SingleField title="Company Social Link" answer={profile?.company_social_link || "---"} />
                  </div>
                </div>
              ) : (
                <div className="editable-form">
                  <form className="row" noValidate onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-outline">
                          <Input
                            name="company_name"
                            value={values.company_name}
                            onChange={handleChange}
                            label="Company Name"
                            star={true}
                          />
                          {errors.company_name && touched.company_name && (
                            <p className="text-danger msg">{errors.company_name}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-outline">
                          <Input
                            name="company_type"
                            value={values.company_type}
                            onChange={handleChange}
                            label="Company Type"
                            star={true}
                          />
                          {errors.company_type && touched.company_type && (
                            <p className="text-danger msg">{errors.company_type}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-outline">
                          <Input
                            name="full_name"
                            value={values.full_name}
                            onChange={handleChange}
                            label="Owner Name"
                            star={true}
                          />
                          {errors.full_name && touched.full_name && (
                            <p className="text-danger msg">{errors.full_name}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-outline">
                          <Input
                            name="designation"
                            value={values.designation}
                            onChange={handleChange}
                            label="Designation"
                            star={true}
                          />
                          {errors.designation && touched.designation && (
                            <p className="text-danger msg">{errors.designation}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-outline">
                          <Input
                            name="domain_name"
                            value={values.domain_name}
                            onChange={handleChange}
                            label="Domain Name"
                            star={true}
                          />
                          {errors.domain_name && touched.domain_name && (
                            <p className="text-danger msg">{errors.domain_name}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-outline">
                          <Input
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            label="Email"
                            star={true}
                          />
                          {errors.email && touched.email && (
                            <p className="text-danger msg">{errors.email}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-outline">
                          <Input
                            name="company_phone"
                            value={values.company_phone}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              setFieldValue("company_phone", value);
                            }}
                            label="Phone"
                            star={true}
                            maxLength="15"
                          />
                          {errors.company_phone && touched.company_phone && (
                            <p className="text-danger msg">{errors.company_phone}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-outline">
                          <Input
                            name="registration_number"
                            value={values.registration_number}
                            onChange={handleChange}
                            label="Registration Number"
                            star={true}
                          />
                          {errors.registration_number && touched.registration_number && (
                            <p className="text-danger msg">{errors.registration_number}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-outline">
                          <Input
                            name="company_social_link"
                            value={values.company_social_link}
                            onChange={handleChange}
                            label="Company Social Link"
                          />
                          {errors.company_social_link && touched.company_social_link && (
                            <p className="text-danger msg">{errors.company_social_link}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-12">
                        <Button
                          text="Save"
                          className="btn infoedit3"
                          loading={loading || updateLoading}
                        />
                        &nbsp;
                        <button
                          type="button"
                          className="btn infoedit4"
                          style={{ margin: "0" }}
                          onClick={() => {
                            setShowInfoForm(false);
                            // Reset form values to original
                            if (data?.company) {
                              const companyData = data?.company;
                              setFieldValue("company_name", companyData?.company_name || "");
                              setFieldValue("company_type", companyData?.company_type || "");
                              setFieldValue("full_name", companyData?.full_name || "");
                              setFieldValue("designation", companyData?.designation || "");
                              setFieldValue("domain_name", companyData?.domain_name || "");
                              setFieldValue("email", companyData?.email || "");
                              setFieldValue("company_phone", companyData?.company_phone || "");
                              setFieldValue("registration_number", companyData?.registration_number || "");
                              setFieldValue("company_social_link", companyData?.company_social_link || "");
                            }
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Address Section */}
            <div className="viewem mt-4">
              <div className="row">
                <div className="col-12">
                  <h5 className="infoedit">
                    <svg height="1em" viewBox="0 0 384 512">
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>{" "}
                    &nbsp;Address
                  </h5>
                  <div className="infoedit1">
                    {!showAddressForm && (
                      <button className="infoedit3" onClick={() => setShowAddressForm(true)}>
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                {!showAddressForm ? (
                  <div className="readonly-form1">
                    <div className="row">
                      <SingleField
                        title="Address"
                        style={{ textTransform: "capitalize" }}
                        answer={renderValue(profile?.company_address)}
                      />
                    </div>
                    <div className="row">
                      <SingleField
                        title="Country"
                        style={{ textTransform: "capitalize" }}
                        answer={renderValue(profile?.company_country)}
                      />
                      <SingleField
                        title="State"
                        style={{ textTransform: "capitalize" }}
                        answer={renderValue(profile?.company_state)}
                      />
                    </div>
                    <div className="row">
                      <SingleField
                        title="City"
                        style={{ textTransform: "capitalize" }}
                        answer={renderValue(profile?.company_city)}
                      />
                      <SingleField
                        title="Postal Code"
                        answer={renderValue(profile?.company_postal_code)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="editable-form1">
                    <form noValidate onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-outline">
                            <textarea
                              className="form-control"
                              name="company_address"
                              placeholder=" "
                              onChange={handleChange}
                              value={values.company_address}
                            ></textarea>
                            <label
                              className="form-label"
                              htmlFor="typeText"
                              style={{ background: "#fff" }}
                            >
                              Address&nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ marginBottom: "1rem" }}>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-outline">
                            <label className="form-label">Country</label>
                            <Select
                              classNamePrefix="select"
                              placeholder="Select Country...."
                              isClearable
                              options={countryOptions}
                              onChange={handleCountryChange}
                              value={countryOptions.find(option => option.label === values.company_country) || null}
                            />
                            {errors.company_country && touched.company_country && (
                              <p className="text-danger msg">{errors.company_country}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-outline">
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              placeholder="Select State..."
                              isDisabled={!selectedCountry?.name}
                              isClearable={true}
                              isRtl={false}
                              isSearchable={true}
                              name="state"
                              value={
                                values.company_state
                                  ? stateOptions.find(option => option.label === values.company_state) || null
                                  : null
                              }
                              options={stateOptions}
                              onChange={handleStateChange}
                              style={{ textAlign: "center" }}
                            />
                            {errors.company_state && touched.company_state && (
                              <p className="text-danger msg">{errors.company_state}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-outline">
                            <Input
                              name="company_city"
                              value={values.company_city}
                              onChange={handleChange}
                              label="City"
                            />
                            {errors.company_city && touched.company_city && (
                              <p className="text-danger msg">{errors.company_city}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-outline">
                            <Input
                              name="company_postal_code"
                              value={values.company_postal_code}
                              onChange={handleChange}
                              label="Postal Code"
                            />
                            {errors.company_postal_code && touched.company_postal_code && (
                              <p className="text-danger msg">{errors.company_postal_code}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-12">
                          <Button
                            text="Save"
                            className="btn infoedit3"
                            loading={loading || updateLoading}
                            onClick={() => setStatus("address")}
                          />
                          &nbsp;
                          <button
                            type="button"
                            style={{ margin: "0" }}
                            className="btn infoedit4"
                            onClick={() => {
                              setShowAddressForm(false);
                              // Reset form values to original
                              if (data?.company) {
                                const companyData = data?.company;
                                setFieldValue("company_address", companyData?.company_address || "");
                                setFieldValue("company_city", companyData?.company_city || "");
                                setFieldValue("company_state", companyData?.company_state || "");
                                setFieldValue("company_country", companyData?.company_country || "");
                                setFieldValue("company_postal_code", companyData?.company_postal_code || "");
                                // Reset country/state selectors
                                if (companyData?.company_country) {
                                  const country = countries.find(c => c.name === companyData.company_country);
                                  if (country) {
                                    setSelectedCountry(country);
                                    if (companyData?.company_state) {
                                      const state = State.getStatesOfCountry(country.isoCode).find(s => s.name === companyData.company_state);
                                      if (state) {
                                        setSelectedState(state);
                                      }
                                    }
                                  }
                                }
                              }
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
        
            </div>

 
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewCompany;
