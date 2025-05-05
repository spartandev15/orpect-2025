import React from 'react'
import { check, development, profilesecure, rev, serachem } from '../../../asset'


const Orpectunique = () => {
  return (
<>
<section className="featuresection">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 midhead">
              <h2>WHAT MAKES ORPECT UNIQUE</h2>
              <div className="separator separator-danger">✻</div>
            </div>
          </div>
          <div className="row" >
            <div className="col-lg-6">
              <div className="featuretext">
                <span className="featuretextheade"><div className="feature_top_down">
                  <img src={check} alt="" className="checkboximg" />
                </div> <h4 className="headfeature">Comprehensive Review System:</h4>
                  <p className="parafeature">ORPECT uniquely allows employers to provide
                    detailed reviews for ex-employees and non-joiners, promoting transparency and growth.</p></span>

              </div>
              <div className="featuretext">
                <span className="featuretextheade"><div className="feature_top_down">
                  {/* <i className="fa  fa-chevron-right arrow-right"></i>  */}
                  <img src={check} alt="" className="checkboximg" />
                </div><h4 className="headfeature">Employee Search Feature:</h4>
                  <p className="parafeature">Our platform empowers employers to search employee
                    data across companies, aiding informed hiring decisions while maintaining privacy and
                    anonymity.</p></span>
              </div>
              <div className="featuretext">
                <span className="featuretextheade"> <div className="feature_top_down">
                  <img src={check} alt="" className="checkboximg" />
                </div> <h4 className="headfeature"> User-friendly and Secure:</h4>
                  <p className="parafeature">The simplicity of ORPECT's interface and our commitment
                    to robust security measures ensures an efficient, stress-free user experience.</p></span>
              </div>
              <div className="featuretext">
                <span className="featuretextheade"> <div className="feature_top_down">
                  <img src={check} alt="" className="checkboximg" />
                </div> <h4 className="headfeature" >Fostering Growth through Feedback:</h4>
                  <p className="parafeature">Facilitating constructive feedback, ultimately driving collective growth for companies and
                    individuals.</p></span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="feactureimg">
                    <img src={rev} alt="" className="img-fluid" width={180} height={180} /></div></div>
                <div className="col-lg-6 col-md-6">
                  <div className="feactureimg">
                    <img src={serachem} alt="" className="img-fluid" width={180} height={180} /></div>
                </div>
              </div>
              <div className="row featurespacing">
                <div className="col-lg-6 col-md-6">
                  <div className="feactureimg">
                    <img src={profilesecure} alt="" className="img-fluid" width={180} height={180} /></div></div>
                <div className="col-lg-6 col-md-6">
                  <div className="feactureimg">
                    <img src={development} alt="" className="img-fluid" width={180} height={180} /></div>
                </div></div></div>
          </div>
        </div>
      </section>

</>
  )
}

export default Orpectunique