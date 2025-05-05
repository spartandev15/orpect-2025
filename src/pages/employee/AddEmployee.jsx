import React, { useState } from "react";
import Layout from "../../component/layout";
import { useFormik } from "formik";
import { addEmployeeSchema } from "../../helper/schema";
import { getFromLocalStorage } from "../../helper";
import { toast } from "react-toastify";
import Button from "../../component/Button";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import EmployeeCropImage from "../../component/extras/crop-image/EmployeeCropImage";
import { Country, State } from "country-state-city";
import Select from "react-select";
import { BASE_URL } from "../../api/baseUrl";
import { InputAdd } from "../../component/InputAdd";
import { useAddEmployeeMutation } from "../../apis/employee";
import SelectPostion from "../../component/SelectPosition";

const initialValues = {
  empId: "",
  empName: "",
  email: "",
  phone: "",
  position: "",
  dateOfJoining: "", 
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

const AddEmployee = () => {
  // const [loading, setLoading] = useState(false);
  const bearerToken = getFromLocalStorage("token");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const navigate = useNavigate();
  const [addEmployee,{isLoading:loading}]=useAddEmployeeMutation()
  const { data } = useSelector((state) => state.data);

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      validationSchema: addEmployeeSchema,
      onSubmit: async (values) => {
        try {
          // setLoading(true);
          const formData = new FormData();
          formData.append("empId", values.empId);
          formData.append("empName", values.empName);
          formData.append("email", values.email);
          formData.append("phone", values.phone);
          formData.append("position", values.position);
          formData.append("dateOfJoining", values.dateOfJoining);
          if (values.image) {
            formData.append("image", values?.image.blob);
          }
          formData.append("pan_number", values.pan_number);
          formData.append("dateOfBirth", values.dateOfBirth);
          formData.append("permanentAddress", values.permanentAddress);
          formData.append("city", values.city);
          formData.append("state", values.state);
          formData.append("country", values.country);
          formData.append("postalCode", values.postalCode);
          formData.append("linkedIn", values.linkedIn);
      
          formData.append("current_salaray", values.current_salaray);
          formData.append("increment_date", values.increment_date);
          formData.append("last_increment_date", values.last_increment_date);
          formData.append("tax_number", values.tax_number);


          // const response = await fetch(`${BASE_URL}/addEmployee`, {
          //   method: "POST",
          //   headers: {
          //     Authorization: `Bearer ${bearerToken}`,
          //     Accept: "application/json",
          //   },
          //   body: formData,
          // });
        const response =  await addEmployee({ formData }).unwrap();

          // toast.success("Employee added successfully");
          if (response.status) {
            toast.success("Successfully added");
            navigate("/dashboard");
          } else {
            const errorData = await response.json();
            throw new Error(errorData?.message);
          }
        } catch (error) {
          toast.error(error?.message);
        } finally {
          // setLoading(false);
        }
      },
    });
  // useEffect(() => {
  //   dispatch(getPosition()).then((res) => {
  //     setAllPosition(res?.data?.positions);
  //   });
  // }, []);

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
          className="container-fluid searchemploye add-employe"
          onSubmit={handleSubmit}
        >
          <div className="row">
            <div className="col-lg-12">
              <h3 style={{ color: "#f6a21e", fontSize: "24px" }}>
                Add Employee
              </h3>
            </div>
          </div>
          <div className="col-lg-12 ">
            <div className="profile-pic-wrapper">
              <EmployeeCropImage
                getImageValue={getImageValue}
                setFieldValue={setFieldValue}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <InputAdd
                  name="empId"
                  value={values.empId}
                  onChange={handleChange}
                  label="Employee Id" 
                  star={true}
                />
                {errors.empId && touched.empId ? (
                  <p className="text-danger msg">{errors.empId}</p>
                ) : null}
              </div>
            </div>
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
                            <div className="form-outline">
                              <SelectPostion
                                nameValue="position"
                                handleChange={handleChange}
                                value={values.position}
                                required
                              />
                              {/* <label
                                className="form-label"
                                for="typeText"
                                style={{ background: "#fff" }}
                              >
                                Position &nbsp;
                                <span className="required">*</span>
                              </label> */}
                              {errors.position && touched.position ? (
                                <p className="text-danger msg">
                                  {errors.position}
                                </p>
                              ) : null}
                            </div>
                          </div>
            {/* <div className="col-lg-6 col-sm-12  pb-4">
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
                  Position d &nbsp;<span className="required">*</span>
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
            </div> */}
            <div className="col-lg-6 col-sm-12  pb-4">
              <div className="form-outline">
                <input
                  type="date"
                  name="dateOfJoining"
                  value={values.dateOfJoining}
                  onChange={handleChange}
                  max={currentDate}
                  required
                />

                <label
                  className="form-label"
                  // for="typeText"
                >
                  Date of Joining &nbsp;
                  <span className=" required">*</span>
                </label>
                {errors.dateOfJoining && touched.dateOfJoining ? (
                  <p className="text-danger msg">{errors.dateOfJoining}</p>
                ) : null}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <InputAdd
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
                  <p className="text-danger msg">{errors.pan_number}</p>
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
                <Select
                  className="basic-single  "
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
                />
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
            {/* new inputs below */}
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <InputAdd
                  name="current_salaray"
                  value={values.current_salaray}
                  onChange={handleChange}
                  label="Current Salary" 
                  // star={true}
                />
                {/* {errors.current_salaray && touched.current_salaray ? (
                  <p className="text-danger msg">{errors.current_salaray}</p>
                ) : null} */}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <InputAdd
                type="date"
                  name="increment_date"
                  value={values.increment_date}
                  onChange={handleChange}
                  label="Increment Date" 
                  // star={true}
                />
                {/* {errors.increment_date && touched.increment_date ? (
                  <p className="text-danger msg">{errors.increment_date}</p>
                ) : null} */}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <InputAdd
                                type="date"

                  name="last_increment_date"
                  value={values.last_increment_date}
                  onChange={handleChange}
                  label="Last Increment Date" 
                  // star={true}
                />
                {/* {errors.last_increment_date && touched.last_increment_date ? (
                  <p className="text-danger msg">{errors.last_increment_date}</p>
                ) : null} */}
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
              <div className="form-outline">
                <InputAdd
                  name="tax_number"
                  value={values.tax_number}
                  onChange={handleChange}
                  label="Tax Number" 
                  // star={true}
                />
                {/* {errors.tax_number && touched.tax_number ? (
                  <p className="text-danger msg">{errors.tax_number}</p>
                ) : null} */}
              </div>
            </div>
            
            <div className="row" style={{ paddingRight: "0" }}>
              <div className="col-lg-4 col-md-4  pd-4 "></div>
              <div
                className="col-lg-4 col-md-4 col-sm-12 pb-4"
                style={{ textAlign: "center", paddingRight: "0" }}
              >
                <Button className="btn mybtn" loading={loading} text="Submit" />
              </div>
              <div className="col-lg-4 col-md-4 pd-4  btnright"></div>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default AddEmployee;
