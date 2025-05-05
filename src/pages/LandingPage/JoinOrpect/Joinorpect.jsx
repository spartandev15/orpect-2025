import { ErrorMessage, Field } from 'formik'
import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Form } from 'react-router-dom'
import LayoutOrpect from '../Index'

const Joinorpect = () => {
  return (
    <LayoutOrpect>
      <section className="blogpage">
        <div className="container">
          <div className="row joinop ">
            <div className="col-lg-12">
              <h1>Unleash Your HR Potential with ORPECT+</h1>
              <div className="separator separator-danger">✻</div>
              <p className='joinop'>Upgrade, Enhance, and Outperform Today! </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faqs">
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <p>Looking to elevate your company's HR management to new heights? Interested in leveraging a suite of advanced features that can streamline your HR processes, improve decision-making, and attract top talent? If so, ORPECT+ is the perfect solution for you!</p>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-lg-12'>
              <p>Join our waitlist today to secure early membership access to ORPECT+. As a part of the early membership, you'll gain a head start in accessing exclusive features like full reviews visibility, integrated HRMS, employee analytics, advanced search capabilities, and much more!</p>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-lg-12 jorpli'>
              <ul>
                <li><b className='joinopt'>Complete Access to Reviews:</b> <span className='oprlitxt'>As a Plus Member, companies gain access to comprehensive information about employees. Unlike free membership, Plus members can view the names and full details of employers who have left reviews on employees' profiles.</span></li>
                <li className='mt-3'><b className='joinopt'>Integrated HRMS:</b> <span className='oprlitxt'> Plus Members can take advantage of ORPECT's integrated Human Resource Management System (HRMS). This system allows companies to manage everything related to human resources, from employee onboarding to performance management, attendance tracking, leave management, and even payroll processing, all from the convenience of the ORPECT portal.</span></li>
                <li className='mt-3'><b className='joinopt'>Employee Analytics:</b> <span className='oprlitxt'> As a Plus Member, companies get access to advanced employee analytics that provide deep insights about employee performance, productivity, and trends. These analytics can be used to make more informed HR and business decisions.</span></li>
                <li className='mt-3'><b className='joinopt'>Priority Support:</b> <span className='oprlitxt'> Plus Members receive priority customer support from the ORPECT team. Whether it's a question about how to use a feature, an issue with the platform, or any other query or concern, Plus Members are at the front of the line for assistance.</span></li>
                <li className='mt-3'><b className='joinopt'>Advanced Search Capabilities:</b> <span className='oprlitxt'> Plus Members have access to advanced search options that allow for a more granular and focused search for potential employees. This includes filtering by specific skill sets, experience levels, and past employer reviews.</span></li>
                <li className='mt-3'><b className='joinopt'>Company Highlight:</b> <span className='oprlitxt'> Plus Members will have their company profiles highlighted, increasing their visibility to potential employees and attracting top talent. </span></li>
                <li className='mt-3'><b className='joinopt'>Recruitment Tools:</b> <span className='oprlitxt'> Plus Members gain access to special recruitment tools such as interview scheduling, personalized communication templates, and streamlined applicant tracking, facilitating a more efficient recruitment process. </span></li>
                <li className='mt-3'><b className='joinopt'>Custom Reports:</b> <span className='oprlitxt'> Plus Members can generate custom reports that offer a detailed understanding of employee performance, engagement, and retention metrics.</span></li>
                <li className='mt-3'><b className='joinopt'>Competitor Analysis:</b> <span className='oprlitxt'> Plus Members can also have access to competitor analysis data to understand their positioning in the industry in terms of employee reviews and ratings.</span></li>
                <li className='mt-3'><b className='joinopt'>Employee Training and Development Programs:</b> <span className='oprlitxt'> Plus members can get access to a repository of employee training and development programs to foster skill development and boost employee performance.</span> </li>
              </ul>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-lg-12'>
              <p>The world of HR management is evolving, and with ORPECT+, you'll be at the forefront. Don't let this opportunity pass you by - join our waitlist today, get ahead of the competition, and be the first to enjoy the benefits of ORPECT+ at discounted rates.</p>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-lg-12'>
              <p><b  className='joinopt'>Remember, the early bird catches the worm. Sign up for the waitlist and be the early bird with ORPECT+. We can't wait to welcome you aboard!</b></p>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-lg-12'>
              <div className="row">
                <div className='col-lg-3'></div>
                <div className="col-lg-6">
                  <div className="row contact_form1 contact_form1123">
                    <div>
                    <h4>Join Our Waitlist</h4>
                    <div>
                      <input type="text"
                        name="name"
                        placeholder="Name"
                        className="form-control aboutcontact" />
                    </div>
                    <br />
                    <div>
                      <input type="text"
                        name="name"
                        placeholder="Company Name"
                        className="form-control aboutcontact" />
                    </div>
                    <br />
                    <div>
                      <input type="email"
                        name="Your Email"
                        placeholder="Your Email"
                        className="form-control aboutcontact" />
                    </div>
                    <br />
                    <div>
                      <input type="number"
                        name="Phone Number"
                        placeholder="Phone Number"
                        className="form-control aboutcontact" />
                    </div>
                    <br />
                    <div className='capcha'>
                      <ReCAPTCHA
                        sitekey="6Lepa68mAAAAAMNymBeIlztaMdndNbQjkU8rBiGC"

                      />
                    </div>
                    <div className='mt-3'>
                      <button type="submit" className="btn mybtn aboutcontact">Send</button>
                    </div>
                  </div>
                </div>
                <div className='col-lg-3'></div>
              </div>
            </div>
          </div></div>
        </div>
      </section>
    </LayoutOrpect>
  )
}

export default Joinorpect