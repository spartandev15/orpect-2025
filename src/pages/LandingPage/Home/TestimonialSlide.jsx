import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { rigthArrow, test1, test2 } from '../../../asset';


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
const TestimonialSlide = () => {

    const settings = {
        dots: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,  
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  return (
    <section className="testimonial1 ">
    <div className="container">
      <div className="row "  >
        <div className="col-lg-12 midhead">
          <h2 >TESTIMONIALS</h2>
          <div className="separator separator-danger">✻</div>
        </div>
      </div>
      {/* SECOND */}
      <div className="row"  >
      <Slider {...settings} >
      <div className="col-lg-6 col-md-6 col-sm-12 pd-4" >
       <div className="testingbox">
          <div className="testimonial-wrapper">
            <div className="testimonial">
              <div className="testimonial-bubble">
                <div className="testimonial-author">
                  <img src={test1} alt="John Doe" />
                </div>
                <div className="testimonial-text">
                  <p>As a company owner, ORPECT has transformed our hiring process. Its features allow us to make informed decisions by providing comprehensive review data on potential employees. A game-changer in the HR domain!</p>
                </div>

                <h4>Ben Jackson</h4>
                <p>CEO, SunSolar Power.</p>
                <div className="testimonial-rating">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="testingbox">
          <div className="testimonial-wrapper">

            <div className="testimonial">

              <div className="testimonial-bubble">
                <div className="testimonial-author">
                  <img src={test2} alt="John Doe" />
                </div>
                <div className="testimonial-text">
                  <p>ORPECT's transparent and streamlined system of employee reviews has greatly aided our HR department. It's an incredible tool for tracking and improving employee performance, as well as fostering a culture of transparency.</p>
                </div>

                <h4>Dustin Cox</h4>
                <p>CEO, Coxco Creative, Inc.</p>
                <div className="testimonial-rating">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
  
     
    </Slider>
    </div>
    {/* <div className="row  my-slider">
      <div className="col-lg-6 col-md-6 col-sm-12 pd-4">
        <div className="testingbox">
          <div className="testimonial-wrapper">
            <div className="testimonial">
              <div className="testimonial-bubble">
                <div className="testimonial-author">
                  <img src={user} alt="John Doe" />
                </div>
                <div className="testimonial-text">
                  <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt justo a mi malesuada, at ultricies lacus mollis. Pellentesque convallis bibendum arcu, ac maximus sapien semper vel."</p>
                </div>

                <h4>John Doe</h4>
                <p>CEO, ABC Inc.</p>
                <div className="testimonial-rating">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="testingbox1">
          <div className="testimonial-wrapper1">

            <div className="testimonial">

              <div className="testimonial-bubble1">
                <div className="testimonial-author1">
                  <img src={user} alt="John Doe" />
                </div>
                <div className="testimonial-text1">
                  <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt justo a mi malesuada, at ultricies lacus mollis. Pellentesque convallis bibendum arcu, ac maximus sapien semper vel."</p>
                </div>

                <h4>John Doe</h4>
                <p>CEO, ABC Inc.</p>
                <div className="testimonial-rating1">
                  <span className="fa fa-star checked1"></span>
                  <span className="fa fa-star checked1"></span>
                  <span className="fa fa-star checked1"></span>
                  <span className="fa fa-star checked1"></span>
                  <span className="fa fa-star checked1"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    </div>


</section>
  )
}

export default TestimonialSlide