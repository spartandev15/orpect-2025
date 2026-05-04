import React from 'react'
import ReactPaginate from "react-paginate";

const Pagination = ({totalPages, handlePageChange, currentPage = 1}) => {
  // Convert currentPage (1-based) to selected (0-based) for react-paginate
  const selectedPage = currentPage - 1;

  return (
    <ReactPaginate
      previousLabel="&laquo;"
      nextLabel="&raquo;"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageChange}
      containerClassName="pagination justify-content-center mt-3"
      activeClassName="active-page"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      disabledClassName="disabled"
      forcePage={selectedPage >= 0 ? selectedPage : undefined}
    />
  )
}

export default Pagination