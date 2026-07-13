import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentEmployeeCount } from "../../../store/DashboardSlice";
import { getTimePeriod } from "../../../helper/getTimePeriod";
import { useGetAllAdminsQuery } from "../../../apis/SuperAdmin/user";
import DeleteTableUser from "../../../component/SuperAdmin/DeleteTableUser";
import Pagination from "../../../component/Pagination";

const User = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const dispatch = useDispatch();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, refetch } = useGetAllAdminsQuery({page: currentPage, search: debouncedSearch});

  const admins = data?.allAdmins?.data || [];
  const totalPages = data?.allAdmins?.last_page || 1;

  useEffect(() => {
    dispatch(setCurrentEmployeeCount(admins.length));
  }, [admins, dispatch]);

  // Reset to page 1 when debounced search text changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);


  useEffect(()=>{
        refetch()
  },[refetch])
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };
  return (
    <div className="container-fluid viewemployee main_inner_padding">
      <div className="row">
        <div className="col-lg-9">
          <h3>Users</h3>
        </div>
        {/* <div className="col-lg-2 col-md-6 pb-4"></div> */}
        <div className="col-lg-3 col-md-6 pb-4">
          <div className="search_button">
            <input
              type="search"
              className="form-control inner_search_icon"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
                  <th className="sticky-column-1 column-1" style={{ background: "#e1e9ed" }}>S. No.</th>
                  <th className="sticky-column-2" style={{ background: "#e1e9ed" }}>Name</th>
                  <th className="sticky-column-3" style={{ background: "#e1e9ed" }}>Email</th>
                  <th style={{ background: "#e1e9ed" }}>Phone Number</th>
                  <th style={{ background: "#e1e9ed" }}>Designation</th>
                  <th style={{ background: "#e1e9ed" }}>Time Period</th>
                  <th className="sticky-column-last" style={{ background: "#e1e9ed" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="7" style={{ height: "200px", textAlign: "center" }}>
                      Loading...
                    </td>
                  </tr>
                ) : admins.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      <Link to="/super-admin/adduser" className="addempbtn1">
                        <button className="btn addempbtn">Add User</button>
                      </Link>
                      <p>No users found.</p>
                    </td>
                  </tr>
                ) : (
                  admins.map((admin, index) => (
                    <tr key={index} className="table_data_background">
                      <td className="sticky-column-1 column-1">{index + 1}</td>
                      <td className="sticky-column-2">{admin.fullname}</td>
                      <td className="sticky-column-3">{admin.email}</td>
                      <td>{admin.phone}</td>
                      <td>Admin</td>
                      <td>{getTimePeriod(admin.created_at)}</td>
                      <td className="sticky-column-last">
                        <Link 
                        to={`/super-admin/viewuser/${admin?.id}`}
                        // to={`#`}

                         style={{ textDecoration: "none" }}>
                          <button type="button" className="btn act_btn_v">
                            <span className="hoverable">
                              <i className="fas fa-eye eye-cs "></i>
                              {/* <span className="hoverable__tooltip">View Details</span> */}
                            </span>
                          </button>
                        </Link>
                        &nbsp;&nbsp;
                        <DeleteTableUser id={admin?.id} onDeleteSuccess={refetch} />
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
                        currentPage={currentPage}
                      />
                    )}
    </div>
  );
};

export default User;
