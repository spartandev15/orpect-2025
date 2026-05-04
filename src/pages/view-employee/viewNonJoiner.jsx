import React, { useEffect, useState } from "react";
import Layout from "../../component/layout";
import { getEmployeeById } from "../../api/employee";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getFromLocalStorage } from "../../helper";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Button from "../../component/Button";
import LoadingSpinner from "../../component/LoadingSpinner";
import UpdateEmployeeCropImage from "../../component/extras/crop-image/UpdateEmployeeCropImage";
import EditNonJoinerReview from "../../component/extras/EditNonJoinerReview";
import { editNonjoinerSchema } from "../../helper/schema/ratingSchemas";
import SelectPostion from "../../component/SelectPosition";
import { Country, State } from "country-state-city";

import Select from "react-select";
import { formatDate } from "../../helper/hooks/formatedDate";
import CountrySelect from "../../component/CountrySelect";
import DeleteEmployee from "../../component/delete/Deletepopup";
import { BASE_URL } from "../../api/baseUrl";
import { linkedin } from "../../asset";
import { SingleField } from "../../component/SingleField";
import { Input } from "../../component/Input";
import { useGetEmployeeByIdQuery, useUpdateEmployeeByIdMutation } from "../../apis/employee";
import RenderIf from "../../component/RenderIf";

const initialValues = {
  empName: "",
  email: "",
  phone: "",
  position: "",
  dateOfJoining: "",
  image: null,
  oldImageName: null,
  tax_number: "",
  dateOfBirth: "",
  permanentAddress: "",
  city: null,
  state: null,
  country: null,
  linkedIn: null,
  postalCode: "",
};

const ViewNonJoiner = () => {
  // const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { id } = useParams();
  const bearerToken = getFromLocalStorage("token");
  const [updateEmployeeById, { isLoading: loading, }] = useUpdateEmployeeByIdMutation();

  const {
    data,
    // isLoading:loading,
    isSuccess,
    isError,
    error,
    refetch: refetchEmployee,
  } = useGetEmployeeByIdQuery(id);

  const [isInfoEditable, setIsInfoEditable] = useState(false);
  const [isAddressEditable, setIsAddressEditable] = useState(false);
  const [isReviewEditable, setIsReviewEditable] = useState(false);


  // Function to refetch employee data
  const handleRefetchEmployee = async () => {
    try {
      const result = await refetchEmployee();
      if (result?.data?.employee) {
        setEmployee(result.data.employee);
        setValues(result.data.employee);
      }
    } catch (error) {
      console.error("Error refetching employee:", error);
    }
  };
  // useEffect(() => {
  //   dispatch(getEmployeeById(id)).then((res) => {
  //     setEmployee(res?.data?.employee);
  //     setValues(res?.data?.employee);
  //     setLoading(false);
  //   });
  // }, [loading]);
  const { values, errors, touched, handleChange, handleSubmit, setFieldValue, validateForm, setTouched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: editNonjoinerSchema,
      onSubmit: async (values) => {
        // This onSubmit is not used directly, but kept for formik initialization
        // Separate handlers handleInformationUpdate and handleAddressUpdate are used instead
      },
    });

  const setValues = (data) => {
    values.empId = data?.emp_id;
    values.email = data?.email;
    values.empName = data?.emp_name;
    values.phone = data?.phone;
    values.position = data?.position;
    values.dateOfJoining = data?.date_of_joining;
    values.oldImageName = data?.profile_image;
    values.tax_number = data?.tax_number || data?.emp_pan;
    values.email = data?.email;
    values.phone = data?.phone;
    values.linkedIn = data?.linked_in;
    values.permanentAddress = data?.permanent_address;
    values.city = data?.city;
    values.state = data?.state;
    values.country = data?.country;
    values.dateOfBirth = data?.date_of_birth;
    values.postalCode = data?.postal_code;
  };

  // Information section update handler
  const handleInformationUpdate = async (e) => {
    e.preventDefault();

    // Validate form using formik
    const validationErrors = await validateForm();
    
    // Check if there are errors in information fields only
    const infoFields = ['empName', 'email', 'phone', 'position', 'dateOfBirth', 'linkedIn'];
    const hasInfoErrors = infoFields.some(field => validationErrors[field]);
    
    if (hasInfoErrors) {
      // Touch all information fields to show errors
      const touchedFields = {};
      infoFields.forEach(field => {
        touchedFields[field] = true;
      });
      setTouched(touchedFields);
      return;
    }

    try {
      const formData = new FormData();
      // Information fields only
      formData.append("empName", values.empName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("position", values.position);
      if (values.dateOfJoining) {
        formData.append("dateOfJoining", values.dateOfJoining);
      }
      if (values.dateOfBirth) {
        formData.append("dateOfBirth", values.dateOfBirth);
      }
      if (values.linkedIn) {
        formData.append("linkedIn", values.linkedIn);
      }

      // Keep existing address fields
      if (values.permanentAddress) {
        formData.append("permanentAddress", values.permanentAddress);
      }
      if (values.city) {
        formData.append("city", values.city);
      }
      if (values.state) {
        formData.append("state", values.state);
      }
      if (values.country) {
        formData.append("country", values.country);
      }
      if (values.postalCode) {
        formData.append("postalCode", values.postalCode);
      }
      if (values.image) {
        formData.append("image", values.image);
      }
      formData.append("nonjoiner", 1);
      formData.append("exEmp", 0);

      const response = await updateEmployeeById({ id, formData }).unwrap();
      
      if (response?.status === "error") {
        toast.error(response?.message || "Failed to update information");
      } else if (response?.status) {
        toast.success("Successfully saved");
        // Refresh employee data
        await handleRefetchEmployee();
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      const errorMessage = error?.data?.message || error?.message || "Failed to update information";
      toast.error(errorMessage);
      console.error("Update information failed:", error);
    } finally {
      setIsInfoEditable(false);
    }
  };

  // Address section update handler
  const handleAddressUpdate = async (e) => {
    e.preventDefault();

    // Validate form using formik
    const validationErrors = await validateForm();
    
    // Check if there are errors in address fields only
    const addressFields = ['permanentAddress', 'city', 'state', 'country', 'postalCode'];
    const hasAddressErrors = addressFields.some(field => validationErrors[field]);
    
    if (hasAddressErrors) {
      // Touch all address fields to show errors
      const touchedFields = {};
      addressFields.forEach(field => {
        touchedFields[field] = true;
      });
      setTouched(touchedFields);
      return;
    }

    try {
      const formData = new FormData();
      // Keep existing information fields
      formData.append("empName", values.empName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("position", values.position);
      if (values.dateOfJoining) {
        formData.append("dateOfJoining", values.dateOfJoining);
      }
      if (values.dateOfBirth) {
        formData.append("dateOfBirth", values.dateOfBirth);
      }
      if (values.linkedIn) {
        formData.append("linkedIn", values.linkedIn);
      }

      // Address fields only
      if (values.permanentAddress) {
        formData.append("permanentAddress", values.permanentAddress);
      }
      if (values.city) {
        formData.append("city", values.city);
      }
      if (values.state) {
        formData.append("state", values.state);
      }
      if (values.country) {
        formData.append("country", values.country);
      }
      if (values.postalCode) {
        formData.append("postalCode", values.postalCode);
      }
      if (values.image) {
        formData.append("image", values.image);
      }
      formData.append("nonjoiner", 1);
      formData.append("exEmp", 0);

      const response = await updateEmployeeById({ id, formData }).unwrap();

      if (response?.status === "error") {
        toast.error(response?.message || "Failed to update address");
      } else if (response?.status) {
        toast.success("Successfully saved");
        // Refresh employee data
        await handleRefetchEmployee();
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      const errorMessage = error?.data?.message || error?.message || "Failed to update address";
      toast.error(errorMessage);
      console.error("Update address failed:", error);
    } finally {
      setIsAddressEditable(false);
    }
  };


  const renderValue = (value, fallback = "---") => (value ? value : fallback);

  const currentDate = new Date().toISOString().split("T")[0];

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
    setFieldValue("state", "");
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

  useEffect(() => {
    if (isSuccess) {
      setEmployee(data?.employee);
      setValues(data?.employee);
    }
  }, [isSuccess, data]);


  if (!employee) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Layout>
        <section className="viewsinglem">
          <div className="container-fluid">
            <div className="row pd-4">
              <div className="col-lg-12">
                <h3>Non Joiner Review</h3>
              </div>
            </div>
            <div className="row  ">
              <div className="col-lg-3 col-md-3 col-sm-12   pd-4">
                <div className="viewem">
                  <div className="employebox">
                    <div className="profile-pic-wrapper">
                      <UpdateEmployeeCropImage
                        oldImage={values.oldImageName}
                        empId={id}
                      />
                    </div>{" "}
                    {errors.image && touched.image ? (
                      <p className="text-danger msg">{errors.image}</p>
                    ) : null}
                    <div className="profileimgboxdetail">
                      <h5 style={{ textTransform: "capitalize" }}>
                        {employee?.emp_name}
                      </h5>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <h6 className="profileimgboxcompanydetail1">
                          {employee?.position}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-9 col-md-9 col-sm-12 ">
                <div className="viewem pd-4">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12  ">
                      <h5 className="infoedit">
                        <i
                          className="fa  fa-address-card"
                          style={{ color: "#134d75" }}
                        ></i>{" "}
                        &nbsp; Information
                      </h5>
                      <div className="infoedit1">
                        {!isInfoEditable && (
                          <button id="editButton1" className="infoedit3" onClick={() => setIsInfoEditable(true)}>
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                    <RenderIf condition={isInfoEditable}>
                      <div className="editable-form1">
                        <form noValidate="noValidate" onSubmit={handleInformationUpdate}>
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                              <div className="form-outline">
                                <Input
                                  name="empName"
                                  value={values.empName}
                                  onChange={handleChange}
                                  label="Full Name"
                                />
                                {errors.empName && touched.empName ? (
                                  <p className="text-danger msg">
                                    {errors.empName}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                              <div className="form-outline">
                                <Input
                                  name="email"
                                  value={values.email}
                                  onChange={handleChange}
                                  label="E-Mail"
                                />
                                {errors.email && touched.email ? (
                                  <p className="text-danger msg">
                                    {errors.email}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                              <div className="form-outline">
                                <SelectPostion
                                  nameValue="position"
                                  handleChange={handleChange}
                                  value={values.position}
                                />
                                {/* <label
                                className="form-label"
                                for="typeText"
                                style={{ background: "#fff" }}
                              >
                                Position &nbsp;
                                <span className=" required">*</span>
                              </label> */}

                                {/* <input
                                type="text" 
                                className="form-control"
                                name="position"
                                value={values.position}
                                onChange={handleChange}
                              /> */}
                                {errors.position && touched.position ? (
                                  <p className="text-danger msg">
                                    {errors.position}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                              <div className="form-outline">
                                <input
                                  type="date"
                                  className="form-control"
                                  placeholder=" "
                                  name="dateOfBirth"
                                  max={currentDate}
                                  value={values.dateOfBirth}
                                  onChange={handleChange}
                                />{" "}
                                <label
                                  className="form-label"
                                  for="typeText"
                                  style={{ background: "#fff" }}
                                >
                                  Date of Birth &nbsp;
                                </label>
                                {errors.dateOfBirth && touched.dateOfBirth ? (
                                  <p className="text-danger msg">
                                    {errors.dateOfBirth}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                              <div className="form-outline">
                                <Input
                                  name="phone"
                                  value={values.phone}
                                  onChange={handleChange}
                                  label="Phone Number"
                                />
                                {errors.phone && touched.phone ? (
                                  <p className="text-danger msg">
                                    {errors.phone}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                              <div className="form-outline">
                                <Input
                                  name="linkedIn"
                                  value={values.linkedIn}
                                  onChange={handleChange}
                                  label="LinkedIn"
                                />
                                {errors.linkedIn && touched.linkedIn ? (
                                  <p className="text-danger msg">
                                    {errors.linkedIn}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="row mt-4">
                            <div className="col-lg-12">
                              <Button
                                text="Save"
                                className="btn infoedit3"
                                loading={loading}
                              />
                              &nbsp;
                              <p
                                onClick={() => setIsInfoEditable(false)}
                                className="btn infoedit4"
                                style={{ margin: "0", cursor: "pointer" }}
                              >
                                Cancel
                              </p>
                            </div>
                          </div>
                        </form>
                      </div>

                    </RenderIf>
                    <RenderIf condition={!isInfoEditable}>
                      <div className="readonly-form1">
                        <div className="row">
                          <SingleField
                            title="Full Name"
                            answer={employee?.emp_name}
                            style={{ textTransform: "capitalize" }}
                          />
                          <SingleField title="E-Mail" answer={employee?.email} />
                        </div>
                        <div className="row">
                          <SingleField
                            title="Position"
                            answer={employee?.position}
                          />
                          <SingleField
                            title="Date of Birth"
                            answer={
                              employee?.date_of_birth
                                ? formatDate(employee?.date_of_birth)
                                : "---"
                            }
                          />
                        </div>
                        <div className="row">
                          <SingleField
                            title="Phone Number"
                            answer={employee?.phone}
                          />
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <p className="addlabelcard2"> </p>
                            <h6 className="profileimgboxcompanydetail2">
                              {employee?.linked_in ? (
                                <a
                                  className="socialbtn1"
                                  href={renderValue(employee?.linked_in)}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <img src={linkedin} alt="linkedin" />
                                </a>
                              ) : null
                              }
                            </h6>
                          </div>
                        </div>
                      </div>
                    </RenderIf>
                  </div>
                </div>

                <div className="viewem mt-4">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12  ">
                      <h5 className="infoedit">
                        <svg height="1em" viewBox="0 0 384 512">
                          <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                        </svg>{" "}
                        &nbsp; Address
                      </h5>
                      <div className="infoedit1">
                        {!isAddressEditable && (
                          <button id="editButton2" className="infoedit3" onClick={() => setIsAddressEditable(true)}>
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                    <RenderIf condition={isAddressEditable}>
                      <div className="editable-form2">
                        <form noValidate="noValidate" onSubmit={handleAddressUpdate}>
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="permanentAddress"
                                  value={values.permanentAddress}
                                  onChange={handleChange}
                                />{" "}
                                <label
                                  className="form-label"
                                  for="typeText"
                                  style={{ background: "#fff" }}
                                >
                                  Address &nbsp;
                                </label>
                                {errors.permanentAddress &&
                                  touched.permanentAddress ? (
                                  <p className="text-danger msg">
                                    {errors.permanentAddress}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="row">
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
                                  placeholder="Select State..."
                                  isDisabled={
                                    selectedCountry?.name ? false : true
                                  }
                                  isClearable={true}
                                  isRtl={false}
                                  isSearchable={true}
                                  name="state"
                                  id="state"
                                  options={stateOptions}
                                  defaultValue={
                                    values.state
                                      ? {
                                        label: values.state,
                                        value: values.state,
                                      }
                                      : null
                                  }
                                  onChange={handleStateChange}
                                  style={{ textAlign: "center" }}
                                />

                                {errors.state && touched.state ? (
                                  <p className="text-danger msg">
                                    {errors.state}
                                  </p>
                                ) : null}
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
                                {errors.city && touched.city ? (
                                  <p className="text-danger msg">{errors.city}</p>
                                ) : null}
                              </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12">
                              <div className="form-outline">
                                <Input
                                  type="number"
                                  name="postalCode"
                                  value={values.postalCode}
                                  onChange={handleChange}
                                  label="Postal Code"
                                />
                                {errors.postalCode && touched.postalCode ? (
                                  <p className="text-danger msg">
                                    {errors.postalCode}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="row mt-4">
                            <div className="col-lg-12">
                              {/* <button id="saveButton2" className="btn infoedit3">
                              Save
                            </button>{" "} */}
                              <Button
                                text="Save"
                                id="cancelButton1"
                                className="btn infoedit3"
                                loading={loading}
                              />
                              &nbsp;
                              <p
                                onClick={() => setIsAddressEditable(false)}
                                id="cancelButton2"
                                className="btn infoedit4"
                                style={{ margin: "0", cursor: "pointer" }}
                              >
                                Cancel
                              </p>
                            </div>
                          </div>
                        </form>
                      </div>
                    </RenderIf>
                  </div>
                  <RenderIf condition={!isAddressEditable}>
                    <div className="readonly-form2">
                      <div className="row">
                        <SingleField
                          title="Address"
                          style={{ textAlign: "right" }}
                          answer={renderValue(employee?.permanent_address)}
                        />
                      </div>
                      <div className="row">
                        <SingleField
                          title="Country"
                          style={{ textTransform: "capitalize" }}
                          answer={renderValue(employee?.country)}
                        />
                        <SingleField
                          title="State"
                          style={{ textTransform: "capitalize" }}
                          answer={renderValue(employee?.state)}
                        />
                      </div>
                      <div className="row">
                        <SingleField
                          title="City"
                          style={{ textTransform: "capitalize" }}
                          answer={renderValue(employee.city)}
                        />
                        <SingleField
                          title="Postal Code"
                          answer={renderValue(employee?.postal_code)}
                        />
                      </div>
                    </div>
                  </RenderIf>
                </div>

                <div className="viewem mt-4">
                  <div className="row">
                    <div className="col-12">
                      <h5 className="infoedit">
                        <i
                          className="fa fa-star"
                          style={{ color: "#134d75" }}
                        ></i>{" "}
                        &nbsp; Review &nbsp;
                      </h5>

                      <div className="infoedit1">
                        {!isReviewEditable && (
                          <button id="editButton3" className="infoedit3" onClick={() => setIsReviewEditable(true)}>
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <EditNonJoinerReview employee={employee} isEditable={isReviewEditable} setIsEditable={setIsReviewEditable} onSave={handleRefetchEmployee} />
                </div>

                <div className="row mt-4">
                  <div className="col-lg-6 col-md-6 col-sm-12"></div>
                  <div className="col-lg-6 col-md-6 col-sm-12 btnright">
                    <DeleteEmployee id={employee?.sid} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </form> */}
        </section>
      </Layout>
    </>
  );
};

export default ViewNonJoiner;
