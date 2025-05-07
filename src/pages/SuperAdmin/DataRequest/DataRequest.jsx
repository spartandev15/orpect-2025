// import React from 'react'
// import { useGetDataRequestQuery } from '../../../apis/SuperAdmin/datarequest'

// const DataRequest = () => {
//     const page=1
//     const {data} = useGetDataRequestQuery({page:1})
//     console.log(data,"sd")
//   return (
//     <div>DataRequest</div>
//   )
// }

// export default DataRequest

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentEmployeeCount } from "../../../store/DashboardSlice";
import { useGetDataRequestQuery } from '../../../apis/SuperAdmin/datarequest'
import Pagination from "../../../component/Pagination";

const DataRequest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const { data, isLoading } = useGetDataRequestQuery({ page: currentPage });
  const dataList = data?.data?.data || [];
  const totalPages = data?.data?.last_page || 1;

  const filteredData = dataList.filter((item) =>
    item?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    dispatch(setCurrentEmployeeCount(filteredData.length));
  }, [filteredData, dispatch]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <div className="container-fluid viewemployee main_inner_padding">
      <div className="row">
        <div className="col-lg-9">
          <h3>Data Requests</h3>
        </div>
        <div className="col-lg-3 col-md-6 pb-4">
          <div className="search_button">
            <input
              type="search"
              className="form-control inner_search_icon"
              placeholder="Search by Name"
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
                  <th style={{ background: "#e1e9ed" }}>ID</th>
                  <th style={{ background: "#e1e9ed" }}>Name</th>
                  <th style={{ background: "#e1e9ed" }}>Email</th>
                  <th style={{ background: "#e1e9ed" }}>Request Type</th>
                  <th style={{ background: "#e1e9ed" }}>Country</th>
                  <th style={{ background: "#e1e9ed" }}>Created At</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="6" style={{ height: "200px", textAlign: "center" }}>
                      Loading...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      <p>No data requests found.</p>
                    </td>
                  </tr>
                ) : (
                  filteredData?.map((item, index) => (
                    <tr key={index} className="table_data_background">
                      <td>{item?.id}</td>
                      <td>{item?.name}</td>
                      <td>{item?.registered_email || "N/A"}</td>
                      <td>{item?.type_of_request}</td>
                      <td>{item?.country}</td>
                      <td>{new Date(item?.created_at).toLocaleString()}</td>
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

export default DataRequest;
