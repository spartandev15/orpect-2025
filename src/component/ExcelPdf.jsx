import React, { useState } from 'react'
import { useLazyGetExcelEmployeeQuery } from '../apis/importExportEmployee'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const ExcelPdf = ({ employeeType = "current_employee" }) => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [getExcelEmployee, { isLoading }] = useLazyGetExcelEmployeeQuery()

    // const handleImport = async (format) => {
    //     // if (!startDate || !endDate) {
    //     //     alert("Please select both start and end dates.")
    //     //     return
    //     // }

    //     try {
    //         const result = await getExcelEmployee({ start_date: startDate, end_date: endDate, status:format }).unwrap()

    //         const mimeType = format === 'pdf' ? 'application/pdf' : 'application/vnd.ms-excel'
    //         const blob = new Blob([result], { type: mimeType })
    //         const url = window.URL.createObjectURL(blob)

    //         const link = document.createElement('a')
    //         link.href = url
    //         link.setAttribute('download', `employees.${format}`)
    //         document.body.appendChild(link)
    //         link.click()
    //         link.remove()
    //     } catch (error) {
    //         console.error("Error downloading file:", error)
    //         toast.error("Failed to download file.")
    //     }
    // }
    const formatDate = (date) => {
        if (!date) return ''
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const handleImport = async (format) => {
        try {
            const response = await getExcelEmployee({
                start_date: formatDate(startDate),
                end_date: formatDate(endDate),
                status: format,
                employeeType: employeeType
            }).unwrap()

            const fileUrl = response?.file_url
            if (!fileUrl) {
                toast.error("File URL not found.")
                return
            }

            // Open PDF or CSV in new tab
            window.open(fileUrl, '_blank')
        } catch (error) {
            console.error("Error opening file:", error)
            toast.error("Failed to open file.")
        }
    }

    const handleFormatChange = (e) => {
        const selectedFormat = e.target.value
        if (selectedFormat === '') return
        handleImport(selectedFormat)
    }

    return (
        <>
            <div className="col-lg-2 col-md-6 px-1">
                <div className="search_button" style={{ position: 'relative' }}>
                    <DatePicker
                        style={{ zIndex: 2 }}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        placeholderText="Start Date"
                        className="form-control inner_search_icon"
                        dateFormat="yyyy-MM-d"
                        name="start_date"
                        autoComplete="off"
                        calendarClassName='z-3'
                    />
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            zIndex: 0
                        }}
                    >
                        <rect x="3" y="4" width="14" height="13" rx="2" stroke="#000000" strokeWidth="1.4" />
                        <path d="M7 2.5V5.5" stroke="#000000" strokeWidth="1.4" strokeLinecap="round" />
                        <path d="M13 2.5V5.5" stroke="#000000" strokeWidth="1.4" strokeLinecap="round" />
                        <path d="M3 8H17" stroke="#000000" strokeWidth="1.4" />
                    </svg>
                </div>
            </div>
            <div className="col-lg-2 col-md-6 px-1">
                <div className="search_button" style={{ position: 'relative' }}>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        placeholderText="End Date"
                        className="form-control inner_search_icon"
                        dateFormat="yyyy-MM-dd"
                        name="end_date"
                        autoComplete="off"
                        zIndex={1000}
                    />
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            zIndex: 0
                        }}
                    >
                        <rect x="3" y="4" width="14" height="13" rx="2" stroke="#000000" strokeWidth="1.4" />
                        <path d="M7 2.5V5.5" stroke="#000000" strokeWidth="1.4" strokeLinecap="round" />
                        <path d="M13 2.5V5.5" stroke="#000000" strokeWidth="1.4" strokeLinecap="round" />
                        <path d="M3 8H17" stroke="#000000" strokeWidth="1.4" />
                    </svg>
                </div>
            </div>
            <div className="col-lg-1 col-md-6 p-0">
                <div className="" style={{ position: 'relative' }}>
                    <select
                        className="form-control main_inner_dropdown"
                        defaultValue=""
                        onChange={handleFormatChange}
                    >
                        <option value="" >
                            Export
                        </option>
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
                            zIndex: 1,
                            fontSize: '11px'
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default ExcelPdf
