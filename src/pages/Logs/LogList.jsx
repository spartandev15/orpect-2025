import React, { useState } from "react";
import Layout from "../../component/layout";
import Pagination from "../../component/Pagination";
import TableEmptyMsg from "../../component/table/TableEmptyMsg";
import { useLogListQuery } from "../../apis/log";


const LogList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    refetch,
  } = useLogListQuery(
    {
      page: currentPage,
      search,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const logs = data?.logs?.data || [];

  const totalPages =
    data?.logs?.last_page ||
    1;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <Layout>
      <div className="container-fluid viewemployee main_inner_padding">
        {/* HEADER */}
        <div className="row mb-3 align-items-center">
          <div className="col-lg-6 px-1">
            <h3>Log List</h3>
          </div>

          {/* <div className="col-lg-3 col-md-6 px-1">
            <div className="search_button">
              <input
                type="search"
                className="form-control inner_search_icon"
                placeholder="Search Logs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <i className="fa fa-search navi-search"></i>
            </div>
          </div> */}
        </div>

        {/* TABLE */}
        <div className="row">
          <div className="col-lg-12">
            <div id="table-scroll" className="table-scroll">
              <table
                id="main-table"
                className="main-table table"
              >
               <thead>
  <tr>
    {/* <th
      className="sticky-column-1 column-1"
      style={{ background: "#e1e9ed" }}
    >
      #
    </th> */}

    {/* <th style={{ background: "#e1e9ed" }}>
      Employee ID
    </th> */}

    <th style={{ background: "#e1e9ed" }}>
      Log Details
    </th>

    <th style={{ background: "#e1e9ed" }}>
      Activity Time
    </th>

    {/* <th style={{ background: "#e1e9ed" }}>
      Created At
    </th> */}
  </tr>
</thead>

<tbody>
  {isLoading ? (
    <tr>
      <td colSpan="5">
        <TableEmptyMsg
          loading={true}
          dataLength={0}
        />
      </td>
    </tr>
  ) : logs?.length === 0 ? (
    <tr>
      <td colSpan="5">
        <TableEmptyMsg
          loading={false}
          dataLength={0}
        />
      </td>
    </tr>
  ) : (
    logs?.map((log, index) => (
      <tr
        key={log?.id}
        className="table_data_background"
      >
        {/* <td className="sticky-column-1 column-1">
          {(currentPage - 1) * 20 + index + 1}
        </td> */}

        {/* <td>{log?.employee_id}</td> */}

        <td>{log?.log_text}</td>

        <td>{log?.activity_time}</td>

        {/* <td>
          {new Date(log?.created_at).toLocaleString()}
        </td> */}
      </tr>
    ))
  )}
</tbody>
              </table>
            </div>
          </div>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
          />
        )}
      </div>
    </Layout>
  );
};

export default LogList;