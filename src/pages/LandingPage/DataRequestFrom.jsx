import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LayoutOrpect from './Index';
import CountrySelect from '../../component/CountrySelect';
import { Country } from 'country-state-city';
import { useDataRequestMutation } from '../../apis/rate&review';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DataRequestForm = () => {
  const countries = Country.getAllCountries();

  const countryOptions = countries.map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const [dataRequest, { isLoading }] = useDataRequestMutation();

  const initialValues = {
    fullName: '',
    email: '',
    requestType: '',
    country: '',
    supportingInfo: '',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    requestType: Yup.string().required('Type of request is required'),
    country: Yup.string().required('Country is required'),
    supportingInfo: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
    //   toast.info('Submitting your request...');
      await dataRequest({ data: values }).unwrap();
      toast.success('Request submitted successfully!');
      resetForm();
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    }
  };

  return (
    <LayoutOrpect>
      <div className="container py-4">
        <h2 className="mb-4">Data Request Form</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <Field type="text" name="fullName" className="form-control" placeholder="Enter your full name" />
                <div className="text-danger">
                  <ErrorMessage name="fullName" />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Registered Email</label>
                <Field type="email" name="email" className="form-control" placeholder="Enter your registered email" />
                <div className="text-danger">
                  <ErrorMessage name="email" />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="requestType" className="form-label">Type of Request</label>
                <Field as="select" name="requestType" className="form-select">
                  <option value="">Select</option>
                  <option value="access">Access</option>
                  <option value="deletion">Deletion</option>
                  <option value="correction">Correction</option>
                </Field>
                <div className="text-danger">
                  <ErrorMessage name="requestType" />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="country" className="form-label">Country of Residence</label>
                <CountrySelect
                  selectedCountry={values.country}
                  countryOptions={countryOptions}
                  handleCountryChange={(selectedOption) => {
                    setFieldValue('country', selectedOption?.label || '');
                  }}
                />
                <div className="text-danger">
                  <ErrorMessage name="country" />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="supportingInfo" className="form-label">Any Supporting Info</label>
                <Field
                  as="textarea"
                  name="supportingInfo"
                  className="form-control"
                  rows="4"
                  placeholder="Enter any additional information or documents"
                />
              </div>

              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "#134D75", color: 'white' }}
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit Request'}
              </button>
            </Form>
          )}
        </Formik>

        {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar /> */}
      </div>
    </LayoutOrpect>
  );
};

export default DataRequestForm;
