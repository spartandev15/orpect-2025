import { api } from "../apis/index";

export const importExportEmployee = api.injectEndpoints({
  endpoints: (builder) => ({
    getExcelEmployee: builder.query({
      query: ({ start_date, end_date ,status, employeeType}) => ({
        url: `getExcelEmployee?start_date=${start_date}&end_date=${end_date}&status=${status}&employeeType=${employeeType}`,
        method: "GET",
        // body: data,
      }),
    }),
    excelExport: builder.mutation({
      query: ( data) => ({
        url: `store-excel-export`,
        method: "POST", 
        body: data,
      }),
    }),
    importCSV: builder.mutation({
      query: (formData) => ({
        url: `uploadCSV`,
        method: "POST",
        body: formData,
        // FormData will automatically set Content-Type to multipart/form-data with boundary
        // No need to manually set headers for FormData
      }),
    }),
   
  }),
  overrideExisting: false,
});

export const {
useLazyGetExcelEmployeeQuery,
useExcelExportMutation,
useImportCSVMutation
} = importExportEmployee;
