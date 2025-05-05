import { api } from "../../apis/index";

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => ({
        url: `admin/getDashboardTotals`,
        method: "GET",

      }),
    }),

   
  }),
  overrideExisting: false,
});

export const {
 useGetDashboardQuery
} = dashboardApi;
