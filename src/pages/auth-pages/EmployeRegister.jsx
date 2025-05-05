
import React from "react";
import { Link } from "react-router-dom";
import LayoutOrpect from "../LandingPage/Index";


const EmployeeRegister = () => {

    return (
        <>
            <LayoutOrpect>
                <section className="signuppage">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 contact_form11 ">
                                <div className="signupform2">
                                    <h5>Welcome to ORPECT!</h5>
                                    <p>
                                        If you  already have an account.{" "}
                                    </p>
                                    <Link to="/employee-login"><button className="btn signupbtn" style={{ width: "100%" }}>Sign In</button></Link>
                                </div>
                            </div>
                            <div className="col-lg-8 contact_form12 empsignup ">

                                <form className="signup_pd_inner">
                                    <div className="row">
                                        <div className="col-lg-12 ">
                                            <h3>Employee Registration</h3>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-lg-6 mb-4 pd-2">
                                            <div className="form-outline">
                                                <input type="text" name="name" className="form-control" required />
                                                <label className="form-label" for="typeText" style={{ background: "#fff" }}>Name </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4 pd-2">
                                            <div className="form-outline">
                                                <input type="text" name="email" className="form-control" required />
                                                <label className="form-label" for="typeText" style={{ background: "#fff" }}>Email</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 mb-4 pd-2">
                                            <div className="form-outline">
                                                <input type="text" name="username" className="form-control" required />
                                                <label className="form-label" for="typeText" style={{ background: "#fff" }}>User Name </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4 pd-2">
                                            <div className="form-outline">
                                                <input type="password" className="form-control" required />
                                                <label className="form-label" for="typeText" style={{ background: "#fff" }}>Password</label>
                                                <span className="pwdeye"    >
                                                    <i className="fa fa-eye icn" id="togglePassword"></i>
                                                    <i className="fa fa-eye-slash icn" id="togglePassword"></i>
                                                </span>
                                                <span style={{ position: "absolute", bottom: "-30px", left: "0" }}> </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 mb-4 pd-2">
                                            <div className="form-outline">
                                                <input type="text" name="username" className="form-control" required />
                                                <label className="form-label" for="typeText" style={{ background: "#fff" }}>Tax Number</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4 pd-2">
                                            <div className="form-outline">
                                                <input type="number" className="form-control" required />
                                                <label className="form-label" for="typeText" style={{ background: "#fff" }}>Phone Number</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 mb-4 pd-2">
                                            <div className="form-outline">
                                                <input type="date" name="username" className="form-control" required />
                                                <label className="form-label" for="typeText" style={{ background: "#fff" }}>Date of Birth</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4 pd-2">
                                            {/* <div className="form-outline">
                                                <select className="form-select" aria-label="Default select example" required>
                                                    <option selected disabled>Gender</option>
                                                    <option value="1">Male</option>
                                                    <option value="2">Female</option>
                                                </select>
                                            </div> */}
                                            <div className="form-outline">
                                                <select className="form-select" aria-label="Default select example" required>
                                                    <option selected disabled></option>
                                                    <option value="1">Male</option>
                                                    <option value="2">Female</option>
                                                </select>
                                                <label className="form-label">Gender</label>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 mb-4 pd-2">
                                            <div className="form-outline">
                                                <textarea className="form-control" required />
                                                <label className="form-label" style={{ background: "#fff" }}>Address</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4 pd-2">
                                            <div className="form-outline">
                                                <input type="text" name="otp" className="form-control" required />
                                                <label className="form-label" for="typetext"> OTP</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row proceedbtn">
                                        <div className="col-md-12 mb-4 pb-2 text-center">
                                            <button type="submit" className="btn mybtn">
                                                Sumbit
                                            </button>
                                            <div className="row">
                                            <div className="col-lg-12 text-center">
                                                <p className="submitcontent">
                                                    Already have an account.{" "}
                                                    <Link to="/employee-login" style={{ color: "#134d75", fontWeight: "600" }}>
                                                        Sign In
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                        </div>                                      
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </LayoutOrpect>
        </>
    );
};

export default EmployeeRegister;
