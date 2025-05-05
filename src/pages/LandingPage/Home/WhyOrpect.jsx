import React from 'react'
import { e1, e3, e4, lock } from '../../../asset'


const WhyOrpect = () => {
  return (
   <>
    <section className="midsection">
        <div className="container">
          <div className="row animated-item">
            <div className="col-lg-12 midhead">
              <h2> WHY ORPECT ?</h2>
              <div className="separator separator-danger">✻</div>
            </div>
          </div>
          <div className="row mt-1 infocard_size animated-item">
            <div className="col-lg-3 col-md-6 col-sm-12 pd-4">
              <div className="infocard  flip-card ">
              <div className="flip-card-inner">
                <div className=" flip-card-front">
                <div className="img-infocard">
                  <img src={e1} alt="" className="img-fluid" width="50" heigh="50" />
                  <h5 className="whyhead">Streamlines Employee Review Process</h5>
                </div></div>
                <div className="flip-card-back">
                <div className="text-infocard" >
                 
                  <p>ORPECT offers a comprehensive and user-friendly platform for conducting and managing employee reviews. Our system is
                    designed to simplify the evaluation process, enabling organizations to focus more on
                    fostering growth and less on administrative tasks.
                  </p>
                </div></div></div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pd-4 ">
              <div className="infocard  flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                <div className="img-infocard">
                  <img src={e3} alt="" className="img-fluid" width="50" heigh="50" />
                  <h5  className="whyhead">Optimized Decision-Making Process</h5>
                </div></div>
                <div className="flip-card-back">
                <div className="text-infocard">
                
                  <p>ORPECT allows you to make informed decisions about
                    promotions, training, and recruitment. Our platform provides a clear overview of each
                    employee's performance, enabling you to identify trends, highlight strengths, and
                    address areas that need improvement.
                  </p>
                </div></div></div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pd-4 ">
              <div className="infocard flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                <div className="img-infocard" >
                  <img src={e4} alt="" className="img-fluid" width="50" heigh="50" />
                  <h5  className="whyhead" >Promoting Transparent, Progressive Culture</h5>
                </div></div>
                <div className="flip-card-back" >
                <div className="text-infocard" >
                  <p>With ORPECT, you can
                    promote a culture of transparency and continuous improvement within your organization.
                    Our review system facilitates clear communication between employers and employees,
                    encouraging constructive feedback and the recognition of achievements.
                  </p>
                </div></div></div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12  pd-4">
              <div className="infocard flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                <div className="img-infocard">
                  <img src={lock} alt="" className="img-fluid" width="50" heigh="50" />
                  <h5 className="whyhead">Safeguarding<br/> Data and Privacy</h5>
                </div></div>
                <div className="flip-card-back" >
                <div className="text-infocard">
                  <p>We prioritize your data's security. ORPECT employs industry-leading encryption methods and strict privacy measures to ensure the confidentiality and
                    integrity of your data. You can confidently manage employee reviews with the assurance
                    that your information is securely stored and protected.
                  </p>
                </div></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
   </>
  )
}

export default WhyOrpect