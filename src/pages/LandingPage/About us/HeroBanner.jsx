import React from 'react'
import { aboutus } from '../../../asset'

const HeroBanner = () => {
  return (
   <>
     <section className="bannersection">
        <div className="container">
          <div className="row aboutheader">
            <div className="col-lg-12">
              <h1>About Us</h1>
              <div className="separator separator-danger">✻</div>
            </div>
          </div>
          <div className="row " id="banner">
            <div className="col-lg-6 col-md-6 col-sm-12 banner_responsive ">
              <div className="banner-text">
                <h1>Empowering Transparent Evaluations.</h1>
                <p>
                  At ORPECT, we believe in the power of honest feedback and open
                  communication. Our mission is to create a platform where
                  evaluations are transparent and fair, enhancing trust within
                  professional relationships. We provide employers a safe space
                  to share their experiences with past employees, encouraging
                  constructive dialogue and insights. In doing so, we're not
                  only improving hiring processes, but we're also fostering a
                  culture of continuous learning and development. By promoting
                  transparency, we're helping businesses make informed
                  decisions, creating more opportunities for growth and success
                  in the workplace.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 banner_responsive">
              <img src={aboutus} className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
   </>
  )
}

export default HeroBanner