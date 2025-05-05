import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import DeleteTableEmployee from "../delete/DeleteTableEmployee";
import { getFromLocalStorage } from "../../helper";
import Pagination from "../Pagination";
import Stars from "../extras/Stars";
import { setExEmployeeCount } from "../../store/DashboardSlice";
import { getPosition } from "../../api/postion";
import { getExEmployeeTime } from "../../helper/getTimePeriod";
import { BASE_URL } from "../../api/baseUrl";
import TableEmptyMsg from "./TableEmptyMsg";
import { useGetExEmployeeAndNonJoinerQuery } from "../../apis/employee";


const PreviousReviewTable = () => {
  // const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [position, setPosition] = useState("");
  const [getAllPosition, setAllPosition] = useState(null);
  const [empType, setEmpType] = useState("");

  const dispatch = useDispatch();

  const token = getFromLocalStorage("token");
//  const {data}=useGetExEmployeeAndNonJoinerQuery()
 const { data, isLoading:loading } = useGetExEmployeeAndNonJoinerQuery({
  page: currentPage,
  searchText,
  position,
  emp: empType,
});
  // const fetchEmployees = async (page) => {
  //   setLoading(true);
  //   try {
  //     const headers = { Authorization: `Bearer ${token}` };

  //     const response = await axios.get(
  //       `${BASE_URL}/getExEmployeesAndNonJoiners?page=${page}&searchText=${searchText}&position=${position}&emp=${empType}`,
  //       {
  //         headers: headers,
  //       }
  //     );

  //     const data = response.data;
  //     setEmployees(data?.exEmployee?.data);
  //     setTotalPages(data.exEmployee.last_page);
  //     dispatch(setExEmployeeCount(data?.exEmployee?.data?.length));
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchEmployees(currentPage);
  // }, [currentPage, searchText, position, empType]);
 
  useEffect(()=>{
    setEmployees(data?.exEmployee?.data);
      setTotalPages(data?.exEmployee.last_page);
      dispatch(setExEmployeeCount(data?.exEmployee?.data?.length));
  },[data])
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  useEffect(() => {
    dispatch(getPosition()).then((res) => {
      setAllPosition(res?.data?.positions);
    });
  }, []);

  return (
    <div className="container-fluid viewemployee main_inner_padding">
      <div className="row">
        <div className="col-lg-12">
          <h3> Previous Reviews</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 pd-4">
          <select defaultValue="All-Employees"
            className="form-control slect-color main_inner_dropdown"
            name="employees type"
            value={empType}
            onChange={(e) => setEmpType(e.target.value)}
          >
            <option value="All-Employees">All Employees</option>
            <option value="ex">Ex- Employees</option>
            <option value="nonJoiner">Non Joiners</option>
          </select>
        </div>

        <div className="col-lg-4 col-md-6 pb-4">
          <select
            className="form-control main_inner_dropdown"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option value="">Select Position</option>
            {getAllPosition?.map((i) => (
              <option key={i.id} value={i.position} selected={i.position}>
                {i.position}
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-4  col-md-6 pb-4">
          <div className="search_button">
            {/* <i className="fa fa-search search_icon"></i> */}
            <input
              type="search"
              className="form-control inner_search_icon"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <i className="fa fa-search navi-search"></i>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div id="table-scroll" className="table-scroll">
            <table id="main-table" className="main-table table">
              <thead>
                <tr>
                  {empType === "nonJoiner" ? null : (
                    <th
                      className="sticky-column-1  column-1"
                      scope="col"
                      style={{ background: "rgb(225, 233, 237)" }}
                    >   
                      Employee Id
                    </th>
                  )}
                  <th
                    scope="col"
                    style={{ background: "rgb(225, 233, 237)" }}
                  >
                    Name{" "}
                  </th>
                  <th
                    scope="col"
                    style={{ background: "rgb(225, 233, 237)" }}
                  >
                    Email
                  </th>
                  <th scope="col" style={{ background: "rgb(225, 233, 237)" }}>
                    Phone Number
                  </th>
                  <th scope="col" style={{ background: "rgb(225, 233, 237)" }}>
                    Designation
                  </th>
                  {empType === "ex" && (
                    <>
                      <th
                        scope="col"
                        style={{ background: "rgb(225, 233, 237)" }}
                      >
                        Time Period
                      </th>
                      <th
                        scope="col"
                        style={{ background: "rgb(225, 233, 237)" }}
                      >
                        Rating
                      </th>
                    </>
                  )}
                  <th
                    className="sticky-column-last"
                    scope="col"
                    style={{ background: "rgb(225, 233, 237)" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              {loading ? (
                <tr>
                <td colSpan="8" style={{ height: "200px" }}>
                   <TableEmptyMsg
                    loading={loading}
                    dataLength={employees?.length}
                  />
                </td></tr>
              ) : (
                <tbody>
                  {!employees?.length ? (
                    <tr>
                    <td colSpan="9"  >
                       <Link to="/add-review"  className="addempbtn1"> <button className="btn addempbtn"> Add Review </button></Link>
                       <TableEmptyMsg
                        loading={loading}
                        dataLength={employees?.length}
                      />
                    </td></tr>
                  ) : (
                    employees?.map((i, index) => (
                      <tr key={index} className="table_data_background">
                        {/* <td className="sticky-column-1">{index + 1}</td> */}
                        {empType === "nonJoiner" ? null : (
                          <td className="sticky-column-1 column-1">
                            {i.emp_id ? i.emp_id : "---"}
                          </td>
                        )}
                        <td  >{i.emp_name}</td>
                        <td  >{i.email}</td>
                        <td>{i.phone}</td>
                        <td>{i.position}</td>
                        {empType === "ex" && (
                          <>
                            <td>
                              {i?.date_of_joining
                                ? getExEmployeeTime(
                                    i?.date_of_joining,
                                    i?.date_of_leaving
                                  )
                                : "---"}
                            </td>
                            <td>
                              {i?.overall_rating === "0.0" ? (
                                "---"
                              ) : (
                                <Stars rating={i?.overall_rating} />
                              )}
                            </td>
                          </>
                        )}
                        <td className="sticky-column-last">
                          {i?.ex_employee === "1" ? (
                            <Link
                              to={`/view-exemployee/${i.sid}`}
                              style={{ textDecoration: "none" }}
                            >
                              <button type="button" className="btn  act_btn_v">
                                <i className="fas fa-eye eye-cs"></i>
                              </button>
                            </Link>
                          ) : (
                            <Link
                              to={`/view-nonjoiner/${i.sid}`}
                              style={{ textDecoration: "none" }}
                            >
                              <button type="button" className="btn  act_btn_v">
                                <i className="fas fa-eye eye-cs"></i>
                              </button>
                            </Link>
                          )}
                          &nbsp; &nbsp;
                          <DeleteTableEmployee id={i.sid} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      <div className="col-md-12 mt-4"></div>
      <div style={{ zIndex: 1 }}>
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
export default PreviousReviewTable;
