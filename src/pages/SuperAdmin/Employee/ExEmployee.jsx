import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
// import SelectDefaultPosition from "../SelectDefaultPosition";
// import DeleteTableEmployee from "../delete/DeleteTableEmployee";
// import { setCurrentEmployeeCount } from "../../store/DashboardSlice";
import { getTimePeriod } from "../../../helper/getTimePeriod";
// import TableEmptyMsg from "./TableEmptyMsg";
// import ExcelPdf from "../ExcelPdf";
import { useGetExEmployeeByIdQuery } from "../../../apis/SuperAdmin/employee";
import Pagination from "../../../component/Pagination";

const ExEmployee = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [position, setPosition] = useState("");
const { id } = useParams();
  const dispatch = useDispatch();

  // RTK Query Hook
  const {
    data,
    isLoading:loading,
    isError,
    refetch,
  } = useGetExEmployeeByIdQuery({
    page: currentPage,
    searchText,
    position,
    id 
  });

  const employees = data?.exEmployee?.data || [];
  const totalPages = data?.exEmployee?.last_page || 1;

  // Dispatch employee count to Redux
//   useEffect(() => {
//     if (data?.currentEmployees?.total) {
//       dispatch(setCurrentEmployeeCount(data?.currentEmployees?.total));
//     }
//   }, [data, dispatch]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <div className="container-fluid viewemployee main_inner_padding">
      <div className="row">
        <div className="col-lg-3">
          <h3> Ex Employees</h3>
        </div>
        {/* <div className="col-lg-2 col-md-6 pb-4">
          <SelectDefaultPosition changePostion={setPosition} />
        </div> */}
        <div className="col-lg-2  col-md-6 pb-4">
          <div className="search_button">
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
        {/* <ExcelPdf/> */}
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div id="table-scroll" className="table-scroll">
            <table id="main-table" className="main-table table">
              <thead>
                <tr>
                  <th className="sticky-column-1 column-1" style={{ background: "#e1e9ed" }}>Employee ID</th>
                  <th className="sticky-column-2" style={{ background: "#e1e9ed" }}>Name</th>
                  <th className="sticky-column-3" style={{ background: "#e1e9ed" }}>Email</th>
                  <th style={{ background: "#e1e9ed" }}>Phone Number</th>
                  <th style={{ background: "#e1e9ed" }}>Designation</th>
                  <th style={{ background: "#e1e9ed" }}>Time Period</th>
                  <th className="sticky-column-last" style={{ background: "#e1e9ed" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" style={{ height: "200px" }}>
                        Loading...
                      {/* <TableEmptyMsg loading={loading} dataLength={0} /> */}
                    </td>
                  </tr>
                ) : !employees.length ? (
                  <tr>
                    <td colSpan="7">
                        Not Found
                      {/* <Link to="/add-employee" className="addempbtn1">
                        <button className="btn addempbtn">Add Employee</button>
                      </Link> */}
                      {/* <TableEmptyMsg loading={loading} dataLength={0} /> */}
                    </td>
                  </tr>
                ) : (
                  employees.map((i, index) => (
                    <tr key={index} className="table_data_background">
                      <td className="sticky-column-1 column-1">{i.emp_id}</td>
                      <td className="sticky-column-2">{i.emp_name}</td>
                      <td className="sticky-column-3">{i.email}</td>
                      <td>{i.phone}</td>
                      <td>{i.position}</td>
                      <td>{getTimePeriod(i?.date_of_joining)}</td>
                      <td className="sticky-column-last">
                        <Link to={`#`} 
                        // to={`/view-employee/${i?.sid}`}
                         style={{ textDecoration: "none" }}>
                          <button type="button" className="btn act_btn_v">
                            <span className="hoverable">
                              <i className="fas fa-eye eye-cs hoverable__main"></i>
                              <span className="hoverable__tooltip">Add Reviews</span>
                            </span>
                          </button>
                        </Link>
                        &nbsp;&nbsp;
                        {/* <DeleteTableEmployee id={i?.sid} /> */}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="col-md-12 mt-4"></div>
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

export default ExEmployee;
