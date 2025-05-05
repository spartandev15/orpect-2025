import React from 'react'
import { a5, blog1, empp } from '../../../asset'


const Blog = () => {
  return (
   <>
     <section id="blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 midhead">
              <h2>BLOGS</h2>
              <div className="separator separator-danger">✻</div>
            </div>
          </div>

          <div className="row" >
            <div className="col-lg-4 col-md-4 col-sm-12  blog_spacing">
              <a className="blog_link" href="/introducing-ORPECT">
                <div className="cardblog">

                  <div className="card__header">
                    <img src={blog1}  alt="card__image" className="img-fluid" />
                  </div>
                  <div className="card__body_blog">

                    <h4 style={{ fontWeight: "600", color: "#134d75", fontSize:"18px", lineHeight:"26px" }}>Revolutionizing Employee Evaluations: Introducing ORPECT</h4>
                    <p>In a fast-paced corporate world where feedback can significantly impact careers, having a comprehensive system to document, evaluate, and review employee performance is crucial... &nbsp;<a href="/introducing-ORPECT" className="bloglink">Read More</a></p>
                  </div>
              
                </div> </a>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 blog_spacing">
              <a className="blog_link" href="/art-of-feedback">
                <div className="cardblog">
                  <div className="card__header">
                    <img src={a5} alt="card__image" className="img-fluid" />
                  </div>
                  <div className="card__body_blog">

                    <h4 style={{ fontWeight: "600", color: "#134d75", fontSize:"18px", lineHeight:"26px" }}>The Art of Feedback: Embracing Transparency with ORPECT</h4>
                    <p>Employee evaluations have long been an integral part of organizations. They inform decision-making, guide employee development, and can help create a robust corporate culture... &nbsp;<a href="/art-of-feedback" className="bloglink">Read More</a></p>
                  </div>
                 
                </div> </a></div>
            <div className="col-lg-4 col-md-4 col-sm-12 blog_spacing ">
              <a className="blog_link" href="/new-era-recruitment">
                <div className="cardblog">
                  <div className="card__header">
                    <img src={empp}alt="card__image" className="img-fluid" />
                  </div>
                  <div className="card__body_blog">

                    <h4 style={{ fontWeight: "600", color: "#134d75", fontSize:"18px", lineHeight:"26px" }}>Navigating Through Recruitment Hurdles with ORPECT</h4>
                    <p>In the highly competitive landscape of recruitment, having an edge is everything. How can companies ensure they're hiring the best-fit candidates for their organization? Enter ORPECT... &nbsp;<a href="/new-era-recruitment" className="bloglink">Read More</a></p>
                  </div>
                   </div> </a></div>
          </div>
        </div>
      </section>
   
   </>
   
    )
}

export default Blog