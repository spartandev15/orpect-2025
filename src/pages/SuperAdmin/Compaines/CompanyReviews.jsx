import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCompanyReviewsQuery } from "../../../apis/SuperAdmin/companies";
import Pagination from "../../../component/Pagination";
import Stars from "../../../component/extras/Stars";

const CompanyReviews = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useGetCompanyReviewsQuery({ 
    page: currentPage, 
    search: debouncedSearch 
  });

  const reviews = data?.reviews?.data || [];
  const totalPages = data?.reviews?.last_page || 1;

  // Reset to page 1 when debounced search text changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const renderStars = (rating) => {
    if (!rating) return "---";
    return <Stars rating={parseFloat(rating)} />;
  };

  return (
    <div className="container-fluid viewemployee main_inner_padding">
      <div className="row">
        <div className="col-lg-9">
          <h3>Company Reviews</h3>
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
                  <th className="sticky-column-1 column-1" style={{ background: "#e1e9ed" }}>
                    Sr. No.
                  </th>
                  <th className="sticky-column-2" style={{ background: "#e1e9ed" }}>
                    Company Name
                  </th>
                  <th style={{ background: "#e1e9ed" }}>Company Email</th>
                  <th style={{ background: "#e1e9ed" }}>Phone Number</th>
                  <th style={{ background: "#e1e9ed" }}>Domain Name</th>
                  <th style={{ background: "#e1e9ed" }}>Overall Rating</th>
                  <th style={{ background: "#e1e9ed" }}>Total Reviews</th>
                  <th className="sticky-column-last" style={{ background: "#e1e9ed" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="8" style={{ height: "200px", textAlign: "center" }}>
                      Loading...
                    </td>
                  </tr>
                ) : reviews.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      <p>No company reviews found.</p>
                    </td>
                  </tr>
                ) : (
                  reviews.map((review, index) => (
                    <tr key={review.id || index} className="table_data_background">
                      <td className="sticky-column-1 column-1">
                        {(currentPage - 1) * (data?.reviews?.per_page || 10) + index + 1}
                      </td>
                      <td className="sticky-column-2">{review.company_name || "---"}</td>
                      <td>{review.company_email || "---"}</td>
                      <td>{review.company_phone || "---"}</td>
                      <td>{review.domain_name || "---"}</td>
                      <td>{renderStars(review.overall_rating)}</td>
                      <td>{review.total_reviews || 0}</td>
                      <td className="sticky-column-last">
                        <span className="d-flex">
                          <Link
                            to={`/super-admin/viewcompany/${review.company_id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <button type="button" className="btn act_btn_v">
                              <span className="hoverable">
                                <i className="fas fa-eye eye-cs hoverable__main"></i>
                                <span className="hoverable__tooltip">View Details</span>
                              </span>
                            </button>
                          </Link>
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

export default CompanyReviews;

