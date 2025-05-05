import React from 'react'
import { loader } from '../asset'
import "../asset/css/snipper.css";
const TableSpinner = () => {
  return (
    <div className="spinner-container-table ">
    <div className="loading-spinner">
    <img src={loader} alt=""  className="img-fluid"/>
    </div>
  </div>
  )
}

export default TableSpinner