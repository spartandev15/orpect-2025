import React from 'react'

const Easytouse = () => {
  return (
   <>
    <section className="tabsection">
    <div className="container">

      <div className="row" >
        <div className="col-lg-12 midhead">
          <h2><span></span>EASY TO USE</h2>
          <div className="separator separator-danger">✻</div>
          <p>At ORPECT, we value your time and productivity, which is why we've designed our platform with
            ease of use at its core. From sign-up to navigating your dashboard, every step has been
            streamlined for your convenience. You can effortlessly add employee details, conduct reviews,
            or search for past employees from other organizations. The intuitive interface makes managing
            reviews a breeze, allowing for swift editing and updating as required. Moreover, with ORPECT's
            focus on clarity and simplicity, you'll find our system not just easy to use but a vital tool in your
            company's HR toolkit.</p>
        </div>
      </div>
      <div className="tab_responsive" >
        <div className="row mt-5">
          <div className="col-lg-3 col-md-3 col-sm-12" >
            <div className="nav flex-column nav-pills nav-pills-custom" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <a className="nav-link mb-3 p-3 shadow active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
                <i className="fa fa-user  mr-2"></i> &nbsp;
                <span className="font-weight-bold small text-uppercase" style={{ fontWeight: "500" }}>Store Employee Records</span></a>
              <a className="nav-link mb-3 p-3 shadow" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                <i className="fa fa-user-plus mr-2"></i> &nbsp;
                <span className="font-weight-bold small text-uppercase" style={{ fontWeight: "500" }}>Rate Ex Employee</span></a>
              <a className="nav-link mb-3 p-3 shadow" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                <i className="fa fa-star mr-2"></i> &nbsp;
                <span className="font-weight-bold small text-uppercase" style={{ fontWeight: "500" }}>Reviews Non Joiners</span></a>
              <a className="nav-link mb-3 p-3 shadow" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">
                <i className="fa fa-search mr-2"></i> &nbsp;
                <span className="font-weight-bold small text-uppercase" style={{ fontWeight: "500" }}>Search Employee</span></a>
            </div>
          </div>
          <div className="col-lg-9 col-md-9 col-sm-12 " >
            <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade shadow rounded bg-white show active tab_lineheight"  id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                <h4 className="font-italic mb-4" style={{ fontWeight: "600", color: "#134d75" }}>Store Employee Records</h4>
                <p className="font-italic text-muted mb-2" >ORPECT provides a secure and organized space for storing
                  your employee records. With our platform, you can keep a meticulous record of your
                  current employees, ex-employees and non-joiners, including their role, contact details,
                  and date of departure. Additionally, their performance reviews and ratings are also
                  stored, offering a comprehensive overview of their time with your company. This
                  organized database becomes a valuable resource for reference, supporting informed
                  decisions about hiring and team development. With ORPECT, managing employee
                  records becomes less of a chore and more of a strategic asset.</p>
              </div>

              <div className="tab-pane fade shadow rounded bg-white  tab_lineheight"  id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <h4 className="font-italic mb-4" style={{ fontWeight: "600", color: "#134d75" }}>Rate Ex Employees</h4>
                <p className="font-italic text-muted mb-2">ORPECT provides a secure and organized space for storing
                  your employee records. With our platform, you can keep a meticulous record of your
                  current employees, ex-employees and non-joiners, including their role, contact details,
                  and date of departure. Additionally, their performance reviews and ratings are also
                  stored, offering a comprehensive overview of their time with your company. This
                  organized database becomes a valuable resource for reference, supporting informed
                  decisions about hiring and team development. With ORPECT, managing employee
                  records becomes less of a chore and more of a strategic asset.</p>
              </div>

              <div className="tab-pane fade shadow rounded bg-white  tab_lineheight1 "  id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                <h4 className="font-italic mb-4" style={{ fontWeight: "600", color: "#134d75" }}>Reviews Non Joiners</h4>
                <p className="font-italic text-muted mb-2">ORPECT extends beyond just ex-employees, offering a unique
                  feature to review non-joiners. This allows you to share your experience with candidates
                  who didn't join after accepting the offer. You can provide valuable feedback on their
                  professionalism, communication, and overall recruitment experience. These reviews
                  help organizations gauge a candidate's reliability and maintain a record of their
                  recruitment process conduct. Such a feature also promotes accountability among job
                  applicants, encouraging them to uphold professional standards. By reviewing non-joiners, ORPECT ensures a holistic view of candidate behavior, thereby fostering a more
                  transparent and respectful hiring ecosystem.</p>
              </div>

              <div className="tab-pane fade shadow rounded bg-white  tab_lineheight1"  id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                <h4 className="font-italic mb-4" style={{ fontWeight: "600", color: "#134d75" }}>Search Employee</h4>
                <p className="font-italic text-muted mb-2"> In the vast professional landscape, finding specific employee
                  reviews can seem like finding a needle in a haystack. ORPECT solves this issue with its
                  robust 'Search Employee' feature. You can easily search for ex-employees of other
                  companies using their name, email, or phone number. The search results provide
                  anonymized details like previous company, role, and departure date, along with the
                  reviews and ratings they've received. This feature facilitates an informed hiring process,
                  allowing employers to gain insights about potential hires from their previous workplaces.
                  With ORPECT, finding relevant employee information becomes a quick, efficient, and
                  informative process.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="accordion">
        <div className="accordion mt-5" id="accordionExample" data-aos="fade-left"  data-aos-offset="200"  data-aos-delay="0">
          <div className="accordion-item tab_accordian_responsive">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button mb-3 p-3 shadow acordiancolor" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <a className="nav-link tab-nav-link" >
                  <i className="fa fa-user  mr-2"></i> &nbsp;
                  <span className="font-weight-bold small text-uppercase" style={{ fontWeight: "500" }}>Store Employee Records</span></a>
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div className="accordion-body">
                <div className="tab-pane fade shadow rounded bg-white show active" style={{ padding: "1.3rem" }} >
                  <h4 className="font-italic mb-4" style={{ fontWeight: "600", color: "#134d75" }}>Store Employee Records</h4>
                  <p className="font-italic text-muted mb-2" >ORPECT provides a secure and organized space for storing
                    your employee records. With our platform, you can keep a meticulous record of your
                    current employees, ex-employees and non-joiners, including their role, contact details,
                    and date of departure. Additionally, their performance reviews and ratings are also
                    stored, offering a comprehensive overview of their time with your company. This
                    organized database becomes a valuable resource for reference, supporting informed
                    decisions about hiring and team development. With ORPECT, managing employee
                    records becomes less of a chore and more of a strategic asset.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item tab_accordian_responsive">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed mb-3 p-3 shadow acordiancolor" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <a className="nav-link " >
                  <i className="fa fa-user-plus mr-2"></i> &nbsp;
                  <span className="font-weight-bold small text-uppercase" style={{ fontWeight: "500" }}>Rate Ex Employee</span></a>
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
              <div className="accordion-body">
                <div className="tab-pane fade shadow rounded bg-white show active" style={{ padding: "1.3rem" }} >
                  <h4 className="font-italic mb-4" style={{ fontWeight: "600", color: "#134d75" }}>Rate Ex Employees</h4>
                  <p className="font-italic text-muted mb-2">ORPECT provides a secure and organized space for storing
                    your employee records. With our platform, you can keep a meticulous record of your
                    current employees, ex-employees and non-joiners, including their role, contact details,
                    and date of departure. Additionally, their performance reviews and ratings are also
                    stored, offering a comprehensive overview of their time with your company. This
                    organized database becomes a valuable resource for reference, supporting informed
                    decisions about hiring and team development. With ORPECT, managing employee
                    records becomes less of a chore and more of a strategic asset.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item tab_accordian_responsive">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed mb-3 p-3 shadow acordiancolor" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                <a className="nav-link " >
                  <i className="fa fa-star mr-2"></i> &nbsp;
                  <span className="font-weight-bold small text-uppercase" style={{ fontWeight: "500" }}>Reviews Non Joiners</span></a>

              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
              <div className="accordion-body">
                <div className="tab-pane fade shadow rounded bg-white show active" style={{ padding: "1.3rem" }} >
                  <h4 className="font-italic mb-4" style={{ fontWeight: "600", color: "#134d75" }}>Reviews Non Joiners</h4>
                  <p className="font-italic text-muted mb-2">ORPECT extends beyond just ex-employees, offering a unique
                    feature to review non-joiners. This allows you to share your experience with candidates
                    who didn't join after accepting the offer. You can provide valuable feedback on their
                    professionalism, communication, and overall recruitment experience. These reviews
                    help organizations gauge a candidate's reliability and maintain a record of their
                    recruitment process conduct. Such a feature also promotes accountability among job
                    applicants, encouraging them to uphold professional standards. By reviewing non-joiners, ORPECT ensures a holistic view of candidate behavior, thereby fostering a more
                    transparent and respectful hiring ecosystem.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item tab_accordian_responsive">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button collapsed mb-3 p-3 shadow acordiancolor" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                <a className="nav-link ">
                  <i className="fa fa-search mr-2"></i> &nbsp;
                  <span className="font-weight-bold small text-uppercase" style={{ fontWeight: "500" }}>Search Employee</span></a>
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
              <div className="accordion-body">
                <div className="tab-pane fade shadow rounded bg-white show active" style={{ padding: "1.3rem" }} >
                  <h4 className="font-italic mb-4" style={{ fontWeight: "600", color: "#134d75" }}>Search Employee</h4>
                  <p className="font-italic text-muted mb-2"> In the vast professional landscape, finding specific employee
                    reviews can seem like finding a needle in a haystack. ORPECT solves this issue with its
                    robust 'Search Employee' feature. You can easily search for ex-employees of other
                    companies using their name, email, or phone number. The search results provide
                    anonymized details like previous company, role, and departure date, along with the
                    reviews and ratings they've received. This feature facilitates an informed hiring process,
                    allowing employers to gain insights about potential hires from their previous workplaces.
                    With ORPECT, finding relevant employee information becomes a quick, efficient, and
                    informative process.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
  </>
  )
}

export default Easytouse