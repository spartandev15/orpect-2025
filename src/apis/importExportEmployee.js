import { api } from "../apis/index";

export const importExportEmployee = api.injectEndpoints({
  endpoints: (builder) => ({
    getExcelEmployee: builder.query({
      query: ({ start_date, end_date ,status}) => ({
        url: `getExcelEmployee?start_date=${start_date}&end_date=${end_date}&status=${status}`,
        method: "GET",
        // body: data,
      }),
    }),

  
  }),
  overrideExisting: false,
});

export const {
useLazyGetExcelEmployeeQuery
} = importExportEmployee;
