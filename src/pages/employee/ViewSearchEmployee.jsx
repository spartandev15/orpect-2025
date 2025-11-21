import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Layout from "../../component/layout";
import LoadingSpinner from "../../component/LoadingSpinner";
import { getEmployee, getEmployeesRecord } from "../../api/employee";
import Stars from "../../component/extras/Stars";
import Pagination from "../../component/Pagination";
import RenderIf from "../../component/RenderIf";
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
  const [showTable, setShowTable] = useState(false);
  const [employeeRecords, setEmployeeRecords] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

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

  // Reset page when table is toggled
  useEffect(() => {
    if (showTable) {
      setCurrentPage(1);
    }
  }, [showTable]);

  // Fetch employee records when table is shown
  useEffect(() => {
    if (showTable && id) {
      setRecordsLoading(true);
      dispatch(getEmployeesRecord(id, currentPage))
        .then((res) => {
          if (res?.data?.status && res?.data?.data) {
            setEmployeeRecords(res.data.data.data || []);
            setTotalPages(res.data.data.last_page || 1);
          }
          setRecordsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching employee records:", error);
          setRecordsLoading(false);
        });
    }
  }, [dispatch, showTable, id, currentPage]);

  useEffect(() => {
    setShowTable(false)
  }, [id]);


  // Compute values for button rendering
  const employeeId = employee?.sid || employee?.id || id;
  const isCurrentEmployee = employee?.employee_type?.toLowerCase() === "current employee";
  const reviewPath = `/employee-review/${employeeId}`;


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
                    <RenderIf
                      condition={employee?.employee_type === "Ex Employee" || employee?.ex_employee === "1"}
                      fallback={
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
                      }
                    >
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
                    </RenderIf>
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
                    <RenderIf condition={employee?.last_review_on}>
                      <div className="search_mail">
                        Last Review Date - <span>{formatDate(employee?.last_review_on)}</span>
                      </div>
                    </RenderIf>

                  </div>
                  <div>
                    <RenderIf condition={employee?.employee_type === "Ex Employee" || employee?.ex_employee === "1"}>
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
                    </RenderIf>
                    <div className="linkedinsearch">
                      <RenderIf condition={employee?.linked_in}>
                        <a
                          className="linkedinicon"
                          style={{ width: "10%" }}
                          href={employee?.linked_in}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={linkedin} alt="linkedin" />
                        </a>
                      </RenderIf>
                    </div>
                  </div>
                </div>
              </div>
              <RenderIf
                condition={isCurrentEmployee}
                fallback={
                  <div className="viewreviewbtn">
                    <Link to={reviewPath}>
                      <button className="btn mybtn" style={{ marginTop: "1rem" }}>
                        View Reviews
                      </button>
                    </Link>
                  </div>
                }
              >
                <div className="col-12">
                  <div className="d-flex justify-content-center gap-2" style={{ marginTop: "1rem" }}>
                    <button
                      className="btn mybtn m-0 px-4"
                      onClick={() => navigate(`/view-search-employee/current-employee/${employeeId}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="btn mybtn m-0 px-4"
                      onClick={() => setShowTable(!showTable)}
                    >
                      {showTable ? "Hide Records" : "View Records"}
                    </button>

                  </div>
                </div>
              </RenderIf>

            </div>
          </div>
          <RenderIf condition={showTable}>
            <div className="row mt-2">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div id="table-scroll" className="table-scroll">
                  <table id="main-table" className="main-table table">
                    <thead>
                      <tr>
                        <th className="sticky-column-1 column-1" style={{ background: "#e1e9ed" }}>Employee ID</th>
                        <th className="sticky-column-2" style={{ background: "#e1e9ed" }}>Employee Name</th>
                        <th className="sticky-column-3" style={{ background: "#e1e9ed" }}>Email</th>
                        <th style={{ background: "#e1e9ed" }}>Phone Number</th>
                        <th style={{ background: "#e1e9ed" }}>Designation</th>
                        <th style={{ background: "#e1e9ed" }}>Employee Type</th>
                        <th style={{ background: "#e1e9ed" }}>Company</th>
                        <th style={{ background: "#e1e9ed" }}>Date of List</th>
                        <th className="sticky-column-last" style={{ background: "#e1e9ed" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <RenderIf
                        condition={recordsLoading}
                        fallback={
                          <RenderIf
                            condition={employeeRecords.length === 0}
                            fallback={
                              <>
                                {employeeRecords.map((i, index) => {
                                  // Determine employee type based on ex_employee and non_joiner
                                  let employeeType = "Current Employee";
                                  if (i.ex_employee === "1") {
                                    employeeType = "Ex Employee";
                                  } else if (i.non_joiner === "1") {
                                    employeeType = "Non Joiner";
                                  }

                                  return (
                                    <tr key={index} className="table_data_background">
                                      <td className="sticky-column-1 column-1">{i.sid ?? i.emp_id ?? "-"}</td>
                                      <td className="sticky-column-2">{i.emp_name ?? "-"}</td>
                                      <td className="sticky-column-3">{i.email ?? "-"}</td>
                                      <td>{i.phone ?? "-"}</td>
                                      <td>{i.position ?? i.designation ?? "-"}</td>
                                      <td>{employeeType}</td>
                                      <td>{i.company_name ?? "-"}</td>
                                      <td>{i.created_at ? formatDate(i.created_at) : "-"}</td>
                                      <td className="sticky-column-last">
                                        <Link to={`/view-search-employee/${i.id}`} style={{ textDecoration: "none" }}>
                                          <button type="button" className="btn act_btn_v">
                                            <i className="fas fa-eye eye-cs"></i>
                                          </button>
                                        </Link>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </>
                            }
                          >
                            <tr>
                              <td colSpan="9" className="text-center" style={{ padding: "2rem" }}>
                                No records found
                              </td>
                            </tr>
                          </RenderIf>
                        }
                      >
                        <tr>
                          <td colSpan="9" className="text-center" style={{ padding: "2rem" }}>
                            {/* <LoadingSpinner /> */}
                            <div className="spinner-border text-warning" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </td>
                        </tr>
                      </RenderIf>
                    </tbody>
                  </table>
                </div>
              </div>
              <RenderIf condition={totalPages > 1}>
                <div className="mt-3">
                  <Pagination
                    totalPages={totalPages}
                    handlePageChange={(selectedPage) => setCurrentPage(selectedPage.selected + 1)}
                    currentPage={currentPage}
                  />
                </div>
              </RenderIf>
            </div>
          </RenderIf>
        </div>

      </Layout>
    </>
  );
};

export default ViewSearchEmployee;


