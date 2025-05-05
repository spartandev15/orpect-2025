import React, { useState } from "react";
import { useFormik } from "formik";
import { addEmployeeSchema, adduserSchema } from "../../../helper/schema";
import { toast } from "react-toastify";
import Button from "../../../component/Button";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import EmployeeCropImage from "../../../component/extras/crop-image/EmployeeCropImage";
import { Country, State } from "country-state-city";
import Select from "react-select";
import { InputAdd } from "../../../component/InputAdd";

import { useAddUserMutation } from "../../../apis/SuperAdmin/user";

const initialValues = {
  fullname: "",
  email: "",
  password: "",
  address: "",
  phone: "",
  city: "",
  country: "",
  state: "",
  postal_code: "",
  image: ""
};

const AddUser = () => {
  // const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const navigate = useNavigate();
  const [addUser, { isLoading: loading }] = useAddUserMutation()
  const { data } = useSelector((state) => state.data);

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      validationSchema: adduserSchema,
      onSubmit: async (values) => {
        try {
          // setLoading(true);
          const formData = new FormData();
          formData.append("fullname", values.fullname);
          formData.append("email", values.email);
          formData.append("password", values.password);
          formData.append("address", values.address);
          formData.append("phone", values.phone);
          if (values.image) {
            formData.append("image", values?.image.blob);
          }

          formData.append("city", values.city);
          formData.append("state", values.state);
          formData.append("country", values.country);
          formData.append("postal_code", values.postal_code);



          // const response = await fetch(`${BASE_URL}/addEmployee`, {
          //   method: "POST",
          //   headers: {
          //     Authorization: `Bearer ${bearerToken}`,
          //     Accept: "application/json",
          //   },
          //   body: formData,
          // });
          const response = await addUser({ formData }).unwrap();

          // toast.success("Employee added successfully");
          if (response.status) {
            toast.success("Successfully added");
            navigate("/super-admin/user");
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

      <form onSubmit={handleSubmit} autoComplete="off" noValidate className="container-fluid searchemploye add-employe">
        <div className="row">
          <div className="col-lg-12">
            <h3 style={{ color: "#f6a21e", fontSize: "24px" }}>Add Employee</h3>
          </div>
        </div>


        <div className="col-lg-12">
          <div className="profile-pic-wrapper">
            <EmployeeCropImage getImageValue={getImageValue} setFieldValue={setFieldValue} />
          </div>
        </div>


        <div className="row mt-4">
          <div className="col-lg-6 col-sm-12 pb-4">
          <div className="form-outline">
            <InputAdd name="fullname" value={values.fullname} onChange={handleChange} label="Full Name" star={true} />
            {errors.fullname && touched.fullname && <p className="text-danger msg">{errors.fullname}</p>}
          </div>
          </div>

          <div className="col-lg-6 col-sm-12 pb-4">
          <div className="form-outline">
            <InputAdd name="email" value={values.email} onChange={handleChange} label="Email" star={true} />
            {errors.email && touched.email && <p className="text-danger msg">{errors.email}</p>}
          </div>
          </div>


          <div className="col-lg-6 col-sm-12 pb-4">
          <div className="form-outline">

            <InputAdd type="password" name="password" value={values.password} onChange={handleChange} label="Password" star={true} />
            {errors.password && touched.password && <p className="text-danger msg">{errors.password}</p>}
          </div>
          </div>


          <div className="col-lg-6 col-sm-12 pb-4">
          <div className="form-outline">

            <InputAdd name="address" value={values.address} onChange={handleChange} label="Address" />
            {errors.address && touched.address && <p className="text-danger msg">{errors.address}</p>}
          </div>
          </div>


          <div className="col-lg-6 col-sm-12 pb-4">
          <div className="form-outline">

            <InputAdd type="number" name="phone" value={values.phone} onChange={handleChange}
             label="Phone Number" star={true} />
            {errors.phone && touched.phone && <p className="text-danger msg">{errors.phone}</p>}
          </div>
          </div>


          <div className="col-lg-6 col-sm-12 pb-4">
          <div className="form-outline">

            <InputAdd name="city" value={values.city} onChange={handleChange} label="City" />
            {errors.city && touched.city && <p className="text-danger msg">{errors.city}</p>}
          </div>
          </div>


          <div className="col-lg-6 col-sm-12 pb-4">
            <Select
              classNamePrefix="select"
              placeholder="Select Country..."
              isClearable
              options={countryOptions}
              onChange={handleCountryChange}
            />
          </div>

          <div className="col-lg-6 col-sm-12 pb-4">
            <Select
              classNamePrefix="select"
              placeholder="Select State..."
              isDisabled={!selectedCountry}
              isClearable
              options={stateOptions}
              onChange={handleStateChange}
            />
          </div>

          <div className="col-lg-6 col-sm-12 pb-4">
          <div className="form-outline">
            <InputAdd type="number" name="postal_code" value={values.postal_code} onChange={handleChange} label="Postal Code" />
            {errors.postal_code && touched.postal_code && <p className="text-danger msg">{errors.postal_code}</p>}
          </div>
          </div>


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

export default AddUser;
