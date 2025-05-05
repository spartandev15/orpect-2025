import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../../helper";
import { updateProfilSchema } from "../../../helper/schema";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Button from "../../../component/Button";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../component/LoadingSpinner";
import CropImage from "../../../component/extras/crop-image/CropImage";
import { Country, State } from "country-state-city";
import Select from "react-select";
import CountrySelect from "../../../component/CountrySelect";
import { SingleField } from "../../../component/SingleField";
import { linkedin } from "../../../asset";
import { Input } from "../../../component/Input";
import { useGetSuperAdminDetailsQuery, useUpdateProfileByIdMutation, useUpdateSuperAdminProfileMutation } from "../../../apis/SuperAdmin/profile";
import { useUpdateUserByIdMutation } from "../../../apis/SuperAdmin/user";
import UpdateSuperAdminImage from "../../../component/extras/crop-image/UpdateSuperAdminImage";

const initialValues = {
  email: "",
  fullName: "d",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "",
  postal_code: "",
  image: null,
  oldImage: null,
};

const SuperAdminProfile = () => {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
    const [status, setStatus] = useState("profile");
  
  const { data } = useGetSuperAdminDetailsQuery();
  const [updateProfileById] = useUpdateProfileByIdMutation();
console.log(data)
  useEffect(() => {
    if (data) {
      setLoading(true);
      setProfile(data?.admin);
      setValues(data?.admin);
      setLoading(false);
    }
  }, [data]);

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      // validationSchema: updateProfilSchema,
      onSubmit: async (values, { setSubmitting }) => {
        setLoading(true);
        const formData = new FormData();
        
        formData.append("fullname", values.fullName);
        formData.append("email", values.email);

        formData.append("id", profile?.id);

        formData.append("phone", values.phone);
        formData.append("address", values.address);
        formData.append("city", values.city);
        formData.append("state", values.state);
        formData.append("country", values.country);
        formData.append("postal_code", values.postal_code);
        formData.append("oldImage", values.oldImage);
        formData.append("status", status);

        if (values.image) {
          formData.append("image", values.image);
        }

        try {
          const response = await updateProfileById({ id:1, formData }).unwrap();

      console.log(response)
          setLoading(false);
          removeFromLocalStorage("user");
          setToLocalStorage("user", response?.superadmin_data);
          toast.success("Successfully saved");
          setShowInfoForm(false);
          setShowAddressForm(false);
          setSubmitting(false);
        } catch (error) {
          if (error?.response?.data?.errors?.image) {
            toast.error("Image size must not be greater than 2048 kilobytes");
          } else {
            toast.error(error?.response?.data?.message || "An error occurred");
          }
          setLoading(false);
          setSubmitting(false);
        }
      },
    });

  const setValues = (data) => {
    values.email = data?.email;
    values.fullName = data?.fullname;
    values.phone = data?.phone;
    values.address = data?.address;
    values.city = data?.city;
    values.state = data?.state;
    values.country = data?.country;
    values.postal_code = data?.postal_code;
    values.oldImage = data?.image;
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
    setFieldValue("country", selectedOption?.label);
    setFieldValue("state", null);
    const countryCode = selectedOption?.value;
    const country = countries.find((c) => c.isoCode === countryCode);
    setSelectedCountry(country);
    setSelectedState(null);
  };

  const handleStateChange = (selectedOption) => {
    const stateId = selectedOption?.value;
    setFieldValue("state", selectedOption?.label);
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
            <h3>Profile Info</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 pd-4">
            <div className="viewem">
              <div className="employebox">
                <div className="profile-pic-wrapper">
                  <UpdateSuperAdminImage
                empId={profile?.id}
                    oldImage={values?.oldImage}
           
                  />
                </div>
                <div
                  className="profileimgboxdetail"
                  style={{ textTransform: "capitalize" }}
                >
                  <h5>{profile?.fullname}</h5>
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
                      {profile?.phone}
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
                      className="fa  fa-address-card"
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
                    <SingleField
                      title="Full Name"
                      answer={profile?.fullname}
                      style={{ textTransform: "capitalize" }}
                    />
                    <SingleField
                      title="Phone"
                      answer={profile?.phone}
                    />
                  </div>
                  <div className="row">
                    <SingleField
                      title="Email"
                      answer={profile?.email}
                    />
                  </div>
                </div>
              ) : (
                <div className="editable-form">
                  <form className="row" noValidate onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-outline">
                          <Input
                            name="fullName"
                            value={values.fullName}
                            onChange={handleChange}
                            label="Full Name"
                            star={true}
                          />
                          {errors.fullName && touched.fullName && (
                            <p className="text-danger msg">
                              {errors.fullName}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-outline">
                          <Input
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            label="Phone"
                            star={true}
                          />
                          {errors.phone && touched.phone && (
                            <p className="text-danger msg">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-outline">
                          <input
                            type="email"
                            className="form-control"
                            placeholder=" "
                            defaultValue={values.email}
                            readOnly
                          />
                          <label
                            className="form-label1"
                            style={{ background: "#fff" }}
                          >
                            E-Mail Id
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-12">
                        <Button
                          text="Save"
                          className="btn infoedit3"
                          loading={loading}
                        />
                        &nbsp;
                        <button
                          type="button"
                          className="btn infoedit4"
                          style={{ margin: "0" }}
                          onClick={() => setShowInfoForm(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
            
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
                      <button 
                        className="infoedit3"
                        onClick={() => setShowAddressForm(true)}
                      >
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
                        style={{ textAlign: "left" }}
                        answer={renderValue(profile?.address)}
                      />
                    </div>
                    <div className="row">
                      <SingleField
                        title="Country"
                        style={{ textTransform: "capitalize" }}
                        answer={profile?.country || "---"}
                      />
                      <SingleField
                        title="State"
                        style={{ textTransform: "capitalize" }}
                        answer={renderValue(profile?.state)}
                      />
                    </div>
                    <div className="row">
                      <SingleField
                        title="City"
                        style={{ textTransform: "capitalize" }}
                        answer={renderValue(profile?.city)}
                      />
                      <SingleField
                        title="Postal Code"
                        answer={renderValue(profile?.postal_code)}
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
                              name="address"
                              placeholder=" "
                              onChange={handleChange}
                              defaultValue={values.address}
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
                            <CountrySelect
                              selectedCountry={values.country}
                              countryOptions={countryOptions}
                              handleCountryChange={handleCountryChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-outline">
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              placeholder="Select State.."
                              isDisabled={!selectedCountry?.name}
                              isClearable={true}
                              isRtl={false}
                              isSearchable={true}
                              name="color"
                              defaultValue={
                                values.state
                                  ? {
                                      label: values.state,
                                      value: values.state,
                                    }
                                  : null
                              }
                              options={stateOptions}
                              onChange={handleStateChange}
                              style={{ textAlign: "center" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-outline">
                            <Input
                              name="city"
                              value={values.city}
                              onChange={handleChange}
                              label="City"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-outline">
                            <Input
                              type="number"
                              name="postal_code"
                              value={values.postal_code}
                              onChange={handleChange}
                              label="Postal Code"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-12">
                          <Button
                            text="Save"
                            className="btn infoedit3"
                            loading={loading}
                            onClick={()=>setStatus("address")}
                          />
                          &nbsp;
                          <button
                            type="button"
                            style={{ margin: "0" }}
                            className="btn infoedit4"
                            onClick={() => setShowAddressForm(false)}
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
            <Link to="/super-admin/updatepassword" className="btn mybtn profilepassbtn">
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuperAdminProfile;