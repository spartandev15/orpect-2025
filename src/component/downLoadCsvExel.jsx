import React from "react";

function DownloadCsvExel() {
  const handleDownload = () => {
    const fileName = "CSVFormat.csv";
  const csvContent = `S.no, Emp Id, Emp Name, Email, Phone, Position, Date Of Birth, Tax Number,  Permanent Address , City, Country, State, Postal Code, Date Of Joining, Date Of Leaving, Ex Employee, Non Joiner, Performance Rating, Professional Skills Rating, Teamwork Communication Rating, Attitude Behaviour Rating, Review, linked In, Last CTC,\n`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <p className="btn mybtn1" onClick={handleDownload}>
     Download CSV Format
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
