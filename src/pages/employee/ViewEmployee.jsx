import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../component/layout";
import { getEmployeeById } from "../../api/employee";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { editCurrentEmployeeSchema } from "../../helper/schema";
import { getFromLocalStorage } from "../../helper";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import $ from "jquery";
import AddEmployeeReview from "../../component/extras/AddEmployeeReview";
import Button from "../../component/Button";
import LoadingSpinner from "../../component/LoadingSpinner";
import UpdateEmployeeCropImage from "../../component/extras/crop-image/UpdateEmployeeCropImage";
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

const initialValues = {
  empId: "",
  empName: "",
  email: "",
  phone: "",
  position: "",
  dateOfJoining: "",
  image: null,
  oldImageName: null,
  pan_number: "",
  dateOfBirth: "",
  permanentAddress: "",
  city: "",
  state: "",
  country: "",
  linkedIn: "",
  postalCode: "",

  current_salaray: "",
  increment_date: "",
  last_increment_date: "",
  tax_number: "",
};

const ViewEmployee = () => {
  // const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();
  const bearerToken = getFromLocalStorage("token");
  const [updateEmployeeById,{isLoading:loading,}] = useUpdateEmployeeByIdMutation();
  const {
    data,
    // isLoading:loading,
    isSuccess,
    isError,
    error,
  } = useGetEmployeeByIdQuery(id);
  useEffect(() => {
    if (isSuccess) {
      setEmployee(data?.employee);
      setValues(data?.employee);
    }
  }, [isSuccess, data]);
  // const fetchEmployee = useCallback(() => {
  //   dispatch(getEmployeeById(id)).then((res) => {
  //     setEmployee(res?.data?.employee);
  //     setValues(res?.data?.employee);
  //     setLoading(false);
  //   });
  // }, [dispatch, id]);

  // useEffect(() => {
  //   fetchEmployee();
  // }, [fetchEmployee]);

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      validationSchema: editCurrentEmployeeSchema,
      onSubmit: async (values) => {
        try {
          // setLoading(true);
          const formData = new FormData();

          const fieldsToAppend = [
            "empId",
            "empName",
            "email",
            "phone",
            "position",
            "dateOfJoining",
            "dateOfBirth",
            "pan_number",
            "current_salaray",
            "increment_date",
            "last_increment_date",
            "tax_number"
          ];

          fieldsToAppend.forEach((field) => {
            if (values[field]) {
              formData.append(field, values[field]);
            }
          });

          const optionalFields = [
            "linkedIn",
            "permanentAddress",
            "city",
            "state",
            "country",
            "image",
            "postalCode",
          ];
          optionalFields.forEach((field) => {
            if (values[field]) {
              formData.append(field, values[field]);
            }
          });

          // const url = `${BASE_URL}/updateEmployee/${id}`;

          // const response = await fetch(url, {
          //   method: "POST",
          //   headers: {
          //     Authorization: `Bearer ${bearerToken}`,
          //   },
          //   body: formData,
          // });
       const response = await updateEmployeeById({ id, formData }).unwrap();
        console.log(response)
          if (response.status) {
            toast.success("Successfully saved");
            navigate("/dashboard")
            // setLoading(false);
            // window.location.reload();
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
          }
        } catch (error) {
          // setLoading(false);
          toast.error(error.message);
        }
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
    values.pan_number = data?.emp_pan;
    values.email = data?.email;
    values.phone = data?.phone;
    values.linkedIn = data?.linked_in;
    values.permanentAddress = data?.permanent_address;
    values.city = data?.city;
    values.state = data?.state;
    values.country = data?.country;
    values.dateOfBirth = data?.date_of_birth;
    values.postalCode = data?.postal_code;

    
 
    values.current_salaray = data?.current_salaray;
    values.increment_date = data?.increment_date;
    values.last_increment_date = data?.last_increment_date;
    values.tax_number = data?.tax_number;


  };
  if (!employee) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  // // Event Listner function for form
  $(document).ready(function () {
    $("#editButton").click(function () {
      $(".editable-form").show();
      $(".readonly-form").hide();
      $("#editButton").hide();
      $("#cancelButton").show();
    });

    $("#cancelButton").click(function () {
      $(".editable-form").hide();
      $(".readonly-form").show();
      $("#editButton").show();
      $("#cancelButton").hide();
    });
  });

  // // to here

  //  // Event Listner function for form
  $(document).ready(function () {
    $("#editButton1").click(function () {
      $(".editable-form1").show();
      $(".readonly-form1").hide();
      $("#editButton1").hide();
      $("#cancelButton1").show();
    });

    $("#cancelButton1").click(function () {
      $(".editable-form1").hide();
      $(".readonly-form1").show();
      $("#editButton1").show();
      $("#cancelButton1").hide();
    });
  });

  // // to here

  //    // Event Listner function for form
  $(document).ready(function () {
    $("#editButton2").click(function () {
      $(".editable-form2").show();
      $(".readonly-form2").hide();
      $("#editButton2").hide();
      $("#cancelButton2").show();
    });

    $("#cancelButton2").click(function () {
      $(".editable-form2").hide();
      $(".readonly-form2").show();
      $("#editButton2").show();
      $("#cancelButton2").hide();
    });
  });

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

  return (
    <>
      <Layout>
        <section className="viewsinglem">
          <div className="container-fluid">
            <div className="row pd-4">
              <div className="col-lg-12">
                <h3>Employee Details </h3>
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
                    </div>
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
                          {employee?.emp_id}
                        </h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <h6 className="profileimgboxcompanydetail1 text-capitalize">
                          {employee?.position}
                        </h6>
                      </div>
                    </div>
                    <div className="row mt-1">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <p
                          className="profileimgboxcompanydetail1"
                          style={{ color: "rgb(95, 125, 149)" }}
                        >
                          Date of Joining
                        </p>
                        <h6 className="profileimgboxcompanydetail1">
                          {formatDate(employee.date_of_joining)}
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
                        <button id="editButton1" className="infoedit3">
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="editable-form1" style={{ display: "none" }}>
                      <form noValidate="noValidate" onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-outline">
                              <Input
                                name="empName"
                                value={values.empName}
                                onChange={handleChange}
                                label="Full Name"
                                star={true}
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
                                star={true}
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
                              <Input
                                name="empId"
                                value={values.empId}
                                onChange={handleChange}
                                label="Employee Id"
                                star={true}
                              />

                              {errors.empId && touched.empId ? (
                                <p className="text-danger msg">
                                  {errors.empId}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-outline">
                              <Input
                              type="date"
                                name="dateOfJoining"
                                value={values.dateOfJoining}
                                onChange={handleChange}
                                label="Date of Joining"
                                star={true}
                              />
                              {errors.dateOfJoining && touched.dateOfJoining ? (
                                <p className="text-danger msg">
                                  {errors.dateOfJoining}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-outline">
                              <Input
                                name="pan_number"
                                value={values.pan_number}
                                onChange={(event) =>
                                  setFieldValue(
                                    "pan_number",
                                    event.target.value.toUpperCase()
                                  )
                                }
                                label="Pan Number"
                                star={true}
                              />
                              {errors.pan_number && touched.pan_number ? (
                                <p className="text-danger msg">
                                  {errors.pan_number}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-outline">
                            <Input
                                type="date"
                                name="dateOfBirth"
                                value={values.dateOfBirth}
                                onChange={handleChange}
                                label="Date of Birth"
                                star={true}
                              />
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
                                star={true}
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
                              <SelectPostion
                                nameValue="position"
                                handleChange={handleChange}
                                value={values.position}
                                required
                              />
                              <label
                                className="form-label"
                                for="typeText"
                                style={{ background: "#fff" }}
                              >
                                Position &nbsp;
                                <span className=" required">*</span>
                              </label>
                              {errors.position && touched.position ? (
                                <p className="text-danger msg">
                                  {errors.position}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {/* new start */} 
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-outline">
                              <Input
                                name="current_salaray"
                                value={values.current_salaray}
                                onChange={handleChange}
                                label="Current Salaray"
                                // star={true}
                              />

                              
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-outline">
                              <Input
                              type="date"
                                name="increment_date"
                                value={values.increment_date}
                                onChange={handleChange}
                                label="Increment Date"
                                // star={true}
                              />
                           
                            </div>
                          </div>
                        </div>
                        <div className="row">  
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-outline">
                              <Input
                               type="date"
                                name="last_increment_date"
                                value={values.last_increment_date}
                                onChange={handleChange}
                                label="Last Increment Date"
                                // star={true}
                              />

                              
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-outline">
                              <Input
                             
                                name="tax_number"
                                value={values.tax_number}
                                onChange={handleChange}
                                label="Tax Number"
                                // star={true}
                              />
                           
                            </div>
                          </div>
                        </div>
                        {/* end */}
                        <div className="row">
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
                              id="cancelButton1"
                              className="btn infoedit3"
                              loading={loading}
                            />
                            &nbsp;
                            <p
                              id="cancelButton1"
                              className="btn infoedit4"
                              style={{ margin: "0" }}
                            >
                              Cancel
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
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
                          title="Employee Id"
                          answer={employee?.emp_id}
                        />
                        <SingleField
                          title="Date of Joining"
                          answer={formatDate(employee?.date_of_joining)}
                        />
                      </div>
                      <div className="row">
                        <SingleField
                          title="Tax Number"
                          answer={employee?.emp_pan}
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
                        <SingleField
                          title="Position"
                          answer={employee?.position}
                        />
                      </div>
                      <div className="row">
                        <SingleField
                          title="Current Salaray"
                          answer={employee?.current_salaray}
                        />
                        <SingleField
                          title=" Increment Date"
                          answer={employee?.increment_date}
                        />
                      </div>  
                      <div className="row">
                        <SingleField
                          title="Last Increment Date"
                          answer={employee?.last_increment_date}
                        />
                        <SingleField
                          title=" Tax Number"
                          answer={employee?.tax_number}
                        />
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <p className="addlabelcard2"> </p>
                          <h6 className="profileimgboxcompanydetail2">
                            {employee?.linked_in ? (
                              <a
                                className="socialbtn"
                                href={renderValue(employee?.linked_in)}
                                target="blank"
                              >
                                <img src={linkedin} alt="linkedin" />
                              </a>
                            ) : null}
                          </h6>
                        </div>
                      </div>
                    </div>
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
                        <button id="editButton2" className="infoedit3">
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="editable-form2" style={{ display: "none" }}>
                      <form noValidate="noValidate" onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-outline">
                              <textarea
                                className="form-control"
                                name="permanentAddress"
                                placeholder=" "
                                value={values.permanentAddress}
                                onChange={handleChange}
                                required
                              ></textarea>
                              <label
                                className="form-label"
                                for="typeText"
                                style={{ background: "#fff" }}
                              >
                                Address&nbsp;
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
                                placeholder="Select State.."
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
                            <Button
                              text="Save"
                              id="cancelButton1"
                              className="btn infoedit3"
                              loading={loading}
                            />
                            &nbsp;
                            <p
                              id="cancelButton2"
                              className="btn infoedit4"
                              style={{ margin: "0" }}
                            >
                              Cancel
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="readonly-form2">
                    <div className="row">
                      <SingleField
                        title="Address"
                        style={{ textAlign: "left" }}
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
                </div>

                <div className="collapse" id="collapserate">
                  <div className="viewem mt-4">
                    <div className="row">
                      <div className="col-12">
                        <h5 className="infoedit">
                          <i
                            className="fa fa-star"
                            style={{ color: "#134d75" }}
                          ></i>{" "}
                          &nbsp; Rating
                        </h5>
                        <div className="infoedit1">
                          <span className="hoverable">
                            <i className="fa fa-info-circle hoverable__main"></i>
                            <span
                              className="hoverable__tooltip"
                              style={{ background: "#f6a21e" }}
                            >
                              By saving this Rate and review form you are going
                              to make this employee an Ex employee.{" "}
                            </span>
                          </span>
                          &nbsp;&nbsp;
                          {/* <button id="editButton3" className="infoedit3">
                            Edit
                          </button> */}
                        </div>
                      </div>
                    </div>

                    {/* USING COMPONENT */}
                    <AddEmployeeReview
                      id={employee?.sid}
                      dateOfJoining={values.dateOfJoining}
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-lg-4 col-sm-12"></div>
                  <div className="col-lg-4 col-md-6 col-sm-12 btnright">
                    <DeleteEmployee id={employee?.sid} />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 btnright">
                    <button
                      type="button"
                      // id="editButton3"
                      className="deltepopup"
                      data-toggle="collapse"
                      data-target="#collapserate"
                      aria-expanded="false"
                      aria-controls="collapserate"
                    >
                      Rate And Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ViewEmployee;
