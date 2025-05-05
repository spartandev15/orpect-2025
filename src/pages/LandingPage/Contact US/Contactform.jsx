import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from 'react';
import { contactUs } from '../../../api/company';
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});
const ContactForm = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (values,{resetForm}) => {
    setLoading(true);
    dispatch(contactUs(values))
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        resetForm(); 
      })
      .catch((err) => {
        toast.error(err?.data?.message);
        setLoading(false);
      });
  };

  const handleRecaptchaChange = (token) => {
    if (token) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  return (
   <>
   



      <section id="contact_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 ">
              <div className="row contact_form its_card">
                <div className="col-lg-12">
                  <h4>Reach Us Directly</h4>
                  <p>
                    For immediate assistance or specific inquiries, here's how
                    you can get in touch:
                  </p>
                  <div className=" contact_info">
                    <span className="contact_align">
                    <div className="aboutustextgap">
                      {" "}
                      <i className="fa fa-phone fa-2x contact_phone text-primary1"></i>
                      <p className="contact_detail"> +1-8632168452</p>
                  </div>
                    </span>
                    <span className="contact_align">
                    <div className="aboutustextgap">
                      {" "}
                      <i className="fa fa-envelope fa-2x text-primary1"></i>
                      <p className="contact_detail">support@orpect.com</p>
                      </div>
                    </span>
                    <span className="contact_align">
                    <div className="aboutustextgap">
                      {" "}
                      <svg
                        height="1em"
                        viewBox="0 0 384 512"
                        className="fa-2x text-primary1"
                      >
                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                      </svg>
                      <p className="contact_detail">5535 Memorial Drive #F310, Houston TX 77007
                      </p>
                      </div>
                    </span>
                    <span className="contact_align contact_align4">
                    <div className="aboutustextgap">
                      {" "}
                      <svg
                        height="1em"
                        viewBox="0 0 384 512"
                        className="fa-2x text-primary1"
                      >
                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                      </svg>{" "}
                      <p className="contact_detail">30 N Gould St Ste R Sheridan, WY 82801
                      </p>
                      </div>
                    </span>
                  </div>
                  <p>
                    <ul className="list-inline social-buttons1 d-flex justify-content-center">
                      <li className="list-inline-item">
                        <a href="https://twitter.com/orpect" target="_blank">
                          <i
                            className="fab fa-twitter social-icon-footer1  fa-2x text-info"
                            style={{ fontSize: "24px" }}
                          ></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="https://facebook.com/orpect" target="_blank">
                          <i
                            className="fab fa-facebook-f social-icon-footer1  fa-2x text-primary"
                            style={{ fontSize: "24px" }}
                          ></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="https://www.linkedin.com/company/orpect"
                          target="_blank"
                        >
                          <i
                            className="fab fa-linkedin-in social-icon-footer1 fa-2x text-primary1"
                            style={{ fontSize: "24px" }}
                          ></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="https://www.pinterest.com/orpectllc/"
                          target="_blank"
                        >
                          <i
                            className="fab fa-pinterest-p social-icon-footer1 fa-2x  text-danger"
                            style={{ fontSize: "24px" }}
                          ></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="https://instagram.com/orpectllc"
                          target="_blank"
                        >
                          <i
                            className="fab fa-instagram   social-icon-footer1 fa-2x  text-danger"
                            style={{ fontSize: "24px" }}
                          ></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="https://www.youtube.com/@Orpect"
                          target="_blank"
                        >
                          <i
                            className="fab fa-youtube social-icon-footer1 fa-2x  text-danger"
                            style={{ fontSize: "24px" }}
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row contact_form1">
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting,resetForm }) => (
                    <Form noValidate="noValidate">
                      <div className="col-lg-12">
                        <h4>Get In Touch</h4>
                        <p>
                          Alternatively, you can use the contact form below to
                          get in touch with us. Please fill in your details and
                          message, and we will get back to you as soon as
                          possible.   
                        </p>
                        <div>
                          <Field
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="form-control aboutcontact"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="error-message"
                            style={{ color: "#f6a21e", textAlign: "start" }}
                          />
                        </div>
                        <br />
                        <div>
                          <Field
                            type="email"
                            name="email"
                            placeholder="E-Mail"
                            className="form-control aboutcontact"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="error-message"
                            style={{ color: "#f6a21e", textAlign: "start" }}
                          />
                        </div>
                        <br />
                        <div>
                          <Field
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            className="form-control aboutcontact"
                          />
                          <ErrorMessage
                            name="subject"
                            component="div"
                            className="error-message"
                            style={{ color: "#f6a21e", textAlign: "start" }}
                          />
                        </div>
                        <br />
                        <div>
                          <Field
                            as="textarea"
                            name="message"
                            className="form-control aboutcontact"
                            placeholder="Type Message"
                          />
                          <ErrorMessage
                            name="message"
                            component="div"
                            className="error-message"
                            style={{ color: "#f6a21e", textAlign: "start" }}
                          />
                        </div>
                        <br />
                        <div className='capcha'>
                        <ReCAPTCHA
                          sitekey="6Lepa68mAAAAAMNymBeIlztaMdndNbQjkU8rBiGC"
                          onChange={handleRecaptchaChange}
                        />
                        </div>
                        <p className='text-center mb-0 mt-3'>
                          <button
                            type="submit"
                            className="btn mybtn aboutcontact"
                            disabled={!isVerified || loading}
                          >
                            {loading ? (
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            ) : (
                              null
                              )}
                              Send
                          </button>
                        </p>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
   </>
    
  )
}

export default ContactForm