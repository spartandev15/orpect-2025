import React from "react";
import {  NavLink } from "react-router-dom";
import { a3 } from "../../asset";
import "../../asset/css/auth.css";
import LayoutOrpect from "../LandingPage/Index";

 
const VerificationPage = () => {
  

  return (
    <>
  <LayoutOrpect>
  <section className="verify">
<div className="container">
    <div className="row">
        <div className="col-lg-12 verifyimg">
            <img src={a3} alt="" className="img-fluid" height="100" width="100"/>
       <h4>Account Under Verification</h4>
        </div>
    </div>
    <div className="row">
        <div className="col-lg-12 col-sm-12 verifyimg">
            <p>Your account is currently undergoing verification. We apologize for any inconvenience caused and appreciate your patience. Within 24 hours, we will notify you of the verification status on your email. Thank you for understanding. </p>
        </div>
    </div>
    <div className="row">
        <div className="col-lg-12 col-sm-12 verifyimg">
            <p><NavLink to="/login" style={{color:"#134d75", textDecoration:"none", fontWeight:"600"}}>Click here</NavLink> to go to the login page.</p>
        </div>
    </div>
</div>


</section>    




  </LayoutOrpect>
      
 
      
    </>
  );
};

export default VerificationPage;
