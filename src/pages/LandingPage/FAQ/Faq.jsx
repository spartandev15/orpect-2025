import React from 'react'

const Faq = () => {
  return (
  <>
  <section id="faqs">
  <div className="container">
          <div className ="row mt-4" >
            <div className="col-lg-9 col-sm-12 faqspacing">
            <div className="accordion faqaccordian" id="accordionExample">
              <div className="accordion-item faq_accordian">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button  collapsed faqbtnshadow" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    <h4 style={{padding:"0 1.2rem"}}>What is ORPECT?</h4>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse " aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div className="accordion-body faqsbody">
                    <p style={{ padding: "0.8rem 2rem 0" }}> ORPECT is an innovative platform that offers a comprehensive system for managing 
current employees, evaluating previous employees and non-joiners. At ORPECT, 
organizations can rate and review ex-employees, non-joiners, and search for ex-employees across other companies. It helps businesses improve their hiring process by 
providing insightful data on potential hires.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item faq_accordian">
                <h2 className="accordion-header" id="headingTwo">
                  <button className="accordion-button collapsed faqbtnshadow" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <h4 style={{padding:"0 1.2rem"}}>What are the main features of ORPECT?</h4>
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                  <div className="accordion-body faqsbody">
                    <p style={{ padding: "0.8rem 2rem 0" }}>ORPECT provides a user-friendly platform for businesses to store employee records, 
rate ex-employees, review non-joiners, and search a vast database of employees. All 
these help businesses to make better-informed hiring decisions.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item faq_accordian">
                <h2 className="accordion-header" id="headingThree">
                  <button className="accordion-button collapsed faqbtnshadow" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    <h4 style={{padding:"0 1.2rem"}}>How can I register on ORPECT?</h4>
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                  <div className="accordion-body faqsbody">
                    <p style={{ padding: "0.8rem 2rem 0" }}>To sign up for ORPECT, head to our registration page and provide the necessary 
company details. After verifying your email, our team will manually confirm your 
company to maintain the integrity of our platform. Upon approval, your account will be 
activated and you will have full access to all ORPECT features.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item faq_accordian">
                <h2 className="accordion-header" id="headingfour">
                  <button className="accordion-button collapsed faqbtnshadow" type="button" data-toggle="collapse" data-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                    <h4 style={{padding:"0 1.2rem"}}>How secure is my data on ORPECT?</h4>
                  </button>
                </h2>
                <div id="collapsefour" className="accordion-collapse collapse" aria-labelledby="headingfour" data-parent="#accordionExample">
                  <div className="accordion-body faqsbody">
                    <p style={{ padding: "0.8rem 2rem 0" }}>ORPECT prioritizes user data security. We employ robust security measures and comply 
with international regulations such as GDPR, CCPA, and PIPEDA to protect and respect 
your data privacy. All data transmitted is encrypted, and passwords are hashed and 
stored securely. User-specific data can only be viewed by the respective employer, and 
reviewer identities are kept anonymous.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item faq_accordian">
                <h2 className="accordion-header" id="headingfive">
                  <button className="accordion-button collapsed faqbtnshadow" type="button" data-toggle="collapse" data-target="#collapsefive" aria-expanded="false" aria-controls="collapsefive">
                    <h4 style={{padding:"0 1.2rem"}}>Can I access ORPECT from anywhere?</h4>
                  </button>
                </h2>
                <div id="collapsefive" className="accordion-collapse collapse" aria-labelledby="headingfive" data-parent="#accordionExample">
                  <div className="accordion-body faqsbody">
                    <p style={{ padding: "0.8rem 2rem 0" }}>Yes, ORPECT is a web-based platform that allows you to access your account and our 
services from any location, provided you have an internet connection.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item faq_accordian">
                <h2 className="accordion-header" id="headingsix">
                  <button className="accordion-button collapsed faqbtnshadow" type="button" data-toggle="collapse" data-target="#collapsesix" aria-expanded="false" aria-controls="collapsesix">
                    <h4 style={{padding:"0 1.2rem"}}>How does ORPECT aid in the hiring process?</h4>
                  </button>
                </h2>
                <div id="collapsesix" className="accordion-collapse collapse" aria-labelledby="headingsix" data-parent="#accordionExample">
                  <div className="accordion-body faqsbody">
                    <p style={{ padding: "0.8rem 2rem 0" }}>By offering detailed insights about former employees and non-joiners from other 
companies, ORPECT helps businesses make informed hiring decisions. You can review 
the past performances of potential hires, reducing the chances of a bad hire.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item faq_accordian">
                <h2 className="accordion-header" id="headingseven">
                  <button className="accordion-button collapsed faqbtnshadow" type="button" data-toggle="collapse" data-target="#collapseseven" aria-expanded="false" aria-controls="collapseseven">
                    <h4 style={{padding:"0 1.2rem"}}>Can I write a review for my ex-employees?</h4>
                  </button>
                </h2>
                <div id="collapseseven" className="accordion-collapse collapse" aria-labelledby="headingseven" data-parent="#accordionExample">
                  <div className="accordion-body faqsbody">
                    <p style={{ padding: "0.8rem 2rem 0" }}>Yes, registered users can write comprehensive reviews about their ex-employees. This 
contributes to the transparency and comprehensiveness of our database.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item faq_accordian">
                <h2 className="accordion-header" id="headingeight">
                  <button className="accordion-button collapsed faqbtnshadow" type="button" data-toggle="collapse" data-target="#collapseeight" aria-expanded="false" aria-controls="collapseeight">
                    <h4 style={{padding:"0 1.2rem"}}>How do I add employee details?</h4>
                  </button>
                </h2>
                <div id="collapseeight" className="accordion-collapse collapse" aria-labelledby="headingeight" data-parent="#accordionExample">
                  <div className="accordion-body faqsbody">
                    <p style={{ padding: "0.8rem 2rem 0" }}>Once registered and logged in, you can upload your current employee details either 
individually or by using a CSV file. The required details includes fields like name, email, 
phone number, position, and date of joining.
</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item faq_accordian">
                <h2 className="accordion-header" id="headingnine">
                  <button className="accordion-button collapsed faqbtnshadow" type="button" data-toggle="collapse" data-target="#collapsenine" aria-expanded="false" aria-controls="collapsenine">
                    <h4 style={{padding:"0 1.2rem"}}>Can I search for a specific employee on ORPECT?</h4>
                  </button>
                </h2>
                <div id="collapsenine" className="accordion-collapse collapse" aria-labelledby="headingnine" data-parent="#accordionExample">
                  <div className="accordion-body faqsbody">
                    <p style={{ padding: "0.8rem 2rem 0" }}>Yes, ORPECT provides a search function that allows you to look up a specific individual 
in our database, aiding in background checks and hiring decisions.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item faq_accordian">
                <h2 className="accordion-header" id="headingten">
                  <button className="accordion-button collapsed faqbtnshadow" type="button" data-toggle="collapse" data-target="#collapseten" aria-expanded="false" aria-controls="collapseten">
                    <h4 style={{padding:"0 1.2rem"}}>How does ORPECT handle anonymity in ratings and reviews?</h4>
                  </button>
                </h2>
                <div id="collapseten" className="accordion-collapse collapse" aria-labelledby="headingten" data-parent="#accordionExample">
                  <div className="accordion-body faqsbody">
                    <p style={{ padding: "0.8rem 2rem 0" }}>At ORPECT, we understand the importance of honest and unbiased feedback. That's 
why we offer an anonymized rating and review system. This means that when you leave 
a review for a former employee or a non-joiner, your identity will not be disclosed to the 
individual in question or to any other users on the platform. This ensures that you can 
provide your genuine thoughts and experiences without any concern of potential 
backlash. Please note, however, that we require all reviews to be respectful and 
constructive to maintain a professional and valuable environment for all users.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item faq_accordian">
                <h2 className="accordion-header" id="heading1">
                  <button className="accordion-button collapsed faqbtnshadow" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                    <h4 style={{padding:"0 1.2rem"}}>Does ORPECT offer any customer support?</h4>
                  </button>
                </h2>
                <div id="collapse1" className="accordion-collapse collapse" aria-labelledby="heading1" data-parent="#accordionExample">
                  <div className="accordion-body faqsbody">
                    <p style={{ padding: "0.8rem 2rem 0" }}>Yes, ORPECT has a dedicated customer support team ready to assist you with any 
queries or issues you may encounter while using our platform. Please refer to the 
chatbot on the lower right corner of your screen.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item faq_accordian">
                <h2 className="accordion-header" id="heading2">
                  <button className="accordion-button collapsed faqbtnshadow" type="button" data-toggle="collapse" data-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                    <h4 style={{padding:"0 1.2rem"}}>How can I update my company details on ORPECT?</h4>
                  </button>
                </h2>
                <div id="collapse2" className="accordion-collapse collapse" aria-labelledby="heading2" data-parent="#accordionExample">
                  <div className="accordion-body faqsbody">
                    <p style={{ padding: "0.8rem 2rem 0" }}>To update your company details, log into your ORPECT account, navigate to your 
profile, and you can edit your information there.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item faq_accordian">
                <h2 className="accordion-header" id="heading3">
                  <button className="accordion-button collapsed faqbtnshadow" type="button" data-toggle="collapse" data-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                    <h4 style={{padding:"0 1.2rem"}}>What is ORPECT's stand on biased or hateful reviews?</h4>
                  </button>
                </h2>
                <div id="collapse3" className="accordion-collapse collapse" aria-labelledby="heading3" data-parent="#accordionExample">
                  <div className="accordion-body faqsbody">
                    <p style={{ padding: "0.8rem 2rem 0" }}>ORPECT is committed to promoting a fair and respectful environment. Any reviews 
found to be biased, hateful, or defamatory will be removed from our platform.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item faq_accordian">
                <h2 className="accordion-header" id="heading4">
                  <button className="accordion-button collapsed faqbtnshadow" type="button" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                    <h4 style={{padding:"0 1.2rem"}}>Can I delete a review I have posted?</h4>
                  </button>
                </h2>
                <div id="collapse4" className="accordion-collapse collapse" aria-labelledby="heading4" data-parent="#accordionExample">
                  <div className="accordion-body faqsbody">
                    <p style={{ padding: "0.8rem 2rem 0" }}>Yes, you have the ability to edit or delete reviews that you have posted. However, we 
encourage transparency and honest feedback to benefit the wider ORPECT community.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item faq_accordian">
                <h2 className="accordion-header" id="heading5">
                  <button className="accordion-button collapsed faqbtnshadow" type="button" data-toggle="collapse" data-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                    <h4 style={{padding:"0 1.2rem"}}>How does ORPECT protect against fake reviews?</h4>
                  </button>
                </h2>
                <div id="collapse5" className="accordion-collapse collapse" aria-labelledby="heading5" data-parent="#accordionExample">
                  <div className="accordion-body faqsbody">
                    <p style={{ padding: "0.8rem 2rem 0" }}>ORPECT implements stringent measures to verify the authenticity of reviews and 
minimize fake entries. We cross-check data and require users to provide proof of 
employment to maintain the credibility of our platform.</p>
                  </div>
                </div>
              </div>
              
                        </div></div>
                       
          </div>

  
        </div>
      </section>
  </>
  )
}

export default Faq