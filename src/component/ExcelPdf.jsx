import React, { useState } from 'react'
import { useLazyGetExcelEmployeeQuery } from '../apis/importExportEmployee'
import { toast } from 'react-toastify'

const ExcelPdf = () => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
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
    const handleImport = async (format) => {
        try {
            const response = await getExcelEmployee({
                start_date: startDate,
                end_date: endDate,
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
            <div className="col-lg-2 col-md-6 pb-4">
                <div className="search_button">
                    <input
                        type="date"
                        className="form-control inner_search_icon"
                        placeholder="Start Date"
                        name="start_date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
            </div>
            <div className="col-lg-2 col-md-6 pb-4">
                <div className="search_button">
                    <input
                        type="date"
                        className="form-control inner_search_icon"
                        placeholder="End Date"
                        name="end_date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
            <div className="col-lg-1 col-md-6 pb-4">
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
