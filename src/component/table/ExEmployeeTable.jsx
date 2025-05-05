import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import SelectDefaultPosition from "../SelectDefaultPosition";
import DeleteTableEmployee from "../delete/DeleteTableEmployee";
import Pagination from "../Pagination";
import { getExEmployeeTime } from "../../helper/getTimePeriod";
import { setExEmployeeCount } from "../../store/DashboardSlice";
import Stars from "../extras/Stars";
import TableEmptyMsg from "./TableEmptyMsg";
import { useGetExEmployeeQuery } from "../../apis/employee";
import ExcelPdf from "../ExcelPdf";

const ExEmployeeTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [position, setPosition] = useState("");

  const dispatch = useDispatch();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetExEmployeeQuery({
    page: currentPage,
    searchText,
    position,
  });

  const employees = data?.exEmployee?.data || [];
  const totalPages = data?.exEmployee?.last_page || 1;

  // Set total employee count to dashboard slice
  React.useEffect(() => {
    if (data?.exEmployee?.total) {
      dispatch(setExEmployeeCount(data.exEmployee.total));
    }
  }, [data, dispatch]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <div className="container-fluid viewemployee main_inner_padding">
      <div className="row">
        <div className="col-lg-3">
          <h3>Ex Employees</h3>
        </div>
        <div className="col-lg-2 col-md-6 pb-4">
          <SelectDefaultPosition changePostion={setPosition} />
        </div>
        <div className="col-lg-2 col-md-6 pb-4">
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
        <ExcelPdf/>
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
                  <th style={{ background: "#e1e9ed" }}>Rating</th>
                  <th className="sticky-column-last" style={{ background: "#e1e9ed" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="9" style={{ height: "200px" }}>
                      <TableEmptyMsg loading={isLoading} dataLength={0} />
                    </td>
                  </tr>
                ) : employees.length === 0 ? (
                  <tr>
                    <td colSpan="9">
                      <Link to="/add-exemployee-review" className="addempbtn1">
                        <button className="btn addempbtn">Add Ex Employee</button>
                      </Link>
                      <TableEmptyMsg loading={false} dataLength={0} />
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
                      <td>{getExEmployeeTime(i?.date_of_joining, i?.date_of_leaving)}</td>
                      <td><Stars rating={i?.overall_rating} /></td>
                      <td className="sticky-column-last">
                        <Link to={`/view-exemployee/${i.sid}`} style={{ textDecoration: "none" }}>
                          <button type="button" className="btn act_btn_v">
                            <i className="fas fa-eye eye-cs"></i>
                          </button>
                        </Link>
                        &nbsp; &nbsp;
                        <DeleteTableEmployee id={i.sid} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ExEmployeeTable;
