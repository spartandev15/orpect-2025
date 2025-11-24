import React, { useState, useRef } from "react";
import Layout from "../component/layout";
import Button from "../component/Button";
import { useExcelExportMutation, useImportCSVMutation, useLazyGetExcelEmployeeQuery } from "../apis/importExportEmployee";
import { toast } from "react-toastify";
import DownloadCsvExel from "../component/downLoadCsvExel";
import Select from "react-select";

const ImportExportComponent = () => {
  const [activeTab, setActiveTab] = useState("export");
  const [exportFilter, setExportFilter] = useState("all");
  const [type, setType] = useState("pdf");

  const [importFile, setImportFile] = useState(null);
  const [exportDateFrom, setExportDateFrom] = useState("");
  const [exportDateTo, setExportDateTo] = useState("");
  const [importEmployeeType, setImportEmployeeType] = useState(null);
  const [excelExport, { isLoading: loading }] = useExcelExportMutation();
  const [importCSV, { isLoading: importloading }] = useImportCSVMutation()
  const fileInputRef = useRef(null);

  // Employee type options for React Select
  const employeeTypeOptions = [
    { value: "current_employee", label: "Current Employees" },
    { value: "ex_employee", label: "Ex Employees" },
    { value: "non_joiner", label: "Non Joiner" },
  ];

  //   const handleExport = () => {
  //     console.log("Exporting:", {
  //       filter: exportFilter,
  //       dateFrom: exportDateFrom,
  //       dateTo: exportDateTo,
  //     });
  //     // TODO: Add export CSV logic
  //   };
  const handleExport = async (format) => {
    const data = {
      start_date: exportDateFrom,
      end_date: exportDateTo,
      status: exportFilter,
      type: type
    }
    try {
      const response = await excelExport(data).unwrap();

      if (response?.status === "error") {
        toast.error(response?.message || "Failed to export file");
        return;
      }

      const fileUrl = response?.file_url;
      if (!fileUrl) {
        toast.error("File URL not found.");
        return;
      }

      // Open PDF or CSV in new tab
      window.open(fileUrl, "_blank");
    } catch (error) {
      const errorMessage = error?.data?.message || error?.message || "Failed to open file.";
      toast.error(errorMessage);
      console.error("Error opening file:", error);
    }
  };

  const handleImport = async (file) => {
    if (!file) {
      toast.error("Please select a file to import");
      return;
    }

    if (!importEmployeeType) {
      toast.error("Please select an employee type");
      return;
    }

    try {
      console.log("Importing:", { file, employeeType: importEmployeeType?.value });

      const formData = new FormData();
      formData.append("csv_file", file);
      formData.append("employee_type", importEmployeeType.value);

      const response = await importCSV(formData).unwrap();
      console.log("Response:", response);

      if (response?.status === "error") {
        toast.error(response?.message || "Failed to import file");
        // Optional: Show details of the first error
        if (response.errorList?.length > 0) {
          const firstError = response.errorList[0];
          toast.error(
            `Error for ${firstError.emp_name} (${firstError.emp_id}): ${firstError.message}`
          );
        }
      } else if (response?.status) {
        toast.success(response.message || "File imported successfully");
        setImportFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        toast.error(response?.message || "Some entries failed to import.");
      }
    } catch (error) {
      const errorMessage = error?.data?.message || error?.message || "An error occurred during import. Please try again.";
      toast.error(errorMessage);
      console.error("File import failed:", error);
    } finally {
      fileInputRef.current.value = '';
      setImportFile(null);
    }
  };

  const handleFileChange = (e) => {
    if (!importEmployeeType) {
      toast.error("Please select an employee type first");
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }
    
    const file = e.target.files[0];
    if (file) {
      setImportFile(file);
      // Automatically upload the file when selected
      handleImport(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!importEmployeeType) {
      toast.error("Please select an employee type first");
      return;
    }
    
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xls') || file.name.endsWith('.xlsx'))) {
      setImportFile(file);
      // Automatically upload the file when dropped
      handleImport(file);
    } else {
      toast.error("Please select a valid CSV or Excel file");
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
                className={`nav-link ${activeTab === "export" ? "active" : "text-secondary"
                  }`}
                onClick={() => setActiveTab("export")}
              >
                Export
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "import" ? "active" : "text-secondary"
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
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h4 className="text-center mb-4" style={{ color: '#333', fontWeight: '500' }}>
                Import CSV File
              </h4>

              <div
                className="border rounded p-4"
                style={{
                  backgroundColor: '#f8f9fa',
                  borderColor: '#0066cc',
                  borderWidth: '1px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {/* Employee Type Select */}
                <div className="mb-4">
                  <label className="form-label" style={{ color: '#333', fontWeight: '500', marginBottom: '8px' }}>
                    Select Employee Type <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Select
                    name="employee_type"
                    defaultValue={employeeTypeOptions[0]?.value ?? null}
                    value={importEmployeeType}
                    onChange={setImportEmployeeType}
                    options={employeeTypeOptions}
                    isSearchable={false}
                    placeholder="Select employee type..."
                    className="react-select-container"
                    classNamePrefix="react-select"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderColor: state.isFocused ? '#134d75' : '#d3d3d3',
                        boxShadow: state.isFocused ? '0 0 0 1px #134d75' : 'none',
                        '&:hover': {
                          borderColor: state.isFocused ? '#134d75' : '#d3d3d3',
                        },
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected 
                          ? '#134d75' 
                          : state.isFocused 
                          ? '#f5f5f5' 
                          : base.backgroundColor,
                        color: state.isSelected ? '#fff' : "#000",
                        '&:active': {
                          backgroundColor: '#134d75',
                        },
                        '&:hover': {
                          color: "#000",
                          backgroundColor: '#f5f5f5',
                        },
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: '#134d75',
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: '#999',
                      }),
                    }}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: '#134d75',
                        primary25: '#134d75',
                        primary50: '#134d75',
                        primary75: '#134d75',
                      },
                    })}
                  />
                </div>

                {/* Download Demo File Section */}
                <div className="text-center mb-4">
                  {/* <h6 className="mb-3" style={{ color: '#333', fontWeight: '500' }}>
                    Download Demo File
                  </h6> */}
                  <DownloadCsvExel employeeType={importEmployeeType?.value} />
                </div>

                {/* File Upload Dropzone */}
                <div
                  className="border rounded p-5 text-center"
                  style={{
                    borderColor: importEmployeeType ? '#0066cc' : '#d3d3d3',
                    borderWidth: '2px',
                    borderStyle: 'dashed',
                    backgroundColor: importEmployeeType ? '#fff' : '#f5f5f5',
                    minHeight: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: importEmployeeType ? 'pointer' : 'not-allowed',
                    opacity: importEmployeeType ? 1 : 0.6,
                    pointerEvents: importEmployeeType ? 'auto' : 'none'
                  }}
                  onDragOver={importEmployeeType ? handleDragOver : (e) => e.preventDefault()}
                  onDrop={importEmployeeType ? handleDrop : (e) => e.preventDefault()}
                  onClick={importEmployeeType ? () => fileInputRef.current?.click() : undefined}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="csv_file"
                    onChange={handleFileChange}
                    id="csvUpload"
                    style={{ display: "none" }}
                    accept=".xls,.xlsx,.csv"
                    disabled={!importEmployeeType}
                  />
                  <Button
                    className="btn mybtn"
                    text={importFile ? importFile.name : "Select CSV file"}
                    loading={importloading}
                    disabled={!importEmployeeType}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (importEmployeeType) {
                        fileInputRef.current?.click();
                      } else {
                        toast.error("Please select an employee type first");
                      }
                    }}
                  />
                  <p style={{ color: '#666', marginTop: '10px', marginBottom: '0' }}>
                    {!importEmployeeType 
                      ? "Please select employee type first" 
                      : importloading 
                      ? "Uploading..." 
                      : "or Drag and Drop Here"}
                  </p>
                </div>

                {/* Import Button */}
                {/* <div className="text-center mt-4">
                  <Button
                    loading={importloading}
                    className="btn mybtn"
                    text="Import CSV"
                    onClick={handleImport}
                  />
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ImportExportComponent;
