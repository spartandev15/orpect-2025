import React from 'react'
import { Link } from 'react-router-dom'
import { user } from '../../asset' 
import EmployeeLayout from '../../component/layout/Employelayout'

const Viewcompany = () => {
    return (
        <EmployeeLayout>
            <section id="employeedashboard">
                <div className='container'>
                    <div className="row">
                        <div className="col-lg-12">
                            <h3>Company Profile</h3>
                        </div>
                    </div>
                    <div className="row  mt-4">
              <div className="col-lg-3 col-md-3 col-sm-12 pd-4">
              
<div className="viewem">
  <div className="employebox">
    <div className="profile-pic-wrapper">
      <div className="pic-holder">
        <img className="pic" src={user} alt="profile" />
       
      </div>
    </div>
    <div className="profileimgboxdetail" style={{textTransform: "capitalize"}}>
      <h5>ABC Techonlogy</h5>
    </div>
    <div className="row mt-1">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <p className="profileimgboxcompanydetail1" style={{color: "rgb(95, 125, 149)"}}>sharklasers.com</p>
      </div>
    </div>
    <div className="row mt-1">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <p className="profileimgboxcompanydetail1" style={{color: "rgb(95, 125, 149)"}}>vikas@sharklasers.com</p>
      </div>
    </div>
  </div>
</div>
              </div>

              <div className="col-lg-9 col-md-9 col-sm-12 ">
                <div className="viewem pd-4">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12  ">
                      <h5 className="infoedit">
                        <i
                          style={{ color: "#134d75" }}
                          className="fa  fa-address-card"
                        ></i>{" "}
                        &nbsp; Information
                      </h5>                     
                    </div>
                  </div>

                  <div className="readonly-form">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <p className="addlabelcard2">Company Name</p>
                        <h6
                          className="profileimgboxcompanydetail2"
                          style={{ textTransform: "capitalize" }}
                        >   ABC Technology                     
                        </h6>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <p className="addlabelcard2">Type</p>
                        <h6
                          className="profileimgboxcompanydetail2"
                          style={{ textTransform: "capitalize" }}
                        >Pvt Ltd
                          </h6>
                      </div>
                    </div> 
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <p className="addlabelcard2">E-Mail Id</p>
                        <h6 className="profileimgboxcompanydetail2">  
abctechnology@gmail.com
                        </h6>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <p className="addlabelcard2">Domain</p>
                        <h6 className="profileimgboxcompanydetail2">
gmail.com
                        </h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <p className="addlabelcard2">Phone Number</p>
                        <h6 className="profileimgboxcompanydetail2">
                       7894561230
                        </h6>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <p className="addlabelcard2">WebMaster E-Mail</p>
                        <h6 className="profileimgboxcompanydetail2">
                          himanshus4210@gmail.com
                        </h6>
                      </div>
                    </div>

                  
                  </div>

                
                </div>

                <div className="viewem mt-4">
                  <div className="row">
                    <div className="col-12">
                      <h5 className="infoedit">
                      <svg
                      height="1em"
                      viewBox="0 0 384 512"                    
                    >
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>{" "}
                        &nbsp;Company Address
                      </h5>
                    
                    </div>
                  </div>
                  <div className="row">
                    <div className="readonly-form1">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <p className="addlabelcard2"> Address</p>
                          <h6
                            className="profileimgboxcompanydetail2"
                            style={{ textAlign: "left" }}
                          >
                         VPO Bilaspur
                          </h6>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <p className="addlabelcard2">Country</p>
                          <h6
                            className="profileimgboxcompanydetail2"
                            style={{ textTransform: "capitalize" }}
                          >
                            India
                           
                          </h6>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <p className="addlabelcard2"> State</p>
                          <h6
                            className="profileimgboxcompanydetail2"
                            style={{ textTransform: "capitalize" }}
                          >
                           Himachal Pradesh
                          </h6>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <p className="addlabelcard2"> City</p>
                          <h6
                            className="profileimgboxcompanydetail2"
                            style={{ textTransform: "capitalize" }}
                          >
                            Bilaspur
                            </h6>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <p className="addlabelcard2"> Postal Code</p>
                          <h6
                            className="profileimgboxcompanydetail2"
                            style={{ textTransform: "capitalize" }}
                          >
                            174001
                            {" "}
                         
                          </h6>
                        </div>
                      </div>
                    </div>
                
                    </div>
                   
                  </div>
                  <div className='row'>
                    <div className='col-lg-6'>
                    <Link
                  to="/company-review"
                  className="btn mybtn profilepassbtn"                
                >
                 Add Review
                </Link> 
                    </div>
                    <div className='col-lg-6'>
                    <Link
                  to=" "
                  className="btn mybtn profilepassbtn"                
                >
                 View Review
                </Link> 
                    </div>

                  </div>                  
                </div>
               </div>
            </div>
            
            </section>
        </EmployeeLayout>

    )
}

export default Viewcompany