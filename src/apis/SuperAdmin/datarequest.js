import { api } from "../../apis/index";

export const datarequestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDataRequest: builder.query({
      query: ({ page = 1}) => ({
        url: `get/data-request-form?page=${page}`,
        method: "GET",

      }),
    }),

   
  }),
  overrideExisting: false,
});

export const {
 useGetDataRequestQuery
} = datarequestApi;
