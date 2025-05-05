/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeBySearch } from "../../api/employee";
import { emptyData, linkedin, uploadProfile } from "../../asset";
import { Link } from "react-router-dom";
import IsCurrentEmployeeTable from "./IsCurrentEmployeeTable";
import Stars from "../extras/Stars";
import { setEmpType, setSearchValue } from "../../store/DashboardSlice";
import Pagination from "../Pagination";
import TableEmptyMsg from "./TableEmptyMsg";

const   SearchEmployeeTable = () => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state?.dashboardData?.searchValue);
  const empType = useSelector((state) => state?.dashboardData?.empType);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (searchValue) {
        setLoading(true);
        try {
          const response = await dispatch(
            getEmployeeBySearch(searchValue, empType)
          );
          const employeesData = response?.data?.employees?.data;
          setEmployees(employeesData);
          setTotalPages(employeesData?.data?.employees.last_page);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEmployees();
  }, [dispatch, searchValue, empType]);

  const handleSearchInputChange = () => {
    dispatch(setSearchValue(search));
  };
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <div className="container-fluid viewemployee searchemploye">
      <IsCurrentEmployeeTable />

      <div className="row">
        <div className="col-lg-6">
          <h3>List of Ex and Non Joiner Employees</h3>
        </div>
        <div className="col-lg-3 searchexemployeetable">
          <select defaultValue="All-Employees"
            className="form-control slect-color main_inner_dropdown "
            name="employees type"
            value={empType}
            onChange={(e) => dispatch(setEmpType(e.target.value))}
          >
            <option value=" ">All Employees</option>
            <option value="ex">Ex- Employees</option>
            <option value="nonJoiner">Non Joiners</option>
          </select>
        </div>
        <div className="col-lg-3 searchexemployeetable">
          <div className="search_button">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control inner_search_icon"
              placeholder="Search"
            />
            <i
              className="fa fa-search navi-search"
              onClick={handleSearchInputChange}
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
          {employees?.map((i, index) => (
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
                              ? `https://spartanbots.xyz/opt_lv/${i.profile_image}`
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
                            {/* {i?.email &&
                              i.email.replace(/^(.{3}).*(@.{2}).*(\.com)$/, "$1xxx$2xxx$3")} */}
                          </div>
                          <div className="search_mail">
                            {i?.phone}
                            {/* {i?.phone &&
                              i.phone.replace(
                                /(\d{2})\d+(\d{2})/,
                                "$1******$2"
                              )} */}
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
                          <span className="hoverable__tooltip1">
                            Available to Plus Members
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
          ))}
        </>
      )}

      <div>
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};
export default SearchEmployeeTable;
