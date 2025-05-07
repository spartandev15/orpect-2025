import React, { useState } from "react";
import Layout from "../component/layout";
import Button from "../component/Button";
import { useExcelExportMutation, useImportCSVMutation, useLazyGetExcelEmployeeQuery } from "../apis/importExportEmployee";
import { toast } from "react-toastify";

const ImportExportComponent = () => {
  const [activeTab, setActiveTab] = useState("export");
  const [exportFilter, setExportFilter] = useState("all");
  const [type, setType] = useState("pdf");

  const [importFile, setImportFile] = useState(null);
  const [exportDateFrom, setExportDateFrom] = useState("");
  const [exportDateTo, setExportDateTo] = useState("");
  const [excelExport, { isLoading: loading }] =useExcelExportMutation();
  const [importCSV, { isLoading: importloading }]=useImportCSVMutation()

  //   const handleExport = () => {
  //     console.log("Exporting:", {
  //       filter: exportFilter,
  //       dateFrom: exportDateFrom,
  //       dateTo: exportDateTo,
  //     });
  //     // TODO: Add export CSV logic
  //   };
  const handleExport = async (format) => {
    const data  ={
      start_date: exportDateFrom,
        end_date: exportDateTo,
        status: exportFilter,
        type:type
    }
    try {
      const response = await excelExport(data).unwrap();

      const fileUrl = response?.file_url;
      if (!fileUrl) {
        toast.error("File URL not found.");
        return;
      }

      // Open PDF or CSV in new tab
      window.open(fileUrl, "_blank");
    } catch (error) {
      console.error("Error opening file:", error);
      toast.error("Failed to open file.");
    }
  };

  const handleImport = async () => {
    try {
      console.log("Importing:", { file: importFile });
  
      const formData = new FormData();
      formData.append("csv_file", importFile);
  
      const response = await importCSV(formData).unwrap();
      console.log("Response:", response);
  
      if (response.status) {
        toast.success(response.message || "File imported successfully");
      } else {
        // Main error message
        toast.error(response.message || "Some entries failed to import.");
  
        // Optional: Show details of the first error
        if (response.errorList?.length > 0) {
          const firstError = response.errorList[0];
          toast.error(
            `Error for ${firstError.emp_name} (${firstError.emp_id}): ${firstError.message}`
          );
        }
  
        // Optional: You could render a modal or side panel with full errorList if needed
      }
    } catch (error) {
      console.error("File import failed:", error);
      toast.error("An error occurred during import. Please try again.");
    }
  };
  

  return (
    <Layout>
      <div className="container-fluid  csvfile">
        <div className="col-lg-12 pb-4 add-employe_csv">
          <h3>Upload CSV File</h3>
        </div>
        <div className="container mt-4">
          {/* Tabs */}
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "export" ? "active" : "text-secondary"
                }`}
                onClick={() => setActiveTab("export")}
              >
                Export
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "import" ? "active" : "text-secondary"
                }`}
                onClick={() => setActiveTab("import")}
              >
                Import
              </button>
            </li>
          </ul>

          {/* Export Tab */}
          {activeTab === "export" && (
            <div>
              <h5>Export Data</h5>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Filter</label>
                  <select
                    className="form-select"
                    value={exportFilter}
                    onChange={(e) => setExportFilter(e.target.value)}
                  >
                    <option value="all">All</option>
                    {/* <option value="positions">Positions</option> */}
                    <option value="Employee">Employee</option>
                    <option value="exemployee">Ex-Employee</option>
                    <option value="non-joiner">Non-Joiner</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Type</label>
                  <select
                    className="form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                     <option value="" disabled>
                            Select 
                        </option>
                        <option value="pdf">PDF</option>
                        <option value="csv">CSV</option>
                    
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">From Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={exportDateFrom}
                    onChange={(e) => setExportDateFrom(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">To Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={exportDateTo}
                    onChange={(e) => setExportDateTo(e.target.value)}
                  />
                </div>
              </div>
              <Button
                loading={loading}
                className="btn mybtn"
                text="Export"
                onClick={handleExport}
              />

              {/* <button className="btn btn-primary" onClick={handleExport}>
            Export CSV
          </button> */}
            </div>
          )}

          {/* Import Tab */}
          {activeTab === "import" && (
            <div>
              <h5>Import Data</h5>
         
              <div className="mb-3">
                <label className="form-label">Choose CSV File</label>
                <input
                  type="file"
                  className="form-control"
                  accept=".csv"
                  onChange={(e) => setImportFile(e.target.files[0])}
                />
              </div>
              <Button
                   loading={importloading}
                className="btn mybtn"
                text="Import CSV"
                onClick={handleImport}
              />
              {/* <button className="btn btn-success" onClick={handleImport}>
            Import CSV
          </button> */}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ImportExportComponent;
