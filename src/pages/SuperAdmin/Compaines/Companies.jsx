import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentEmployeeCount } from "../../../store/DashboardSlice";
import { getTimePeriod } from "../../../helper/getTimePeriod";
import DeleteTableUser from "../../../component/SuperAdmin/DeleteTableUser";
import { useAccountVerifiedMutation, useGetAllCompaniesQuery } from "../../../apis/SuperAdmin/companies";
import ComapnyDelete from "../../../component/SuperAdmin/ComapnyDelete";
import { toast } from "react-toastify";
import Pagination from "../../../component/Pagination";

const Companies = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useGetAllCompaniesQuery({ page: currentPage, search: debouncedSearch });
  const [accountVerified, { isLoading: verifiedLoading, error }] = useAccountVerifiedMutation()
  const companies = data?.allCompanies?.data || [];
  const totalPages = data?.allCompanies?.last_page || 1;

  const handleVerify = async (id) => {
    try {
      await accountVerified(id).unwrap();
      toast.success("Company has been successfully verified.");
    } catch (err) {
      console.error("Verification failed:", err);
    }
  };

  useEffect(() => {
    dispatch(setCurrentEmployeeCount(companies.length));
  }, [companies, dispatch]);

  // Reset to page 1 when debounced search text changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <div className="container-fluid viewemployee main_inner_padding">
      <div className="row">
        <div className="col-lg-9">
          <h3>Companies</h3>
        </div>
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
                  <th className="sticky-column-1 column-1" style={{ background: "#e1e9ed" }}>Company ID</th>
                  <th className="sticky-column-2" style={{ background: "#e1e9ed" }}>Company Name</th>
                  <th style={{ background: "#e1e9ed" }}>Owner</th>
                  <th style={{ background: "#e1e9ed" }}>Email</th>
                  <th style={{ background: "#e1e9ed" }}>Phone</th>
                  <th style={{ background: "#e1e9ed" }}>Designation</th>
                  {/* <th style={{ background: "#e1e9ed" }}>Created</th> */}
                  <th style={{ background: "#e1e9ed" }}>Account Status</th>

                  <th className="sticky-column-last" style={{ background: "#e1e9ed" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="8" style={{ height: "200px", textAlign: "center" }}>
                      Loading...
                    </td>
                  </tr>
                ) : companies.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      <Link to="/super-admin/addcompany" className="addempbtn1">
                        <button className="btn addempbtn">Add Company</button>
                      </Link>
                      <p>No companies found.</p>
                    </td>
                  </tr>
                ) : (
                  companies?.map((company, index) => (
                    <tr key={index} className="table_data_background">
                      <td >{company.sid}</td>
                      <td >{company.company_name}</td>
                      <td>{company.full_name}</td>
                      <td>{company.email}</td>
                      <td>{company.company_phone}</td>
                      <td>{company.designation}</td>
                      {/* <td>{getTimePeriod(company.created_at)}</td> */}
                      <td className="text-center">
                        <button
                          type="button"
                          className={`btn btn-sm w-100 text-white ${String(company?.is_account_verified) === "1" ? "btn-success" : "btn-danger"}`}
                          onClick={() => handleVerify(company?.id)}
                          style={{ minWidth: "100px" }}
                        >
                          {isLoading ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          ) : (
                            String(company?.is_account_verified) === "1" ? "Verified" : "Not Verified"
                          )}
                        </button>
                      </td>
                      <td className="sticky-column-last  ">
                        <span className="d-flex">
                        <Link to={`/super-admin/viewcompany/${company?.id}`} style={{ textDecoration: "none" }}>
                          <button type="button" className="btn act_btn_v">
                            <span className="hoverable">
                              <i className="fas fa-eye eye-cs hoverable__main"></i>
                              <span className="hoverable__tooltip">View Details</span>
                            </span>
                          </button>
                        </Link>
                        &nbsp;&nbsp;
                        <ComapnyDelete id={company?.id} />
                        </span>
                      </td>
                      
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
  );
};

export default Companies;
