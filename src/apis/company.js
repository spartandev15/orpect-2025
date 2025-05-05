import { api } from "../apis/index";

export const companyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDesignation: builder.query({
      query: () => "getDesignations",
    }),

    contactUs: builder.mutation({
      query: (data) => ({
        url: "sendSupportMail",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDesignationQuery,
  useContactUsMutation,
} = companyApi;
