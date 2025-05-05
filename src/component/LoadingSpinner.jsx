import React from "react";
import { loader } from "../asset";
import "../asset/css/snipper.css";

const LoadingSpinner=()=> {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
      <img src={loader} alt=""  className="img-fluid"/>
      </div>
    </div>
  );
}

export default LoadingSpinner