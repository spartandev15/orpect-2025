// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import Layout from "../../component/layout";
// import {
//   getFromLocalStorage,
//   removeFromLocalStorage,
//   setToLocalStorage,
// } from "../../helper";
// import { getUser } from "../../api/profile";
// import { updateProfilSchema } from "../../helper/schema";
// import { useFormik } from "formik";
// import { toast } from "react-toastify";
// import Button from "../../component/Button";
// import $ from "jquery";
// import axios from "axios";

// import { Link } from "react-router-dom";
// import LoadingSpinner from "../../component/LoadingSpinner";
// import CropImage from "../../component/extras/crop-image/CropImage";
// import { Country, State } from "country-state-city";

// import Select from "react-select";
// import CountrySelect from "../../component/CountrySelect";
// import { BASE_URL } from "../../api/baseUrl";
// import { SingleField } from "../../component/SingleField";
// import { linkedin } from "../../asset";
// import { Input } from "../../component/Input";
// import {useGetUserQuery, useUpdateProfileMutation} from "../../apis/profile"
// const initialValues = {
//   email: "",
//   domain_name: "",
//   companyName: "",
//   companyType: "",
//   fullName: "",
//   designation: "",
//   logoImage: null,
//   oldLogoImage: null,
//   company_phone: "",
//   registration_number: "",
//   webmaster_email: "",
//   company_social_link: "",
//   company_address: "",
//   company_city: "",
//   company_state: "",
//   company_country: "",
//   company_postal_code: "",
// };

// const Profile = () => {
//   const [profile, setProfile] = useState();
//   const [loading, setLoading] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null);
//   const bearerToken = getFromLocalStorage("token");
//   const Dispatch = useDispatch();
//   const [updateProfile]=useUpdateProfileMutation()
//   const {data}=useGetUserQuery()
//   console.log(data)
//   // useEffect(() => {
//   //   setLoading(true);
//   //   Dispatch(getUser())
//   //     .then((res) => {
//   //       setProfile(res?.data?.user);
//   //       setValues(res?.data?.user);
//   //       setLoading(false);
//   //     })
//   //     .catch((err) => {
//   //       setLoading(false);
//   //     });
//   // }, []);
//   useEffect(() => {
//     setLoading(true);

//         setProfile(data?.user);
//         setValues(data?.user);
//         setLoading(false);
    
//   }, [data]);
//   const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
//     useFormik({
//       initialValues: initialValues,
//       validationSchema: updateProfilSchema,
//       onSubmit: async (values) => {
//         setLoading(true);
//         const formData = new FormData();
//         formData.append("companyName", values.companyName);
//         formData.append("companyType", values.companyType);
//         formData.append("designation", values.designation);
//         formData.append("fullName", values.fullName);
//         formData.append("oldLogoImage", values.oldLogoImage);
//         formData.append("companyPhone", values.company_phone);
//         formData.append("registrationNumber", values.registration_number);
//         if(values.webmaster_email){
//           formData.append("companyWebmasterEmail", values.webmaster_email);
//         }
//         if (values.company_social_link) {
//           formData.append("companySocialLink", values.company_social_link);
//         }
//         if (values.company_address) {
//           formData.append("companyAddress", values.company_address);
//         }
//         if (values.company_city) {
//           formData.append("companyCity", values.company_city);
//         }
//         if (values.company_state) {
//           formData.append("companyState", values.company_state);
//         }
//         if (values.company_country) {
//           formData.append("companyCountry", values.company_country);
//         }
//         if (values.company_postal_code) {
//           formData.append("companyPostalCode", values.company_postal_code);
//         }
//         if (values.logoImage) {
//           formData.append("logoImage", values.logoImage);
//         }

//         try {
//           // const response = await axios.post(
//           //   `${BASE_URL}/updateProfile`,
//           //   formData,
//           //   {
//           //     headers: {
//           //       Authorization: `Bearer ${bearerToken}`,
//           //     },
//           //   }
//           // );
//           const response =  await updateProfile({ formData }).unwrap();

// console.log(response)
//           setLoading(false);
//           removeFromLocalStorage("user");
//           setToLocalStorage("user", response?.user);
//           toast.success("Successfully saved");
//           // window.location.reload();
//         } catch (error) {
//           if (error?.response?.data?.errors?.logoImage) {
//             toast.error(
//               "logo image field must not be greater than 2048 kilobytes"
//             );
//           } else {
//             toast.error(error?.response?.data?.errors.companySocialLink);
//           }
//           setLoading(false);
//         }
//       },
//     });

//   const setValues = (data) => {
//     values.email = data?.email;
//     values.domain_name = data?.domain_name;
//     values.companyName = data?.company_name;
//     values.companyType = data?.company_type;
//     values.designation = data?.designation;
//     values.fullName = data?.full_name;
//     values.oldLogoImage = data?.image;
//     values.company_phone = data?.company_phone;
//     values.registration_number = data?.registration_number;
//     values.webmaster_email = data?.webmaster_email;
//     values.company_social_link = data?.company_social_link;
//     values.company_address = data?.company_address;
//     values.company_state = data?.company_state;
//     values.company_country = data?.company_country;
//     values.company_postal_code = data?.company_postal_code;
//     values.company_city = data?.company_city;
//   };

//   $(document).ready(function () {
//     $("#editButton1").click(function () {
//       $(".editable-form1").show();
//       $(".readonly-form1").hide();
//       $("#editButton1").hide();
//       $("#cancelButton1").show();
//     });

//     $("#cancelButton1").click(function () {
//       $(".editable-form1").hide();
//       $(".readonly-form1").show();
//       $("#editButton1").show();
//       $("#cancelButton1").hide();
//     });
//   });

//   // to here
//   // Event Listner function for form
//   $(document).ready(function () {
//     $("#editButton").click(function () {
//       $(".editable-form").show();
//       $(".readonly-form").hide();
//       $("#editButton").hide();
//       $("#cancelButton").show();
//     });

//     $("#cancelButton").click(function () {
//       $(".editable-form").hide();
//       $(".readonly-form").show();
//       $("#editButton").show();
//       $("#cancelButton").hide();
//     });
//   });

//   if (!profile) {
//     return <LoadingSpinner />;
//   }
//   const countries = Country.getAllCountries();

//   const states = selectedCountry
//     ? State.getStatesOfCountry(selectedCountry.isoCode)
//     : [];

//   const countryOptions = countries.map((country) => ({
//     value: country.isoCode,
//     label: country.name,
//   }));

//   const stateOptions = states.map((state) => ({
//     value: state.isoCode,
//     label: state.name,
//   }));

//   const handleCountryChange = (selectedOption) => {
//     setFieldValue("company_country", selectedOption?.label);
//     setFieldValue("company_state", null);
//     const countryCode = selectedOption?.value;
//     const country = countries.find((c) => c.isoCode === countryCode);
//     setSelectedCountry(country);
//     setSelectedState(null);
//   };

//   const handleStateChange = (selectedOption) => {
//     const stateId = selectedOption?.value;
//     setFieldValue("company_state", selectedOption?.label);
//     const state = states.find((s) => s.isoCode === stateId);
//     setSelectedState(state);
//   };
//   const renderValue = (value, fallback = "---") => (value ? value : fallback);

// console.log(errors);
// console.log(values);

//   return (
//     <>
//       <Layout>
//         <section className="profile">
//           <div className="container-fluid">
//             <div className="row pd-4">
//               <div className="col-lg-12">
//                 <h3>Profile Info</h3>
//               </div>
//             </div>

//             <div className="row  ">
//               <div className="col-lg-3 col-md-3 col-sm-12 pd-4">
//                 <div className="viewem">
//                   <div className="employebox">
//                     <div className="profile-pic-wrapper">
//                       <CropImage
//                         loading={loading}
//                         oldImage={values.oldLogoImage}
//                         setLoading={setLoading}
//                       />
//                     </div>
//                     <div
//                       className="profileimgboxdetail"
//                       style={{ textTransform: "capitalize" }}
//                     >
//                       <h5> {profile?.company_name}</h5>
//                     </div>
//                     <div className="row mt-1">
//                       <div className="col-lg-12 col-md-12 col-sm-12">
//                         <p
//                           className="profileimgboxcompanydetail1"
//                           style={{ color: "rgb(95, 125, 149)" }}
//                         >
//                           {profile?.domain_name}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="row mt-1">
//                       <div className="col-lg-12 col-md-12 col-sm-12">
//                         <p
//                           className="profileimgboxcompanydetail1"
//                           style={{ color: "rgb(95, 125, 149)" }}
//                         >
//                           {profile?.email}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-lg-9 col-md-9 col-sm-12 ">
//                 <div className="viewem pd-4">
//                   <div className="row">
//                     <div className="col-lg-12 col-md-12 col-sm-12  ">
//                       <h5 className="infoedit">
//                         <i
//                           style={{ color: "#134d75" }}
//                           className="fa  fa-address-card"
//                         ></i>{" "}
//                         &nbsp; Information
//                       </h5>
//                       <div className="infoedit1">
//                         <button id="editButton" className="infoedit3">
//                           Edit
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="readonly-form">
//                     <div className="row">
//                       <SingleField
//                         title="Company Name"
//                         answer={profile?.company_name}
//                         style={{ textTransform: "capitalize" }}
//                       />

//                       <SingleField
//                         title="Type"
//                         answer={profile?.company_type}
//                         style={{ textTransform: "capitalize" }}
//                       />
//                     </div>
//                     <div className="row">
//                       <SingleField
//                         title="Name"
//                         answer={profile?.full_name}
//                         style={{ textTransform: "capitalize" }}
//                       />

//                       <SingleField
//                         title="Designation"
//                         answer={profile?.designation}
//                         style={{ textTransform: "capitalize" }}
//                       />
//                     </div>
//                     <div className="row">
//                       <SingleField title="E-Mail Id" answer={profile?.email} />
//                       <SingleField
//                         title="Domain"
//                         answer={profile?.domain_name}
//                       />
//                     </div>
//                     <div className="row">
//                       <SingleField
//                         title="Phone Number"
//                         answer={profile?.company_phone}
//                       />
//                       <SingleField
//                         title="Registration"
//                         answer={profile?.registration_number}
//                       />
//                     </div>

//                     <div className="row">
//                       <SingleField
//                         title="WebMaster E-Mail"
//                         answer={renderValue(profile.webmaster_email)}
//                       />
//                       <div className="col-lg-6 col-md-6 col-sm-12">
//                         <p className="addlabelcard2"></p>
//                         <h6 className="profileimgboxcompanydetail2">
//                           <div>
//                             {profile?.company_social_link ? (
//                               <a
//                                 className="socialbtn1"
//                                 href={profile?.company_social_link}
//                                 target="blank"
//                               >
//                                 <img src={linkedin} alt="linkedin" />
//                               </a>
//                             ) : (
//                               "---"
//                             )}
//                           </div>
//                         </h6>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="editable-form" style={{ display: "none" }}>
//                     <form
//                       className="row"
//                       noValidate="noValidate"
//                       onSubmit={handleSubmit}
//                     >
//                       <div className="row">
//                         <div className="col-lg-6 col-md-6 col-sm-12">
//                           <div className="form-outline">
//                             <Input
//                               name="companyName"
//                               value={values.companyName}
//                               onChange={handleChange}
//                               label="Company Name"
//                               star={true}
//                             />
//                             {errors.companyName && touched.companyName ? (
//                               <p className="text-danger msg">
//                                 {errors.companyName}
//                               </p>
//                             ) : null}
//                           </div>
//                         </div>
//                         <div className="col-lg-6 col-md-6 col-sm-12">
//                           <div className="form-outline">
//                             <Input
//                               name="companyType"
//                               value={values.companyType}
//                               onChange={handleChange}
//                               label="Type"
//                               star={true}
//                             />

//                             {errors.companyType && touched.companyType ? (
//                               <p className="text-danger msg">
//                                 {errors.companyType}
//                               </p>
//                             ) : null}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-lg-6 col-md-6 col-sm-12">
//                           <div className="form-outline">
//                             <Input
//                               name="fullName"
//                               value={values.fullName}
//                               onChange={handleChange}
//                               label="Name"
//                               star={true}
//                             />
//                             {errors.fullName && touched.fullName ? (
//                               <p className="text-danger msg">
//                                 {errors.fullName}
//                               </p>
//                             ) : null}
//                           </div>
//                         </div>
//                         <div className="col-lg-6 col-md-6 col-sm-12">
//                           <div className="form-outline">
//                             <select
//                               className="form-control slect-color main_inner_dropdown"
//                               name="designation"
//                               value={values.designation}
//                               onChange={handleChange}
//                               required
//                             >
//                               <option value="Founder">Founder</option>
//                               <option value=" Co Founder">Co Founder</option>
//                               <option value="CEO">CEO</option>
//                               <option value="Director">Director</option>
//                               <option value="Managing Director">
//                                 Managing Director
//                               </option>
//                               <option value="Unit Head">Unit Head</option>
//                               <option value="Chairman">Chairman</option>
//                             </select>
//                             <label
//                               className="form-label"
//                               for="typeText"
//                               style={{ background: "#fff" }}
//                             >
//                               Designation &nbsp;
//                               <span className=" required">*</span>
//                             </label>
//                             {errors.designation && touched.designation ? (
//                               <p className="text-danger msg">
//                                 {errors.designation}
//                               </p>
//                             ) : null}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-lg-6 col-md-6 col-sm-12">
//                           <div className="form-outline">
//                             <input
//                               type="email"
//                               className="form-control"
//                               placeholder=" "
//                               defaultValue={values.email}
//                               readOnly
//                             />
//                             <label
//                               className="form-label1"
//                               style={{ background: "#fff" }}
//                             >
//                               E-Mail Id &nbsp;
//                               <span className=" required">*</span>
//                             </label>
//                           </div>
//                         </div>
//                         <div className="col-lg-6 col-md-6 col-sm-12">
//                           <div className="form-outline">
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Domain"
//                               defaultValue={values.domain_name}
//                               required
//                               readOnly
//                             />
//                             <label
//                               className="form-label1"
//                               style={{ background: "#fff" }}
//                             >
//                               Domain
//                             </label>
//                           </div>
//                         </div>
//                         <div className="col-lg-6 col-md-6 col-sm-12">
//                           <div className="form-outline">
//                             <Input
//                               name="company_phone"
//                               value={values.company_phone}
//                               onChange={handleChange}
//                               label="Phone Number"
//                               star={true}
//                             />
//                             {errors.company_phone && touched.company_phone ? (
//                               <p className="text-danger msg">
//                                 {errors.company_phone}
//                               </p>
//                             ) : null}
//                           </div>
//                         </div>
//                         <div className="col-lg-6 col-md-6 col-sm-12">
//                           <div className="form-outline">
//                             <input
//                               name="registration_number"
//                               className="form-control"
//                               placeholder=" "
//                               defaultValue={values.registration_number}
//                               readOnly
//                             />
//                             <label
//                               className="form-label1"
//                               style={{ background: "#fff" }}
//                             >
//                               Registration Number &nbsp;
//                               <span className=" required">*</span>
//                             </label>
//                           </div>
//                         </div>
//                         <div className="col-lg-6 col-md-6 col-sm-12">
//                           <div className="form-outline">
//                             <Input
//                               name="webmaster_email"
//                               value={values.webmaster_email}
//                               onChange={handleChange}
//                               label="Webmaster Email"
//                             />
//                             {errors.webmaster_email &&
//                             touched.webmaster_email ? (
//                               <p className="text-danger msg">
//                                 {errors.webmaster_email}
//                               </p>
//                             ) : null}
//                           </div>
//                         </div>
//                         <div className="col-lg-6 col-md-6 col-sm-12">
//                           <div className="form-outline">
//                               <Input
//                                 name="company_social_link"
//                                 value={values.company_social_link}
//                                 onChange={handleChange}
//                                 label=" LinkedIn URL"
//                               />
//                             {errors.company_social_link &&
//                             touched.company_social_link ? (
//                               <p className="text-danger msg">
//                                 {errors.company_social_link}
//                               </p>
//                             ) : null}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="row mt-4">
//                         <div className="col-12">
//                           <Button
//                             text="Save"
//                             id="cancelButton1"
//                             className="btn infoedit3"
//                             loading={loading}
//                           />
//                           &nbsp;
//                           <p
//                             id="cancelButton"
//                             className="btn infoedit4"
//                             style={{ margin: "0" }}
//                           >
//                             Cancel
//                           </p>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//                 <div className="viewem mt-4">
//                   <div className="row">
//                     <div className="col-12">
//                       <h5 className="infoedit">
//                         <svg height="1em" viewBox="0 0 384 512">
//                           <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
//                         </svg>{" "}
//                         &nbsp;Company Address
//                       </h5>
//                       <div className="infoedit1">
//                         <button id="editButton1" className="infoedit3">
//                           Edit
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="readonly-form1">
//                       <div className="row">
//                         <SingleField
//                           title="Address"
//                           style={{ textAlign: "left" }}
//                           answer={renderValue(profile?.company_address)}
//                         />
//                       </div>
//                       <div className="row">
//                         <SingleField
//                           title="Country"
//                           style={{ textTransform: "capitalize" }}
//                           answer={profile?.company_country || "---"}
//                         />
//                         <SingleField
//                           title="State"
//                           style={{ textTransform: "capitalize" }}
//                           answer={renderValue(profile?.company_state)}
//                         />
//                       </div>
//                       <div className="row">
//                         <SingleField
//                           title="City"
//                           style={{ textTransform: "capitalize" }}
//                           answer={renderValue(profile?.company_city)}
//                         />
//                         <SingleField
//                           title="Postal Code"
//                           answer={renderValue(profile?.company_postal_code)}
//                         />
//                       </div>
//                     </div>
//                     <div className="editable-form1" style={{ display: "none" }}>
//                       <form noValidate="noValidate" onSubmit={handleSubmit}>
//                         <div className="row">
//                           <div className="col-lg-12 col-md-12 col-sm-12">
//                             <div className="form-outline">
//                               <textarea
//                                 className="form-control"
//                                 name="company_address"
//                                 placeholder=" "
//                                 onChange={handleChange}
//                                 defaultValue={values.company_address}
//                                 required
//                               ></textarea>
//                               <label
//                                 className="form-label"
//                                 for="typeText"
//                                 style={{ background: "#fff" }}
//                               >
//                                 Address&nbsp;
//                               </label>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row" style={{ marginBottom: "1rem" }}>
//                           <div className="col-lg-6 col-md-6 col-sm-12">
//                             <div className="form-outline">
//                               <CountrySelect
//                                 selectedCountry={values.company_country}
//                                 countryOptions={countryOptions}
//                                 handleCountryChange={handleCountryChange}
//                               />
//                             </div>
//                           </div>
//                           <div className="col-lg-6 col-md-6 col-sm-12">
//                             <div className="form-outline">
//                               <Select
//                                 className="basic-single"
//                                 classNamePrefix="select"
//                                 placeholder="Select State.."
//                                 isDisabled={!selectedCountry?.name}
//                                 isClearable={true}
//                                 isRtl={false}
//                                 isSearchable={true}
//                                 name="color"
//                                 defaultValue={
//                                   values.company_state
//                                     ? {
//                                         label: values.company_state,
//                                         value: values.company_state,
//                                       }
//                                     : null
//                                 }
//                                 options={stateOptions}
//                                 onChange={handleStateChange}
//                                 style={{ textAlign: "center" }}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row">
//                           <div className="col-lg-6 col-md-6 col-sm-12">
//                             <div className="form-outline">
//                               <Input
//                                 name="company_city"
//                                 value={values.company_city}
//                                 onChange={handleChange}
//                                 label="City"
//                               />
//                             </div>
//                           </div>
//                           <div className="col-lg-6 col-md-6 col-sm-12">
//                             <div className="form-outline">
//                               <Input
//                                 type="number"
//                                 name="company_postal_code"
//                                 value={values.company_postal_code}
//                                 onChange={handleChange}
//                                 label="Postal Code"
//                               />
//                             </div>
//                           </div>
//                         </div>

//                         <div className="row mt-4">
//                           <div className="col-12">
//                             <Button
//                               text="Save"
//                               id="cancelButton1"
//                               className="btn infoedit3"
//                               loading={loading}
//                             />
//                             &nbsp;
//                             <p
//                               style={{ margin: "0" }}
//                               id="cancelButton1"
//                               className="btn infoedit4"
//                             >
//                               Cancel
//                             </p>
//                           </div>
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                 </div>
//                 <Link
//                   to="/update-password"
//                   className="btn mybtn profilepassbtn"
//                 >
//                   Change Password
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//       </Layout>
//     </>
//   );
// };

// export default Profile;


import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../component/layout";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../helper";
import { getUser } from "../../api/profile";
import { updateProfilSchema } from "../../helper/schema";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Button from "../../component/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../component/LoadingSpinner";
import CropImage from "../../component/extras/crop-image/CropImage";
import { Country, State } from "country-state-city";
import Select from "react-select";
import CountrySelect from "../../component/CountrySelect";
import { BASE_URL } from "../../api/baseUrl";
import { SingleField } from "../../component/SingleField";
import { linkedin } from "../../asset";
import { Input } from "../../component/Input";
import {useGetUserQuery, useUpdateProfileMutation} from "../../apis/profile"

const initialValues = {
  email: "",
  domain_name: "",
  companyName: "",
  companyType: "",
  fullName: "",
  designation: "",
  logoImage: null,
  oldLogoImage: null,
  company_phone: "",
  registration_number: "",
  webmaster_email: "",
  company_social_link: "",
  company_address: "",
  company_city: "",
  company_state: "",
  company_country: "",
  company_postal_code: "",
};

const Profile = () => {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const bearerToken = getFromLocalStorage("token");
  const Dispatch = useDispatch();
  const [updateProfile,{data:updateProfileData}] = useUpdateProfileMutation();
  const { data } = useGetUserQuery();

  useEffect(() => {
    if (data) {
      setLoading(true);
      setProfile(data?.user);
      setValues(data?.user);
      setLoading(false);
    }
  }, [data]);

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      validationSchema: updateProfilSchema,
      onSubmit: async (values,{ setSubmitting }) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("companyName", values.companyName);
        formData.append("companyType", values.companyType);
        formData.append("designation", values.designation);
        formData.append("fullName", values.fullName);
        formData.append("oldLogoImage", values.oldLogoImage);
        formData.append("companyPhone", values.company_phone);
        formData.append("registrationNumber", values.registration_number);
        
        if(values.webmaster_email) {
          formData.append("companyWebmasterEmail", values.webmaster_email);
        }
        if (values.company_social_link) {
          formData.append("companySocialLink", values.company_social_link);
        }
        if (values.company_address) {
          formData.append("companyAddress", values.company_address);
        }
        if (values.company_city) {
          formData.append("companyCity", values.company_city);
        }
        if (values.company_state) {
          formData.append("companyState", values.company_state);
        }
        if (values.company_country) {
          formData.append("companyCountry", values.company_country);
        }
        if (values.company_postal_code) {
          formData.append("companyPostalCode", values.company_postal_code);
        }
        if (values.logoImage) {
          formData.append("logoImage", values.logoImage);
        }

        try {
          const response = await updateProfile({ formData }).unwrap();
          setLoading(false);
          removeFromLocalStorage("user");
          setToLocalStorage("user", response?.user);
          toast.success("Successfully saved");
          // Close forms after successful submission
          setShowInfoForm(false);
          setShowAddressForm(false);
          setSubmitting(false);
        } catch (error) {
          if (error?.response?.data?.errors?.logoImage) {
            toast.error("logo image field must not be greater than 2048 kilobytes");
          } else {
            toast.error(error?.response?.data?.errors.companySocialLink);
          }
          setLoading(false);
          setSubmitting(false);
        }
      },
    });

  const setValues = (data) => {
    values.email = data?.email;
    values.domain_name = data?.domain_name;
    values.companyName = data?.company_name;
    values.companyType = data?.company_type;
    values.designation = data?.designation;
    values.fullName = data?.full_name;
    values.oldLogoImage = data?.image;
    values.company_phone = data?.company_phone;
    values.registration_number = data?.registration_number;
    values.webmaster_email = data?.webmaster_email;
    values.company_social_link = data?.company_social_link;
    values.company_address = data?.company_address;
    values.company_state = data?.company_state;
    values.company_country = data?.company_country;
    values.company_postal_code = data?.company_postal_code;
    values.company_city = data?.company_city;
  };
// useEffect(()=>{
//   setShowInfoForm(false);
//   setShowAddressForm(false);
// },[updateProfileData])
// console.log(updateProfileData)
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
    <Layout>
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
                    <CropImage
                      loading={loading}
                      oldImage={values.oldLogoImage}
                      setLoading={setLoading}
                    />
                  </div>
                  <div
                    className="profileimgboxdetail"
                    style={{ textTransform: "capitalize" }}
                  >
                    <h5>{profile?.company_name}</h5>
                  </div>
                  <div className="row mt-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <p
                        className="profileimgboxcompanydetail1"
                        style={{ color: "rgb(95, 125, 149)" }}
                      >
                        {profile?.domain_name}
                      </p>
                    </div>
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
                        title="Company Name"
                        answer={profile?.company_name}
                        style={{ textTransform: "capitalize" }}
                      />
                      <SingleField
                        title="Type"
                        answer={profile?.company_type}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                    <div className="row">
                      <SingleField
                        title="Name"
                        answer={profile?.full_name}
                        style={{ textTransform: "capitalize" }}
                      />
                      <SingleField
                        title="Designation"
                        answer={profile?.designation}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                    <div className="row">
                      <SingleField title="E-Mail Id" answer={profile?.email} />
                      <SingleField
                        title="Domain"
                        answer={profile?.domain_name}
                      />
                    </div>
                    <div className="row">
                      <SingleField
                        title="Phone Number"
                        answer={profile?.company_phone}
                      />
                      <SingleField
                        title="Registration"
                        answer={profile?.registration_number}
                      />
                    </div>
                    <div className="row">
                      <SingleField
                        title="WebMaster E-Mail"
                        answer={renderValue(profile.webmaster_email)}
                      />
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <p className="addlabelcard2"></p>
                        <h6 className="profileimgboxcompanydetail2">
                          <div>
                            {profile?.company_social_link ? (
                              <a
                                className="socialbtn1"
                                href={profile?.company_social_link}
                                target="blank"
                              >
                                <img src={linkedin} alt="linkedin" />
                              </a>
                            ) : (
                              "---"
                            )}
                          </div>
                        </h6>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="editable-form">
                    <form className="row" noValidate onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-outline">
                            <Input
                              name="companyName"
                              value={values.companyName}
                              onChange={handleChange}
                              label="Company Name"
                              star={true}
                            />
                            {errors.companyName && touched.companyName && (
                              <p className="text-danger msg">
                                {errors.companyName}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-outline">
                            <Input
                              name="companyType"
                              value={values.companyType}
                              onChange={handleChange}
                              label="Type"
                              star={true}
                            />
                            {errors.companyType && touched.companyType && (
                              <p className="text-danger msg">
                                {errors.companyType}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-outline">
                            <Input
                              name="fullName"
                              value={values.fullName}
                              onChange={handleChange}
                              label="Name"
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
                            <select
                              className="form-control slect-color main_inner_dropdown"
                              name="designation"
                              value={values.designation}
                              onChange={handleChange}
                              required
                            >
                              <option value="Founder">Founder</option>
                              <option value=" Co Founder">Co Founder</option>
                              <option value="CEO">CEO</option>
                              <option value="Director">Director</option>
                              <option value="Managing Director">
                                Managing Director
                              </option>
                              <option value="Unit Head">Unit Head</option>
                              <option value="Chairman">Chairman</option>
                            </select>
                            <label
                              className="form-label"
                              htmlFor="typeText"
                              style={{ background: "#fff" }}
                            >
                              Designation &nbsp;
                              <span className=" required">*</span>
                            </label>
                            {errors.designation && touched.designation && (
                              <p className="text-danger msg">
                                {errors.designation}
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
                              E-Mail Id &nbsp;
                              <span className=" required">*</span>
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-outline">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Domain"
                              defaultValue={values.domain_name}
                              required
                              readOnly
                            />
                            <label
                              className="form-label1"
                              style={{ background: "#fff" }}
                            >
                              Domain
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-outline">
                            <Input
                              name="company_phone"
                              value={values.company_phone}
                              onChange={handleChange}
                              label="Phone Number"
                              star={true}
                            />
                            {errors.company_phone && touched.company_phone && (
                              <p className="text-danger msg">
                                {errors.company_phone}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-outline">
                            <input
                              name="registration_number"
                              className="form-control"
                              placeholder=" "
                              defaultValue={values.registration_number}
                              readOnly
                            />
                            <label
                              className="form-label1"
                              style={{ background: "#fff" }}
                            >
                              Registration Number &nbsp;
                              <span className=" required">*</span>
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-outline">
                            <Input
                              name="webmaster_email"
                              value={values.webmaster_email}
                              onChange={handleChange}
                              label="Webmaster Email"
                            />
                            {errors.webmaster_email &&
                              touched.webmaster_email && (
                                <p className="text-danger msg">
                                  {errors.webmaster_email}
                                </p>
                              )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-outline">
                            <Input
                              name="company_social_link"
                              value={values.company_social_link}
                              onChange={handleChange}
                              label=" LinkedIn URL"
                            />
                            {errors.company_social_link &&
                              touched.company_social_link && (
                                <p className="text-danger msg">
                                  {errors.company_social_link}
                                </p>
                              )}
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
                      &nbsp;Company Address
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
                          answer={renderValue(profile?.company_address)}
                        />
                      </div>
                      <div className="row">
                        <SingleField
                          title="Country"
                          style={{ textTransform: "capitalize" }}
                          answer={profile?.company_country || "---"}
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
                                defaultValue={values.company_address}
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
                                selectedCountry={values.company_country}
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
                                  values.company_state
                                    ? {
                                        label: values.company_state,
                                        value: values.company_state,
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
                                name="company_city"
                                value={values.company_city}
                                onChange={handleChange}
                                label="City"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-outline">
                              <Input
                                type="number"
                                name="company_postal_code"
                                value={values.company_postal_code}
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
              <Link to="/update-password" className="btn mybtn profilepassbtn">
                Change Password
              </Link>
            </div>
          </div>
          </div>

        </section>
      </Layout>
  
  );
};

export default Profile;