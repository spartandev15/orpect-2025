import React, { useState } from 'react'
import { useLazyGetExcelEmployeeQuery } from '../apis/importExportEmployee'
import { toast } from 'react-toastify'

const ExcelPdf = ({ employeeType = "current_employee" }) => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [getExcelEmployee, { isLoading }] = useLazyGetExcelEmployeeQuery()

    // ✅ Get today's date (for max restriction)
    const today = new Date().toISOString().split("T")[0]

    const handleImport = async (format) => {
        // ✅ Validation
        // if (!startDate || !endDate) {
        //     toast.error("Please select both start and end dates.")
        //     return
        // }

        if (startDate > endDate) {
            toast.error("Start date cannot be greater than end date.")
            return
        }

        try {
            const response = await getExcelEmployee({
                start_date: startDate,
                end_date: endDate,
                status: format,
                employeeType: employeeType
            }).unwrap()

            const fileUrl = response?.file_url

            if (!fileUrl) {
                toast.error("File URL not found.")
                return
            }

            // ✅ Open file in new tab
            window.open(fileUrl, '_blank')
        } catch (error) {
            console.error("Error opening file:", error)
            toast.error("Failed to open file.")
        }
    }

    const handleFormatChange = (e) => {
        const selectedFormat = e.target.value
        if (!selectedFormat) return
        handleImport(selectedFormat)
    }

    return (
        <>
            {/* ✅ Start Date */}
            <div className="col-lg-2 col-md-6 px-1">
                <div >
                    {/* <input
                      placeholder='Start Date'
                        type="date"
                        name="start_date"
                        value={startDate}
                        max={today}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="form-control"
                    /> */}
                    <input
  type={startDate ? "date" : "text"}
  placeholder="Start Date"
  value={startDate}
  onFocus={(e) => (e.target.type = "date")}
  onBlur={(e) => {
    if (!startDate) e.target.type = "text"
  }}
  onChange={(e) => setStartDate(e.target.value)}
  className="form-control"
/>
                </div>
            </div>

            {/* ✅ End Date */}
            <div className="col-lg-2 col-md-6 px-1">
                <div >
                    {/* <input
                        type="date"
                        name="end_date"
                        value={setEndDate}
                        max={today}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="form-control"
                    /> */}
                                 <input
  type={endDate ? "date" : "text"}
  placeholder="End Date"
  value={endDate}
  onFocus={(e) => (e.target.type = "date")}
  onBlur={(e) => {
    if (!endDate) e.target.type = "text"
  }}
  onChange={(e) => setEndDate(e.target.value)}
  className="form-control"
/>
                </div>
            </div>

            {/* ✅ Export Dropdown */}
            <div className="col-lg-1 col-md-6 px-0">
                <div style={{ position: 'relative' }}>
                    <select
                        className="form-control main_inner_dropdown"
                        defaultValue=""
                        onChange={handleFormatChange}
                        disabled={isLoading}
                    >
                        <option value="" disabled>Export</option>
                        <option value="pdf">PDF</option>
                        <option value="csv">CSV</option>
                    </select>

                    <i
                        className="fas fa-chevron-down"
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            color: '#6c757d',
                            fontSize: '11px'
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default ExcelPdf