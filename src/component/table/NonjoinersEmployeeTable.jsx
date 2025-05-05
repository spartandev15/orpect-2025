import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import SelectDefaultPosition from "../SelectDefaultPosition";
import DeleteTableEmployee from "../delete/DeleteTableEmployee";
import Pagination from "../Pagination";
import { setNonJoinerCount } from "../../store/DashboardSlice";
import TableEmptyMsg from "./TableEmptyMsg";
import { useGetNonJoinerEmployeeQuery } from "../../apis/employee";

const CurrentEmployeeTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [position, setPosition] = useState("");
  const [dataIndex, setDataIndex] = useState(1);

  const dispatch = useDispatch();

  const {
    data,
    isLoading: loading,
    isError,
    refetch,
  } = useGetNonJoinerEmployeeQuery({
    page: currentPage,
    searchText,
    position,
  });

  const employees = data?.nonJoiners?.data || [];
  const totalPages = data?.nonJoiners?.last_page || 1;

  useEffect(() => {
    if (data?.nonJoiners) {
      dispatch(setNonJoinerCount(data.nonJoiners.total));
      setDataIndex(data.nonJoiners.from || 1);
    }
  }, [data, dispatch]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <div className="container-fluid viewemployee main_inner_padding">
      <div className="row">
        <div className="col-lg-5">
          <h3> Non Joiners</h3>
        </div>
        <div className="col-lg-4 col-md-6 pb-4">
          <SelectDefaultPosition changePostion={setPosition} />
        </div>
        <div className="col-lg-3  col-md-6 pb-4">
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
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div id="table-scroll" className="table-scroll">
            <table id="main-table" className="main-table table">
              <thead>
                <tr>
                  <th style={{ background: "#e1e9ed" }}>Sr. No.</th>
                  <th style={{ background: "#e1e9ed" }}>Name</th>
                  <th style={{ background: "#e1e9ed" }}>Email</th>
                  <th style={{ background: "#e1e9ed" }}>Phone Number</th>
                  <th style={{ background: "#e1e9ed" }}>Designation</th>
                  <th style={{ background: "#e1e9ed" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" style={{ height: "200px" }}>
                      <TableEmptyMsg loading={loading} dataLength={employees.length} />
                    </td>
                  </tr>
                ) : !employees.length ? (
                  <tr>
                    <td colSpan="6">
                      <Link to="/add-nonjoiner-review" className="addempbtn1">
                        <button className="btn addempbtn">Add Non Joiner</button>
                      </Link>
                      <TableEmptyMsg loading={loading} dataLength={employees.length} />
                    </td>
                  </tr>
                ) : (
                  employees.map((i, index) => (
                    <tr key={index} className="table_data_background">
                      <td>{dataIndex + index}</td>
                      <td>{i.emp_name}</td>
                      <td>{i.email}</td>
                      <td>{i.phone}</td>
                      <td>{i.position}</td>
                      <td>
                        <Link to={`/view-nonjoiner/${i.sid}`} style={{ textDecoration: "none" }}>
                          <button type="button" className="btn act_btn_v">
                            <i className="fas fa-eye eye-cs"></i>
                          </button>
                        </Link>
                        &nbsp;&nbsp;
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
        <Pagination totalPages={totalPages} handlePageChange={handlePageChange} />
      )}
    </div>
  );
};

export default CurrentEmployeeTable;
