import { api } from "../apis/index";

export const userHRApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // =========================
    // ADD USER HR
    // =========================
    addUserHR: builder.mutation({
      query: (formData) => ({
        url: "add-company-user",
        method: "POST",
        body: formData,
      }),

      invalidatesTags: ["UserHr"],
    }),

    // =========================
    // LIST USER HR
    // =========================
    listUserHR: builder.query({
      query: ({ page = 1, search = "" }) => ({
        url: `company-user-list?page=${page}&search=${search}`,
        method: "GET",
      }),

      providesTags: ["UserHr"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useAddUserHRMutation,
  useListUserHRQuery,
} = userHRApi;