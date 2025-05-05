import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import Layout from "../../component/layout";
import LoadingSpinner from "../../component/LoadingSpinner";
import { viewGlobalSearchedEmpById } from "../../api/rate&review";
import Stars from "../../component/extras/Stars";
import { linkedin, orpect1, uploadProfile } from "../../asset";

const ViewEmployeeAllReview = () => {
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();


  useEffect(() => {
    dispatch(viewGlobalSearchedEmpById(id)).then((res) => {
      setEmployee(res?.data?.reviews.data);
      setLoading(false);
    });
  }, [dispatch, id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Layout>
      <section id="view-review">
        <div className="container">
          <div className="row view-rw">
            <div className="col-lg-12">
              <h3>Showing All Reviews of {employee[0]?.emp_name}</h3>
            </div>
          </div>

          {employee?.map((i) => (
            <div className="searchemployesection mt-4 pb-3" key={i.id}>
              <div className="row companylogosreachtop">
                <div className="col-lg-6 col-md-7">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="product-thumbnail">
                        <img
                          className="pic"
                          src={
                            i?.profile_image
                              ? `https://spartanbots.xyz/opt_lv/${i?.profile_image}`
                              : uploadProfile
                          }
                          alt="profile"
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="seller_name mb-2">
                        <span>{i.emp_name}</span>
                      </div>
                      <div
                        className="search_mail"
                        style={{ fontWeight: "bold" }}
                      >
                        <span>{i?.employee_type}</span>
                      </div>
                      <div className="search_mail">{i?.email}</div>
                      <div className="search_mail">{i?.phone}</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-5">
                  <div className="companyreview " style={{ fontSize: "18px" }}>
                    <span>
                      <b>Profile Added by -</b>
                    </span>
                    <span className="hoverable">
                      <span className="companynamereview hoverable__main">
                        {i?.company_name}
                      </span>
                      <span className="hoverable__tooltip1">
                        Available to Plus Members
                      </span>
                    </span>
                  </div>
                  <div className="search_mail">
                    Added on - <span>{i?.added_on}</span>
                  </div>
                  <div className="search_mail">
                    Last Review Date - <span>{i.last_review_on}</span>
                  </div>
                    <div className="search_mail">
                      <span>Last CTC - </span>
                  {i.last_CTC === 0 || i.last_CTC === "0" || i.last_CTC===null ? "NA" : (
                      <span>{i.last_CTC}</span>
                      )}
                    </div>
                  <div className="linkedinsearch">
                    {i.linked_in && (
                      <a className="" href={i.linked_in}>
                        <img src={linkedin} alt="linkedin" width="20%" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mt-4 companyreviewborder-top">
                <div className="col-lg-4 companylogosreach companyreviewborder-right">
                  <h5 style={{ color: "#134d75", fontWeight: "600" }}>
                    Company Profile
                  </h5>
                  <span className="hoverable">
                    <div
                      className="companyreview mt-3  hoverable__main"
                      style={{ fontSize: "18px", textAlign: "center" }}
                    >
                      <div className="product-thumbnail1 mt-3">
                        <img
                          className="pic"
                          src={
                            i?.company_logo
                              ? `https://spartanbots.xyz/opt_lv/${i?.company_logo}`
                              : orpect1
                          }
                          alt="profile"
                        />
                        <h6>{i?.company_name}</h6>
                      </div>
                      <div className="companynamereview mt-3">
                        {i?.domain_name}
                      </div>
                      <div className="companynamereview mt-3">
                        {i?.company_email}
                      </div>
                      <div className="companynamereview mt-3">
                        {i?.company_phone}
                      </div>
                      <span className="hoverable__tooltip12">
                      Available to Plus Members
                    </span>
                    </div>
                   
                  </span>
                </div>
                <div className="col-lg-8">
                  <div className="companylogosreach1">
                    {i?.ex_employee === "1" && (
                      <>
                        <h5 style={{ color: "#134d75", fontWeight: "600" }}>
                          Employment Start and End Date:- ({i.date_of_joining}{" "}
                          to {i.date_of_leaving})
                        </h5>
                        <div
                          className="employe_factor1 mt-3"
                          style={{ fontSize: "20px" }}
                        >
                          <h6 style={{ color: "#134d75", fontWeight: "600" }}>
                            Overall Rating
                          </h6>
                          <Stars rating={i.overall_rating} />
                        </div>
                        <div className="employe_factor1 mt-3">
                          <h6>Job Performance</h6>
                          <Stars rating={i.performance_rating} />
                        </div>
                        <div className="employe_factor1 mt-3">
                          <h6>Professional Skills</h6>
                          <Stars rating={i.professional_skills_rating} />
                        </div>
                        <div className="employe_factor1 mt-3">
                          <h6>Teamwork and Communication</h6>
                          <Stars rating={i.teamwork_communication_rating} />
                        </div>
                        <div className="employe_factor1 mt-3">
                          <h6>Attitude and Behavior</h6>
                          <Stars rating={i.attitude_behaviour_rating} />
                        </div>
                      </>
                    )}
                    <div className="mt-4">
                      <h6 style={{ color: "#134d75", fontWeight: "600" }}>
                        Review
                      </h6>
                      <p style={{ color: "#666" }}>{i.review}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default ViewEmployeeAllReview;
