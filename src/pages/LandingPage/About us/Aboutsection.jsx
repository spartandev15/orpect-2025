import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useState } from 'react';
import { journey, teams, value, vision } from '../../../asset';
import { contactUs } from '../../../api/company';

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});
const Aboutsection = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (values,{resetForm}) => {
    setLoading(true);
    dispatch(contactUs(values))
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        resetForm()
      })
      .catch((err) => {
        toast.error(err?.data?.message);
        setLoading(false);
        console.log(err ?? err);
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
    
    <section className="mobile-responsive1 aboutuspagemidsection1">
        <div className="container">
          <div className="row its_card" style={{ paddingBottom: "0px" }}>
            <div className="col-lg-6 col-md-6 ">
              <div className="its-body-txt about_head ">
                <h3>Our Vision</h3>
                <p>
                  Our vision at ORPECT is to become the foremost platform
                  globally for fair and transparent employee evaluations. We
                  strive to instill a culture of honest feedback and continuous
                  learning in workplaces around the world. Our aspiration is to
                  help companies and their employees grow together through
                  candid communication and constructive evaluations. By focusing
                  on creating a user-friendly interface and upholding stringent
                  privacy and security standards, we envision a future where
                  ORPECT becomes an integral tool for all organizations,
                  fostering better hiring decisions and effective management.
                  Join us in our journey to transform the landscape of HR
                  management and employee assessments.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 ">
              <div className="vision_img">
                <img
                  src={vision}
                  className="img-fluid "
                  alt=""
                  height="400"
                  width="500"
                />
              </div>
            </div>
          </div>

          <div
            className="row its_card aboutuscard"
          >
            <div className="col-lg-6 col-md-6">
              <div className="vision_img">
                <img
                  src={value}
                  className="img-fluid "
                  alt=""
                  height="400"
                  width="500"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 ">
              <div className="its-body-txt about_head ">
                <h3>Our Values</h3>
                <p>
                  At ORPECT, we are guided by a set of core values that reflect
                  our commitment to our users. <b>Transparency</b> is paramount
                  as we believe in honest and clear communication in every
                  evaluation. We uphold the principle of <b>Integrity</b>{" "}
                  ensuring fair and unbiased assessments at all times. We foster
                  a culture of <b>Respect</b>, valuing every individual's
                  contribution and feedback. <b>Innovation</b> drives us to
                  consistently improve our platform, offering solutions that
                  meet the evolving needs of the workplace. Finally,{" "}
                  <b>Privacy and Security</b> are our utmost priorities as we
                  understand the importance of trust in our services. Together,
                  these values shape our actions and our mission.
                </p>
              </div>
            </div>
          </div>

          <div
            className="row its_card aboutuscard"
          >
            <div className="col-lg-6 col-md-6">
              <div className="its-body-txt about_head">
                <h3>Our Team</h3>
                <p>
                  Our team consists of diverse individuals from various
                  backgrounds, all united by a shared passion for
                  revolutionizing the employee review process. With expertise
                  spanning HR management, software development, data security,
                  and customer service, we're committed to delivering a product
                  that surpasses your expectations. Our team continuously
                  learns, innovates, and strives for excellence, providing a
                  platform that's not just technologically advanced, but also
                  attuned to real-world HR challenges. Our cohesive
                  collaboration is what fuels our success, making ORPECT a
                  leader in providing comprehensive and reliable employee review
                  solutions.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 ">
              <div className="vision_img">
                <img
                  src={teams}
                  className="img-fluid "
                  alt=""
                  height="400"
                  width="500"
                />
              </div>
            </div>
          </div>
          <div
            className="row its_card aboutuscard"
          >
            <div className="col-lg-6 col-md-6">
              <div className="vision_img">
                <img
                  src={journey}
                  className="img-fluid "
                  alt=""
                  height="400"
                  width="500"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 ">
              <div className="its-body-txt about_head ">
                <h3>Our Journey</h3>
                <p>
                  Our journey at ORPECT began with a vision - to redefine the
                  way organizations perceive and handle employee reviews. The
                  road was paved with challenges, but it's the faith in our
                  mission that kept us going. From a handful of early adopters
                  to a growing number of companies worldwide, our platform has
                  transformed into a trusted partner for HR professionals. Our
                  journey is defined by continuous innovation, persistent
                  enhancement, and a staunch commitment to provide a secure,
                  comprehensive, and user-friendly platform for companies to
                  store, manage, and analyze their employee data. As we continue
                  our journey, we remain committed to your success.
                </p>
              </div>
            </div>
          </div>
          <div className="row  its_card  connectsection_top">
            <div className="col-lg-6 connectsection">
              <div className="connectaboutus its-body-txt about_head ">
                <h3 className='text-center'>Connect With Us</h3>
                <p className='text-center'>
                  We'd love to hear from you. Whether you're interested in
                  learning more about our product, want to join our team, or
                  simply have a question, don't hesitate to reach out.
                </p>
                <div className=" contact_info1">
                 
                  <span className="contact_align1">
                  <div className="aboutustextgap"> 
                    {" "}
                    <i className="fa fa-phone fa-2x contact_phone text-primary1"></i>
                    <p className="contact_detail"> +1-8632168452</p>
                    </div>   </span>
                   
                  <span className="contact_align1">
                  <div className="aboutustextgap">                   
                    {" "}
                    <i className="fa fa-envelope fa-2x text-primary1"></i>
                    <p className="contact_detail">support@orpect.com</p>
                </div>  </span> 
             
                  <span className="contact_align1">
                  <div className="aboutustextgap">
                    {" "}
                    <svg
                      height="1em"
                      viewBox="0 0 384 512"
                      className="fa-2x text-primary1"
                    >
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>{" "}
                    <p className="contact_detail">5535 Memorial Drive #F310, Houston TX 77007
                    </p>
                 </div> </span>
                 
                   
                  <span className="contact_align1">
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
                </div>  </span> 
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
                      <a href="https://instagram.com/orpectllc" target="_blank">
                        <i
                          className="fab fa-instagram   social-icon-footer1 fa-2x  text-danger"
                          style={{ fontSize: "24px" }}
                        ></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="https://www.youtube.com/@Orpect" target="_blank">
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
            <div className="col-lg-6  ">
              <div
                className="row contact_form1"
                style={{ boxShadow: "unset" }}
              >
                <div>
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
                  {({ isSubmitting ,resetForm }) => (
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
                        <p className='mt-3 mb-0 text-center'>
                        <button
                            type="submit"
                            className="btn mybtn aboutcontact"
                            disabled={!isVerified || loading}
                            onClick={resetForm}
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
        </div>
      </section>


      {/* For Mobile Responisve */}


      <section className="mobile-responsive aboutuspagemidsection">
        <div className="container">
          <div className="row its_card ">
            <div className="col-lg-6">
              <div className="its-body-txt about_head ">
                <h3 style={{ fontSize: "22px" }}>Our Vision</h3>
                <p>
                  Our vision at ORPECT is to become the foremost platform
                  globally for fair and transparent employee evaluations. We
                  strive to instill a culture of honest feedback and continuous
                  learning in workplaces around the world. Our aspiration is to
                  help companies and their employees grow together through
                  candid communication and constructive evaluations. By focusing
                  on creating a user-friendly interface and upholding stringent
                  privacy and security standards, we envision a future where
                  ORPECT becomes an integral tool for all organizations,
                  fostering better hiring decisions and effective management.
                  Join us in our journey to transform the landscape of HR
                  management and employee assessments.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src={vision}
                className="img-fluid"
                alt=""
                height="550"
                width="550"
              />
            </div>
          </div>

          <div className="row its_card">
            <div className="col-lg-6">
              <div className="its-body-txt about_head ">
                <h3 style={{ fontSize: "22px" }}>Our Values</h3>
                <p>
                  At ORPECT, we are guided by a set of core values that reflect
                  our commitment to our users. <b>Transparency</b> is paramount
                  as we believe in honest and clear communication in every
                  evaluation. We uphold the principle of <b>Integrity</b>{" "}
                  ensuring fair and unbiased assessments at all times. We foster
                  a culture of <b>Respect</b>, valuing every individual's
                  contribution and feedback. <b>Innovation</b> drives us to consistently improve our
                  platform, offering solutions that meet the evolving needs of
                  the workplace. Finally, <b>Privacy and Security</b> are our
                  utmost priorities as we understand the importance of trust in
                  our services. Together, these values shape our actions and our
                  mission.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src={value}
                className="img-fluid "
                alt=""
                height="400"
                width="550"
              />
            </div>
          </div>

          <div className="row its_card">
            <div className="col-lg-6">
              <div className="its-body-txt about_head">
                <h3 style={{ fontSize: "22px" }}>Our Team</h3>
                <p>
                  Our team consists of diverse individuals from various
                  backgrounds, all united by a shared passion for
                  revolutionizing the employee review process. With expertise
                  spanning HR management, software development, data security,
                  and customer service, we're committed to delivering a product
                  that surpasses your expectations. Our team continuously
                  learns, innovates, and strives for excellence, providing a
                  platform that's not just technologically advanced, but also
                  attuned to real-world HR challenges. Our cohesive
                  collaboration is what fuels our success, making ORPECT a
                  leader in providing comprehensive and reliable employee review
                  solutions.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src={teams}
                className="img-fluid "
                alt=""
                height="550"
                width="550"
              />
            </div>
          </div>
          <div className="row its_card">
            <div className="col-lg-6">
              <div className="its-body-txt about_head ">
                <h3 style={{ fontSize: "22px" }}>Our Journey</h3>
                <p>
                  Our journey at ORPECT began with a vision - to redefine the
                  way organizations perceive and handle employee reviews. The
                  road was paved with challenges, but it's the faith in our
                  mission that kept us going. From a handful of early adopters
                  to a growing number of companies worldwide, our platform has
                  transformed into a trusted partner for HR professionals. Our
                  journey is defined by continuous innovation, persistent
                  enhancement, and a staunch commitment to provide a secure,
                  comprehensive, and user-friendly platform for companies to
                  store, manage, and analyze their employee data. As we continue
                  our journey, we remain committed to your success.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src={journey}
                className="img-fluid"
                alt=""
                height="400"
                width="550"
              />
            </div>
          </div>
          <div className="row  connectsection_top">
            <div className="col-lg-6 connectsection">
              <div className="connectaboutus its-body-txt about_head aboutcontactus">
                <h3 style={{ fontSize: "22px" }}>Connect With Us</h3>
                <p>
                  We'd love to hear from you. Whether you're interested in
                  learning more about our product, want to join our team, or
                  simply have a question, don't hesitate to reach out.
                </p>
                <div className=" contact_info1">
                  <span className="contact_align1">
                  <div className="aboutustextgap">
                    {" "}
                    <i className="fa fa-phone fa-2x contact_phone text-primary1"></i>
                    <p className="contact_detail"> +1-8632168452</p>
                    </div>
                  </span>
                  <span className="contact_align1">
                  <div className="aboutustextgap">
                    {" "}
                    <i className="fa fa-envelope fa-2x text-primary1"></i>
                    <p className="contact_detail">support@orpect.com</p>
                    </div>
                  </span>
                  <span className="contact_align1">
                  <div className="aboutustextgap">
                    {" "}
                    <svg
                      height="1em"
                      viewBox="0 0 384 512"
                      className="fa-2x text-primary1"
                    >
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>
                    <p className="contact_detail contact_detail3">5535 Memorial Drive #F310, Houston TX 77007
                    </p>
                    </div>
                  </span>
                  <span className="contact_align1 contact_align3">
                  <div className="aboutustextgap">
                    {" "}
                    <svg
                      height="1em"
                      viewBox="0 0 384 512"
                      className="fa-2x text-primary1"
                    >
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>{" "}
                    <p className="contact_detail contact_detail3">30 N Gould St Ste R Sheridan, WY 82801
                    </p>
                    </div>
                  </span>
                </div>
                <p style={{ marginTop: "1.5rem" }}>
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
                      <a href="https://instagram.com/orpectllc" target="_blank">
                        <i
                          className="fab fa-instagram   social-icon-footer1 fa-2x  text-danger"
                          style={{ fontSize: "24px" }}
                        ></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="https://www.youtube.com/@Orpect" target="_blank">
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
            <div className="col-lg-6  ">
              <div
                className="row contact_form1"
                style={{ boxShadow: "unset", borderRadius: "5px" }}
              >
                <div>
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
                  {({ isSubmitting }) => (
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
                        <p style={{ textAlign: "center", marginTop: "1rem" }}>
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
        </div>
      </section>
      
    </>
  )
}

export default Aboutsection