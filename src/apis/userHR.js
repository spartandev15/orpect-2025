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

    // =========================
    // EDIT USER HR (GET SINGLE USER)
    // =========================
    editUserHR: builder.query({
      query: (id) => ({
        url: `company-user-edit/${id}`,
        method: "GET",
      }),

      providesTags: ["UserHr"],
    }),

    // =========================
    // UPDATE USER HR
    // =========================
    updateUserHR: builder.mutation({
      query: ({ id, data }) => ({
        url: `update-company-user/${id}`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["UserHr"],
    }),

    // =========================
    // DELETE USER HR
    // =========================
    deleteUserHR: builder.mutation({
      query: (id) => ({
        url: `company-user-delete/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["UserHr"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useAddUserHRMutation,
  useListUserHRQuery,
  useEditUserHRQuery,
  useUpdateUserHRMutation,
  useDeleteUserHRMutation,
} = userHRApi;