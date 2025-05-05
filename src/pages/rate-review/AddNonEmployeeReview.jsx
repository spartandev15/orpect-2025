import React, {  useState } from "react";
import Layout from "../../component/layout";
import { useFormik } from "formik";
import { getFromLocalStorage } from "../../helper";
import { toast } from "react-toastify";
import Button from "../../component/Button";
import { useNavigate} from "react-router";
import { useDispatch, useSelector } from "react-redux";
import EmployeeCropImage from "../../component/extras/crop-image/EmployeeCropImage";
import * as yup from "yup";
import { Country, State } from "country-state-city";
import Select from "react-select";
import { BASE_URL } from "../../api/baseUrl";
import { InputAdd } from "../../component/InputAdd";
import { useAddExEmployeeReviewMutation } from "../../apis/employee";

const initialValues = {
  // empId: "",
  empName: "",
  email: "",
  phone: "",
  position: "",
  pan_number: "",
  dateOfBirth: "",
  permanentAddress: "",
  city: "",
  state: "",
  country: "",
  linkedIn: "",
  review: "",
  postalCode:"",
};

const NonJoinerValidatinon = yup.object().shape({
  empName: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Employee name must contains alphabets only")
    .required("Employee name is required")
    .typeError("Employee name must be a string"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email"
    ),

  phone: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Invalid mobile number"),
  position: yup.string().required("Position is required"),
  linkedIn: yup.string().matches(
    /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\b/,
    'Invalid LinkedIn URL format'
  ),
  review: yup.string().required("Review is required"),
  dateOfBirth: yup
    .date()
    .max(new Date(), "Date of Birth must not be a future date"),
    postalCode: yup.number()
    .typeError('Postal code must be a number')
    .nullable()
});
const AddNonEmployeeReview = () => {
  // const [loading, setLoading] = useState(false);
  const bearerToken = getFromLocalStorage("token");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.data);
  const [addExEmployeeReview,{isLoading:loading}]=useAddExEmployeeReviewMutation()

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      validationSchema: NonJoinerValidatinon,
      onSubmit: async (values) => {
        try {
          // setLoading(true);
          const formData = new FormData();
          formData.append("empName", values.empName);
          formData.append("email", values.email);
          formData.append("phone", values.phone);
          formData.append("position", values.position);
          formData.append("image", values.image?.blob || ""); // Use default value if no image
          formData.append("pan_number", "");
          formData.append("dateOfBirth", values.dateOfBirth);
          formData.append("linkedIn", values.linkedIn);
          formData.append("permanentAddress", values.permanentAddress);
          formData.append("city", values.city);
          formData.append("state", values.state);
          formData.append("country", values.country);
          formData.append("postalCode", values.postalCode);
          formData.append("exEmployee", 0);
          formData.append("nonJoiner", 1);
          formData.append("performanceRating", 0);
          formData.append("professionalSkillsRating", 0);
          formData.append("teamworkCommunicationRating", 0);
          formData.append("attitudeBehaviourRating", 0);
          formData.append("review", values.review);

          // const response = await fetch(
          //   `${BASE_URL}/addReview`,
          //   {
          //     method: "POST",
          //     headers: {
          //       Authorization: `Bearer ${bearerToken}`,
          //       Accept: "application/json",
          //     },
          //     body: formData,
          //   }
          // );
          const response =  await addExEmployeeReview({ formData }).unwrap();
          
          if (response?.status) {

       
            toast.success("Successfully added");
            navigate("/non-joiner");
          } else {
            const errorData = await response.json();
            throw new Error(errorData?.message);
          }
        } catch (error) {
          toast.error(error.message);
        } finally {
          // setLoading(false);
        }
      },
    });
  const getImageValue = (getCropedImage) => {
    values.image = getCropedImage;
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
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <Layout>
        <form
        autoComplete="off"
          noValidate="noValidate"
          className="container-fluid add-employee"
          onSubmit={handleSubmit}
        >
          <div className="row ">
            <div className="col-lg-12">
              <h3>Add Review</h3>
            </div>
          </div>
          <div className="col-lg-12 ">
            <div className="profile-pic-wrapper">
            <EmployeeCropImage getImageValue={getImageValue} setFieldValue={setFieldValue}/>

            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-6 col-sm-12  pb-4">
              <div className="form-outline">
              <InputAdd
                  name="empName"
                  value={values.empName}
                  onChange={handleChange}
                  label="Employee Name"
                  star={true}
                />
                {errors.empName && touched.empName ? (
                  <p className="text-danger msg">{errors.empName}</p>
                ) : null}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12  pb-4">
              <div className="form-outline">
              <InputAdd
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  label="E-Mail"
                  star={true}
                />
                {errors.email && touched.email ? (
                  <p className="text-danger msg">{errors.email}</p>
                ) : null}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12  pb-4">
              <div className="form-outline">
              <InputAdd
                  type="number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  label="Phone Number"
                  star={true}
                />
                {errors.phone && touched.phone ? (
                  <p className="text-danger msg">{errors.phone}</p>
                ) : null}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12  pb-4">
              <div className="form-outline datalist">
                <input
                  type="text"
                  list="cars"
                  className="form-control"
                  name="position"
                  value={values.position}
                  onChange={handleChange}
                  required
                />
                <label className="form-label" for="typeText">
                  Position &nbsp;<span className="required">*</span>
                </label>
                <datalist className="datalist-ul" id="cars">
                  {data?.positions?.map((i) => (
                    <option key={i.id} value={i.position}>
                      {i.position}
                    </option>
                  ))}
                </datalist>
                {errors.position && touched.position ? (
                  <p className="text-danger msg">{errors.position}</p>
                ) : null}
              </div>
            </div>

            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <input
                  type="date"
                  className="form-control"
                  placeholder=" "
                  name="dateOfBirth"
                  value={values.dateOfBirth}
                  max={currentDate}
                  onChange={handleChange}
                  required
                />
                <label className="form-label" for="typeText">
                  Date of Birth
                </label>
                {errors.dateOfBirth && touched.dateOfBirth ? (
                  <p className="text-danger msg">{errors.dateOfBirth}</p>
                ) : null}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
              <InputAdd
                  name="permanentAddress"
                  value={values.permanentAddress}
                  onChange={handleChange}
                  label="Permanent Address"
                  star={true}
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <label className="addlabel"> Country</label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Select Country.."
                  isClearable={true}
                  isRtl={false}
                  isSearchable={true}
                  defaultValue={values.company_country}
                  options={countryOptions}
                  id="company_country"
                  name="company_country"
                  onChange={handleCountryChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <label className="addlabel"> State</label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Select State.."
                  isDisabled={selectedCountry?.name ? false : true}
                  isClearable={true}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  options={stateOptions}
                  onChange={handleStateChange}
                  style={{ textAlign: "center" }}
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
              <InputAdd
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  label="City"
                />
                {errors.city && touched.city ? (
                  <p className="text-danger msg">{errors.city}</p>
                ) : null}
              </div>
            </div>
           
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
              <InputAdd
                  type="number"
                  name="postalCode"
                  value={values.postalCode}
                  onChange={handleChange}
                  label="Postal Code"
                />
                {errors.postalCode && touched.postalCode ? (
                  <p className="text-danger msg">{errors.postalCode}</p>
                ) : null}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
              <InputAdd
                  name="linkedIn"
                  value={values.linkedIn}
                  onChange={handleChange}
                  label="LinkedIn"
                />
                {errors.linkedIn && touched.linkedIn ? (
                  <p className="text-danger msg">{errors.linkedIn}</p>
                ) : null}
              </div>
            </div>

            {/* ///////////////////////////////////////// */}

            {/* ////////////////////////////// */}
            <div className="starrate">
              <div className="form-outline  ">
                <textarea
                  name="review"
                  className="form-control mt-1"
                  rows="3"
                  cols="30"
                  value={values.review}
                  onChange={handleChange}
                  required
                />
                <label className="form-label" for="typeTextarea">
                  Review<span className="required">*</span>{" "}
                </label>
                {errors.review && touched.review ? (
                  <p className="text-danger msg">{errors.review}</p>
                ) : null} 
              </div>
            </div>
            <div className="row" style={{ paddingRight: "0" }}>
              <div className="col-lg-4 col-md-4  pd-4"></div>
              <div
                className="col-lg-4 col-md-4 col-sm-12 pb-4 mt-3"
                style={{ textAlign: "center", paddingRight: "0" }}
              >
                <Button className="btn mybtn" loading={loading} text="Submit" />
              </div>
              <div className="col-lg-4 col-md-4   pd-4  btnright"></div>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default AddNonEmployeeReview;
