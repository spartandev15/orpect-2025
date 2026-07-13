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
  const [is_account_verified, setIs_account_verified] = useState();

  
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

  const { data, isLoading, refetch } = useGetAllCompaniesQuery({ page: currentPage, search: debouncedSearch,is_account_verified:is_account_verified });
  const [accountVerified, { isLoading: verifiedLoading, error }] = useAccountVerifiedMutation()
  const companies = data?.allCompanies?.data || [];
  const totalPages = data?.allCompanies?.last_page || 1;

  const handleVerify = async (id) => {
    try {
      const response = await accountVerified(id).unwrap();
      if (response?.status === "error") {
        toast.error(response?.message || "Failed to verify company");
      }else   if (response?.status) {
        toast.success(response?.message || "Company has been successfully verified");
      }  else {
        toast.success("Company has been successfully verified.");
        refetch();
      }
    } catch (err) {
      const errorMessage = err?.data?.message || err?.message || "Failed to verify company";
      toast.error(errorMessage);
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
const handleFormatChange = (e) => {
        const selectedFormat = e.target.value
        if (!selectedFormat) return
        setIs_account_verified(selectedFormat)
    }
  return (
    <div className="container-fluid viewemployee main_inner_padding">
      <div className="row">
        <div className="col-lg-8">
          <h3>Companies</h3>
        </div>
        <div className="col-lg-4 col-md-6 d-flex pb-4 justify-content-end gap-2">
          
           {/* ✅ Export Dropdown */}
           
                <div style={{ position: 'relative' }}>
                    <select
                      style={{width:'150px'}}
                        className="form-control main_inner_dropdown"
                        defaultValue=""
                        onChange={handleFormatChange}
                        disabled={isLoading}
                    >
                        <option value=" ">Account Status</option>
                        <option value="1">Verified</option>
                        <option value="0">Unverified</option>
                    </select>

                    <i
                        className="fas fa-chevron-down"
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            color: '#6c757d',
                            fontSize: '11px'
                        }}
                    />
                </div>
           
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
                      <td >{index + 1 }</td>
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
                              <i className="fas fa-eye eye-cs "></i>
                              {/* <span className="hoverable__tooltip">View Details</span> */}
                            </span>
                          </button>
                        </Link>
                        &nbsp;&nbsp;
                        <ComapnyDelete id={company?.id} onDeleteSuccess={refetch} />
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
