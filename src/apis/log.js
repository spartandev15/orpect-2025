import { api } from "../apis/index";

export const logApi = api.injectEndpoints({
  endpoints: (builder) => ({
   
    // =========================
    // LIST USER HR
    // =========================
    logList: builder.query({
      query: ({ page = 1, search = "" }) => ({
        url: `companylogs?page=${page}&search=${search}`,
        method: "GET",
      }),

      providesTags: ["Logs"],
    }),

 
  }),

  overrideExisting: false,
});

export const {
  
  useLogListQuery,
 
} = logApi;