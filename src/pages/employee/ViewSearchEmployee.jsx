import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Layout from "../../component/layout";
import LoadingSpinner from "../../component/LoadingSpinner";
import { getEmployee } from "../../api/employee";
import Stars from "../../component/extras/Stars";
import { linkedin, uploadProfile } from "../../asset";
import { IMAGE_BASE_URL_WITH_SLASH } from "../../api/baseUrl";
import moment from "moment";

// Helper function to format date to DD-MM-YYYY
const formatDate = (dateString) => {
  if (!dateString) return "-";
  
  // Check if already in DD-MM-YYYY format
  if (typeof dateString === "string" && /^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    return dateString;
  }
  
  // Try to parse and format using moment
  try {
    const date = moment(dateString);
    if (date.isValid()) {
      return date.format("DD-MM-YYYY");
    }
  } catch (error) {
    console.error("Error formatting date:", error);
  }
  
  return dateString || "-";
};

const ViewSearchEmployee = () => {
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEmployee(id))
      .then((res) => {
        setEmployee(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [dispatch, id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!employee) {
    return (
      <Layout>
        <div className="container-fluid viewemployee searchemploye">
          <div className="text-center mt-4">
            <h3>Employee not found</h3>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <style>
        {`
          .searchemploye .companynamereview,
          .searchemploye .product-thumbnail1 img,
          .searchemploye .product-thumbnail1 h6,
          .searchemploye .companynamereview * {
            filter: none !important;
            -webkit-filter: none !important;
            color: inherit !important;
            text-shadow: none !important;
            user-select: auto !important;
            -webkit-user-select: auto !important;
          }
        `}
      </style>
      <Layout>
        <div className="container-fluid viewemployee searchemploye">
          <div className="searchemployesection mt-4 pb-3">
            <div className="row companylogosreachtop">
              <div className="col-lg-8 col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <div className="product-thumbnail">
                      <img
                        className="pic"
                        src={
                          employee?.profile_image
                            ? `${IMAGE_BASE_URL_WITH_SLASH}${employee.profile_image}`
                            : uploadProfile
                        }
                        alt="profile"
                      />
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        padding: "1.5rem 0",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: "bolder",
                          textDecoration: "capitalize",
                          color: "#134d75",
                        }}
                      >
                        {employee?.emp_name || employee?.empName || "-"}
                      </p>
                      <p
                        style={{
                          fontWeight: "bold",
                          color: "#f6a21e",
                          fontSize: "14px",
                        }}
                      >
                        {employee?.employee_type || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-9">
                    {(employee?.employee_type === "Ex Employee" || employee?.ex_employee === "1") ? (
                      <>
                        <p className="employe_rating_heading"> Rating</p>
                        <span>
                          <Stars rating={employee?.overall_rating} />
                        </span>

                        <div className="employe_factor1 mt-2">
                          <h6>1. Job Performance</h6>
                          <span className="star ">
                            <Stars rating={employee?.performance_rating} />
                          </span>
                        </div>
                        <div className="employe_factor1 mt-2">
                          <h6>2. Professional Skills</h6>
                          <span className="star ">
                            <Stars rating={employee?.professional_skills_rating} />
                          </span>
                        </div>
                        <div className="employe_factor1 mt-2">
                          <h6>3. Teamwork and Communication</h6>
                          <span className="star ">
                            <Stars
                              rating={employee?.teamwork_communication_rating}
                            />
                          </span>
                        </div>
                        <div className="employe_factor1 mt-2">
                          <h6>4. Attitude and Behavior</h6>
                          <span className="star">
                            <Stars rating={employee?.attitude_behaviour_rating} />
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="companyreview ">
                        <span className="employee_nonjoiner_info">
                          <b>Employee Information</b>
                        </span>
                        <div className="search_mail">
                          {employee?.email || "-"}
                        </div>
                        <div className="search_mail">
                          {employee?.phone || "-"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="comapnyreviewresponisve">
                  <div>
                    <div
                      className="companyreview"
                      style={{ fontSize: "18px" }}
                    >
                      <span>
                        <b>Profile Added by -</b>
                      </span>

                      <span className="hoverable">
                        <span className="companynamereview hoverable__main">
                          {employee?.company_name || "-"}
                        </span>
                      </span>
                    </div>
                    <div className="search_mail">
                      Added on - {formatDate(employee?.added_on)}
                    </div>
                    <div className="search_mail">
                      Last Review Date - <span>{formatDate(employee?.last_review_on)}</span>
                    </div>
                  </div>
                  <div>
                    {(employee?.employee_type === "Ex Employee" || employee?.ex_employee === "1") && (
                      <div
                        className="companyreview mt-3"
                        style={{ fontSize: "18px" }}
                      >
                        <span>
                          <b>Employee Information</b>
                        </span>
                        <div className="search_mail">{employee?.email || "-"}</div>
                        <div className="search_mail">
                          Added on - {formatDate(employee?.added_on)}
                        </div>
                        <div className="search_mail">
                          Last Review Date - <span>{formatDate(employee?.last_review_on)}</span>
                        </div>
                      </div>
                    )}
                    <div className="linkedinsearch">
                      {employee?.linked_in && (
                        <a
                          className="linkedinicon"
                          style={{ width: "10%" }}
                          href={employee?.linked_in}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={linkedin} alt="linkedin" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {employee?.employee_type?.toLowerCase() !== "current employee" && (
                <div className="viewreviewbtn">
                  <Link to={`/employee-review/${employee?.sid || employee?.id}`}>
                    <button className="btn mybtn" style={{ marginTop: "1rem" }}>
                      View Reviews ({employee?.total_reviews || 0})
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ViewSearchEmployee;

