import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { a5, blog1, blog4, blog5, empp, rigthArrow } from '../../../asset';
import { Link } from 'react-router-dom';


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
      >
<img src={rigthArrow} alt='slideArrows' width="30" height="30" /> 

      </div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        onClick={onClick}
      >
<img src={rigthArrow} alt='slideArrows' style={{transform:"rotate(180deg)"}} width="30" height="30" /> 

      </div>
    );
  }
const BlogSlider = () => {

    const settings = {
        dots: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,  
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
            breakpoint: 567,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
      ]
    };
  return (
    <section id="blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 midhead">
              <h2>BLOG</h2>
              <div className="separator separator-danger">✻</div>
            </div>
          </div>

      {/* SECOND */}
      <div className="row"  >
      <Slider {...settings} >
      <div className="col-lg-4 col-md-4 col-sm-12  blog_spacing">
              <a className="blog_link" href="/introducing-ORPECT">
                <div className="cardblog">

                  <div className="card__header">
                    <img src={blog1}  alt="card__image" className="img-fluid" />
                  </div>
                  <div className="card__body_blog">

                    <h4  className='blogcontent'>Revolutionizing Employee Evaluations: Introducing ORPECT</h4>
                    <p>In a fast-paced corporate world where feedback can significantly impact careers, having a comprehensive system to document, evaluate, and review employee... &nbsp;<a href="/introducing-ORPECT" className="bloglink">Read More</a></p>
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

                    <h4 className='blogcontent'>The Art of Feedback: Embracing Transparency with ORPECT</h4>
                    <p>Employee evaluations have long been an integral part of organizations. They inform decision-making, guide employee development, and can help create a robust... &nbsp;<a href="/art-of-feedback" className="bloglink">Read More</a></p>
                  </div>
                 
                </div> </a></div>
            <div className="col-lg-4 col-md-4 col-sm-12 blog_spacing ">
              <a className="blog_link" href="/new-era-recruitment">
                <div className="cardblog">
                  <div className="card__header">
                    <img src={empp}alt="card__image" className="img-fluid" />
                  </div>
                  <div className="card__body_blog">

                    <h4 className='blogcontent'>Navigating Through Recruitment Hurdles with ORPECT</h4>
                    <p>In the highly competitive landscape of recruitment, having an edge is everything. How can companies ensure they're hiring the best-fit candidates for their organization?... &nbsp;<a href="/new-era-recruitment" className="bloglink">Read More</a></p>
                  </div>
                   </div> </a></div>
                   <div className="col-lg-4 col-md-4 col-sm-12 blog_spacing ">
              <a className="blog_link" href="/revolutionizing-employee">
                <div className="cardblog">
                  <div className="card__header">
                    <img src={blog4}alt="card__image" className="img-fluid" />
                  </div>
                  <div className="card__body_blog">

                    <h4 className='blogcontent'>Revolutionizing Employee Evaluations with ORPECT</h4>
                    <p>A fundamental aspect of maintaining an efficient workforce is conducting effective employee evaluations. Traditional review systems have faced criticism for being... &nbsp;<a href="/revolutionizing-employee" className="bloglink">Read More</a></p>
                  </div>
                   </div> </a></div>
                   <div className="col-lg-4 col-md-4 col-sm-12 blog_spacing ">
              <a className="blog_link" href="/embrace-transparency">
                <div className="cardblog">
                  <div className="card__header">
                    <img src={blog5}alt="card__image" className="img-fluid" />
                  </div>
                  <div className="card__body_blog">
                    <h4 className='blogcontent'>Embrace Transparency and Fairness with ORPECT</h4>
                    <p>In an age where the corporate landscape is becoming increasingly complex, traditional methods of employee evaluations no longer suffice. They often lack... &nbsp;<a href="/embrace-transparency" className="bloglink">Read More</a></p>
                  </div>
                   </div> </a></div>
  
     
    </Slider>
   <p  className='text-center mt-4 viewallblogbtn'> <Link to="/blog"><button className="btn blogbtn " >View All Blogs</button></Link></p>
    </div>
    
    </div>


</section>
  )
}


export default BlogSlider