import React from "react";
import { emptyData } from "../../asset";
import TableSpinner from "../TableSpinner";

const TableEmptyMsg = ({ loading, dataLength ,add}) => {
  if (loading) {
    return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <TableSpinner />
        </div>       
    );
  }

  if (dataLength<1) {
    return (
              
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img src={emptyData} alt="no data found" className="img-fluid" />
        </div>
         );
  }

  return null; // Return null if neither loading nor empty data conditions are met
};

export default TableEmptyMsg;
