import React from 'react'
import { a6, dashboard, managment, search, verify } from '../../../asset'

const Howitwork = () => {
  return (
   <>
     <section className="howitwork">
        <div className="container mobile-responsive1">
          <div className="row" >
            <div className="col-lg-12 midhead ">
              <h2>HOW IT WORKS</h2>
              <div className="separator separator-danger">✻</div>

            </div>
          </div>
          <div className="row" >
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="its_card  ">
                <div className="its-body-txt" >
                  <h3>Step 1: Signup and Verify</h3>
                  <ul className="how_it_work_ul">
                    <li className="check">Register with company details.</li>
                    <li className="check">Confirm via secure email link.</li>
                  </ul>
                </div>
                <img src={verify} className="img-fluid" alt="" height={300} width={300} /></div>
            </div>
          </div>
          <div className="row" >
            <div className="col-lg-12  col-md-12">
              <div className="its_card  ">
                <img src={dashboard} className="img-fluid" alt="" height={300} width={300} />
                <div className="its-body-txt">
                  <h3>Step 2: Dashboard Navigation</h3>
                  <ul className="how_it_work_ul">
                    <li className="check"> Login and access dashboard.</li>
                    <li className="check">  Experience intuitive platform interface.</li>
                  </ul>
                </div>
              </div>
            </div></div>
          <div className="row mt-5">
            <div className="col-lg-12  col-md-12">
              <div className="its_card">
                <div className="its-body-txt" style={{ paddingTop: "10px" }} >
                  <h3>Step 3: Employee Management</h3>
                  <ul className="how_it_work_ul">
                    <li className="check"> Add details of ex-employees/non-joiners.</li>
                    <li className="check">  Rate and review each individual.</li>
                  </ul>
                </div>

                <img src={managment} className="img-fluid " alt="" height={300} width={300}/>
              </div>
            </div></div>
          <div className="row mt-5" >
            <div className="col-lg-12  col-md-12">
              <div className="its_card">
                <img src={search} className="img-fluid" alt="" height={300} width={300} />

                <div className="its-body-txt">
                  <h3>Step 4: Search & Review</h3>
                  <ul className="how_it_work_ul">
                    <li className="check"> Search for ex-employees of other companies.</li>
                    <li className="check"> View anonymized ratings and feedback.</li>
                  </ul>
                </div>
              </div>
            </div></div>
          <div className="row mt-5" >
            <div className="col-lg-12  col-md-12">
              <div className="its_card">
                <div className="its-body-txt" >
                  <h3>Step 5: Review Management</h3>
                  <ul className="how_it_work_ul">
                    <li className="check"> Edit or delete reviews as needed.</li>
                    <li className="check"> Maintain accurate and updated feedback.</li>
                  </ul>
                </div>

                <img src={a6} className="img-fluid" alt="" height={300} width={300}/>
              </div>
            </div>
          </div></div>
        </div>
{/* Mobile Responsive Section */}
    <div className="container mobile-responsive">
          <div className="row" >
            <div className="col-lg-12 midhead">
              <h2><span></span>How it Works</h2>
              <div className="separator separator-danger">✻</div>

            </div>
          </div>
          <div className="how-it-works-mobile">
          <div className="row" >
            <div className="col-lg-1"></div>
            <div className="col-lg-5 col-md-6 " >
              <div className="its-body-txt">
                <h3>Step 1: Signup and Verify</h3>
                <ul className="how_it_work_ul">
                  <li className="check">Register with company details.</li>
                  <li className="check1">Confirm via secure email link.</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5  col-md-6 ">
              <img src={verify} className="img-fluid" alt=""  />
            </div>
            <div className="col-lg-1"></div>
          </div>
          <div className="row" >
            <div className="col-lg-1"></div>
            <div className="col-lg-5  col-md-6" >
              <div className="its-body-txt">
                <h3>Step 2: Dashboard Navigation</h3>
                <ul className="how_it_work_ul">
                  <li className="check">Login and access dashboard.</li>
                  <li className="check1">Experience intuitive platform interface.</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5  col-md-6" >
              <img src={dashboard} className="img-fluid" alt="" />
            </div>

            <div className="col-lg-1"></div>
          </div>
          <div className="row mt-5" >
            <div className="col-lg-1"></div>
            <div className="col-lg-5  col-md-6">
              <div className="its-body-txt">
                <h3>Step 3: Employee Management</h3>
                <ul className="how_it_work_ul">
                  <li className="check">Add details of ex-employees/non-joiners.</li>
                  <li className="check1">Rate and review each individual.</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5  col-md-6" >
              <img src={managment} className="img-fluid" alt="" />
            </div>
            <div className="col-lg-1"></div>
          </div>
          <div className="row mt-5" >
            <div className="col-lg-1"></div>
            <div className="col-lg-5  col-md-6" >
              <div className="its-body-txt ">
                <h3>Step 4: Search & Review</h3>
                <ul className="how_it_work_ul">
                  <li className="check">Search for ex-employees of other companies.</li>
                  <li className="check1">View anonymized ratings and feedback.</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5  col-md-6 ">
              <img src={search} className="img-fluid" alt=""  />
            </div>
            <div className="col-lg-1"></div>
          </div>
          <div className="row mt-5" >
            <div className="col-lg-1"></div>
            <div className="col-lg-5  col-md-6 ">
              <div className="its-body-txt">
                <h3>Step 5: Review Management</h3>
                <ul className="how_it_work_ul">
                  <li className="check"> Edit or delete reviews as needed.</li>
                  <li className="check1"> Maintain accurate and updated feedback.</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5 col-md-6" >
              <img src={a6} className="img-fluid" alt="" />
            </div>
            <div className="col-lg-1"></div>
          </div>
          </div>
        </div> 
        {/* To Here */}
      </section>
   
   </>
    
  )
}

export default Howitwork