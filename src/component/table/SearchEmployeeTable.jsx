/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeBySearch } from "../../api/employee";
import { emptyData, linkedin, uploadProfile } from "../../asset";
import { IMAGE_BASE_URL_WITH_SLASH } from "../../api/baseUrl";
import { Link } from "react-router-dom";
import IsCurrentEmployeeTable from "./IsCurrentEmployeeTable";
import Stars from "../extras/Stars";
import { setEmpType, setSearchValue } from "../../store/DashboardSlice";
import Pagination from "../Pagination";
import TableEmptyMsg from "./TableEmptyMsg";
import moment from "moment";

const SearchEmployeeTable = () => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state?.dashboardData?.searchValue);
  const empType = useSelector((state) => state?.dashboardData?.empType);
  
  // Initialize search state from Redux
  const [search, setSearch] = useState(searchValue ?? "");

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const response = await dispatch(
        getEmployeeBySearch(search || "", empType || " ", currentPage)
      );
      const employeesData = response?.data?.employees?.data;
      setEmployees(employeesData);
      setTotalPages(response?.data?.employees?.last_page);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [dispatch, search, empType, currentPage]);

  const handleSearchInputChange = () => {
    setCurrentPage(1); // Reset to first page on new search
    dispatch(setSearchValue(search));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setCurrentPage(1); // Reset to first page on new search
      dispatch(setSearchValue(search));
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  // Reset to page 1 when empType changes from Redux
  useEffect(() => {
    setCurrentPage(1);
  }, [empType]);

  // Fetch employees when search, empType, or currentPage changes
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(()=>{
    setSearch(searchValue ?? "");
  },[searchValue])

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
      <div className="container-fluid viewemployee searchemploye">
        {/* <IsCurrentEmployeeTable /> */}

        <div className="row">
          <div className="col-lg-6 mb-2">
            <h3>All Employees</h3>
          </div>
          <div className="col-lg-3 searchexemployeetable">
            {/* <div style={{ position: 'relative' }}>
              <select defaultValue="All-Employees"
                className="form-control slect-color main_inner_dropdown "
                name="employees type"
                value={empType}
                onChange={(e) => dispatch(setEmpType(e.target.value))}
                style={{
                  appearance: 'none',
                  paddingRight: '30px'
                }}
              >
                <option value=" ">All Employees</option>
                <option value="ex">Ex- Employees</option>
                <option value="nonJoiner">Non Joiners</option>
                <option value="current">Current Employees</option>
              </select>
              <i
                className="fa fa-chevron-down"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: '#666',
                  fontSize: '11px'
                }}
              ></i>
            </div> */}
          </div>
          <div className="col-lg-3 searchexemployeetable">
            <div className="search_button">
              <input
                type="text"
                value={search}
                onChange={(e) =>{
                   setSearch(e.target.value);
                }}
                // onKeyPress={handleKeyPress}
                className="form-control inner_search_icon"
                placeholder="Search"
              />
              <i
                className="fa fa-search navi-search"
                onClick={handleSearchInputChange}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
        </div>
        {!loading && employees.length === 0 && (
          <>
            <div className="text-center mt-2">
              <img src={emptyData} alt="no data found" className="img-fluid" />
            </div>
          </>
        )}
        {loading && (
          <TableEmptyMsg
            loading={loading}
            dataLength={employees?.length}
          />
        )}
        {!loading && employees.length > 0 && (
          <>
            {/* Old Card-based Layout Code - Commented Out */}
            {/* {employees?.map((i, index) => (
              <div className="searchemployesection mt-4 pb-3" key={index}>
                <div className="row companylogosreachtop">
                  <div className="col-lg-8 col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="product-thumbnail">
                          <img
                            className="pic"
                            src={
                              i?.profile_image
                                ? `${IMAGE_BASE_URL_WITH_SLASH}${i.profile_image}`
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
                            {" "}
                            {i?.emp_name}{" "}
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              color: "#f6a21e",
                              fontSize: "14px",
                            }}
                          >
                            {i?.employee_type}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-9">
                        {i?.employee_type === "Ex Employee" ? (
                          <>
                            <p className="employe_rating_heading"> Rating</p>
                            <span>
                              <Stars rating={i?.overall_rating} />
                            </span>

                            <div className="employe_factor1 mt-2">
                              <h6>1. Job Performance</h6>
                              <span className="star ">
                                <Stars rating={i?.performance_rating} />
                              </span>
                            </div>
                            <div className="employe_factor1 mt-2">
                              <h6>2. Professional Skills</h6>
                              <span className="star ">
                                <Stars rating={i?.professional_skills_rating} />
                              </span>
                            </div>
                            <div className="employe_factor1 mt-2">
                              <h6>3. Teamwork and Communication</h6>
                              <span className="star ">
                                <Stars
                                  rating={i?.teamwork_communication_rating}
                                />
                              </span>
                            </div>
                            <div className="employe_factor1 mt-2">
                              <h6>4. Attitude and Behavior</h6>
                              <span className="star ">
                                <Stars rating={i?.attitude_behaviour_rating} />
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="companyreview ">
                            <span className="employee_nonjoiner_info">
                              <b>Employee Information</b>
                            </span>
                            <div className="search_mail">
                              {i?.email}
                            </div>
                            <div className="search_mail">
                              {i?.phone}

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
                              {i?.company_name}
                            </span>
                          
                          </span>
                        </div>
                        <div className="search_mail">
                          Added on - {i?.added_on}
                        </div>
                        <div className="search_mail">
                          Last Review Date - <span>{i?.last_review_on}</span>
                        </div>
                      </div>
                      <div>
                        {i?.employee_type === "Ex Employee" && (
                          <div
                            className="companyreview mt-3"
                            style={{ fontSize: "18px" }}
                          >
                            <span>
                              <b>Employee Information</b>
                            </span>
                            <div className="search_mail">{i?.email}</div>
                            <div className="search_mail">
                              Added on - {i?.added_on}
                            </div>
                            <div className="search_mail">
                              Last Review Date - <span>{i?.last_review_on}</span>
                            </div>
                          </div>
                        )}
                        <div className="linkedinsearch">
                          {i?.linked_in && (
                            <a
                              className="linkedinicon"
                              style={{ width: "10%" }}
                              href={i?.linked_in}
                              target="_blank"
                            >
                              <img src={linkedin} alt="linkedin" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="viewreviewbtn">
                    <Link to={`/employee-review/${i?.sid}`}>
                      <button className="btn mybtn" style={{ marginTop: "1rem" }}>
                        View Reviews ({i?.total_reviews || 0})
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))} */}

            {/* New Table Layout */}
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div id="table-scroll" className="table-scroll">
                  <table id="main-table" className="main-table table">
                    <thead>
                      <tr>
                        <th className="sticky-column-1 column-1" style={{ background: "#e1e9ed" }}>Employee ID</th>
                        <th className="sticky-column-2" style={{ background: "#e1e9ed", maxWidth: "150px" }}>Employee Name</th>
                        <th className="sticky-column-3" style={{ background: "#e1e9ed" }}>Email</th>
                        <th style={{ background: "#e1e9ed" }}>Phone Number</th>
                        <th style={{ background: "#e1e9ed" }}>Designation</th>
                        <th style={{ background: "#e1e9ed" }}>Employee Type</th>
                        <th style={{ background: "#e1e9ed" }}>Company</th>
                        <th style={{ background: "#e1e9ed" }}>Date of List</th>
                        <th className="sticky-column-last" style={{ background: "#e1e9ed",textAlign:'center' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((i, index) => (
                        <tr key={index} className="table_data_background">
                          <td className="sticky-column-1 column-1">{i.sid ?? "-"}</td>
                          <td className="sticky-column-2" style={{ maxWidth: "150px", wordWrap: "break-word" }}>{i.emp_name}</td>
                          <td className="sticky-column-3">{i.email}</td>
                          <td>{i.phone}</td>
                          <td>{i.designation || i.position || "-"}</td>
                          <td>{i.employee_type}</td>
                          <td>{i.company_name}</td>
                          <td>{i.added_on}</td>
                          <td className="sticky-column-last" style={{textAlign:'center'}}>
                            <Link to={`/view-search-employee/${i.id}`} style={{ textDecoration: "none" ,textAlign:'center'}}>
                              <button type="button" className="btn act_btn_v" >
                                <i className="fas fa-eye eye-cs" ></i>
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        <div>
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default SearchEmployeeTable;
