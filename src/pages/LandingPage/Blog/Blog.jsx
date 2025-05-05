import React from 'react'
import { Link } from 'react-router-dom'
import LayoutOrpect from '../Index'

const Blog = () => {
  return (
  <LayoutOrpect>
    <section className="blogpage">
    <div className="container">
        <div className="row blogpageheading" >
            <div className="col-md-12">
                <h1>Blog</h1>
                <div className="separator separator-danger">✻</div>
            </div>
        </div>
      </div>
</section>
<section className="blogsection">
<div className="container">
<div className="row">
<div className="col-lg-6 blogspacing">
    <div className="card-container">
          <div className="card-body">
          <h1>
          Embrace Transparency and Fairness with ORPECT
          </h1>
          <p className="card-subtitle">
          In an age where the corporate landscape is becoming increasingly complex, traditional methods of employee evaluations no longer suffice. They often lack transparency and fairness, leading to biased decisions that do not accurately represent the employee's true capabilities. 
          </p>
          <Link to="/embrace-transparency"><button className="btn blogbtn">Read More</button></Link>
        </div>
      </div>
         </div> 
<div className="col-lg-6 blogspacing">
    <div className="card-container">
          <div className="card-body">      
          <h1>
          Revolutionizing Employee Evaluations with ORPECT 
          </h1>
          <p className="card-subtitle">
          A fundamental aspect of maintaining an efficient workforce is conducting effective employee evaluations. Traditional review systems have faced criticism for being biased, unproductive, and generally inconsistent, offering little to no actual improvement in the overall performance of employees. 
          </p>
          <Link to="/revolutionizing-employee"><button className="btn blogbtn">Read More</button></Link>
        </div>
      </div>
         </div>
  </div>
  <div className="row blogspacing">
        <div className="col-lg-12">
        <div className="card-container">
          <div className="card-body">
           <h1>
          Navigating Through Recruitment Hurdles with ORPECT 
          </h1>
         <p className="card-subtitle">
          In the highly competitive landscape of recruitment, having an edge is everything. How can companies ensure they're hiring the best-fit candidates for their organization? Enter ORPECT, an innovative platform designed to streamline the recruitment process and optimize hiring decisions. 
          </p>
         <Link to="/new-era-recruitment"><button className="btn blogbtn">Read More</button></Link>
        </div>
      </div>
        </div>
      </div>
  <div className="row">
      <div className="col-lg-6 blogspacing">
    <div className="card-container">
          <div className="card-body">
      
          <h1>
          The Art of Feedback: Embracing Transparency with ORPECT 

          </h1>
          <p className="card-subtitle">
          Employee evaluations have long been an integral part of organizations. They inform decision-making, guide employee development, and can help create a robust corporate culture. However, their potential can only be fully realized when they are conducted in a transparent and efficient manner.
          </p>
          <Link to="/art-of-feedback "><button className="btn blogbtn">Read More</button></Link>
        </div>
      </div>
         </div>
         <div className="col-lg-6 blogspacing">
    <div className="card-container">
         <div className="card-body">
           <h1>
          Revolutionizing Employee Evaluations: Introducing ORPECT 
          </h1>
         <p className="card-subtitle">
          In a fast-paced corporate world where feedback can significantly impact careers, having a comprehensive system to document, evaluate, and review employee performance is crucial. That's where ORPECT steps in, ushering in a new era of transparency and efficiency in employee evaluations. 
           </p>
           <Link to="/introducing-ORPECT"><button className="btn blogbtn">Read More</button></Link>
        </div>
      </div>
    </div>
  </div>
 

    
</div>
</section>
  </LayoutOrpect>
  )
}

export default Blog