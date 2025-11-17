import React, { useState } from 'react'
import { useLazyGetExcelEmployeeQuery } from '../apis/importExportEmployee'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const ExcelPdf = () => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [getExcelEmployee,{isLoading}] = useLazyGetExcelEmployeeQuery()

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
                status: format
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
                <div className="search_button">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        placeholderText="Start Date"
                        className="form-control inner_search_icon"
                        dateFormat="yyyy-MM-dd"
                        name="start_date"
                    />
                </div>
            </div>
            <div className="col-lg-2 col-md-6 px-1">
                <div className="search_button">
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        placeholderText="End Date"
                        className="form-control inner_search_icon"
                        dateFormat="yyyy-MM-dd"
                        name="end_date"
                    />
                </div>
            </div>
            <div className="col-lg-1 col-md-6 p-0">
                <div className="search_button">
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
                </div>
            </div>
        </>
    )
}

export default ExcelPdf
