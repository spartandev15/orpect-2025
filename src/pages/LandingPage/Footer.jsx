import React from 'react'
import { orpect1 } from '../../asset'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
  <>
   <footer className="footer" >
        <div className="container">
          <div className="row ">
            <div className="col-md-4 footer-column">
              <ul className="nav flex-column">
                <li className="nav-item footeralign">
                  <Link to="https://orpect.com/"><span className="footer-title"> <img src={orpect1} alt="" width="200" className="img-fluid" /></span></Link>
                </li>
                <p className="mt-3">Considering employee management or aiming to boost HR effectiveness? Looking for insights into potential hires or eager to review past employees? Engage with ORPECT! We're committed to providing the best HR solutions, taking into consideration your company's unique needs and privacy standards.</p>
              </ul>
            </div>

            <div className="col-md-4 footer-column">
              <div className="footerspace">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <span className="footer-title">Company</span>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/faqs">FAQs</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/terms-of-use">Terms of Use</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/community-guidlines">Community Guidelines</Link>
                  </li>
                  <li className="nav-item">
                   <Link className="nav-link" to="/data-request-form">Data Request Form</Link> 
                  </li>
                </ul></div>
            </div>
            <div className="col-md-4 footer-column">
              <div className="footerspace">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <span className="footer-title">Contact & Support</span>
                  </li>
            
                  <li className="nav-item">
                    <Link className="nav-link" to="tel:+1-8632168452"><i className="fas fa-phone phonerotation"></i> &nbsp;+1-8632168452</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="mailto:hello@orpect.com"><i className="fas fa-envelope"></i> &nbsp; hello@orpect.com</Link>
                  </li>

                </ul></div>
            </div>
          </div>

        </div>
        <div className="container mt-3">
          <div className="row  ">
            <div className="col-md-6 box">
              <span className="copyright quick-links footer_height">© COPYRIGHT 2023 <a href="https://orpect.com/" style={{color:"#134d75"}}>ORPECT LLC.</a> All Rights Reserved.</span>
            </div>
            <div className="col-md-6 box">
              <ul className="list-inline social-buttons d-flex justify-content-end" >
                <li className="list-inline-item">
                  <a href="https://twitter.com/orpect" target="_blank">
                    <i className="fab fa-twitter social-icon-footer"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://facebook.com/orpect" target="_blank">
                    <i className="fab fa-facebook-f social-icon-footer"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.linkedin.com/company/orpect" target="_blank">
                    <i className="fab fa-linkedin-in social-icon-footer"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.pinterest.com/orpectllc/" target="_blank">
                    <i className="fab fa-pinterest-p social-icon-footer"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://instagram.com/orpectllc" target="_blank">
                    <i className="fab fa-instagram   social-icon-footer"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.youtube.com/@Orpect" target="_blank">
                    <i className="fab fa-youtube social-icon-footer"></i>
                  </a>
                </li>

              </ul>
            </div>

          </div>
        </div>
      </footer>
  </>

  )
}

export default Footer