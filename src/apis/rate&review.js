import { api } from "../apis/index";

export const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addRateReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `rateAndReview/${id}`,
        method: "POST",
        body: data,
      }),
    }),

    viewGlobalSearchedEmpById: builder.query({
      query: (id) => `viewGlobalSearchedEmp/${id}`,
    }),
    dataRequest: builder.mutation({
      query: ({  data }) => ({
        url: `store/data-request-form`,
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddRateReviewMutation,
  useViewGlobalSearchedEmpByIdQuery,
  useDataRequestMutation
} = reviewApi;
