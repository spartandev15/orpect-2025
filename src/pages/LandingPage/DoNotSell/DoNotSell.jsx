import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutOrpect from '../Index';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const DoNotSell = () => {
  const [submitted, setSubmitted] = useState(false);
  const [optOutStatus, setOptOutStatus] = useState(() => {
    return Cookies.get('ccpa_opt_out') === 'true';
  });

  const initialValues = {
    email: '',
    fullName: '',
    confirmOptOut: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    fullName: Yup.string().required('Full name is required'),
    confirmOptOut: Yup.boolean().oneOf([true], 'You must confirm to opt-out'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Set opt-out cookie
      Cookies.set('ccpa_opt_out', 'true', { expires: 365 });
      Cookies.set('ccpa_opt_out_date', new Date().toISOString(), { expires: 365 });
      Cookies.set('ccpa_opt_out_email', values.email, { expires: 365 });
      
      // Log opt-out request
      const optOutLog = {
        email: values.email,
        fullName: values.fullName,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      };
      const existingLogs = JSON.parse(localStorage.getItem('ccpa_opt_out_logs') || '[]');
      existingLogs.push(optOutLog);
      localStorage.setItem('ccpa_opt_out_logs', JSON.stringify(existingLogs));
      
      setOptOutStatus(true);
      setSubmitted(true);
      toast.success('Your opt-out request has been processed successfully!');
      resetForm();
      
      // TODO: Send to backend API
      // await optOutRequest({ data: values });
    } catch (error) {
      toast.error('Failed to process opt-out request. Please try again.');
      console.error('Opt-out error:', error);
    }
  };

  const handleOptIn = () => {
    Cookies.remove('ccpa_opt_out');
    Cookies.remove('ccpa_opt_out_date');
    Cookies.remove('ccpa_opt_out_email');
    setOptOutStatus(false);
    setSubmitted(false);
    toast.success('You have opted back in to data sales.');
  };

  return (
    <LayoutOrpect>
      <section className="blogpage">
        <div className="container">
          <div className="row privacy_policy">
            <div className="col-lg-12">
              <h1>Do Not Sell My Personal Information</h1>
              <div className="separator separator-danger">✻</div>
              <p>
                Under the California Consumer Privacy Act (CCPA), California residents have the 
                right to opt-out of the sale of their personal information.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row privacy_policy_text">
            <div className="col-lg-9 col-sm-12 faqspacing">
              {optOutStatus ? (
                <div className="alert alert-success" role="alert">
                  <h4>✓ You have opted out of data sales</h4>
                  <p className="mt-3">
                    Your personal information will not be sold to third parties. This preference 
                    will be saved for 12 months, after which you may need to renew your opt-out 
                    request.
                  </p>
                  <button 
                    onClick={handleOptIn}
                    className="btn mt-3"
                    style={{ backgroundColor: "#134D75", color: 'white' }}
                  >
                    Opt Back In
                  </button>
                </div>
              ) : (
                <>
                  <div className="mt-4">
                    <h4>Your Rights Under CCPA</h4>
                    <p className="mt-3">
                      As a California resident, you have the right to:
                    </p>
                    <ul>
                      <li>Opt-out of the sale of your personal information</li>
                      <li>Know what personal information is being sold</li>
                      <li>Access your personal information</li>
                      <li>Request deletion of your personal information</li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h4>What We Consider "Sale"</h4>
                    <p className="mt-3">
                      Under CCPA, "sale" includes sharing personal information with third parties 
                      for monetary or other valuable consideration. We may share information with:
                    </p>
                    <ul>
                      <li>Advertising partners</li>
                      <li>Analytics providers</li>
                      <li>Marketing service providers</li>
                    </ul>
                    <p className="mt-3">
                      <strong>Note:</strong> We do not sell personal information in the traditional 
                      sense, but we provide this opt-out mechanism to comply with CCPA requirements.
                    </p>
                  </div>

                  <div className="mt-4">
                    <h4>Opt-Out Request Form</h4>
                    <p className="mt-3">
                      Please fill out the form below to opt-out of the sale of your personal information.
                    </p>

                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      <Form>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email Address *</label>
                          <Field 
                            type="email" 
                            name="email" 
                            className="form-control" 
                            placeholder="Enter your registered email"
                          />
                          <div className="text-danger">
                            <ErrorMessage name="email" />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="fullName" className="form-label">Full Name *</label>
                          <Field 
                            type="text" 
                            name="fullName" 
                            className="form-control" 
                            placeholder="Enter your full name"
                          />
                          <div className="text-danger">
                            <ErrorMessage name="fullName" />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <Field 
                              type="checkbox" 
                              name="confirmOptOut" 
                              className="me-2"
                            />
                            <span>
                              I confirm that I want to opt-out of the sale of my personal information *
                            </span>
                          </label>
                          <div className="text-danger">
                            <ErrorMessage name="confirmOptOut" />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn"
                          style={{ backgroundColor: "#134D75", color: 'white' }}
                        >
                          Submit Opt-Out Request
                        </button>
                      </Form>
                    </Formik>
                  </div>

                  <div className="mt-4">
                    <h4>Alternative Methods</h4>
                    <p className="mt-3">
                      You can also opt-out by:
                    </p>
                    <ul>
                      <li>Calling us at: <a href="tel:+1-8632168452" style={{color:"#134d75", textDecoration:"none"}}>+1-8632168452</a></li>
                      <li>Emailing us at: <a href="mailto:privacy@orpect.com" style={{color:"#134d75", textDecoration:"none"}}>privacy@orpect.com</a></li>
                      <li>Using our <Link to="/data-request-form" style={{color:"#134d75", textDecoration:"none"}}>Data Request Form</Link></li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h4>Processing Time</h4>
                    <p className="mt-3">
                      Your opt-out request will be processed within 15 business days. We will 
                      send a confirmation email once your request has been processed.
                    </p>
                  </div>
                </>
              )}

              <div className="mt-4">
                <h4>Contact Us</h4>
                <p className="mt-3">
                  If you have questions about this opt-out process, please contact us at:
                </p>
                <ul>
                  <li><strong>Email:</strong> <a href="mailto:privacy@orpect.com" style={{color:"#134d75", textDecoration:"none"}}>privacy@orpect.com</a></li>
                  <li><strong>Phone:</strong> <a href="tel:+1-8632168452" style={{color:"#134d75", textDecoration:"none"}}>+1-8632168452</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutOrpect>
  );
};

export default DoNotSell;

