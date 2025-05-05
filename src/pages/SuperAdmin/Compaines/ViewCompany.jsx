import React, { useEffect, useState } from "react";
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../../helper";
import { updateProfilSchema } from "../../../helper/schema";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Button from "../../../component/Button";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../../component/LoadingSpinner";
import CropImage from "../../../component/extras/crop-image/CropImage";
import { Country, State } from "country-state-city";
import Select from "react-select";
import CountrySelect from "../../../component/CountrySelect";
import { SingleField } from "../../../component/SingleField";
import { Input } from "../../../component/Input";
import { useGetCompaniesByIdQuery } from "../../../apis/SuperAdmin/companies";
import { currentem, exemploye, nonjoiner, review } from '../../../asset'

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
};

const ViewCompany = () => {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [status, setStatus] = useState("profile");
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const { id } = useParams();
  const { data } = useGetCompaniesByIdQuery(id);
  console.log(data);

  useEffect(() => {
    if (data) {
      setLoading(true);
      setProfile(data?.company);
      setValues(data?.company);
      setLoading(false);
    }
  }, [data]);

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values, { setSubmitting }) => {
        setLoading(true);
        const formData = new FormData();
        
        formData.append("company_name", values.company_name);
        formData.append("company_type", values.company_type);
        formData.append("full_name", values.full_name);
        formData.append("designation", values.designation);
        formData.append("domain_name", values.domain_name);
        formData.append("email", values.email);
        formData.append("company_phone", values.company_phone);
        formData.append("company_address", values.company_address);
        formData.append("company_city", values.company_city);
        formData.append("company_state", values.company_state);
        formData.append("company_country", values.company_country);
        formData.append("company_postal_code", values.company_postal_code);
        formData.append("registration_number", values.registration_number);
        formData.append("company_social_link", values.company_social_link);
        formData.append("status", status);

        if (values.image) {
          formData.append("image", values.image);
        }

        try {
          // const response = await updateCompanyDetails(formData); 
          const response = 

          setLoading(false);
          removeFromLocalStorage("user");
          setToLocalStorage("user", response?.user);
          toast.success("Successfully saved");
          setShowInfoForm(false);
          setShowAddressForm(false);
          setSubmitting(false);
        } catch (error) {
          toast.error(error?.response?.data?.message || "An error occurred");
          setLoading(false);
          setSubmitting(false);
        }
      },
    });

  const setValues = (data) => {
    values.company_name = data?.company_name;
    values.company_type = data?.company_type;
    values.full_name = data?.full_name;
    values.designation = data?.designation;
    values.domain_name = data?.domain_name;
    values.email = data?.email;
    values.company_phone = data?.company_phone;
    values.company_address = data?.company_address;
    values.company_city = data?.company_city;
    values.company_state = data?.company_state;
    values.company_country = data?.company_country;
    values.company_postal_code = data?.company_postal_code;
    values.registration_number = data?.registration_number;
    values.company_social_link = data?.company_social_link;
    values.image = data?.image;
  };

  const countries = Country.getAllCountries();
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
    setFieldValue("company_country", selectedOption?.label);
    setFieldValue("company_state", null);
    const countryCode = selectedOption?.value;
    const country = countries.find((c) => c.isoCode === countryCode);
    setSelectedCountry(country);
    setSelectedState(null);
  };

  const handleStateChange = (selectedOption) => {
    const stateId = selectedOption?.value;
    setFieldValue("company_state", selectedOption?.label);
    const state = states.find((s) => s.isoCode === stateId);
    setSelectedState(state);
  };

  const renderValue = (value, fallback = "---") => (value ? value : fallback);

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
                  <CropImage
                    loading={loading}
                    oldImage={values?.image}
                    setLoading={setLoading}
                  />
                </div>
                <div className="profileimgboxdetail">
                  <h5>{profile?.full_name}</h5>
                </div>
                <div className="row mt-1">
                  <div className="col-lg-12">
                    <p>{profile?.email}</p>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-lg-12">
                    <p>{profile?.company_phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-9 col-sm-12">
            <div className="viewem pd-4">
              <div className="row">
                <div className="col-lg-12">
                  <h5 className="infoedit">
                    <i className="fa fa-address-card"></i> &nbsp; Information
                  </h5>
                  <div className="infoedit1">
                    {/* {!showInfoForm && (
                      <button className="infoedit3" onClick={() => setShowInfoForm(true)}>
                        Edit
                      </button>
                    )} */}
                  </div>
                </div>
              </div>

              {!showInfoForm ? (
                <div className="readonly-form">
                  <div className="row">
                    <SingleField title="Company Name" answer={profile?.company_name} />
                    <SingleField title="Phone" answer={profile?.company_phone} />
                  </div>
                  <div className="row">
                    <SingleField title="Email" answer={profile?.email} />
                  </div>
                </div>
              ) : (
                <div className="editable-form">
                  <form className="row" noValidate onSubmit={handleSubmit}>
                    <div className="col-lg-6">
                      <Input
                        name="company_name"
                        value={values.company_name}
                        onChange={handleChange}
                        label="Company Name"
                      />
                    </div>
                    <div className="col-lg-6">
                      <Input
                        name="company_phone"
                        value={values.company_phone}
                        onChange={handleChange}
                        label="Phone"
                      />
                    </div>
                    <div className="row mt-4">
                      <div className="col-12">
                        <Button text="Save" className="btn infoedit3" loading={loading} />
                        &nbsp;
                        <button type="button" className="btn infoedit4" onClick={() => setShowInfoForm(false)}>
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
                    {/* {!showAddressForm && (
                      <button className="infoedit3" onClick={() => setShowAddressForm(true)}>
                        Edit
                      </button>
                    )} */}
                  </div>
                </div>
              </div>
              <div className="row">
                {!showAddressForm ? (
                  <div className="readonly-form1">
                    <div className="row">
                      <SingleField title="Address" answer={renderValue(profile?.company_address)} />
                    </div>
                    <div className="row">
                      <SingleField title="Country" answer={renderValue(profile?.company_country)} />
                      <SingleField title="State" answer={renderValue(profile?.company_state)} />
                    </div>
                    <div className="row">
                      <SingleField title="City" answer={renderValue(profile?.company_city)} />
                      <SingleField title="Postal Code" answer={renderValue(profile?.company_postal_code)} />
                    </div>
                  </div>
                ) : (
                  <div className="editable-form1">
                    <form noValidate onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-12">
                          <textarea
                            className="form-control"
                            name="company_address"
                            placeholder=" "
                            onChange={handleChange}
                            defaultValue={values.company_address}
                          ></textarea>
                          <label className="form-label" style={{ background: "#fff" }}>
                            Address&nbsp;
                          </label>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <CountrySelect
                            selectedCountry={values.company_country}
                            countryOptions={countryOptions}
                            handleCountryChange={handleCountryChange}
                          />
                        </div>
                        <div className="col-lg-6">
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isDisabled={!selectedCountry?.name}
                            options={stateOptions}
                            onChange={handleStateChange}
                            defaultValue={values.company_state ? { label: values.company_state, value: values.company_state } : null}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <Input name="company_city" value={values.company_city} onChange={handleChange} label="City" />
                        </div>
                        <div className="col-lg-6">
                          <Input
                            name="company_postal_code"
                            value={values.company_postal_code}
                            onChange={handleChange}
                            label="Postal Code"
                          />
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-12">
                          <Button text="Save" className="btn infoedit3" loading={loading} />
                          &nbsp;
                          <button type="button" className="btn infoedit4" onClick={() => setShowAddressForm(false)}>
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
