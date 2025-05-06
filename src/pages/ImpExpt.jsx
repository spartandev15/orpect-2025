import React, { useState } from "react";
import Layout from "../component/layout";
import Button from "../component/Button";
import { useLazyGetExcelEmployeeQuery } from "../apis/importExportEmployee";
import { toast } from "react-toastify";

const ImportExportComponent = () => {
  const [activeTab, setActiveTab] = useState("export");
  const [exportFilter, setExportFilter] = useState("all");
  const [type, setType] = useState("pdf");

  const [importFilter, setImportFilter] = useState("employee");
  const [importFile, setImportFile] = useState(null);
  const [exportDateFrom, setExportDateFrom] = useState("");
  const [exportDateTo, setExportDateTo] = useState("");
  const [importDate, setImportDate] = useState("");
  const [getExcelEmployee, { isLoading: loading }] =
    useLazyGetExcelEmployeeQuery();

  //   const handleExport = () => {
  //     console.log("Exporting:", {
  //       filter: exportFilter,
  //       dateFrom: exportDateFrom,
  //       dateTo: exportDateTo,
  //     });
  //     // TODO: Add export CSV logic
  //   };
  const handleExport = async (format) => {
    try {
      const response = await getExcelEmployee({
        start_date: exportDateFrom,
        end_date: exportDateTo,
        status: type,
      }).unwrap();

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

  const handleImport = () => {
    console.log("Importing:", {
      filter: importFilter,
      file: importFile,
      date: importDate,
    });
    // TODO: Add file upload logic
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
                    <option value="positions">Positions</option>
                    <option value="employee">Employee</option>
                    <option value="exemployee">Ex-Employee</option>
                    <option value="nonjoiner">Non-Joiner</option>
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
                <label className="form-label">Import Type</label>
                <select
                  className="form-select"
                  value={importFilter}
                  onChange={(e) => setImportFilter(e.target.value)}
                >
                  <option value="employee">Employee</option>
                  <option value="exemployee">Ex-Employee</option>
                  <option value="nonjoiner">Non-Joiner</option>
                  <option value="positions">Position</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Import Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={importDate}
                  onChange={(e) => setImportDate(e.target.value)}
                />
              </div>
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
                //    loading={loading}
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
