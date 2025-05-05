import React from 'react'
import { Link } from 'react-router-dom'
import Stars from '../../component/extras/Stars'
import EmployeeLayout from '../../component/layout/Employelayout'

const AddCompanyReview = () => {
  return (
   <EmployeeLayout>
     <section id="employeedashboard">
          <div className="container">
            <div className='row'>
              <div className='col-lg-12'>
                <h3>Rate ABC Technology</h3>
              </div>
            </div>
            <div className='row mt-4 addcmpnyreview'>
              <div className='col-lg-12'>
                <div className='form-outline'>
                  <input type="text" className='form-control' name="ABC Techonolgy" value="ABC Techonolgy" readOnly /> 
                </div>
             </div>
             <div className='row  mt-4'>
             <div className='col-lg-12'>
             <div ><p>
             Are you a current, former or non-joiner employee? <span className="required">*</span></p>
     </div></div>
  
     <div className='col-lg-4'>
      <div className='cureentworking'>
     <input type="radio" name="currentJob" id="currentJob0" value="1" className="input-radio" />
     &nbsp; <span className="label-text">Current Employee</span> 
     </div></div>
     <div className='col-lg-4'>
     <div className='cureentworking'>
     <input type="radio" name="currentJob" id="currentJob1" value="0" className="input-radio" />
        &nbsp; <span className="label-text">Former Employee</span>  
     </div></div>
     <div className='col-lg-4'>
     <div className='cureentworking'>
     <input type="radio" name="currentJob" id="currentJob1" value="0" className="input-radio" />
        &nbsp; <span className="label-text">Non Joiner Employee</span>  
     </div></div>
     </div>
     <div className='row mt-4'>
             <div className='col-lg-12'>
             <div ><p>
             What gender do you identify with? <span className="required">*</span></p>
     </div></div>
     <div className='col-lg-4'>
      <div className='cureentworking'>
     <input type="radio" name="currentJob" id="currentJob0" value="1" className="input-radio" />
     &nbsp; <span className="label-text">Male</span> 
     </div></div>
     <div className='col-lg-4'>
     <div className='cureentworking'>
     <input type="radio" name="currentJob" id="currentJob1" value="0" className="input-radio" />
        &nbsp; <span className="label-text">Female</span>  
     </div></div>
     <div className='col-lg-4'>
     <div className='cureentworking'>
     <input type="radio" name="currentJob" id="currentJob1" value="0" className="input-radio" />
        &nbsp; <span className="label-text">Other</span>  
     </div></div>
     </div>

            <div className='row mt-4'>
              <div className='col-lg-12'>
                <h5>
				Rate ABC Technology on the following criteria </h5>
        </div>
        <div className='col-lg-12'>
        <p className="employe_factor1 employe_rating_heading"> Over All Rating <span>
                            <Stars />
                          </span></p>
                            
                          <div className="employe_factor1 mt-2">
                            <h6>1. Work-Life balance</h6>
                            <span className="star ">
                              <Stars   />
                            </span>
                          </div>
                          <div className="employe_factor1 mt-2">
                            <h6>2. Skill Development / Learning</h6>
                            <span className="star ">
                              <Stars  />
                            </span>
                          </div>
                          <div className="employe_factor1 mt-2">
                            <h6>3. Company Culture</h6>
                            <span className="star ">
                              <Stars  />
                            </span>
                          </div>
                          <div className="employe_factor1 mt-2">
                            <h6>4. Work Satisfaction</h6>
                            <span className="star ">
                              <Stars   />
                            </span>
                          </div>
             </div></div>
             <div className='row mt-4'>
              <div className='col-lg-12'>
<div className='form-outline'>
  <textarea className='form-control' required/>
  <label for="textarea" style={{background:"#fff"}}>What do you like about working at ABC Technology Company?</label>
</div>
                </div>
             </div>
             <div className='row mt-4'>
              <div className='col-lg-12'>
<div className='form-outline'>
  <textarea className='form-control' required/>
  <label  for="textarea" style={{background:"#fff"}}>What do you dislike about working at ABC Technology Company?</label>
</div>
                </div>
             </div>
           
     <div className='row mt-4'>
      <div className='col-lg-12'>
      <input type="checkbox"/> &nbsp; &nbsp;
  <label> I agree to the Orpect<Link to="/terms-of-use" style={{color:"#134d75", textDecoration:"none", fontWeight:"600"}}> Terms of Use</Link>. This review of my experience at my current or former employer is truthful.</label> 
      </div>
     </div>

     
     <div className='row mt-4'>
      <div className='col-lg-12 text-center'>
    <button type='submit' className='btn mybtn '>Submit Review</button>
      </div>
     </div>
             </div>           
            </div>
    </section>
   </EmployeeLayout>
  )
}

export default AddCompanyReview