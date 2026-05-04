import React from "react";
import Button from "./Button";
import CurrentEmployeeFile from "../asset/csv/employee-file.csv";
import ExEmployeeFile from "../asset/csv/ex-employee-file.csv";
import NonJoinerFile from "../asset/csv/non-joiner-file.csv";

function DownloadCsvExel({ employeeType }) {
  // Get the appropriate file based on employee type
  const getFileForType = () => {
    switch (employeeType) {
      case "current_employee":
        return CurrentEmployeeFile;
      case "ex_employee":
        return ExEmployeeFile;
      case "non_joiner":
        return NonJoinerFile;
      default:
        return null;
    }
  };

  // Get display label for employee type
  const getTypeLabel = () => {
    switch (employeeType) {
      case "Employee":
        return "Current Employees";
      case "exemployee":
        return "Ex Employees";
      case "non-joiner":
        return "Non Joiner";
      case "active":
        return "Active Employees";
      case "all":
        return "All";
      default:
        return "";
    }
  };

  const selectedFile = employeeType ? getFileForType() : null;
  const typeLabel = employeeType ? getTypeLabel() : "";

  if (!employeeType) {
    return (
      <p>
        <span 
          className="link-warning" 
          style={{ 
            color: '#999', 
            cursor: 'not-allowed',
            textDecoration: 'none',
            opacity: 0.6
          }}
        >
          Download CSV Format (Select employee type first)
        </span>
      </p>
    );
  }

  return (
    <p>
      <a 
        target="_blank" 
        download 
        className="link-warning" 
        href={selectedFile}
      >
        Download CSV Format{typeLabel ? ` (${typeLabel})` : ""}
      </a>
    </p>
  );
}

export default DownloadCsvExel;


// import React from "react";

// function DownloadCsvExcel() {
//   const handleDownload = () => {
//     const fileName = "CSVFormat.csv";
//     const csvContent = `S.no, Emp Id, Emp Name, Email, Phone, Position, Date Of Birth, Tax Number, Permanent Address, City, Country, State, Date Of Joining, Date Of Leaving, Ex Employee, Non Joiner, Performance Rating, Professional Skills Rating, Teamwork Communication Rating, Attitude Behaviour Rating, Review, linked In, Last CTC, Image Name\n`;

//     const csvData = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const csvUrl = URL.createObjectURL(csvData);
//     const tempLink = document.createElement("a");
//     tempLink.href = csvUrl;
//     tempLink.setAttribute("download", fileName);
//     document.body.appendChild(tempLink);
//     tempLink.click();
//     document.body.removeChild(tempLink);
//   };

//   return (
//     <p className="btn mybtn1" onClick={handleDownload}>
//       <strong>Download CSV Format</strong>
//     </p>
//   );
// }

// export default DownloadCsvExcel;
