import React from 'react'
import ReactPaginate from "react-paginate";

const Pagination = ({totalPages,handlePageChange}) => {
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
    containerClassName="pagination justify-content-center"
    activeclassname="active"
    pageClassName="page-item"
    pageLinkClassName="page-link"
    previousClassName="page-item"
    previousLinkClassName="page-link"
    nextClassName="page-item"
    nextLinkClassName="page-link"
    disabledClassName="disabled"
  />
  )
}

export default Pagination