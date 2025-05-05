import React from 'react'
import { Link } from 'react-router-dom'
import { empp } from '../../../asset'


const Hero = () => {
  return (

       <section className="bannersection">
        <div className="container">
          <div className="row " id="banner">
            <div className="col-lg-6 col-md-6 col-sm-12 banner_responsive animated-item"  >
              <div className="banner-text">
                <h1>Revolutionizing Employee Feedback for Strategic Growth</h1>
                <p>Organizational Review Platform for Employee and Candidate Tracking (ORPECT) is designed
                  to revolutionize the way organizations conduct employee reviews. Our platform provides a
                  comprehensive and user-friendly system to assess, manage, and improve employee
                  performance, fostering a transparent and growth-oriented work environment.</p>
                <Link to="/about-us"><button className="btn blogbtn mt-3" >Learn More</button></Link>
              </div></div>
            <div className="col-lg-6 col-md-6 col-sm-12 banner_responsive animated-item" >
              <img className="img-fluid" src={empp} alt="" />
            </div>
          </div>

        </div>
      </section>
   
  )
}

export default Hero